const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PortfolioContext = require('../models/PortfolioContext');
const collector = require('../services/collector');
const OpenAI = require('openai');

const fs = require('fs');
const path = require('path');

/* GET portfolio context — Zero-Latency Architecture
 * Primary:  Pull pre-scraped context from MongoDB (populated by the daily cron job).
 * Fallback: If MongoDB is empty or unreachable, instantly read identity.md from disk.
 * This route NEVER blocks on network scraping — that's the cron job's responsibility.
 */
router.get('/context', async (req, res) => {
    let source = 'unknown';

    try {
        // Primary pull: MongoDB (populated by /api/cron/sync-context)
        const context = await PortfolioContext.findOne({});

        if (context && context.content) {
            return res.json({
                content: context.content,
                source: 'database',
                lastUpdated: context.lastUpdated
            });
        }

        // MongoDB is connected but the collection is empty — fall through to file fallback
        console.warn('CONTEXT: MongoDB collection empty. Falling back to identity.md...');
    } catch (dbErr) {
        // MongoDB connection failed entirely — fall through to file fallback
        console.warn('CONTEXT: MongoDB query failed:', dbErr.message, '— Falling back to identity.md...');
    }

    // ── identity.md Fallback (Zero-Latency) ────────────────────────
    try {
        const identityPath = path.join(__dirname, '../../identity.md');
        const identityContent = fs.readFileSync(identityPath, 'utf8');
        source = 'identity_file';

        return res.json({
            content: identityContent,
            source,
            status: 'degraded',
            message: 'Serving from static identity.md — cron sync may not have run yet.'
        });
    } catch (fsErr) {
        console.error('CONTEXT: identity.md fallback also failed:', fsErr.message);
    }

    // ── Ultimate Hardcoded Baseline ────────────────────────────────
    res.status(200).json({
        content: "Carter Moyer: Professional Software Engineer and Lead AI Architect (Identity Anchoring Active).",
        source: 'hardcoded_baseline',
        status: 'degraded'
    });
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

        // Load portfolio context (same fallback chain as /api/context)
        let contextContent = null;
        try {
            const ctx = await PortfolioContext.findOne({});
            if (ctx && ctx.content) {
                contextContent = ctx.content;
            }
        } catch (dbErr) {
            console.warn('CHAT: DB context load failed, falling back to identity.md');
        }

        // identity.md fallback for chat context
        if (!contextContent) {
            try {
                const identityPath = path.join(__dirname, '../../identity.md');
                contextContent = fs.readFileSync(identityPath, 'utf8');
            } catch (fsErr) {
                contextContent = "Carter Moyer: Professional Software Engineer and Lead AI Architect.";
            }
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
