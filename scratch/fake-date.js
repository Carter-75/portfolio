const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
const PortfolioContext = require('./backend/models/PortfolioContext');

async function testFreshness() {
    await mongoose.connect(process.env.MONGODB_URI);
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    await PortfolioContext.findOneAndUpdate({}, { lastUpdated: twoDaysAgo });
    console.log('Faked old date in DB.');
    process.exit(0);
}
testFreshness();
