const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PortfolioContext = require('../models/PortfolioContext');
const Contact = require('../models/Contact');
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

// ── Internal Helpers ──────────────────────────────────────

/**
 * syncFromLive
 * Attempts to scrape the production site and update MongoDB.
 * Falls back to identity.md only if site is unreachable.
 * Returns the fresh content.
 */
async function syncFromLive() {
    const siteUrl = process.env.PROD_FRONTEND_URL || 'https://www.carter-portfolio.fyi';
    let content = null;
    let source = 'unknown';

    try {
        console.log(`SYNC: Attempting live scrape from ${siteUrl}...`);
        const response = await fetch(siteUrl, {
            headers: { 'User-Agent': 'CarterPortfolio-AISelfHeal/1.0' },
            signal: AbortSignal.timeout(10000)
        });

        if (response.ok) {
            const html = await response.text();
            content = html
                .replace(/<script[\s\S]*?<\/script>/gi, '')
                .replace(/<style[\s\S]*?<\/style>/gi, '')
                .replace(/<!--[\s\S]*?-->/g, '')
                .replace(/<[^>]+>/g, ' ')
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/\s+/g, ' ')
                .trim();

            if (content && content.length > 200) {
                source = 'live_scrape';
                console.log(`SYNC: Successfully scraped live site (${content.length} chars)`);
            } else {
                throw new Error('Scraped content too sparse');
            }
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (err) {
        console.warn(`SYNC: Live scrape failed (${err.message}). Reaching for identity.md...`);
        try {
            const identityPath = path.join(__dirname, '../../identity.md');
            content = fs.readFileSync(identityPath, 'utf8');
            source = 'identity_file';
        } catch (fsErr) {
            console.error('SYNC: Fallback also failed.');
            return null;
        }
    }

    if (content) {
        try {
            await PortfolioContext.findOneAndUpdate(
                {},
                { content, lastUpdated: new Date() },
                { upsert: true }
            );
        } catch (dbErr) {
            console.error('SYNC: DB update failed:', dbErr.message);
        }
    }
    return content;
}

/**
 * POST /api/chat
 * GPT-4o powered portfolio assistant with Self-Healing Knowledge System.
 * Tools: browse_portfolio, refresh_context, read_context, update_context_section
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
                response: 'The AI assistant is currently offline. Please contact Carter directly at help@carter-portfolio.fyi.' 
            });
        }

        // ── Requirement 1: Freshness Protocol ────────────────────
        // 1. Check DB first
        // 2. If info is missing OR older than 1 day, look at site and update info
        // 3. Only if site/DB fails, use identity.md
        let contextContent = null;
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        try {
            const ctx = await PortfolioContext.findOne({});
            if (ctx && ctx.content && ctx.lastUpdated > oneDayAgo) {
                console.log('CHAT: Using cached DB context (Freshness OK)');
                contextContent = ctx.content;
            } else {
                console.log('CHAT: Context stale or missing. Auto-syncing from live site...');
                contextContent = await syncFromLive();
            }
        } catch (dbErr) {
            console.warn('CHAT: DB check failed, attempting direct sync...');
            contextContent = await syncFromLive();
        }

        // Ultimate safety fallback
        if (!contextContent) {
            try {
                const identityPath = path.join(__dirname, '../../identity.md');
                contextContent = fs.readFileSync(identityPath, 'utf8');
            } catch (fsErr) {
                contextContent = "Carter Moyer: Professional Software Engineer and Lead AI Architect.";
            }
        }

        const openai = new OpenAI({ apiKey });

        // ── Internal Tool Handlers ────────────────────────────────
        const toolHandlers = {
            browse_portfolio: async (args) => {
                const reason = (args.reason || "").toLowerCase();
                console.log(`TOOL: browse_portfolio — reason: "${reason}"`);
                
                let targetRoute = '';
                if (reason.includes('about') || reason.includes('bio') || reason.includes('who') || reason.includes('education')) targetRoute = '/about';
                else if (reason.includes('projects') || reason.includes('work') || reason.includes('portfolio')) targetRoute = '/projects';
                else if (reason.includes('contact')) targetRoute = '/contact';

                const baseUrl = process.env.PROD_FRONTEND_URL || 'https://www.carter-portfolio.fyi';
                const siteUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
                const fetchUrl = siteUrl + targetRoute;

                try {
                    console.log(`TOOL: Fetching ${fetchUrl}`);
                    const fetchResponse = await fetch(fetchUrl, { 
                        headers: { 'User-Agent': 'CarterPortfolio-AISelfHeal/1.0' },
                        signal: AbortSignal.timeout(8000) 
                    });
                    if (fetchResponse.ok) {
                        const html = await fetchResponse.text();
                        const cleaned = html
                            .replace(/<script[\s\S]*?<\/script>/gi, '')
                            .replace(/<style[\s\S]*?<\/style>/gi, '')
                            .replace(/<header[\s\S]*?<\/header>/gi, '')
                            .replace(/<footer[\s\S]*?<\/footer>/gi, '')
                            .replace(/<!--[\s\S]*?-->/g, '')
                            .replace(/<[^>]+>/g, ' ')
                            .replace(/&nbsp;/g, ' ')
                            .replace(/&amp;/g, '&')
                            .replace(/&lt;/g, '<')
                            .replace(/&gt;/g, '>')
                            .replace(/&quot;/g, '"')
                            .replace(/&#39;/g, "'")
                            .replace(/\s+/g, ' ')
                            .trim()
                            .substring(0, 4000);
                        
                        if (cleaned.length < 100) {
                            return "Fetched page but content was too sparse (likely SPA shell). Rely on 'refresh_context' tool if this persists.";
                        }
                        return `Live content from ${fetchUrl}:\n\n${cleaned}`;
                    }
                    return `Site returned HTTP ${fetchResponse.status}.`;
                } catch (err) {
                    console.error('TOOL: browse failed:', err.message);
                    return "Live site unreachable. Use local context or call refresh_context.";
                }
            },

            refresh_context: async (args) => {
                console.log(`TOOL: refresh_context (Live-First) — reason: "${args.reason}"`);
                const freshContent = await syncFromLive();
                if (freshContent) {
                    return `Context successfully refreshed from live site. Corrected knowledge is now stored in the database. Updated content preview:\n\n${freshContent.substring(0, 500)}...`;
                }
                return "Refresh failed: Live site unreachable and identity.md missing.";
            },

            read_context: async (args) => {
                console.log(`TOOL: read_context — reason: "${args.reason}"`);
                try {
                    const ctx = await PortfolioContext.findOne({});
                    if (ctx && ctx.content) {
                        return `Current Database context (Stored Brain). Last updated: ${ctx.lastUpdated}:\n\n${ctx.content}`;
                    }
                    return "Database is empty. Call refresh_context to fetch from the live site.";
                } catch (err) {
                    return `Database read failed: ${err.message}`;
                }
            },

            update_context_section: async (args) => {
                const { section, newContent } = args;
                console.log(`TOOL: update_context_section — section: "${section}"`);
                try {
                    const ctx = await PortfolioContext.findOne({});
                    if (!ctx || !ctx.content) {
                        return "No context in database. Call refresh_context first to initialize.";
                    }

                    const escapedSection = section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const sectionRegex = new RegExp(`(##?#?\\s*${escapedSection}[^\\n]*)([\\s\\S]*?)(?=\\n##|$)`, 'i');
                    
                    if (!sectionRegex.test(ctx.content)) {
                        // Section not found, append it
                        const updatedContent = ctx.content + `\n\n## ${section}\n${newContent}`;
                        await PortfolioContext.findOneAndUpdate({}, { content: updatedContent, lastUpdated: new Date() });
                        return `Section "${section}" was not found, so it was appended. Database updated.`;
                    }

                    const updatedContent = ctx.content.replace(sectionRegex, `$1\n${newContent}`);
                    await PortfolioContext.findOneAndUpdate({}, { content: updatedContent, lastUpdated: new Date() });
                    return `Section "${section}" found and successfully updated in the database.`;
                } catch (err) {
                    return `Update failed: ${err.message}`;
                }
            }
        };

        // ── Tool Definitions ─────────────────────────────────────
        const tools = [
            {
                type: "function",
                function: {
                    name: "browse_portfolio",
                    description: "Fetch live content from a specific sub-page (e.g., /about, /services). Use this to find the ABSOLUTE TRUTH when local data is missing or likely wrong.",
                    parameters: {
                        type: "object",
                        properties: {
                            reason: { type: "string" }
                        },
                        required: ["reason"]
                    }
                }
            },
            {
                type: "function",
                function: {
                    name: "refresh_context",
                    description: "SYNC the entire database brain with the live production site. Use this when the user says your knowledge is wrong or old. This is the ultimate ground-truth sync.",
                    parameters: {
                        type: "object",
                        properties: {
                            reason: { type: "string" }
                        },
                        required: ["reason"]
                    }
                }
            },
            {
                type: "function",
                function: {
                    name: "read_context",
                    description: "View what you currently have stored in your database (Your Stored Brain).",
                    parameters: {
                        type: "object",
                        properties: {
                            reason: { type: "string" }
                        },
                        required: ["reason"]
                    }
                }
            },
            {
                type: "function",
                function: {
                    name: "update_context_section",
                    description: "Manually patch a specific section in your database brain with new information found while browsing.",
                    parameters: {
                        type: "object",
                        properties: {
                            section: { type: "string" },
                            newContent: { type: "string" }
                        },
                        required: ["section", "newContent"]
                    }
                }
            }
        ];

        // ── System Prompt ─────────────────────────────────────────
        let messages = [
            {
                role: 'system',
                content: `You are Carter Moyer's professional AI representative.
                
                STRICT FORMATING RULES:
                - NEVER use the character '*' (asterisk).
                - NEVER use the character '#' (hash).
                - NEVER use the character '—' (long dash / em dash). Use a simple '-' or a comma instead.
                - DO NOT use Markdown formatting (no bolding, no headers, no bullet points using banned chars).
                - Use standard capitalization and clear, human-readable paragraphs.

                YOUR PERSONA:
                - You are elite, knowledgeable, and highly articulate.
                - Speak in 'Human Language'. Do not simply copy-paste text from your brain or list data verbatim.
                - Avoid dry lists. Use fluid, professional paragraphs.

                SOURCE OF TRUTH HIERARCHY:
                1. LIVE SITE DATA (Obtained via 'browse_portfolio' or 'refresh_context') - This is ALWAYS correct.
                2. STORED BRAIN (The context below) - This is what you currently remember.
                3. IDENTITY FILE (identity.md) - Only used if the site is down.

                PORTFOLIO CONTEXT (Your Stored Brain):
                ${contextContent.substring(0, 5000)}

                PROTOCOLS:
                - If a user provides information that contradicts your Stored Brain, DO NOT ARGUE.
                - Call 'refresh_context' to scrape the live site and update your brain with the actual truth.
                - If you discover specific truth while browsing sub-pages, use 'update_context_section' to fix that part of your brain permanently.
                - Your objective is to represent Carter Moyer's excellence (BS in CS, graduating Fall 2026) with conversational authority.`
            },
            { role: 'user', content: message }
        ];

        // ── Agentic Tool Loop ─────────────────────
        const MAX_TOOL_ROUNDS = 3;
        let finalContent = null;

        for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
            const isLastRound = round === MAX_TOOL_ROUNDS - 1;
            
            const completion = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages,
                tools: isLastRound ? undefined : tools,
                tool_choice: isLastRound ? undefined : "auto",
                max_tokens: 600,
                temperature: 0.1, // Even stricter
            });

            const responseMessage = completion.choices[0].message;

            if (!responseMessage.tool_calls || responseMessage.tool_calls.length === 0) {
                finalContent = responseMessage.content;
                break;
            }

            messages.push(responseMessage);
            
            for (const toolCall of responseMessage.tool_calls) {
                const fnName = toolCall.function.name;
                let fnArgs = {};
                try {
                    fnArgs = JSON.parse(toolCall.function.arguments);
                } catch (parseErr) {}
                
                const handler = toolHandlers[fnName];
                let result = await (handler ? handler(fnArgs) : `Unknown tool: ${fnName}`);

                messages.push({
                    role: "tool",
                    tool_call_id: toolCall.id,
                    content: typeof result === 'string' ? result : JSON.stringify(result)
                });
            }
        }

        if (!finalContent) {
            const fallback = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages,
                max_tokens: 500
            });
            finalContent = fallback.choices[0].message.content;
        }

        res.json({ response: finalContent });

    } catch (err) {
        console.error('ERROR: Chat failed:', err.message);
        res.status(500).json({ response: 'My intelligence systems are under heavy load. Please try again or contact Carter directly.' });
    }
});

// ═══════════════════════════════════════════════════════════════
// CONTEXT MANAGEMENT
// ═══════════════════════════════════════════════════════════════

router.get('/context/read', async (req, res) => {
    try {
        const ctx = await PortfolioContext.findOne({});
        res.json({
            status: 'ok',
            content: ctx?.content || 'Empty',
            lastUpdated: ctx?.lastUpdated,
            source: 'database'
        });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

router.post('/context/refresh', async (req, res) => {
    // Manually trigger the live sync logic (same as internal helper)
    try {
        const content = await syncFromLive();
        if (content) {
            res.json({ status: 'success', message: 'Context refreshed from live site.' });
        } else {
            res.status(500).json({ status: 'error', message: 'Failed to refresh from live site and identity.md.' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

router.get('/context/sync', async (req, res) => {
    try {
        await collector.getPortfolioContext(true);
        res.json({ status: 'success', message: 'Identity synced.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/ping', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address.' });
        }

        const contact = new Contact({
            name: name.trim().slice(0, 120),
            email: email.trim().slice(0, 254),
            subject: subject.trim().slice(0, 200),
            message: message.trim().slice(0, 5000)
        });

        await contact.save();
        console.log(`CONTACT: New message from ${email} — "${subject}"`);

        res.status(201).json({ success: true });
    } catch (err) {
        console.error('CONTACT: Save failed:', err.message);
        res.status(500).json({ error: 'Failed to save message. Please try again.' });
    }
});

module.exports = router;


