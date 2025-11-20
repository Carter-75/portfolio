'use client';

import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { useDevMode } from '@/context/DevModeContext';

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
  const { isHyperMode } = useDevMode();
  const cursorRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<HTMLDivElement[]>([]);
  const frameSkip = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<{x: number, y: number, vx: number, vy: number, life: number, color: string}[]>([]);

  const trailLength = 5; // Standard mode length

  useEffect(() => {
    setIsMounted(true);
    // Initialize points
    pointsRef.current = Array(trailLength).fill({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      // No particle spawning here for Hyper Mode anymore, handled in animation loop
    };

    // Use passive event listener for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [trailLength, isHyperMode]);
  
  const animationCallback = useCallback(() => {
    if (!isMounted) return;

    if (isHyperMode) {
      // Canvas Ribbon System for Hyper Mode
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Resize if needed
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      // Fade out effect for smooth trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      // Add current point to history
      particlesRef.current.push({
        x: cursorRef.current.x,
        y: cursorRef.current.y,
        vx: 0, vy: 0, life: 1, color: '#00ffff' // Placeholder
      });

      // Limit history length
      if (particlesRef.current.length > 20) {
        particlesRef.current.shift();
      }

      // Draw Ribbon
      if (particlesRef.current.length > 2) {
        ctx.beginPath();
        ctx.moveTo(particlesRef.current[0].x, particlesRef.current[0].y);
        
        // Quadratic Bezier curve for smoothness
        for (let i = 1; i < particlesRef.current.length - 1; i++) {
          const xc = (particlesRef.current[i].x + particlesRef.current[i + 1].x) / 2;
          const yc = (particlesRef.current[i].y + particlesRef.current[i + 1].y) / 2;
          ctx.quadraticCurveTo(particlesRef.current[i].x, particlesRef.current[i].y, xc, yc);
        }
        
        // Connect to last point
        const last = particlesRef.current[particlesRef.current.length - 1];
        ctx.lineTo(last.x, last.y);

        // Glow effect
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#06b6d4'; // Cyan glow
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Inner core
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      // Hide DOM elements in hyper mode
      if (containerRef.current) containerRef.current.style.display = 'none';
      
    } else {
      // Standard DOM Trail
      if (containerRef.current) containerRef.current.style.display = 'block';
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }

      if (pointsRef.current.length === 0) return;

      // Skip every other frame for 30fps trail (human eye can't tell the difference)
      frameSkip.current++;
      if (frameSkip.current % 2 !== 0) return;

      const newPoints = pointsRef.current;
      let leader = cursorRef.current;

      // Smooth interpolation to cursor - faster response
      const speed = 0.4;
      
      newPoints[0] = {
        x: newPoints[0].x + (leader.x - newPoints[0].x) * speed,
        y: newPoints[0].y + (leader.y - newPoints[0].y) * speed,
      };

      // Each point follows the previous
      for (let i = 1; i < newPoints.length; i++) {
        leader = newPoints[i - 1];
        newPoints[i] = {
          x: newPoints[i].x + (leader.x - newPoints[i].x) * speed,
          y: newPoints[i].y + (leader.y - newPoints[i].y) * speed,
        };
      }
      
      // Direct DOM manipulation - much faster than React state updates
      elementRefs.current.forEach((el, index) => {
        if (el && newPoints[index]) {
          el.style.transform = `translate(${newPoints[index].x}px, ${newPoints[index].y}px)`;
        }
      });
    }
  }, [isMounted, isHyperMode]);

  useAnimation(animationCallback);

  if (!isMounted) return null;

  // Modern gradient colors matching the theme
  const colors = ['#8b5cf6', '#667eea', '#06b6d4', '#a78bfa', '#f093fb'];

  return (
    <>
      <canvas 
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999,
          display: isHyperMode ? 'block' : 'none'
        }}
      />
      <div ref={containerRef} aria-hidden="true" style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 9999 }}>
        {Array(trailLength).fill(0).map((_, index) => {
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
    </>
  );
});

MouseTrail.displayName = 'MouseTrail';

export default MouseTrail; 