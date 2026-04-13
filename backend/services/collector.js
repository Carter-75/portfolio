const fs = require('fs');
const path = require('path');
const PortfolioContext = require('../models/PortfolioContext');

/**
 * Static Reality Provider
 * Reads the identity ground-truth from a local markdown file and syncs it to MongoDB.
 * No crawling, no faking, no background investigation.
 */
const syncPortfolioContext = async (forceSync = false) => {
    const isConnected = require('mongoose').connection.readyState === 1;
    if (!isConnected) {
        console.warn('WARN: Database offline. Sync aborted.');
        return;
    }

    const identityPath = path.join(process.cwd(), 'identity.md');
    
    // 1. Check if we already have context and aren't forcing a sync
    if (!forceSync) {
        const existing = await PortfolioContext.findOne({});
        if (existing && existing.content) {
            return; // Use existing DB data
        }
    }

    // 2. Read from Local Source of Truth
    if (!fs.existsSync(identityPath)) {
        console.error(`CRITICAL: Static identity file not found at ${identityPath}`);
        return;
    }

    try {
        const content = fs.readFileSync(identityPath, 'utf8');
        console.log('INFO: Syncing database with identity.md ground-truth...');

        // 3. Upsert to MongoDB
        await PortfolioContext.findOneAndUpdate(
            {},
            {
                content: content,
                discoveredUrls: [], // Crawler fields neutralized
                crawledUrls: [],
                isSyncing: false,
                lastUpdated: new Date()
            },
            { upsert: true }
        );
        console.log('OK: Database identity successfully synced from local disk.');
    } catch (err) {
        console.error('ERROR: Identity sync failed:', err.message);
    }
};

const getPortfolioContext = async (forceSync = false) => {
    await syncPortfolioContext(forceSync);
};

module.exports = { getPortfolioContext };
