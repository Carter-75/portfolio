const express = require('express');
const router = express.Router();
const PortfolioContext = require('../models/PortfolioContext');

/**
 * GET /api/cron/sync-context
 * 
 * Vercel Cron Job endpoint — runs daily at midnight UTC.
 * 1. Verifies CRON_SECRET bearer token (Vercel sends this automatically).
 * 2. Fetches the live production site HTML.
 * 3. Strips scripts, styles, and tags to extract clean visible text.
 * 4. Upserts the scraped context into MongoDB.
 * 
 * Falls back to identity.md if the live site is unreachable.
 */
router.get('/sync-context', async (req, res) => {
    // ── Security Gate ──────────────────────────────────────────────
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret) {
        console.error('CRON: CRON_SECRET is not configured. Aborting.');
        return res.status(500).json({ error: 'CRON_SECRET not configured on server.' });
    }

    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${cronSecret}`) {
        console.warn('CRON: Unauthorized request blocked.');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // ── Scrape Logic ───────────────────────────────────────────────
    const siteUrl = process.env.PROD_FRONTEND_URL;
    if (!siteUrl) {
        console.error('CRON: PROD_FRONTEND_URL is not set.');
        return res.status(500).json({ error: 'PROD_FRONTEND_URL not configured.' });
    }

    let contextContent = null;
    let source = 'unknown';

    try {
        console.log(`CRON: Fetching live site at ${siteUrl} ...`);
        const response = await fetch(siteUrl, {
            headers: { 'User-Agent': 'CarterPortfolio-CronScraper/1.0' },
            signal: AbortSignal.timeout(15000) // 15s hard timeout
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const html = await response.text();

        // Strip away everything that isn't visible text
        contextContent = html
            // Remove <script> blocks (including contents)
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            // Remove <style> blocks (including contents)
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            // Remove HTML comments
            .replace(/<!--[\s\S]*?-->/g, '')
            // Remove all remaining HTML tags
            .replace(/<[^>]+>/g, ' ')
            // Decode common HTML entities
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            // Collapse whitespace
            .replace(/\s+/g, ' ')
            .trim();

        if (!contextContent || contextContent.length < 50) {
            throw new Error('Scraped content too short — site may be rendering client-side only.');
        }

        source = 'live_scrape';
        console.log(`CRON: Successfully scraped ${contextContent.length} chars from live site.`);

    } catch (scrapeErr) {
        console.warn(`CRON: Live scrape failed (${scrapeErr.message}). Falling back to identity.md...`);

        // Fallback: read identity.md from disk
        try {
            const fs = require('fs');
            const path = require('path');
            const identityPath = path.join(__dirname, '../../identity.md');
            contextContent = fs.readFileSync(identityPath, 'utf8');
            source = 'identity_fallback';
            console.log(`CRON: Loaded ${contextContent.length} chars from identity.md fallback.`);
        } catch (fsErr) {
            console.error('CRON: identity.md fallback also failed:', fsErr.message);
            return res.status(500).json({ 
                error: 'Both live scrape and identity.md fallback failed.',
                scrapeError: scrapeErr.message,
                fileError: fsErr.message
            });
        }
    }

    // ── Persist to MongoDB ─────────────────────────────────────────
    try {
        const mongoose = require('mongoose');
        if (mongoose.connection.readyState !== 1) {
            throw new Error('MongoDB not connected (readyState: ' + mongoose.connection.readyState + ')');
        }

        await PortfolioContext.findOneAndUpdate(
            {},
            {
                content: contextContent,
                isSyncing: false,
                lastUpdated: new Date()
            },
            { upsert: true }
        );

        console.log(`CRON: Context persisted to MongoDB (source: ${source}).`);
        return res.status(200).json({
            status: 'success',
            source,
            contentLength: contextContent.length,
            timestamp: new Date().toISOString()
        });

    } catch (dbErr) {
        console.error('CRON: MongoDB upsert failed:', dbErr.message);
        return res.status(500).json({ 
            error: 'Scrape succeeded but database write failed.',
            dbError: dbErr.message
        });
    }
});

/**
 * GET /api/cron/outreach
 * 
 * Vercel Cron Job — Runs the daily rotating outreach.
 * Enforces 1 email per day max.
 */
const OutreachService = require('../services/outreach.service');

router.get('/outreach', async (req, res) => {
    // Security Gate
    const cronSecret = process.env.CRON_SECRET;
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${cronSecret}` && process.env.PRODUCTION === 'true') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const result = await OutreachService.runDailyOutreach();
        res.json({
            ok: true,
            status: result.status,
            message: result.status === 'success' ? 'Outreach email sent' : 'No outreach performed',
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error('CRON Outreach Failed:', err.message);
        res.status(500).json({ ok: false, error: err.message });
    }
});

module.exports = router;
