const axios = require('axios');
const collector = require('../backend/services/collector');
require('dotenv').config({ path: '.env.local' });

async function testCollector() {
    console.log("Starting local research test...");
    try {
        await collector.getPortfolioContext();
        console.log("Research finished (check local DB if connected).");
    } catch (e) {
        console.error("Research failed:", e);
    }
}

testCollector();
