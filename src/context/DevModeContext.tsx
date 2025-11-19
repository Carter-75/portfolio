'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface DevModeContextType {
  isDevOpen: boolean;
  isHyperMode: boolean;
  toggleDevPanel: () => void;
  setHyperMode: (value: boolean) => void;
  triggerEasterEgg: () => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export function DevModeProvider({ children }: { children: React.ReactNode }) {
  const [isDevOpen, setIsDevOpen] = useState(false);
  const [isHyperMode, setIsHyperMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);

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
      // Optional: Play a sound or visual cue here
    }
  };

  const toggleDevPanel = () => setIsDevOpen(!isDevOpen);
  const setHyperMode = (value: boolean) => setIsHyperMode(value);

  return (
    <DevModeContext.Provider value={{ 
      isDevOpen, 
      isHyperMode, 
      toggleDevPanel, 
      setHyperMode,
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
