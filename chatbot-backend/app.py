"""
Portfolio Chatbot Backend
Python Flask API with MySQL Integration

This backend provides advanced AI-powered chatbot functionality with:
- MySQL database for storing conversations and portfolio data
- Vector embeddings for semantic search
- Context-aware responses
- Dynamic content understanding
- Conversation history tracking

Setup:
1. Install dependencies: pip install -r requirements.txt
2. Configure MySQL connection in config.py
3. Run: python app.py

For production deployment, use Gunicorn or similar WSGI server.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
from datetime import datetime
import os
from typing import Dict, List, Optional
import json

app = Flask(__name__)

# CORS configuration - update with your frontend domain in production
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "https://carter-portfolio.fyi"],
        "methods": ["POST", "GET", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Database configuration - use environment variables in production
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'database': os.getenv('DB_NAME', 'portfolio_chatbot'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'port': int(os.getenv('DB_PORT', '3306'))
}


def get_db_connection():
    """
    Create and return a MySQL database connection.
    
    Returns:
        mysql.connector.connection.MySQLConnection: Database connection
    
    Raises:
        Error: If connection fails
    """
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        raise


def initialize_database():
    """
    Initialize the database schema if it doesn't exist.
    Creates necessary tables for conversations, portfolio data, and embeddings.
    """
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        
        # Create conversations table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS conversations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                session_id VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                response TEXT NOT NULL,
                sender ENUM('user', 'bot') NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_session (session_id),
                INDEX idx_timestamp (timestamp)
            )
        """)
        
        # Create portfolio_data table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS portfolio_data (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category VARCHAR(100) NOT NULL,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                metadata JSON,
                last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_category (category)
            )
        """)
        
        # Create embeddings table for semantic search (future enhancement)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS content_embeddings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                content_id INT NOT NULL,
                content_type VARCHAR(50) NOT NULL,
                embedding_vector JSON NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (content_id) REFERENCES portfolio_data(id) ON DELETE CASCADE
            )
        """)
        
        connection.commit()
        print("Database initialized successfully")
        
    except Error as e:
        print(f"Error initializing database: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


def store_conversation(session_id: str, message: str, response: str, sender: str = 'user'):
    """
    Store a conversation message in the database.
    
    Args:
        session_id: Unique session identifier
        message: User message
        response: Bot response
        sender: Message sender ('user' or 'bot')
    """
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        
        query = """
            INSERT INTO conversations (session_id, message, response, sender)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (session_id, message, response, sender))
        connection.commit()
        
    except Error as e:
        print(f"Error storing conversation: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


def get_conversation_history(session_id: str, limit: int = 10) -> List[Dict]:
    """
    Retrieve conversation history for a session.
    
    Args:
        session_id: Unique session identifier
        limit: Maximum number of messages to retrieve
    
    Returns:
        List of conversation messages
    """
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT message, response, sender, timestamp
            FROM conversations
            WHERE session_id = %s
            ORDER BY timestamp DESC
            LIMIT %s
        """
        cursor.execute(query, (session_id, limit))
        history = cursor.fetchall()
        
        return history
        
    except Error as e:
        print(f"Error retrieving conversation history: {e}")
        return []
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


def search_portfolio_content(query: str, category: Optional[str] = None) -> List[Dict]:
    """
    Search portfolio content based on query and optional category.
    
    Args:
        query: Search query
        category: Optional category filter
    
    Returns:
        List of matching portfolio content
    """
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        if category:
            search_query = """
                SELECT id, category, title, content, metadata
                FROM portfolio_data
                WHERE category = %s AND (
                    title LIKE %s OR content LIKE %s
                )
                LIMIT 10
            """
            search_pattern = f"%{query}%"
            cursor.execute(search_query, (category, search_pattern, search_pattern))
        else:
            search_query = """
                SELECT id, category, title, content, metadata
                FROM portfolio_data
                WHERE title LIKE %s OR content LIKE %s
                LIMIT 10
            """
            search_pattern = f"%{query}%"
            cursor.execute(search_query, (search_pattern, search_pattern))
        
        results = cursor.fetchall()
        return results
        
    except Error as e:
        print(f"Error searching portfolio content: {e}")
        return []
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


def generate_ai_response(message: str, context: List[Dict]) -> str:
    """
    Generate an AI-powered response based on message and context.
    
    This is a placeholder for LLM integration. In production, this would:
    - Call OpenAI API or similar LLM service
    - Use vector embeddings for semantic search
    - Incorporate conversation history
    - Apply prompt engineering techniques
    
    Args:
        message: User message
        context: Conversation and portfolio context
    
    Returns:
        Generated response string
    """
    # TODO: Integrate with LLM API (OpenAI, Anthropic, etc.)
    # This is where you'd implement:
    # 1. Prompt engineering for portfolio-specific responses
    # 2. RAG (Retrieval Augmented Generation) with vector database
    # 3. Context management and history injection
    # 4. Response formatting and quality checks
    
    # Placeholder response
    return "Advanced AI response generation coming soon. Currently using rule-based responses from Next.js API."


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })


@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Main chat endpoint for processing chatbot messages.
    
    Request body:
    {
        "message": str,
        "session_id": str (optional),
        "context": dict (optional)
    }
    
    Response:
    {
        "response": str,
        "session_id": str,
        "timestamp": str
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400
        
        message = data['message']
        session_id = data.get('session_id', f"session_{datetime.now().timestamp()}")
        
        # Get conversation history for context
        history = get_conversation_history(session_id, limit=5)
        
        # Search relevant portfolio content
        portfolio_content = search_portfolio_content(message)
        
        # Generate response (would use LLM in production)
        response = generate_ai_response(message, {
            'history': history,
            'portfolio': portfolio_content
        })
        
        # Store conversation
        store_conversation(session_id, message, response, 'user')
        
        return jsonify({
            'response': response,
            'session_id': session_id,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/api/portfolio/sync', methods=['POST'])
def sync_portfolio_data():
    """
    Endpoint to sync portfolio data from the Next.js frontend.
    This keeps the MySQL database updated with latest portfolio content.
    
    Request body:
    {
        "category": str,
        "items": [
            {
                "title": str,
                "content": str,
                "metadata": dict
            }
        ]
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'category' not in data or 'items' not in data:
            return jsonify({'error': 'Invalid request format'}), 400
        
        category = data['category']
        items = data['items']
        
        connection = get_db_connection()
        cursor = connection.cursor()
        
        for item in items:
            query = """
                INSERT INTO portfolio_data (category, title, content, metadata)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    content = VALUES(content),
                    metadata = VALUES(metadata),
                    last_updated = CURRENT_TIMESTAMP
            """
            cursor.execute(query, (
                category,
                item.get('title', ''),
                item.get('content', ''),
                json.dumps(item.get('metadata', {}))
            ))
        
        connection.commit()
        
        return jsonify({
            'success': True,
            'synced_items': len(items),
            'category': category
        })
        
    except Exception as e:
        print(f"Error syncing portfolio data: {e}")
        return jsonify({'error': 'Failed to sync data'}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


if __name__ == '__main__':
    # Initialize database on startup
    try:
        initialize_database()
    except Exception as e:
        print(f"Warning: Could not initialize database: {e}")
        print("Make sure MySQL is running and credentials are correct")
    
    # Run Flask app
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    print(f"Starting Portfolio Chatbot Backend on port {port}")
    print(f"Debug mode: {debug}")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )

