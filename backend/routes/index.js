const express = require('express');
const router = express.Router();
const PortfolioContext = require('../models/PortfolioContext');
const collector = require('../services/collector');

/* GET portfolio context with caching */
router.get('/context', async (req, res, next) => {
  try {
    // Check for fresh context (under 24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const cachedContext = await PortfolioContext.findOne({
      lastUpdated: { $gte: twentyFourHoursAgo }
    });

    if (cachedContext) {
      console.log('INFO: Using cached portfolio context from MongoDB');
      return res.json({ content: cachedContext.content, source: 'cache' });
    }

    // Cache missing or stale: Collect new data
    console.log('INFO: Cache stale/missing. Aggregating fresh portfolio context...');
    const freshContent = await collector.getPortfolioContext();

    // Update or Create the context in DB
    await PortfolioContext.findOneAndUpdate(
      {}, // Single record
      { content: freshContent, lastUpdated: new Date() },
      { upsert: true, new: true }
    );

    res.json({ content: freshContent, source: 'fresh' });
  } catch (err) {
    console.error('ERROR: Failed to fetch portfolio context:', err);
    // Fallback to fresh content if DB fails
    try {
      res.json({ content: collector.getPortfolioContext(), source: 'fallback' });
    } catch (collectErr) {
      res.status(500).json({ error: 'Internal server error' });
    }
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
