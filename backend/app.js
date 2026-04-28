// Explicit Environment Resolution
const path = require('path');
const fs = require('fs');
const resolveEnvPath = () => {
  const candidates = [path.join(process.cwd(), '.env.local'), path.join(process.cwd(), 'backend', '.env.local')];
  for (const c of candidates) { if (fs.existsSync(c)) return c; }
  return candidates[0];
};
require('dotenv').config({ path: resolveEnvPath() });
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');

// Environment Detection
const isProduction = process.env.PRODUCTION === 'true' || 
                   process.env.NG_APP_PRODUCTION === 'true' ||
                   process.env.VERCEL === '1' || 
                   process.env.NODE_ENV === 'production';

// Enable Mongoose command buffering only in development for stability
// In production, we disable it to catch connection issues early in serverless.
mongoose.set('bufferCommands', !isProduction);

// --- Serverless MongoDB Connection Caching ---
let cachedDb = null;

const connectToDatabase = async () => {
    // If the connection is already established, reuse it.
    if (mongoose.connection.readyState === 1) {
        console.log('OK: Reusing existing MongoDB connection (Cache Hit)');
        return mongoose.connection;
    }

    // If we have a pending connection promise, await it.
    if (cachedDb) {
        console.log('INFO: Awaiting existing MongoDB connection promise...');
        return await cachedDb;
    }

    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
        console.error('CRITICAL: MONGODB_URI is not defined.');
        throw new Error('MONGODB_URI is missing');
    }

    console.log('INFO: Initiating new MongoDB connection (Cache Miss)...');
    
    // Store the connection promise to prevent multiple concurrent connection attempts
    cachedDb = mongoose.connect(mongoURI, {
        bufferCommands: false, // Fail fast in serverless if the DB is unreachable
        serverSelectionTimeoutMS: 5000, // 5s timeout for cluster selection
        connectTimeoutMS: 10000, // 10s for initial connection
        maxPoolSize: 1, // Minimize pool size for serverless concurrency
        minPoolSize: 1,
        socketTimeoutMS: 45000,
        family: 4 // Use IPv4 for stability in some environments
    });

    try {
        await cachedDb;
        console.log('OK: Connected to MongoDB Database (New Link Verified)');
        return mongoose.connection;
    } catch (err) {
        cachedDb = null; // Clear cache on failure so next request can retry
        console.error('CRITICAL DATABASE ERROR:', err.message);
        throw err;
    }
};

// Middleware to ensure DB is connected before processing requests
const ensureDbConnection = async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (err) {
        // We log the error but allow the request to continue in "Stateless Mode" 
        // if appropriate, or return a 503 Service Unavailable.
        console.warn('INFO: Entering "Stateless Mode" - Database connectivity lost.');
        next();
    }
};

const app = express();

// --- Diagnostic Routes (Moved up for early availability) ---
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    cwd: process.cwd(),
    dirname: __dirname,
    env: isProduction ? 'production' : 'development',
    dbStatus: mongoose.connection.readyState,
    dbStatusText: ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'][mongoose.connection.readyState] || 'Unknown',
    hasMongoUri: !!process.env.MONGODB_URI,
    monitoredVars: {
      PRODUCTION: !!process.env.PRODUCTION,
      NG_APP_PRODUCTION: !!process.env.NG_APP_PRODUCTION,
      PROJECT_NAME: !!process.env.PROJECT_NAME
    },
    timestamp: new Date().toISOString()
  });
});

const indexRouter = require('./routes/index');
const cronRouter = require('./routes/cron');
const stripeRouter = require('./routes/stripe');
const leadsRouter = require('./routes/leads');

const PROJECT_NAME = process.env.PROJECT_NAME || 'Portfolio Project';

// --- Global Middlewares ---
app.use(ensureDbConnection);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// --- Portfolio Iframe Security ---
const prodUrl = process.env.PROD_FRONTEND_URL;

const frameAncestors = ["'self'", "https://carter-portfolio.fyi", "https://carter-portfolio.vercel.app", "https://*.vercel.app", `http://localhost:${process.env.PORT || 3000}`];
if (prodUrl) {
  frameAncestors.push(prodUrl);
}
if (process.env.PROD_BACKEND_URL) {
  frameAncestors.push(process.env.PROD_BACKEND_URL);
}

app.use(helmet({
  crossOriginEmbedderPolicy: { policy: 'credentialless' },
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "frame-ancestors": frameAncestors,
      "connect-src": ["'self'", "https://huggingface.co", "https://*.huggingface.co", "https://api.github.com", `http://localhost:${process.env.PORT || 3000}`],
    },
  },
}));

app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'ALLOWALL'); // For compatibility
  next();
});

app.get('/', (req, res) => {
  res.send(`API for ${PROJECT_NAME} is running at /api`);
});

app.use('/api', indexRouter);
app.use('/api/cron', cronRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/leads', leadsRouter);

// Error handler (Hardened for Production JSON output)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(`ERROR ${status}:`, err.message);
  
  res.status(status).json({
    status: 'error',
    message: err.message,
    code: status,
    diagnostic: isProduction ? undefined : { stack: err.stack, env: process.env.NODE_ENV }
  });
});

// Final Vercel Serverless Export
module.exports = app;

// Local development server (Only runs if executed directly)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Local test server running on port ${port}`);
  });
}
