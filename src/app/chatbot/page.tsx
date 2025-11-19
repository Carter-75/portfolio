'use client';

import FadeInWrapper from '@/components/FadeInWrapper';
import Link from 'next/link';

export default function ChatbotPage() {
  const bubbleStyle: React.CSSProperties = {
    background: 'radial-gradient(circle, rgba(26, 31, 58, 0.8) 0%, rgba(10, 14, 39, 0.9) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
    padding: '3rem',
    marginBottom: '2rem'
  };

  const codeBlockStyle: React.CSSProperties = {
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '8px',
    padding: '1rem',
    marginTop: '1rem',
    overflowX: 'auto',
    fontFamily: 'monospace',
    fontSize: '0.85rem',
    color: '#06b6d4'
  };

  return (
    <div className="section">
      <div className="container">
        
        <FadeInWrapper translateY={30}>
          <div className="box" style={{...bubbleStyle, textAlign: 'center'}}>
            <h1 className="title is-1 is-spaced" className="gradient-text" style={{fontWeight: 'bold'}}>
              <span style={{ fontSize: '3rem', marginRight: '1rem' }}>🤖</span>
              Portfolio Chatbot
            </h1>
            <p className="subtitle is-4" style={{color: '#94a3b8'}}>
              How I Built an AI-Powered Portfolio Assistant
            </p>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={100}>
          <div className="box" style={bubbleStyle}>
            <h2 className="title is-3 has-text-success-dark mb-5">
              <span style={{ marginRight: '0.5rem' }}>💡</span>
              Project Overview
            </h2>
            <div className="content is-medium">
              <p style={{color: '#e8edf5', lineHeight: '1.7', marginBottom: '1.5rem'}}>
                The Portfolio Chatbot is a site-wide AI assistant that appears on every page of this portfolio. 
                It&apos;s designed to answer questions about my skills, projects, experience, and technical expertise 
                in real-time, providing visitors with an interactive way to explore my work.
              </p>
              <p style={{color: '#e8edf5', lineHeight: '1.7'}}>
                This project showcases my ability to integrate AI technologies into production applications, 
                combining frontend React components with backend API architecture and database systems.
              </p>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={200}>
          <div className="box" style={bubbleStyle}>
            <h2 className="title is-3 has-text-success-dark mb-5">
              <span style={{ marginRight: '0.5rem' }}>🏗️</span>
              System Architecture
            </h2>
            
            <div style={{ 
              background: 'rgba(139, 92, 246, 0.05)', 
              padding: '2rem', 
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              marginBottom: '2rem'
            }}>
              <div style={{ textAlign: 'center', color: '#e8edf5', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '8px', marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#06b6d4' }}>Frontend (React/Next.js)</strong>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.3rem' }}>Chat UI Component</div>
                  </div>
                  <div style={{ color: '#8b5cf6', fontSize: '1.5rem' }}>↓ HTTP Request</div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '8px', marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#06b6d4' }}>Next.js API Route</strong>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.3rem' }}>/api/chatbot</div>
                  </div>
                  <div style={{ color: '#8b5cf6', fontSize: '1.5rem' }}>↓ Future: HTTP to Python Backend</div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '8px', marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#8b5cf6' }}>Python Flask Backend</strong>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.3rem' }}>AI Processing & LLM Integration</div>
                  </div>
                  <div style={{ color: '#8b5cf6', fontSize: '1.5rem' }}>↓ SQL Queries</div>
                </div>

                <div>
                  <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '8px' }}>
                    <strong style={{ color: '#8b5cf6' }}>MySQL Database</strong>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.3rem' }}>Conversations & Portfolio Data</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="content">
              <h3 style={{ color: '#06b6d4', marginBottom: '1rem' }}>Architecture Components:</h3>
              <ul style={{ color: '#d0d0d0', lineHeight: '1.8' }}>
                <li><strong style={{ color: '#e8edf5' }}>Frontend:</strong> React component with TypeScript, CSS modules for styling, real-time chat interface</li>
                <li><strong style={{ color: '#e8edf5' }}>API Layer:</strong> Next.js API route handling requests, response generation, error handling</li>
                <li><strong style={{ color: '#e8edf5' }}>Backend:</strong> Python Flask server with MySQL integration, conversation storage, content search</li>
                <li><strong style={{ color: '#e8edf5' }}>Database:</strong> MySQL for persistent storage, conversation history, portfolio content synchronization</li>
              </ul>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={300}>
          <div className="box" style={bubbleStyle}>
            <h2 className="title is-3 has-text-success-dark mb-5">
              <span style={{ marginRight: '0.5rem' }}>⚡</span>
              Key Features
            </h2>
            
            <div className="columns is-multiline is-variable is-4">
              {[
                {
                  icon: '🎯',
                  title: 'Context-Aware Responses',
                  description: 'Understands portfolio content and provides accurate, relevant answers about skills, projects, and experience.'
                },
                {
                  icon: '💬',
                  title: 'Conversation History',
                  description: 'Tracks conversations in MySQL database for improved context and personalized follow-up responses.'
                },
                {
                  icon: '🔄',
                  title: 'Dynamic Content Sync',
                  description: 'Automatically stays updated with portfolio changes, ensuring responses reflect current information.'
                },
                {
                  icon: '⚡',
                  title: 'Real-Time Interaction',
                  description: 'Instant responses with smooth animations, typing indicators, and suggested questions for better UX.'
                },
                {
                  icon: '🎨',
                  title: 'Beautiful UI',
                  description: 'Glassmorphism design that matches portfolio aesthetic, fully responsive across all devices.'
                },
                {
                  icon: '🔐',
                  title: 'Production Ready',
                  description: 'Built with security best practices, error handling, and optimized for deployment.'
                }
              ].map((feature, index) => (
                <div key={index} className="column is-half">
                  <div style={{
                    padding: '1.5rem',
                    background: 'rgba(139, 92, 246, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    height: '100%'
                  }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                    <h3 style={{ color: '#8b5cf6', fontWeight: '700', marginBottom: '0.8rem' }}>
                      {feature.title}
                    </h3>
                    <p style={{ color: '#d0d0d0', lineHeight: '1.6', fontSize: '0.95rem' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={400}>
          <div className="box" style={bubbleStyle}>
            <h2 className="title is-3 has-text-success-dark mb-5">
              <span style={{ marginRight: '0.5rem' }}>🎯</span>
              Engineering Challenges & Solutions
            </h2>

            <div className="content">
              {[
                {
                  challenge: 'Real-Time UI State Management',
                  problem: 'Managing complex chat state including messages, loading indicators, scroll behavior, and user input while maintaining smooth performance.',
                  solution: 'Implemented React hooks (useState, useEffect, useRef) with proper memoization. Used refs for scroll management and input focus, ensuring 60fps animations and responsive feel.',
                  icon: '⚛️'
                },
                {
                  challenge: 'Context-Aware Response Generation',
                  problem: 'Creating intelligent responses that understand portfolio context without constant LLM API calls, balancing accuracy with cost and latency.',
                  solution: 'Built a hybrid approach: rule-based system for common queries with portfolio knowledge base, prepared for future LLM integration. Implemented smart keyword matching and response templating.',
                  icon: '🧠'
                },
                {
                  challenge: 'Database Design & Scalability',
                  problem: 'Designing a MySQL schema that supports conversation history, portfolio data sync, and future vector embeddings while maintaining query performance.',
                  solution: 'Created normalized schema with proper indexes, JSON metadata fields for flexibility, and foreign key relationships. Designed for horizontal scaling with session-based partitioning strategy.',
                  icon: '🗄️'
                },
                {
                  challenge: 'Cross-Origin Communication',
                  problem: 'Connecting Next.js frontend with separate Python backend while handling CORS, session management, and error scenarios gracefully.',
                  solution: 'Implemented proper CORS configuration, session ID generation, fallback responses for API failures, and comprehensive error handling with user-friendly messages.',
                  icon: '🌐'
                }
              ].map((item, index) => (
                <div key={index} style={{
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: 'rgba(139, 92, 246, 0.08)',
                  borderRadius: '12px',
                  border: '1px solid rgba(139, 92, 246, 0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2rem', marginRight: '1rem' }}>{item.icon}</span>
                    <h3 style={{ color: '#8b5cf6', fontWeight: '700', fontSize: '1.2rem', margin: 0 }}>
                      {item.challenge}
                    </h3>
                  </div>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: '#e8edf5' }}>Challenge:</strong>
                    <p style={{ color: '#d0d0d0', marginTop: '0.5rem', lineHeight: '1.6' }}>
                      {item.problem}
                    </p>
                  </div>
                  
                  <div>
                    <strong style={{ color: '#06b6d4' }}>Solution:</strong>
                    <p style={{ color: '#d0d0d0', marginTop: '0.5rem', lineHeight: '1.6' }}>
                      {item.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={500}>
          <div className="box" style={bubbleStyle}>
            <h2 className="title is-3 has-text-success-dark mb-5">
              <span style={{ marginRight: '0.5rem' }}>💻</span>
              Technology Stack
            </h2>

            <div className="columns is-multiline">
              <div className="column is-half">
                <h3 style={{ color: '#06b6d4', marginBottom: '1rem' }}>Frontend</h3>
                <ul style={{ color: '#d0d0d0', lineHeight: '1.8' }}>
                  <li><strong>React 19</strong> - UI component framework</li>
                  <li><strong>TypeScript</strong> - Type safety and developer experience</li>
                  <li><strong>Next.js 15</strong> - Framework and API routes</li>
                  <li><strong>CSS Modules</strong> - Scoped styling</li>
                </ul>
              </div>

              <div className="column is-half">
                <h3 style={{ color: '#06b6d4', marginBottom: '1rem' }}>Backend</h3>
                <ul style={{ color: '#d0d0d0', lineHeight: '1.8' }}>
                  <li><strong>Python 3.10+</strong> - Backend language</li>
                  <li><strong>Flask</strong> - Web framework</li>
                  <li><strong>MySQL</strong> - Database system</li>
                  <li><strong>Gunicorn</strong> - Production server</li>
                </ul>
              </div>

              <div className="column is-half">
                <h3 style={{ color: '#06b6d4', marginBottom: '1rem' }}>Infrastructure</h3>
                <ul style={{ color: '#d0d0d0', lineHeight: '1.8' }}>
                  <li><strong>Vercel</strong> - Frontend hosting</li>
                  <li><strong>Railway/PlanetScale</strong> - Backend & DB</li>
                  <li><strong>Git/GitHub</strong> - Version control</li>
                </ul>
              </div>

              <div className="column is-half">
                <h3 style={{ color: '#06b6d4', marginBottom: '1rem' }}>Future Additions</h3>
                <ul style={{ color: '#d0d0d0', lineHeight: '1.8' }}>
                  <li><strong>OpenAI API</strong> - Advanced LLM responses</li>
                  <li><strong>Vector DB</strong> - Semantic search</li>
                  <li><strong>Redis</strong> - Response caching</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={600}>
          <div className="box" style={bubbleStyle}>
            <h2 className="title is-3 has-text-success-dark mb-5">
              <span style={{ marginRight: '0.5rem' }}>📝</span>
              Implementation Highlights
            </h2>

            <div className="content">
              <h3 style={{ color: '#06b6d4', marginBottom: '1rem' }}>React Component Example</h3>
              <p style={{ color: '#d0d0d0', marginBottom: '0.5rem' }}>Chat message handling with TypeScript:</p>
              <div style={codeBlockStyle}>
                <pre style={{ margin: 0 }}>{`const handleSendMessage = async () => {
  const userMessage: Message = {
    id: Date.now().toString(),
    content: inputValue.trim(),
    sender: 'user',
    timestamp: new Date()
  };
  
  setMessages(prev => [...prev, userMessage]);
  setIsLoading(true);
  
  const response = await fetch('/api/chatbot', {
    method: 'POST',
    body: JSON.stringify({ message: inputValue })
  });
  
  const data = await response.json();
  // Handle response...
};`}</pre>
              </div>

              <h3 style={{ color: '#06b6d4', marginTop: '2rem', marginBottom: '1rem' }}>Python Backend Example</h3>
              <p style={{ color: '#d0d0d0', marginBottom: '0.5rem' }}>Conversation storage with MySQL:</p>
              <div style={codeBlockStyle}>
                <pre style={{ margin: 0 }}>{`def store_conversation(session_id, message, response):
    connection = get_db_connection()
    cursor = connection.cursor()
    
    query = """
        INSERT INTO conversations 
        (session_id, message, response, sender)
        VALUES (%s, %s, %s, %s)
    """
    cursor.execute(query, (session_id, message, response, 'user'))
    connection.commit()`}</pre>
              </div>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={700}>
          <div className="box" style={bubbleStyle}>
            <h2 className="title is-3 has-text-success-dark mb-5 has-text-centered">
              <span style={{ marginRight: '0.5rem' }}>🚀</span>
              Try It Yourself!
            </h2>
            
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#e8edf5', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.7' }}>
                The chatbot is available on every page of this portfolio. Click the floating button in the 
                bottom-right corner to start a conversation and ask questions about my work!
              </p>
              
              <div style={{ 
                display: 'inline-block',
                padding: '1.5rem 2rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '12px',
                border: '2px solid rgba(139, 92, 246, 0.3)',
                marginBottom: '2rem'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                <p style={{ color: '#06b6d4', fontWeight: '600', fontSize: '1.1rem' }}>
                  Look for the chat button →
                </p>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <Link href="/projects" className="button is-success is-medium" style={{ marginRight: '1rem' }}>
                  <span>View All Projects</span>
                </Link>
                <Link href="/about" className="button is-outlined is-success is-medium">
                  <span>Learn More About Me</span>
                </Link>
              </div>
            </div>
          </div>
        </FadeInWrapper>

      </div>
    </div>
  );
}

