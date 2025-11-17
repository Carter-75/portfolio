#!/bin/bash

# Portfolio Chatbot Backend Setup Script
# This script helps you set up environment variables for deployment

echo "🤖 Portfolio Chatbot Backend Setup"
echo "===================================="
echo ""

# Check if .env file exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists. Backup created as .env.backup"
    cp .env .env.backup
fi

echo "📝 Please enter your database credentials:"
echo ""

# Get database credentials
read -p "Database Host (e.g., xxxxx.psdb.cloud): " db_host
read -p "Database Name (default: portfolio_chatbot): " db_name
db_name=${db_name:-portfolio_chatbot}
read -p "Database User: " db_user
read -sp "Database Password: " db_password
echo ""
read -p "Database Port (default: 3306): " db_port
db_port=${db_port:-3306}

echo ""
echo "📝 Environment Settings:"
read -p "Environment (development/production, default: development): " flask_env
flask_env=${flask_env:-development}

# Create .env file
cat > .env << EOF
# Database Configuration
DB_HOST=$db_host
DB_NAME=$db_name
DB_USER=$db_user
DB_PASSWORD=$db_password
DB_PORT=$db_port

# Application Configuration
FLASK_ENV=$flask_env
PORT=5000

# CORS Origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:3000,https://carter-portfolio.fyi
EOF

echo ""
echo "✅ .env file created successfully!"
echo ""
echo "📦 Next steps:"
echo ""
echo "1. Install dependencies:"
echo "   pip install -r requirements.txt"
echo ""
echo "2. Initialize database (first time only):"
echo "   python app.py"
echo "   # The database will auto-initialize on first run"
echo ""
echo "3. Run the server:"
echo "   python app.py"
echo "   # Or for production:"
echo "   gunicorn -w 4 -b 0.0.0.0:5000 app:app"
echo ""
echo "🌐 Backend will be available at: http://localhost:5000"
echo "🔍 Health check: http://localhost:5000/api/health"
echo ""
echo "📚 For deployment instructions, see DEPLOYMENT.md"
echo ""

