'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface DevModeContextType {
  isDevOpen: boolean;
  isHyperMode: boolean;
  trailStyle: string;
  toggleDevPanel: () => void;
  setHyperMode: (value: boolean) => void;
  setTrailStyle: (value: string) => void;
  triggerEasterEgg: () => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export function DevModeProvider({ children }: { children: React.ReactNode }) {
  const [isDevOpen, setIsDevOpen] = useState(false);
  const [isHyperMode, setIsHyperMode] = useState(false);
  const [trailStyle, setTrailStyle] = useState('standard');
  const [clickCount, setClickCount] = useState(0);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedHyper = localStorage.getItem('hyperMode');
    const savedTrail = localStorage.getItem('trailStyle');
    if (savedHyper) setIsHyperMode(JSON.parse(savedHyper));
    if (savedTrail) setTrailStyle(savedTrail);
  }, []);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('hyperMode', JSON.stringify(isHyperMode));
  }, [isHyperMode]);

  useEffect(() => {
    localStorage.setItem('trailStyle', trailStyle);
  }, [trailStyle]);

  // Reset click count after 2 seconds of inactivity
  useEffect(() => {
    if (clickCount === 0) return;
    
    const timer = setTimeout(() => {
      setClickCount(0);
    }, 2000);

    return () => clearTimeout(timer);
  }, [clickCount]);

  const triggerEasterEgg = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 10) {
      setIsDevOpen(true);
      setClickCount(0);
    }
  };

  const toggleDevPanel = () => setIsDevOpen(!isDevOpen);
  
  return (
    <DevModeContext.Provider value={{ 
      isDevOpen, 
      isHyperMode, 
      trailStyle,
      toggleDevPanel, 
      setHyperMode: setIsHyperMode,
      setTrailStyle,
      triggerEasterEgg 
    }}>
      {children}
    </DevModeContext.Provider>
  );
}

export function useDevMode() {
  const context = useContext(DevModeContext);
  if (context === undefined) {
    throw new Error('useDevMode must be used within a DevModeProvider');
  }
  return context;
}
