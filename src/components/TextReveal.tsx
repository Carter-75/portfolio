'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  gradient?: boolean;
  delay?: number;
}

/**
 * TextReveal Component
 * Animates text reveal character by character with gradient effect
 */
const TextReveal: React.FC<TextRevealProps> = ({ 
  text, 
  className = '', 
  gradient = false,
  delay = 0 
}) => {
  const [revealedChars, setRevealedChars] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (revealedChars < text.length) {
        setRevealedChars(prev => prev + 1);
      }
    }, delay + revealedChars * 50);

    return () => clearTimeout(timeout);
  }, [revealedChars, text.length, delay]);

  const gradientStyle: React.CSSProperties = gradient ? {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } : {};

  return (
    <span ref={textRef} className={className} style={gradientStyle}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{
            opacity: index < revealedChars ? 1 : 0,
            transition: 'opacity 0.2s ease-out',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default TextReveal;

