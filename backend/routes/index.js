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
 * GPT-4o powered portfolio assistant with Browsing Capabilities.
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
                response: 'The AI assistant is currently offline. Please contact Carter directly at cartermoyer75@gmail.com.' 
            });
        }

        // Load baseline portfolio context
        let contextContent = null;
        try {
            const ctx = await PortfolioContext.findOne({});
            if (ctx && ctx.content) {
                contextContent = ctx.content;
            }
        } catch (dbErr) {
            console.warn('CHAT: DB context load failed');
        }

        if (!contextContent) {
            try {
                const identityPath = path.join(__dirname, '../../identity.md');
                contextContent = fs.readFileSync(identityPath, 'utf8');
            } catch (fsErr) {
                contextContent = "Carter Moyer: Professional Software Engineer and Lead AI Architect.";
            }
        }

        const openai = new OpenAI({ apiKey });

        const tools = [
            {
                type: "function",
                function: {
                    name: "browse_portfolio",
                    description: "Fetch live content from Carter's official portfolio website (carter-portfolio.fyi) to answer specific questions if the local context is insufficient.",
                    parameters: {
                        type: "object",
                        properties: {
                            reason: {
                                type: "string",
                            }
                        },
                        required: ["reason"]
                    }
                }
            }
        ];

        let messages = [
            {
                role: 'system',
                content: `You are a professional AI assistant embedded in Carter Moyer's portfolio website. 
                Your role is to answer questions about Carter using the context below. This context is a direct mirror of the site's content.

                PORTFOLIO CONTEXT (Source of Truth):
                ${contextContent.substring(0, 5000)}

                OPERATIONAL RULES:
                1. Always prioritize the PORTFOLIO CONTEXT. It is the most up-to-date representation of Carter's bio, services, and projects.
                2. If the user asks for extremely specific details that aren't in the context (e.g. current live site status or detailed external project updates), use the 'browse_portfolio' tool.
                3. If 'browse_portfolio' is used, target the specific route if possible (e.g. /about for bio info, /services for pricing).
                4. Maintain a premium, professional, and elite persona. 
                5. If you cannot find an answer even after browsing, suggest contacting Carter at cartermoyer75@gmail.com.`
            },
            { role: 'user', content: message }
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages,
            tools,
            tool_choice: "auto",
            max_tokens: 500,
            temperature: 0.2,
        });

        const responseMessage = response.choices[0].message;

        if (responseMessage.tool_calls) {
            const toolCall = responseMessage.tool_calls[0];
            const functionParams = JSON.parse(toolCall.function.arguments);
            const reason = (functionParams.reason || "").toLowerCase();
            
            if (toolCall.function.name === "browse_portfolio") {
                console.log(`CHAT: AI browsing for reason: "${reason}"`);
                
                let targetRoute = '';
                if (reason.includes('about') || reason.includes('bio') || reason.includes('who')) targetRoute = '/about';
                else if (reason.includes('services') || reason.includes('pricing') || reason.includes('cost')) targetRoute = '/services';
                else if (reason.includes('projects') || reason.includes('work')) targetRoute = '/projects';

                const baseUrl = process.env.PROD_FRONTEND_URL || 'https://www.carter-portfolio.fyi';
                const siteUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
                const fetchUrl = siteUrl + targetRoute;

                let freshContext = "The live site was unreachable or didn't provide enough detail. Falling back to local identity context.";
                
                try {
                    const fetchResponse = await fetch(fetchUrl, { signal: AbortSignal.timeout(8000) });
                    if (fetchResponse.ok) {
                        const html = await fetchResponse.text();
                        freshContext = html
                            .replace(/<script[\s\S]*?<\/script>/gi, '')
                            .replace(/<style[\s\S]*?<\/style>/gi, '')
                            .replace(/<header[\s\S]*?<\/header>/gi, '')
                            .replace(/<footer[\s\S]*?<\/footer>/gi, '')
                            .replace(/<[^>]+>/g, ' ')
                            .replace(/\s+/g, ' ')
                            .trim()
                            .substring(0, 4000);
                        
                        if (freshContext.length < 100) {
                          freshContext = "Fetched page but content was too sparse (likely SPA shell). Suggest relying on local context.";
                        }
                    }
                } catch (browseErr) {
                    console.error('CHAT: Live browse failed:', browseErr.message);
                }

                messages.push(responseMessage);
                messages.push({
                    role: "tool",
                    tool_call_id: toolCall.id,
                    content: freshContext
                });

                const secondResponse = await openai.chat.completions.create({
                    model: 'gpt-4o',
                    messages,
                    max_tokens: 500
                });

                return res.json({ response: secondResponse.choices[0].message.content });
            }
        }

        res.json({ response: responseMessage.content });


    } catch (err) {
        console.error('ERROR: Chat endpoint failed:', err.message);
        
        // Detailed Fallback / Error Handling
        if (err.status === 401) {
            return res.status(503).json({ response: 'The AI assistant is having trouble authenticating. Please contact Carter directly at cartermoyer75@gmail.com for inquiries.' });
        } else if (err.status === 429) {
            return res.status(429).json({ response: 'The AI assistant is currently handling too many requests. Please wait a moment or reach out to Carter via LinkedIn.' });
        } else if (err.status === 402) {
            return res.status(503).json({ response: 'The AI assistant is currently undergoing maintenance (credits). Feel free to check back later or contact Carter directly.' });
        }
        
        res.status(500).json({ response: 'I apologize, but my intelligence systems are currently under heavy load. Please try again in a few minutes or contact Carter Moyer directly via the Contact page.' });
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
