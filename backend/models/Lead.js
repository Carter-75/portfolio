const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  businessName: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'emailed', 'replied', 'unsubscribed'], 
    default: 'pending' 
  },
  lastEmailedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);
