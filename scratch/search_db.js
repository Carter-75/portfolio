const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const mongoUriMatch = env.match(/MONGODB_URI=(.*)/);
const mongoURI = mongoUriMatch ? mongoUriMatch[1].trim() : null;

if (!mongoURI) {
    console.error('MONGODB_URI not found');
    process.exit(1);
}

async function run() {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
        
        for (const col of collections) {
            const count = await mongoose.connection.db.collection(col.name).countDocuments();
            console.log(`- ${col.name}: ${count} docs`);
            
            // Search for "signature" in documents
            const signatureDocs = await mongoose.connection.db.collection(col.name).find({
                $or: [
                    { content: /signature/i },
                    { title: /signature/i },
                    { name: /signature/i },
                    { key: /signature/i },
                    { value: /signature/i }
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
