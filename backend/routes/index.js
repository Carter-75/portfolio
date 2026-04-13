const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PortfolioContext = require('../models/PortfolioContext');
const collector = require('../services/collector');
const OpenAI = require('openai');

/* GET portfolio context */
router.get('/context', async (req, res) => {
    try {
        const forceSync = req.query.force === 'true';
        
        if (forceSync) {
            console.log('INFO: Initiating synchronous identity sync...');
            await collector.getPortfolioContext(true);
        }

        let context = await PortfolioContext.findOne({});
        
        // If no context found, attempt one sync from disk
        if (!context) {
            console.log('INFO: No context in database. Attempting emergency disk sync...');
            try {
                await collector.getPortfolioContext(true);
                context = await PortfolioContext.findOne({});
            } catch (syncErr) {
                console.error('ERROR: Emergency sync failed:', syncErr.message);
            }
        }

        if (context && context.content) {
            res.json({ 
                content: context.content, 
                source: context.lastUpdated ? 'database' : 'fresh',
                lastUpdated: context.lastUpdated 
            });
        } else {
            // Ultimate fallback for absolute service continuity
            res.status(200).json({ 
                content: "Carter Moyer: Professional Software Engineer (Identity Anchoring Active).", 
                source: 'hardcoded_baseline',
                status: 'degraded'
            });
        }
    } catch (err) {
        console.error('ERROR: Context route failed:', err.message);
        res.status(500).json({ error: err.message, status: 'error' });
    }
});

/**
 * POST /api/chat
 * GPT-4o powered portfolio assistant.
 * Receives { message: string }, returns { response: string }.
 */
router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required.' });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return res.status(503).json({ 
                error: 'AI service unavailable.', 
                response: 'The AI assistant is currently offline. Please contact Carter directly.' 
            });
        }

        // Load portfolio context
        let contextContent = "Carter Moyer: Professional Software Engineer.";
        try {
            const ctx = await PortfolioContext.findOne({});
            if (ctx && ctx.content) {
                contextContent = ctx.content;
            }
        } catch (dbErr) {
            console.error('WARN: Failed to load context for chat, using baseline.');
        }

        const openai = new OpenAI({ apiKey });

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are a professional AI assistant embedded in Carter Moyer's portfolio website. Your role is to answer questions about Carter using ONLY the context below. Be concise, professional, and technically precise.

PORTFOLIO CONTEXT:
${contextContent.substring(0, 4000)}

RULES:
- Answer questions about Carter Moyer's skills, projects, education, and experience.
- Be conversational but professional — you represent Carter's brand.
- If the information isn't in the context, say you don't have that specific detail and suggest contacting Carter directly.
- Never fabricate facts, dates, ages, or biographical details.
- Keep responses under 150 words unless the question demands more detail.`
                },
                {
                    role: 'user',
                    content: message
                }
            ],
            max_tokens: 300,
            temperature: 0.3,
        });

        const aiResponse = completion.choices[0]?.message?.content || 
            "I'm having trouble processing that request. Please try again.";

        res.json({ response: aiResponse });

    } catch (err) {
        console.error('ERROR: Chat endpoint failed:', err.message);
        
        // Return user-friendly error, not a crash
        if (err.status === 401) {
            res.status(503).json({ response: 'AI service authentication error. Please contact Carter.' });
        } else if (err.status === 429) {
            res.status(429).json({ response: 'AI rate limit reached. Please wait a moment and try again.' });
        } else {
            res.status(500).json({ response: 'AI service temporarily unavailable. Please try again shortly.' });
        }
    }
});

/**
 * MANUAL SYNC ENDPOINT
 * Triggers a direct read of identity.md and updates MongoDB.
 */
router.get('/context/sync', async (req, res) => {
    try {
        await collector.getPortfolioContext(true);
        res.json({ 
            status: 'success', 
            message: 'Identity successfully synced from identity.md to database.' 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* Simple Ping for Connectivity Check */
router.get('/ping', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        project: process.env.PROJECT_NAME || 'Portfolio'
    });
});

module.exports = router;
