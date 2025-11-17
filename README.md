# 🚀 Carter Moyer - Professional Portfolio

A modern, full-stack portfolio website showcasing software engineering projects, skills, and expertise with an integrated AI-powered chatbot assistant.

Built with Next.js 15, React 19, TypeScript, and Bulma CSS, featuring a Python/Flask backend with MySQL integration.

## ✨ Features

### 🎨 Enhanced Pages

- **Home**: Dynamic 3D hero animation with interactive elements
- **About**: 
  - AI/LLM expertise and hands-on experience
  - Technical strengths & core competencies (5 categories)
  - Professional certifications with custom badges
  - Polished education section
- **Projects**: 
  - Engineering value highlights for each project
  - Challenge & solution sections
  - Clear tech stack displays
  - GitHub repository links
  - Professional card-based UI
- **Chatbot Info**: Complete system architecture and engineering breakdown
- **Blog**: 5 comprehensive posts on AI development, prompt engineering, and best practices
- **Contact**: Professional contact form with validation

### 🤖 AI-Powered Chatbot

- **Site-wide availability** - Appears on every page
- **Intelligent responses** about skills, projects, and experience
- **Context-aware** conversations with suggested questions
- **Beautiful UI** with glassmorphism design and smooth animations
- **Production-ready** with Python/MySQL backend architecture
- **Fallback system** - Works without backend using smart rule-based responses

### 🎯 Professional Features

- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Optimized performance
- SEO-friendly
- Accessible (WCAG 2.2 compliant)
- Clean, maintainable code architecture

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Bulma CSS + CSS Modules
- **Animations**: Anime.js, Three.js for 3D effects
- **Deployment**: Vercel

### Backend (Chatbot)
- **Language**: Python 3.10+
- **Framework**: Flask
- **Database**: MySQL
- **ORM**: mysql-connector-python
- **Production Server**: Gunicorn
- **Deployment**: Railway.app, Render.com, or Fly.io

## 🚀 Quick Start

### Local Development

1. **Clone and Install:**
```bash
git clone <your-repo-url>
cd portfolio
npm install
```

2. **Run Development Server:**
```bash
npm run dev
```

