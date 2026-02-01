import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendEmail } from '@/lib/email';
import { kv } from '@vercel/kv';

// Stripe initialized inside handlers
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
//     apiVersion: '2024-12-18.acacia' as any,
// });

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
    if (!webhookSecret) {
        return NextResponse.json({ error: 'Stripe webhook secret is not set' }, { status: 500 });
    }

    const payload = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
            apiVersion: '2024-12-18.acacia' as any,
        });
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const { customer_email, metadata, amount_total, currency } = session;
        const { tier, customer_name, project_type, initial_message } = metadata || {};

        console.log('Payment successful for:', customer_email);

        // 1. Send Confirmation Email to User
        if (customer_email) {
            await sendEmail({
                to: customer_email,
                subject: 'Payment Confirmation - Website Build Request',
                html: `
          <h1>Thank you for your order, ${customer_name || 'Customer'}!</h1>
          <p>We have received your payment for the <strong>${tier?.toUpperCase()}</strong> package.</p>
          <p><strong>Amount:</strong> ${(amount_total || 0) / 100} ${currency?.toUpperCase()}</p>
          <p>We will review your project details and get back to you shortly to start the process.</p>
          <br>
          <p>Best regards,</p>
          <p>Carter Moyer</p>
        `,
            });
        }

        // 2. Send Notification Email to Admin (Carter)
        // Assuming ADMIN_EMAIL is set, or just hardcode/use same verified sender for now to test
        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM; // Fallback
        if (adminEmail) {
            await sendEmail({
                to: adminEmail,
                subject: `New Order: ${tier?.toUpperCase()} Package`,
                html: `
            <h1>New Website Build Request</h1>
            <p><strong>Customer:</strong> ${customer_name} (${customer_email})</p>
            <p><strong>Package:</strong> ${tier}</p>
            <p><strong>Amount:</strong> ${(amount_total || 0) / 100} ${currency?.toUpperCase()}</p>
            <p><strong>Project Type:</strong> ${project_type}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
                ${initial_message}
            </blockquote>
            `,
            });
        }

        // 3. Store in KV (Optional)
        if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
            try {
                const orderId = session.id;
                await kv.set(`order:${orderId}`, {
                    ...session,
                    timestamp: new Date().toISOString(),
                });
                await kv.lpush('orders:list', orderId);
                console.log('Order stored in KV');
            } catch (e) {
                console.error('Failed to store in KV:', e);
            }
        }
    }

    return NextResponse.json({ received: true });
}
