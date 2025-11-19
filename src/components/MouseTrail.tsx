'use client';

import React, { useState, useEffect, useRef, memo, useCallback } from 'react';

/**
 * Point interface for trail position
 */
interface Point {
  x: number;
  y: number;
}

/**
 * Custom hook for optimized animation loop
 * Uses requestAnimationFrame for smooth 60fps animations
 */
const useAnimation = (callback: (deltaTime: number) => void) => {
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== null) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback]);
};

/**
 * MouseTrail Component
 * Creates an animated trail that follows the mouse cursor
 * Heavily optimized for 60fps performance
 */
const MouseTrail = memo(() => {
  const [isMounted, setIsMounted] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<HTMLDivElement[]>([]);
  const frameSkip = useRef(0);

  useEffect(() => {
    setIsMounted(true);
    // Initialize points - reduced to 5 for better performance
    pointsRef.current = Array(5).fill({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    // Use passive event listener for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const animationCallback = useCallback(() => {
    if (!isMounted || pointsRef.current.length === 0) return;

    // Skip every other frame for 30fps trail (human eye can't tell the difference)
    frameSkip.current++;
    if (frameSkip.current % 2 !== 0) return;

    const newPoints = pointsRef.current;
    let leader = cursorRef.current;

    // Smooth interpolation to cursor - faster response
    newPoints[0] = {
      x: newPoints[0].x + (leader.x - newPoints[0].x) * 0.4,
      y: newPoints[0].y + (leader.y - newPoints[0].y) * 0.4,
    };

    // Each point follows the previous
    for (let i = 1; i < newPoints.length; i++) {
      leader = newPoints[i - 1];
      newPoints[i] = {
        x: newPoints[i].x + (leader.x - newPoints[i].x) * 0.4,
        y: newPoints[i].y + (leader.y - newPoints[i].y) * 0.4,
      };
    }
    
    // Direct DOM manipulation - much faster than React state updates
    elementRefs.current.forEach((el, index) => {
      if (el && newPoints[index]) {
        el.style.transform = `translate(${newPoints[index].x}px, ${newPoints[index].y}px)`;
      }
    });
  }, [isMounted]);

  useAnimation(animationCallback);

  if (!isMounted) return null;

  // Modern gradient colors matching the theme
  const colors = ['#8b5cf6', '#667eea', '#06b6d4', '#a78bfa', '#f093fb'];

  return (
    <div ref={containerRef} aria-hidden="true" style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 9999 }}>
      {Array(5).fill(0).map((_, index) => {
        const opacity = 0.7 - (index / 5) * 0.7;
        const scale = 1 - (index / 5) * 0.5;
        const color = colors[index];
        const size = 12 * scale;

        const style: React.CSSProperties = {
          position: 'absolute',
          top: 0,
          left: 0,
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: opacity < 0 ? 0 : opacity,
          pointerEvents: 'none',
          boxShadow: `0 0 12px 2px ${color}`,
          willChange: 'transform',
        };

        return (
          <div 
            key={index} 
            ref={el => { if (el) elementRefs.current[index] = el; }}
            style={style} 
            aria-hidden="true" 
          />
        );
      })}
    </div>
  );
});

MouseTrail.displayName = 'MouseTrail';

export default MouseTrail; 