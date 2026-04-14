const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
    envPath = path.join(process.cwd(), '..', '.env.local');
}

const env = fs.readFileSync(envPath, 'utf8');
const mongoUriMatch = env.match(/MONGODB_URI=(.*)/);
const mongoURI = mongoUriMatch ? mongoUriMatch[1].trim().replace(/^"|"$/g, '') : null;

async function run() {
    try {
        await mongoose.connect(mongoURI);
        const docs = await mongoose.connection.db.collection('portfoliocontexts').find({}).toArray();
        console.log(JSON.stringify(docs, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

run();
