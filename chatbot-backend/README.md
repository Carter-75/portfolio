# Portfolio Chatbot Backend

Python Flask backend for the portfolio chatbot with MySQL integration.

## Features

- **MySQL Integration**: Stores conversations and portfolio data
- **Conversation History**: Tracks user interactions for context-aware responses
- **Portfolio Data Sync**: Dynamically updates from frontend content
- **Semantic Search**: Search portfolio content (ready for vector embeddings)
- **RESTful API**: Clean endpoints for chatbot operations
- **Production Ready**: Designed for deployment with Gunicorn

## Setup

### Prerequisites

- Python 3.8+
- MySQL 5.7+ or 8.0+
- pip package manager

### Installation

1. Install dependencies:
```bash
cd chatbot-backend
pip install -r requirements.txt
```

2. Configure MySQL:
   - Create a database: `CREATE DATABASE portfolio_chatbot;`
   - Update credentials in environment variables or `.env` file

3. Set environment variables:
```bash
export DB_HOST=localhost
export DB_NAME=portfolio_chatbot
export DB_USER=your_username
export DB_PASSWORD=your_password
export DB_PORT=3306
```

4. Run the application:
```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Chat
```
POST /api/chat
Body: {
  "message": "What are your skills?",
  "session_id": "optional-session-id"
}
```

### Sync Portfolio Data
```
POST /api/portfolio/sync
Body: {
  "category": "projects",
  "items": [...]
}
```

## Database Schema

### conversations
- `id`: Primary key
- `session_id`: Session identifier
- `message`: User message
- `response`: Bot response
- `sender`: user/bot
- `timestamp`: Message timestamp

### portfolio_data
- `id`: Primary key
- `category`: Content category
- `title`: Content title
- `content`: Full content
- `metadata`: JSON metadata
- `last_updated`: Last update timestamp

### content_embeddings (for future AI enhancements)
- `id`: Primary key
- `content_id`: Reference to portfolio_data
- `content_type`: Type of content
- `embedding_vector`: Vector embedding
- `created_at`: Creation timestamp

## 🚀 Quick Production Deployment

**See [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step production deployment guide!**

### Recommended Free Hosting:

**Option 1: Railway.app (Easiest - All-in-One)**
- Backend + MySQL in one platform
- $5 free credit monthly
- Auto-deploy from GitHub
- [Deploy Now →](https://railway.app)

**Option 2: PlanetScale + Render (Best Performance)**
- [PlanetScale](https://planetscale.com) - 5GB free MySQL forever
- [Render.com](https://render.com) - Free Python hosting
- Better performance, more storage

**Option 3: PlanetScale + Fly.io (Advanced)**
- [PlanetScale](https://planetscale.com) - Database
- [Fly.io](https://fly.io) - 3 free VMs, no sleep
- Best for production traffic

### Quick Start with Railway:
```bash
1. Push code to GitHub
2. Go to railway.app
3. Click "New Project" → "Deploy from GitHub"
4. Add MySQL database
5. Done! 🎉
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions for each option.

## Production Deployment

### Using Gunicorn:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Environment Configuration:
Set `FLASK_ENV=production` for production deployments.

## Future Enhancements

- [ ] Integrate OpenAI/Anthropic LLM API
- [ ] Implement vector embeddings for semantic search
- [ ] Add caching layer (Redis)
- [ ] Rate limiting and authentication
- [ ] Advanced analytics and conversation insights
- [ ] Multi-language support

## Architecture

```
Frontend (Next.js) 
    ↓ HTTP Request
Next.js API Route (/api/chatbot)
    ↓ HTTP Request (future)
Python Flask Backend
    ↓ SQL Queries
MySQL Database
```

Currently, the Next.js API provides responses using a rule-based system. The Python backend is ready to be connected for advanced AI processing with LLM integration.

