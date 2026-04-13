const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * POST /api/stripe/checkout
 * Generates a dynamic Stripe Checkout session for services.
 */
router.post('/checkout', async (req, res) => {
    try {
        const { tier, email, name, projectType, message } = req.body;

        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('STRIPE: Secret key missing.');
            return res.status(503).json({ error: 'Payment service currently unavailable.' });
        }

        // Pricing logic (matching old portfolio values)
        const prices = {
            simple: 2500,       // $25.00
            better: 10000,      // $100.00
            professional: 25000 // $250.00
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
                return res.status(400).json({ error: 'Invalid service tier selected.' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: title,
                            description: `Strategic Infrastructure: ${projectType || 'Standard Build'}`,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/contact?success=true`,
            cancel_url: `${req.headers.origin}/services?canceled=true`,
            customer_email: email,
            metadata: {
                tier,
                customer_name: name,
                project_type: projectType,
                initial_message: message,
            },
        });

        res.json({ url: session.url });

    } catch (err) {
        console.error('STRIPE ERROR:', err.message);
        res.status(500).json({ error: 'Failed to initialize checkout session.' });
    }
});

module.exports = router;
