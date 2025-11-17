# Production Deployment Guide

Complete guide to deploying the Portfolio Chatbot Backend to production using **free hosting**.

## Recommended Stack (100% Free)

- **Database**: PlanetScale (MySQL-compatible, 5GB free)
- **Backend**: Railway.app or Render.com (both have free tiers)

---

## Option 1: Railway.app (Recommended - Easiest)

### Why Railway?
- ✅ $5 free credit per month (enough for small apps)
- ✅ Automatic deployments from GitHub
- ✅ Built-in MySQL option
- ✅ Environment variables UI
- ✅ Logs and monitoring included

### Step-by-Step Deployment

#### 1. Setup Railway Account
```bash
# Visit https://railway.app
# Sign up with GitHub (free)
```

#### 2. Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Connect your portfolio repository
4. Select the `chatbot-backend` directory

#### 3. Add MySQL Database
1. In your project, click "New"
2. Select "Database" → "Add MySQL"
3. Railway will provision a free MySQL instance
4. Copy the connection details (shown in Variables tab)

#### 4. Configure Environment Variables
In Railway dashboard, add these variables:

```bash
DB_HOST=<from-railway-mysql>
DB_NAME=<from-railway-mysql>
DB_USER=<from-railway-mysql>
DB_PASSWORD=<from-railway-mysql>
DB_PORT=<from-railway-mysql>
FLASK_ENV=production
PORT=5000
```

Railway provides these automatically if you use their MySQL!

#### 5. Configure Build Settings
In Railway settings:
- **Root Directory**: `/chatbot-backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn -w 4 -b 0.0.0.0:$PORT app:app`

#### 6. Deploy
```bash
# Railway auto-deploys on git push!
git add .
git commit -m "Deploy chatbot backend"
git push origin main
```

Railway will:
1. Pull your code
2. Install dependencies
3. Start the server
4. Provide a public URL

#### 7. Get Your Backend URL
Railway provides a URL like: `https://your-app.railway.app`

Copy this URL for the Next.js frontend!

---

## Option 2: PlanetScale + Render.com

### Why This Combo?
- ✅ PlanetScale: Best free MySQL (5GB, better performance)
- ✅ Render: Simple deployment, free tier
- ✅ Both have generous free plans

### Part A: Setup PlanetScale (Database)

#### 1. Create PlanetScale Account
```bash
# Visit https://planetscale.com
# Sign up (free tier: 5GB storage, 1 billion row reads/month)
```

#### 2. Create Database
1. Click "Create database"
2. Name it: `portfolio-chatbot`
3. Select region closest to your users
4. Click "Create database"

#### 3. Create Branch
PlanetScale uses branches (like Git):
1. You'll have a `main` branch automatically
2. Click "Connect" → "Create password"
3. Save these credentials:

```bash
Host: xxxxx.us-east-3.psdb.cloud
Username: xxxxxxxxxx
Password: pscale_pw_xxxxxxxxxx
Database: portfolio-chatbot
```

#### 4. Get Connection String
PlanetScale provides a connection string:
```
mysql://username:password@host/database?ssl={"rejectUnauthorized":true}
```

#### 5. Update Backend for PlanetScale
PlanetScale uses MySQL with SSL. Update `app.py`:

```python
# Add to DB_CONFIG
DB_CONFIG = {
    'host': os.getenv('DB_HOST'),
    'database': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'port': int(os.getenv('DB_PORT', '3306')),
    'ssl_disabled': False,  # PlanetScale requires SSL
    'ssl_verify_cert': True,
    'ssl_verify_identity': True
}
```

### Part B: Deploy Backend to Render.com

#### 1. Create Render Account
```bash
# Visit https://render.com
# Sign up with GitHub (free)
```

#### 2. Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: portfolio-chatbot-backend
   - **Region**: Choose closest to you
   - **Branch**: main
   - **Root Directory**: chatbot-backend
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn -w 4 -b 0.0.0.0:$PORT app:app`

#### 3. Add Environment Variables
In Render dashboard, add:

```bash
DB_HOST=xxxxx.us-east-3.psdb.cloud
DB_NAME=portfolio-chatbot
DB_USER=xxxxxxxxxx
DB_PASSWORD=pscale_pw_xxxxxxxxxx
DB_PORT=3306
FLASK_ENV=production
PYTHON_VERSION=3.11.0
```

#### 4. Deploy
1. Click "Create Web Service"
2. Render will build and deploy automatically
3. Get your URL: `https://portfolio-chatbot-backend.onrender.com`

**Note**: Render free tier sleeps after 15 min of inactivity. First request may be slow.

---

## Option 3: Fly.io (Advanced)

### Why Fly.io?
- ✅ Truly free tier (no credit card needed initially)
- ✅ 3 free VMs
- ✅ Better performance than Render
- ✅ Global deployment

