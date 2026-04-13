const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PortfolioContext = require('../models/PortfolioContext');
const collector = require('../services/collector');

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
