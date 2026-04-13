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

        const context = await PortfolioContext.findOne({});
        if (context) {
            res.json({ content: context.content, source: 'database' });
        } else {
            // Initial sync if DB is empty
            await collector.getPortfolioContext(true);
            const fresh = await PortfolioContext.findOne({});
            res.json({ content: fresh ? fresh.content : "Carter Moyer: Professional Software Engineer.", source: 'fresh' });
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
