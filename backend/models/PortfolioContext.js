const mongoose = require('mongoose');

const PortfolioContextSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  discoveredUrls: [String],
  crawledUrls: [String],
  isSyncing: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PortfolioContext', PortfolioContextSchema);
