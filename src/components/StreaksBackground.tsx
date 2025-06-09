'use client';

import React, { useState, useEffect } from 'react';
import './StreaksBackground.css';

const StreaksBackground = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the initial render
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Don't render anything on the server or during the initial client render
    return null;
  }

  const streakCount = 15;
  const streaks = [];
  const themeColors = ['#d32f2f', '#f57c00'];

  for (let i = 0; i < streakCount; i++) {
    const style: React.CSSProperties = {
      top: `${Math.random() * 100}vh`, // Random vertical position
      animationDuration: `${2 + Math.random() * 3}s`, // Random speed
      animationDelay: `${Math.random() * 5}s`, // Random start time
      color: themeColors[Math.floor(Math.random() * themeColors.length)],
    };
    streaks.push(<div key={i} className="streak" style={style}></div>);
  }

  return <div className="streaks-container">{streaks}</div>;
};

export default StreaksBackground; 