'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './PortfolioChatbot.module.css';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  className?: string;
}

export default function PortfolioChatbot({ className }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm Carter's AI assistant. I can answer questions about his skills, projects, experience, and more. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call the chatbot API
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I'm sorry, I couldn't process that request. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Fallback responses for common questions when API is unavailable
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getFallbackResponse(inputValue.trim()),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('skill') || lowerQuestion.includes('technology') || lowerQuestion.includes('tech stack')) {
      return "Carter specializes in full-stack development with React, Next.js, TypeScript, JavaScript, Python, Node.js, Express, and MySQL. He also has hands-on experience with AI/LLM integration, prompt engineering, and modern web technologies. Visit the About page to see a detailed breakdown of his technical strengths!";
    }

    if (lowerQuestion.includes('project') || lowerQuestion.includes('work')) {
      return "Carter has built several impressive projects including Delish Healthy Food (recipe app), Animation Studio (AI-powered creative tool), Element Box (physics sandbox game), Lottery Analytics Tool, and DOOMlings Game Companion. Each project showcases different aspects of his engineering expertise. Check out the Projects page for detailed information!";
    }

    if (lowerQuestion.includes('experience') || lowerQuestion.includes('background')) {
      return "Carter is a full-stack software engineer currently pursuing advanced degrees in Computer Programming and Software Engineering at the University of Wisconsin-La Crosse. He combines academic rigor with practical experience in building scalable web applications. Learn more on the About page!";
    }

    if (lowerQuestion.includes('ai') || lowerQuestion.includes('llm') || lowerQuestion.includes('prompt')) {
      return "Carter has hands-on experience integrating AI technologies including Large Language Models (LLMs) into production applications. He specializes in prompt engineering, API integration, and AI-assisted development workflows using tools like Cursor AI. This chatbot is actually one of his AI integration projects!";
    }

    if (lowerQuestion.includes('contact') || lowerQuestion.includes('hire') || lowerQuestion.includes('work together')) {
      return "You can reach Carter through the Contact page on this website. He's available for full-stack development projects, AI integration work, and consulting opportunities!";
    }

    if (lowerQuestion.includes('education') || lowerQuestion.includes('degree') || lowerQuestion.includes('university')) {
      return "Carter is currently pursuing a Master of Science in Software Engineering (expected 2028) and a Bachelor of Science in Computer Programming (expected 2027) from the University of Wisconsin-La Crosse. Visit the About page for more details about his educational background!";
    }

    return "I can help answer questions about Carter's skills, projects, experience, education, and how to get in touch with him. What specifically would you like to know?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What are your technical skills?",
    "Tell me about your projects",
    "What's your experience with AI?",
    "How can I contact you?"
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className={`${styles.chatButton} ${isOpen ? styles.chatButtonOpen : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderContent}>
              <div className={styles.botAvatar}>
                <span>🤖</span>
              </div>
              <div>
                <h3 className={styles.chatTitle}>Portfolio Assistant</h3>
                <p className={styles.chatStatus}>
                  <span className={styles.statusDot}></span>
                  Online
                </p>
              </div>
            </div>
          </div>

          <div className={styles.chatMessages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.sender === 'user' ? styles.userMessage : styles.botMessage
                }`}
              >
                <div className={styles.messageContent}>
                  <p>{message.content}</p>
                  <span className={styles.messageTime}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.message} ${styles.botMessage}`}>
                <div className={styles.messageContent}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className={styles.suggestedQuestions}>
                <p className={styles.suggestedTitle}>Try asking:</p>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className={styles.suggestionButton}
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className={styles.chatInput}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Carter..."
              className={styles.input}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className={styles.sendButton}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

