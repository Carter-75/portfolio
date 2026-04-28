const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Resolve .env.local
const envPath = path.join(__dirname, '../../.env.local');
require('dotenv').config({ path: envPath });

const Lead = require('../models/Lead');

const addTestLead = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const testLead = {
      email: 'cartermoyer75@gmail.com', // Test with your own email first
      name: 'Carter',
      businessName: 'Carter Portfolio Admin',
      status: 'pending'
    };

    const existing = await Lead.findOne({ email: testLead.email });
    if (existing) {
      console.log('Test lead already exists.');
    } else {
      await Lead.create(testLead);
      console.log('✅ Test lead added successfully!');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

addTestLead();
