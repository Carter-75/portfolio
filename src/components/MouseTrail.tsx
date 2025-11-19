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
 * Optimized with memo and useCallback for performance
 */
const MouseTrail = memo(() => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    setIsMounted(true);
    // Initialize points
    pointsRef.current = Array(8).fill({ x: 0, y: 0 });
    setPoints(pointsRef.current);

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    // Use passive event listener for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const animationCallback = useCallback(() => {
    if (!isMounted || pointsRef.current.length === 0) return;

    // Update points in place for better performance
    const newPoints = [...pointsRef.current];
    let leader = cursorRef.current;

    // Smooth interpolation to cursor
    newPoints[0] = {
      x: newPoints[0].x + (leader.x - newPoints[0].x) * 0.35,
      y: newPoints[0].y + (leader.y - newPoints[0].y) * 0.35,
    };

    // Each point follows the previous
    for (let i = 1; i < newPoints.length; i++) {
      leader = newPoints[i - 1];
      newPoints[i] = {
        x: newPoints[i].x + (leader.x - newPoints[i].x) * 0.35,
        y: newPoints[i].y + (leader.y - newPoints[i].y) * 0.35,
      };
    }
    
    pointsRef.current = newPoints;
    setPoints(newPoints);
  }, [isMounted]);

  useAnimation(animationCallback);

  if (!isMounted) {
    return null;
  }

  return (
    <div aria-hidden="true" style={{ pointerEvents: 'none' }}>
      {points.map((point, index) => {
        const opacity = 0.7 - (index / points.length) * 0.7;
        const scale = 1 - (index / points.length) * 0.6;
        // Modern gradient colors matching the theme
        const colors = ['#8b5cf6', '#667eea', '#06b6d4', '#a78bfa'];
        const color = colors[index % colors.length];
        const size = 14 * scale;

        const style: React.CSSProperties = {
          position: 'fixed',
          top: point.y,
          left: point.x,
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: opacity < 0 ? 0 : opacity,
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: `0 0 15px 2px ${color}`,
          willChange: 'transform',
        };

        return <div key={index} style={style} aria-hidden="true" />;
      })}
    </div>
  );
});

MouseTrail.displayName = 'MouseTrail';

export default MouseTrail; 