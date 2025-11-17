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

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    // Use passive event listener for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const animationCallback = useCallback(() => {
    if (!isMounted) return;

    setPoints(prevPoints => {
      const newPoints = [...prevPoints];
      let leader = cursorRef.current;

      if (newPoints.length === 0) {
        // Initialize points array if empty
        return Array(10).fill(leader);
      }

      newPoints[0] = {
        x: newPoints[0].x + (leader.x - newPoints[0].x) * 0.25,
        y: newPoints[0].y + (leader.y - newPoints[0].y) * 0.25,
      };

      for (let i = 1; i < newPoints.length; i++) {
        leader = newPoints[i - 1];
        newPoints[i] = {
            x: newPoints[i].x + (leader.x - newPoints[i].x) * 0.25,
            y: newPoints[i].y + (leader.y - newPoints[i].y) * 0.25,
        };
      }
      
      return newPoints;
    });
  }, [isMounted]);

  useAnimation(animationCallback);

  if (!isMounted) {
    return null;
  }

  return (
    <div aria-hidden="true" style={{ pointerEvents: 'none' }}>
      {points.map((point, index) => {
        const opacity = 0.8 - index / points.length;
        const scale = 1 - index / points.length;
        const color = index % 2 === 0 ? '#d32f2f' : '#f57c00';

        const style: React.CSSProperties = {
          position: 'fixed',
          top: `${point.y}px`,
          left: `${point.x}px`,
          width: `${15 * scale}px`,
          height: `${15 * scale}px`,
          backgroundColor: color,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: opacity < 0 ? 0 : opacity,
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: `0 0 8px 2px ${color}`,
          willChange: 'transform, opacity',
        };

        return <div key={index} style={style} aria-hidden="true" />;
      })}
    </div>
  );
});

MouseTrail.displayName = 'MouseTrail';

export default MouseTrail; 