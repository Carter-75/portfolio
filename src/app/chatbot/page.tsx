 'use client';

import type { Metadata } from 'next';

import FadeInWrapper from '@/components/FadeInWrapper';
import Link from 'next/link';
import styles from './ChatbotPage.module.css';

export default function ChatbotPage() {
  return (
    <div className="section">
      <div className="container">
        
        <FadeInWrapper translateY={30}>
          <div className={`box bubble-card bubble-card-radial ${styles.pageBox}`} style={{ textAlign: 'center' }}>
            <h1 className="title is-1 is-spaced gradient-text" style={{ fontWeight: 'bold' }}>
              <span className={styles.heroIcon}>🤖</span>
              Portfolio Chatbot
            </h1>
            <p className={`subtitle is-4 ${styles.subTitle}`}>
              How I Built an AI-Powered Portfolio Assistant
            </p>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={100}>
          <div className={`box bubble-card bubble-card-radial ${styles.pageBox}`}>
            <h2 className="title is-3 has-text-success-dark mb-5">
              <span className={styles.sectionIcon}>💡</span>
              Project Overview
            </h2>
            <div className="content is-medium">
              <p className={`${styles.bodyText} ${styles.bodyTextSpacing}`}>
                The Portfolio Chatbot is a site-wide AI assistant that appears on every page of this portfolio. 
                It&apos;s designed to answer questions about my skills, projects, experience, and technical expertise 
                in real-time, providing visitors with an interactive way to explore my work.
              </p>
              <p className={styles.bodyText}>
                This project showcases my ability to integrate AI technologies into production applications, 
                combining frontend React components with backend API architecture and database systems.
              </p>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={200}>
          <div className={`box bubble-card bubble-card-radial ${styles.pageBox}`}>
            <h2 className="title is-3 has-text-success-dark mb-5">
              <span className={styles.sectionIcon}>🏗️</span>
              System Architecture
            </h2>
            
            <div className={styles.architecturePanel}>
              <div className={styles.architectureText}>
                <div className={styles.architectureBlock}>
                  <div className={styles.architectureNode}>
                    <strong className={styles.architectureTitle}>Frontend (React/Next.js)</strong>
                    <div className={styles.architectureSub}>Chat UI Component</div>
                  </div>
                  <div className={styles.architectureArrow}>↓ HTTP Request</div>
                </div>

                <div className={styles.architectureBlock}>
                  <div className={styles.architectureNode}>
                    <strong className={styles.architectureTitle}>Next.js API Route</strong>
                    <div className={styles.architectureSub}>/api/chatbot</div>
                  </div>
                  <div className={styles.architectureArrow}>↓ Future: HTTP to Python Backend</div>
                </div>

                <div className={styles.architectureBlock}>
                  <div className={styles.architectureNode}>
                    <strong className={styles.architectureAccent}>Python Flask Backend</strong>
                    <div className={styles.architectureSub}>AI Processing & LLM Integration</div>
                  </div>
                  <div className={styles.architectureArrow}>↓ SQL Queries</div>
                </div>

                <div>
                  <div className={styles.architectureNode}>
                    <strong className={styles.architectureAccent}>MySQL Database</strong>
                    <div className={styles.architectureSub}>Conversations & Portfolio Data</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="content">
              <h3 className={styles.listTitle}>Architecture Components:</h3>
              <ul className={styles.listText}>
                <li><strong style={{ color: '#e8edf5' }}>Frontend:</strong> React component with TypeScript, CSS modules for styling, real-time chat interface</li>
                <li><strong style={{ color: '#e8edf5' }}>API Layer:</strong> Next.js API route handling requests, response generation, error handling</li>
                <li><strong style={{ color: '#e8edf5' }}>Backend:</strong> Python Flask server with MySQL integration, conversation storage, content search</li>
                <li><strong style={{ color: '#e8edf5' }}>Database:</strong> MySQL for persistent storage, conversation history, portfolio content synchronization</li>
              </ul>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={300}>
          <div className={`box bubble-card bubble-card-radial ${styles.pageBox}`}>
            <h2 className="title is-3 has-text-success-dark mb-5">
              <span className={styles.sectionIcon}>⚡</span>
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
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>{feature.icon}</div>
                    <h3 className={styles.featureTitle}>
                      {feature.title}
                    </h3>
                    <p className={styles.featureText}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={400}>
          <div className={`box bubble-card bubble-card-radial ${styles.pageBox}`}>
            <h2 className="title is-3 has-text-success-dark mb-5">
              <span className={styles.sectionIcon}>🎯</span>
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
                <div key={index} className={styles.challengeCard}>
                  <div className={styles.challengeHeader}>
                    <span className={styles.challengeIcon}>{item.icon}</span>
                    <h3 className={styles.challengeTitle}>
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
          <div className={`box bubble-card bubble-card-radial ${styles.pageBox}`}>
            <h2 className="title is-3 has-text-success-dark mb-5">
              <span className={styles.sectionIcon}>💻</span>
              Technology Stack
            </h2>

            <div className="columns is-multiline">
              <div className="column is-half">
                <h3 className={styles.listTitle}>Frontend</h3>
                <ul className={styles.listText}>
                  <li><strong>React 19</strong> - UI component framework</li>
                  <li><strong>TypeScript</strong> - Type safety and developer experience</li>
                  <li><strong>Next.js 15</strong> - Framework and API routes</li>
                  <li><strong>CSS Modules</strong> - Scoped styling</li>
                </ul>
              </div>

              <div className="column is-half">
                <h3 className={styles.listTitle}>Backend</h3>
                <ul className={styles.listText}>
                  <li><strong>Python 3.10+</strong> - Backend language</li>
                  <li><strong>Flask</strong> - Web framework</li>
                  <li><strong>MySQL</strong> - Database system</li>
                  <li><strong>Gunicorn</strong> - Production server</li>
                </ul>
              </div>

              <div className="column is-half">
                <h3 className={styles.listTitle}>Infrastructure</h3>
                <ul className={styles.listText}>
                  <li><strong>Vercel</strong> - Frontend hosting</li>
                  <li><strong>Railway/PlanetScale</strong> - Backend & DB</li>
                  <li><strong>Git/GitHub</strong> - Version control</li>
                </ul>
              </div>

              <div className="column is-half">
                <h3 className={styles.listTitle}>Future Additions</h3>
                <ul className={styles.listText}>
                  <li><strong>OpenAI API</strong> - Advanced LLM responses</li>
                  <li><strong>Vector DB</strong> - Semantic search</li>
                  <li><strong>Redis</strong> - Response caching</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={600}>
          <div className={`box bubble-card bubble-card-radial ${styles.pageBox}`}>
            <h2 className="title is-3 has-text-success-dark mb-5">
              <span className={styles.sectionIcon}>📝</span>
              Implementation Highlights
            </h2>

            <div className="content">
              <h3 className={styles.listTitle}>React Component Example</h3>
              <p className={styles.listText} style={{ marginBottom: '0.5rem' }}>Chat message handling with TypeScript:</p>
              <div className={styles.codeBlock}>
                <pre className={styles.codeBlockPre}>{`const handleSendMessage = async () => {
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

              <h3 className={styles.listTitle} style={{ marginTop: '2rem' }}>Python Backend Example</h3>
              <p className={styles.listText} style={{ marginBottom: '0.5rem' }}>Conversation storage with MySQL:</p>
              <div className={styles.codeBlock}>
                <pre className={styles.codeBlockPre}>{`def store_conversation(session_id, message, response):
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
          <div className={`box bubble-card bubble-card-radial ${styles.pageBox}`}>
            <h2 className="title is-3 has-text-success-dark mb-5 has-text-centered">
              <span className={styles.sectionIcon}>🚀</span>
              Try It Yourself!
            </h2>
            
            <div className={styles.sectionCenter}>
              <p className={styles.tryItText}>
                The chatbot is available on every page of this portfolio. Click the floating button in the 
                bottom-right corner to start a conversation and ask questions about my work!
              </p>
              
              <div className={styles.calloutCard}>
                <div className={styles.calloutIcon}>💬</div>
                <p className={styles.calloutTitle}>
                  Look for the chat button →
                </p>
              </div>

              <div className={styles.buttonRow}>
                <Link href="/projects" className="button is-success is-medium">
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

export const generateMetadata = (): Metadata => ({
  title: 'Chatbot | Carter Moyer',
  description:
    'How the portfolio chatbot was built, including architecture, features, and implementation highlights.',
  alternates: {
    canonical: '/chatbot'
  },
  openGraph: {
    title: 'Chatbot | Carter Moyer',
    description:
      'Architecture and engineering details behind the AI-powered portfolio assistant.',
    type: 'article',
    url: '/chatbot'
  }
});

