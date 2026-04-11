const express = require('express');
const router = express.Router();
const PortfolioContext = require('../models/PortfolioContext');
const collector = require('../services/collector');

/* GET portfolio context with caching */
router.get('/context', async (req, res, next) => {
    let cachedContext = null;
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    try {
      cachedContext = await PortfolioContext.findOne({}).sort({ lastUpdated: -1 });
    } catch (dbErr) {
      console.warn('WARN: Database error. Bypassing cache.', dbErr.message);
    }

    // Determine if we need to research (Background or Fresh)
    const isStale = !cachedContext || cachedContext.lastUpdated < sevenDaysAgo || cachedContext.isSyncing;

    if (cachedContext) {
      // Serve stale/existing data immediately (Background sync)
      res.json({ content: cachedContext.content, source: 'cache', isSyncing: cachedContext.isSyncing });
      
      if (isStale) {
        console.log('INFO: Triggering background research burst...');
        collector.getPortfolioContext().catch(e => console.error('ERROR: Background research failed:', e.message));
      }
      return;
    }

    // No cache at all: Must await initial research
    console.log('INFO: No cache found. Initiating first research burst...');
    try {
      await collector.getPortfolioContext();
      const fresh = await PortfolioContext.findOne({});
      res.json({ content: fresh ? fresh.content : "Initializing...", source: 'fresh' });
    } catch (err) {
      console.error('ERROR: Initial research failed:', err.message);
      res.json({ content: "System initializing. Please refresh in a few seconds.", source: 'fallback' });
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
