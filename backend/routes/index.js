const express = require('express');
const router = express.Router();
const PortfolioContext = require('../models/PortfolioContext');
const collector = require('../services/collector');

/* GET portfolio context with caching */
router.get('/context', async (req, res, next) => {
    try {
      let cachedContext = null;
      // Optimize TTL: 24 hours instead of 7 days
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      try {
        cachedContext = await PortfolioContext.findOne({}).sort({ lastUpdated: -1 });
      } catch (dbErr) {
        console.warn('WARN: Database error. Bypassing cache.', dbErr.message);
      }

      // Determine if we need to research (Background or Fresh)
      const isStale = !cachedContext || cachedContext.lastUpdated < twentyFourHoursAgo || cachedContext.isSyncing;

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
      await collector.getPortfolioContext();
      const fresh = await PortfolioContext.findOne({});
      
      if (fresh) {
        res.json({ content: fresh.content, source: 'fresh' });
      } else {
        throw new Error('No data found after research burst');
      }
    } catch (err) {
      console.error('ERROR: Context route failed fundamentally:', err.message);
      const baseline = "Carter Moyer: Lead AI Architect and Full-stack Software Engineer (Class of 2026). Focused on high-performance architecture, AI prompt engineering, and MEAN stack development.";
      res.json({ 
        content: baseline, 
        source: 'fallback',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined 
      });
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
