const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Try to find .env.local in parent or current
let envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
    envPath = path.join(process.cwd(), '..', '.env.local');
}

if (!fs.existsSync(envPath)) {
    console.error('.env.local not found at', envPath);
    process.exit(1);
}

const env = fs.readFileSync(envPath, 'utf8');
const mongoUriMatch = env.match(/MONGODB_URI=(.*)/);
const mongoURI = mongoUriMatch ? mongoUriMatch[1].trim().replace(/^"|"$/g, '') : null;

if (!mongoURI) {
    console.error('MONGODB_URI not found in', envPath);
    process.exit(1);
}

async function run() {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
        
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
        
        for (const col of collections) {
            const count = await db.collection(col.name).countDocuments();
            console.log(`- ${col.name}: ${count} docs`);
            
            // Search for "signature" in documents
            const signatureDocs = await db.collection(col.name).find({
                $or: [
                    { content: { $regex: /signature/i } },
                    { title: { $regex: /signature/i } },
                    { name: { $regex: /signature/i } },
                    { key: { $regex: /signature/i } },
                    { value: { $regex: /signature/i } }
                ]
            }).toArray();
            
            if (signatureDocs.length > 0) {
                console.log(`Found "signature" in ${col.name}:`);
                console.log(JSON.stringify(signatureDocs, null, 2));
            }
        }
        
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

run();
