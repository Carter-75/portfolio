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
      const isStale = !cachedContext || cachedContext.lastUpdated < twentyFourHoursAgo;
      const forceSync = req.query.force === 'true';

      if (cachedContext && !forceSync) {
        // Serve cached data immediately
        res.json({ content: cachedContext.content, source: 'cache', isSyncing: cachedContext.isSyncing });
        
        if (isStale && !cachedContext.isSyncing) {
          console.log('INFO: Triggering background research burst...');
          // On Vercel, background tasks are risky but we'll try to trigger it 
          // without blocking the user if they already have data.
          collector.getPortfolioContext().catch(e => console.error('ERROR: Background research failed:', e.message));
        }
        return;
      }

      // No cache or Force Sync: Must await research to ensure Vercel doesn't kill the process
      console.log(`INFO: Initiating synchronous research burst (Force: ${forceSync})...`);
      await collector.getPortfolioContext(true); // Always use Fast-Path for synchronous requests
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
        diagnostic: {
          error: err.message,
          dbStatus: mongoose.connection.readyState,
          mongoUriExists: !!process.env.MONGODB_URI,
          env: process.env.PRODUCTION === 'true' ? 'production' : 'development'
        }
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
