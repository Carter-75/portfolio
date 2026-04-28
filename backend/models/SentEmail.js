const mongoose = require('mongoose');

const SentEmailSchema = new mongoose.Schema({
  recipientEmail: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  subject: { type: String },
  type: { type: String, default: 'outreach' } // 'outreach' or 'lead-magnet'
});

module.exports = mongoose.model('SentEmail', SentEmailSchema);
