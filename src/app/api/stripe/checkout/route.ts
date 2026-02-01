import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Stripe initialized inside handlers for safety
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
//     apiVersion: '2024-12-18.acacia' as any,
// });

export async function POST(request: NextRequest) {
    try {
        const { tier, email, name, projectType, message } = await request.json();

        if (!process.env.STRIPE_SECRET_KEY) {
            return NextResponse.json(
                { error: 'Stripe is not configured' },
                { status: 500 }
            );
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-12-18.acacia' as any,
        });

        // Dynamic pricing from Env Vars (in cents)
        const prices = {
            simple: parseInt(process.env.PRICE_SIMPLE || '5000'), // $50.00
            better: parseInt(process.env.PRICE_BETTER || '20000'), // $200.00
            professional: parseInt(process.env.PRICE_PROFESSIONAL || '50000'), // $500.00
        };

        let amount = 0;
        let title = '';

        switch (tier) {
            case 'simple':
                amount = prices.simple;
                title = 'Simple Website Build';
                break;
            case 'better':
                amount = prices.better;
                title = 'Better Website Build';
                break;
            case 'professional':
                amount = prices.professional;
                title = 'Professional Business Website';
                break;
            default:
                return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: title,
                            description: `Project Type: ${projectType || 'Not specified'}`,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/contact?success=true`,
            cancel_url: `${request.headers.get('origin')}/contact?canceled=true`,
            customer_email: email,
            metadata: {
                tier,
                customer_name: name,
                project_type: projectType,
                initial_message: message,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