3. **Open Browser:**
Visit [http://localhost:3000](http://localhost:3000)

**That's it!** The portfolio works immediately with smart chatbot fallback responses.

### Optional: Setup Chatbot Backend

The chatbot works out-of-the-box with intelligent fallback responses. To connect the Python/MySQL backend for advanced features:

```bash
cd chatbot-backend
pip install -r requirements.txt
python app.py
```

Backend runs at [http://localhost:5000](http://localhost:5000)

See `chatbot-backend/README.md` for detailed backend setup.

## 📦 Production Deployment

### Frontend Deployment (Vercel)

**Recommended:** Deploy to Vercel (free, optimized for Next.js)

```bash
# Option 1: CLI
npm i -g vercel
vercel

# Option 2: GitHub Integration (recommended)
# 1. Push to GitHub
# 2. Go to vercel.com
# 3. Import your repository
# 4. Deploy automatically
```

### Backend Deployment (Free Options)

Choose one of these 100% free hosting options:

#### Option 1: Railway.app (Easiest - Recommended)

**Perfect for:** Quick setup, all-in-one solution  
**Cost:** $0 (includes $5 credit/month, usage ~$3-4)  
**Features:** Backend + MySQL in one platform, auto-deploy

**Setup (5 minutes):**
1. Push code to GitHub
2. Go to [railway.app](https://railway.app) and sign up
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Set root directory: `chatbot-backend`
6. Click "New" → "Database" → "Add MySQL"
7. Deploy! Railway auto-configures everything

**Get your backend URL** (e.g., `https://your-app.railway.app`)

#### Option 2: PlanetScale + Render (Best Free Performance)

**Perfect for:** Better database storage (5GB), production sites  
**Cost:** $0 forever  
**Note:** Render free tier sleeps after 15 min (first request is slow)

**Database Setup:**
1. Go to [planetscale.com](https://planetscale.com)
2. Create database: `portfolio-chatbot`
3. Get connection credentials

**Backend Setup:**
1. Go to [render.com](https://render.com)
2. New Web Service → Connect GitHub
3. Configure:
   - Root: `chatbot-backend`
   - Build: `pip install -r requirements.txt`
   - Start: `gunicorn -w 4 -b 0.0.0.0:$PORT app:app`
4. Add PlanetScale credentials as environment variables
5. Deploy!

#### Option 3: PlanetScale + Fly.io (Best Performance)

**Perfect for:** Professional portfolios, high traffic, no cold starts  
**Cost:** $0 forever  
**Features:** 3 free VMs, 160GB transfer, global edge network

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login and deploy
fly auth login
cd chatbot-backend
fly launch --no-deploy

# Set secrets
fly secrets set DB_HOST=your-host DB_NAME=portfolio-chatbot DB_USER=your-user DB_PASSWORD=your-password

# Deploy
fly deploy
```

### Connecting Frontend to Backend

1. **Add environment variable** in Vercel dashboard:
   - Name: `CHATBOT_BACKEND_URL`
   - Value: `https://your-backend-url` (from deployment above)

2. **Redeploy** frontend to apply changes

**Done!** Your full-stack portfolio is live! 🎉

## 🗂️ Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Home page with hero animation
│   │   ├── about/page.tsx            # About with AI expertise
│   │   ├── projects/page.tsx         # Projects with engineering details
│   │   ├── chatbot/page.tsx          # Chatbot explanation page
│   │   ├── blog/page.tsx             # Blog with 5 posts
│   │   ├── contact/page.tsx          # Contact form
│   │   ├── api/chatbot/route.ts      # Chatbot API endpoint
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles
│   └── components/
│       ├── PortfolioChatbot.tsx      # Site-wide chatbot component
│       ├── PortfolioChatbot.module.css
│       ├── Navbar.tsx                # Navigation
│       ├── Footer.tsx                # Footer
│       ├── AnimatedBackground.tsx    # Animated background
│       ├── HeroAnimation.tsx         # 3D hero animation
│       └── [other components]
├── chatbot-backend/                  # Python Flask backend
│   ├── app.py                        # Main Flask application
│   ├── requirements.txt              # Python dependencies
│   ├── README.md                     # Backend documentation
│   ├── DEPLOYMENT.md                 # Detailed deployment guide
│   └── .env.example                  # Environment variables template
├── public/
│   ├── images/                       # Images and assets
│   └── files/                        # Downloadable files
└── package.json                      # Node.js dependencies
```

## 🔧 Configuration

### Environment Variables

**Frontend (.env.local):**
```bash
# Optional: Connect to Python backend
CHATBOT_BACKEND_URL=https://your-backend.railway.app
```

**Backend (.env):**
```bash
DB_HOST=your-database-host
DB_NAME=portfolio_chatbot
DB_USER=your-username
DB_PASSWORD=your-password
DB_PORT=3306
FLASK_ENV=production
```

## 📚 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Run ESLint
```

### Backend
```bash
python app.py                        # Run Flask dev server
gunicorn -w 4 app:app               # Run production server
pip install -r requirements.txt     # Install dependencies
```

## 🎨 Customization

### Update Personal Information

**About Page** (`src/app/about/page.tsx`):
- Update education details, degrees, and years
- Modify technical strengths and skills
- Customize certification badges
- Edit personal bio and expertise

**Projects** (`src/app/projects/page.tsx`):
- Add/edit project URLs and GitHub links
- Update engineering highlights and achievements
- Modify tech stacks and descriptions
- Add challenge/solution sections

**Blog Posts** (`src/app/blog/page.tsx`):
- Add new posts to the `blogPosts` array
- Edit existing post content
- Update categories and tags

**Chatbot Knowledge** (`src/app/api/chatbot/route.ts`):
- Update `portfolioData` object with your information
- Modify response generation logic
- Add new conversation patterns

### Styling

The portfolio uses:
- **Primary Color**: `#48c774` (green) - Success/highlights
- **Accent Color**: `#e85d04` (orange) - Call-to-actions
- **Background**: Dark gradient theme with glassmorphism
- **Framework**: Bulma CSS for responsive layouts
- **Custom Styles**: CSS Modules for component-specific styling

## 🐛 Troubleshooting

### Common Issues

**Chatbot not responding:**
- Check browser console for errors
- Verify `/api/chatbot` endpoint is accessible
- Confirm fallback responses are working
- If using backend: check CORS settings and backend URL

**Build errors:**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires 18+)
- Clear `.next` folder and rebuild

**Backend connection issues:**
- Verify environment variables are set correctly
- Check backend logs for errors
- Ensure database is running and accessible
- Verify CORS configuration allows frontend domain

**Styling issues:**
- Clear browser cache
- Check that Bulma CSS is loaded in `layout.tsx`
- Verify CSS module imports are correct

## 📊 Features Breakdown

### About Page Enhancements
✅ Professional certification badges (4 custom designs)  
✅ AI/LLM expertise section with hands-on experience  
✅ Technical Strengths subsection (5 categories)  
✅ Polished education section with professional styling  

### Projects Page Overhaul
✅ Engineering value bullets (2-4 per project)  
✅ Challenge & solution sections  
✅ Tech stack badges  
✅ GitHub "View Code" links  
✅ Enhanced card-based UI  

### AI Chatbot System
✅ Site-wide floating chat button  
✅ Context-aware responses about portfolio  
✅ Suggested questions for easy interaction  
✅ Beautiful glassmorphism UI  
✅ Python/MySQL backend architecture  
✅ Conversation history tracking  
✅ Smart fallback responses (works offline)  

### Blog Section
✅ 5 comprehensive posts on AI development  
✅ Topics: Prompt engineering, Cursor AI, preventing hallucinations, code efficiency, rules files  
✅ Full post reader with navigation  
✅ Category and tag system  

## 🔐 Security

- Environment variables for all sensitive data
- CORS properly configured
- SQL injection prevention (parameterized queries)
- Input validation and sanitization
- HttpOnly cookies for authentication
- HTTPS enforced in production

## 📈 Performance

- Optimized bundle size with code splitting
- Lazy loading for heavy components
- Image optimization with Next.js Image
- Server-side rendering for SEO
- Database query optimization
- Efficient caching strategies

## 🤝 Contributing

This is a personal portfolio project, but feel free to:
- Report bugs or issues
- Suggest improvements
- Use it as inspiration for your own portfolio
- Fork and customize for your needs

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Live Demo**: [Your deployed URL]
- **Backend Docs**: `chatbot-backend/README.md`
- **Deployment Guide**: `chatbot-backend/DEPLOYMENT.md`

## 💡 Tech Highlights

- **Next.js 15** with App Router for modern React patterns
- **TypeScript** for type safety and better developer experience
- **Bulma CSS** for rapid, responsive UI development
- **Three.js** for 3D animations and interactive elements
- **Flask** + **MySQL** for robust backend architecture
- **Production-ready** deployment with free hosting options

---

**Built with ❤️ using modern web technologies and best practices**

For questions or support, see the documentation files or check the inline code comments.