### Quick Setup
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Create app
cd chatbot-backend
fly launch

# Set secrets
fly secrets set DB_HOST=your-host
fly secrets set DB_NAME=your-database
fly secrets set DB_USER=your-user
fly secrets set DB_PASSWORD=your-password

# Deploy
fly deploy
```

---

## Connecting Frontend to Backend

Once your backend is deployed, update the Next.js API route:

### 1. Add Environment Variable
Create `.env.local` in portfolio root:

```bash
CHATBOT_BACKEND_URL=https://your-backend.railway.app
# or https://portfolio-chatbot-backend.onrender.com
```

### 2. Update API Route
In `src/app/api/chatbot/route.ts`, uncomment and modify:

```typescript
export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message } = body;

    // Use environment variable for backend URL
    const backendUrl = process.env.CHATBOT_BACKEND_URL;
    
    if (backendUrl) {
      // Call Python backend
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message,
          session_id: request.cookies.get('session_id')?.value 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }
    }

    // Fallback to local response generation
    const response = generateResponse(message.trim());
    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Chatbot API error:', error);
    // Return fallback response instead of error
    return NextResponse.json({
      response: getFallbackResponse(message),
      timestamp: new Date().toISOString(),
    });
  }
}
```

### 3. Deploy Frontend
```bash
# Vercel will pick up the environment variable
vercel env add CHATBOT_BACKEND_URL production
# Enter your backend URL when prompted

# Redeploy
git push origin main
```

---

## Cost Comparison

### Railway.app
- **Free Tier**: $5 credit/month
- **Usage**: ~$3-4/month for small backend + DB
- **Pros**: All-in-one, easy setup
- **Cons**: Credit runs out if traffic is high

### PlanetScale + Render
- **PlanetScale**: Free 5GB forever
- **Render**: Free tier (sleeps after 15 min)
- **Pros**: Better performance, more storage
- **Cons**: Cold starts on Render free tier

### PlanetScale + Fly.io
- **PlanetScale**: Free 5GB forever
- **Fly.io**: 3 free VMs, 160GB transfer
- **Pros**: Best performance, no sleep
- **Cons**: Slightly more complex setup

---

## Recommended Setup for Your Project

**For Development/Low Traffic:**
```
Railway.app (Backend + MySQL all-in-one)
↓
Vercel (Next.js Frontend)
```

**For Production/Better Performance:**
```
PlanetScale (MySQL - 5GB free)
↓
Fly.io or Railway (Python Backend)
↓
Vercel (Next.js Frontend)
```

---

## Testing Your Deployment

### 1. Test Backend Health
```bash
curl https://your-backend-url.railway.app/api/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2024-11-17T..."
}
```

### 2. Test Chat Endpoint
```bash
curl -X POST https://your-backend-url.railway.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are your skills?"}'
```

### 3. Test Database Connection
Check Railway/Render logs for:
```
Database initialized successfully
Starting Portfolio Chatbot Backend on port 5000
```

---

## Monitoring & Logs

### Railway
- Dashboard → Your Service → Logs tab
- Real-time logs
- Metrics included

### Render
- Dashboard → Your Service → Logs
- Last 7 days free
- Email alerts on errors

### PlanetScale
- Dashboard → Your Database → Insights
- Query analytics
- Storage usage

---

## Troubleshooting

### Backend won't start
```bash
# Check logs for errors
# Common issues:
1. Missing environment variables
2. Database connection failed
3. Port binding error (use $PORT)
```

### Database connection failed
```bash
# Verify credentials
# Check if database is active
# Ensure SSL is configured (PlanetScale)
# Check firewall rules
```

### Frontend can't reach backend
```bash
# Check CORS configuration in app.py
# Verify backend URL in .env.local
# Check if backend is sleeping (Render)
```

---

## Scaling When Traffic Grows

When you outgrow free tiers:

**Railway**: $5-10/month gets you more resources
**Render**: $7/month for always-on service
**PlanetScale**: $29/month for 10GB + more features
**Fly.io**: Pay as you grow, very affordable

---

## Security Checklist for Production

- [ ] Use environment variables for all secrets
- [ ] Enable SSL/TLS (automatic on all platforms)
- [ ] Set proper CORS origins (no wildcards)
- [ ] Use strong database passwords
- [ ] Enable logging but don't log sensitive data
- [ ] Set up error alerts
- [ ] Regular database backups
- [ ] Rate limiting on API endpoints

---

## Quick Start (Railway - Easiest)

```bash
# 1. Push code to GitHub
git add .
git commit -m "Add chatbot backend"
git push origin main

# 2. Go to railway.app
# 3. Sign up with GitHub
# 4. Click "New Project" → "Deploy from GitHub"
# 5. Select your repo
# 6. Add MySQL database
# 7. Deploy!

# Your backend is live! 🚀
```

That's it! Your chatbot backend is production-ready with free hosting.

