const express = require('express');
const router = express.Router();
const PortfolioContext = require('../models/PortfolioContext');
const collector = require('../services/collector');

/* GET portfolio context with caching */
router.get('/context', async (req, res, next) => {
    let cachedContext = null;
    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      cachedContext = await PortfolioContext.findOne({
        lastUpdated: { $gte: twentyFourHoursAgo }
      }).sort({ lastUpdated: -1 });
    } catch (dbErr) {
      console.warn('WARN: Database unreachable or error encountered. Bypassing cache.', dbErr.message);
    }

    if (cachedContext) {
      console.log('INFO: Using cached portfolio context from MongoDB');
      return res.json({ content: cachedContext.content, source: 'cache' });
    }

    // Cache missing, stale, or DB failed: Collect new data
    console.log('INFO: Aggregating fresh portfolio context...');
    try {
      const freshContent = await collector.getPortfolioContext();
      
      // Attempt to update cache (fire and forget, don't block response)
      PortfolioContext.findOneAndUpdate(
        {}, 
        { content: freshContent, lastUpdated: new Date() },
        { upsert: true }
      ).catch(e => console.warn('WARN: Failed to update cache:', e.message));

      res.json({ content: freshContent, source: 'fresh' });
    } catch (err) {
      console.error('ERROR: All context retrieval methods failed:', err);
      res.status(500).json({ error: 'Internal server error' });
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
