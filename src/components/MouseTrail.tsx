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
  const isPausedRef = useRef(false);

  useEffect(() => {
    const animate = (time: number) => {
      if (isPausedRef.current) {
        requestRef.current = null;
        return;
      }
      if (previousTimeRef.current !== null) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPausedRef.current = true;
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
        }
      } else {
        isPausedRef.current = false;
        previousTimeRef.current = null;
        if (!requestRef.current) {
          requestRef.current = requestAnimationFrame(animate);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
  const { trailStyle } = useDevMode();
  const prefersReducedMotion = useRef(false);
  const performanceScale = useRef(1);
  const cursorRef = useRef({ x: 0, y: 0 });
  const pendingPointerRef = useRef<Point | null>(null);
  const pointerRafRef = useRef<number | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<HTMLDivElement[]>([]);
  const frameSkip = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Generic Particle System
  const particlesRef = useRef<{
    x: number, y: number, 
    vx: number, vy: number, 
    life: number, maxLife: number,
    color: string, size: number,
    char?: string // For matrix
  }[]>([]);

  const trailLength = 5; // Standard mode length

  useEffect(() => {
    setIsMounted(true);
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hardwareConcurrency = navigator.hardwareConcurrency || 8;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8;
    const isLowPowerDevice = hardwareConcurrency <= 4 || deviceMemory <= 4;
    performanceScale.current = prefersReducedMotion.current ? 0 : isLowPowerDevice ? 0.6 : 1;
    pointsRef.current = Array(trailLength).fill({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      pendingPointerRef.current = { x: e.clientX, y: e.clientY };
      if (pointerRafRef.current === null) {
        pointerRafRef.current = requestAnimationFrame(() => {
          if (pendingPointerRef.current) {
            cursorRef.current = pendingPointerRef.current;
            pendingPointerRef.current = null;
          }
          pointerRafRef.current = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (pointerRafRef.current !== null) {
        cancelAnimationFrame(pointerRafRef.current);
        pointerRafRef.current = null;
      }
    };
  }, [trailLength]);
  
  const animationCallback = useCallback(() => {
    if (!isMounted) return;
    if (prefersReducedMotion.current) {
      if (containerRef.current) containerRef.current.style.display = 'none';
      if (canvasRef.current) canvasRef.current.style.display = 'none';
      return;
    }

    // --- CANVAS BASED TRAILS ---
    if (trailStyle !== 'standard' && trailStyle !== 'none') {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      // Hide DOM elements
      if (containerRef.current) containerRef.current.style.display = 'none';
      canvas.style.display = 'block';

      // Clear Canvas
      // We must clear the canvas each frame to prevent trails from smearing indefinitely.
      // This is standard for canvas animations.
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- SPAWN PARTICLES ---
      const spawnRate = Math.max(0, Math.round(2 * performanceScale.current)); // Particles per frame
      for(let i=0; i<spawnRate; i++) {
        const x = cursorRef.current.x;
        const y = cursorRef.current.y;
        
        switch(trailStyle) {
          case 'fire':
            particlesRef.current.push({
              x: x + (Math.random() - 0.5) * 10,
              y: y,
              vx: (Math.random() - 0.5) * 2,
              vy: -Math.random() * 3 - 1,
              life: 1, maxLife: 1,
              color: `hsl(${10 + Math.random() * 40}, 100%, 50%)`,
              size: Math.random() * 4 + 2
            });
            break;
          case 'ice':
            particlesRef.current.push({
              x: x + (Math.random() - 0.5) * 15,
              y: y,
              vx: (Math.random() - 0.5) * 1,
              vy: Math.random() * 3 + 1,
              life: 1, maxLife: 1,
              color: `hsla(200, 100%, 90%, 0.8)`,
              size: Math.random() * 3 + 1
            });
            break;
          case 'matrix':
            if (Math.random() > 0.5) {
              particlesRef.current.push({
                x: x + (Math.random() - 0.5) * 20,
                y: y,
                vx: 0,
                vy: Math.random() * 5 + 2,
                life: 1, maxLife: 1,
                color: '#0f0',
                size: 12,
                char: String.fromCharCode(0x30A0 + Math.random() * 96)
              });
            }
            break;
          case 'rainbow':
            particlesRef.current.push({
              x: x, y: y,
              vx: (Math.random() - 0.5) * 5,
              vy: (Math.random() - 0.5) * 5,
              life: 1, maxLife: 1,
              color: `hsl(${Date.now() % 360}, 100%, 50%)`,
              size: Math.random() * 4 + 2
            });
            break;
          case 'sparkle':
            if (Math.random() > 0.7) {
              particlesRef.current.push({
                x: x + (Math.random() - 0.5) * 20,
                y: y + (Math.random() - 0.5) * 20,
                vx: 0, vy: 0,
                life: 1, maxLife: 1,
                color: '#fff',
                size: Math.random() * 3
              });
            }
            break;
          case 'bubbles':
            if (Math.random() > 0.5) {
              particlesRef.current.push({
                x: x + (Math.random() - 0.5) * 10,
                y: y,
                vx: (Math.random() - 0.5) * 1,
                vy: -Math.random() * 2,
                life: 1, maxLife: 1,
                color: `hsla(${200 + Math.random() * 50}, 80%, 60%, 0.5)`,
                size: Math.random() * 6 + 2
              });
            }
            break;
          case 'pixel':
            particlesRef.current.push({
              x: x, y: y,
              vx: (Math.random() - 0.5) * 5,
              vy: (Math.random() - 0.5) * 5,
              life: 1, maxLife: 1,
              color: `hsl(${Math.random() * 360}, 80%, 60%)`,
              size: 4
            });
            break;
          case 'paint':
             if (Math.random() > 0.8) {
               particlesRef.current.push({
                 x: x, y: y,
                 vx: (Math.random() - 0.5) * 10,
                 vy: (Math.random() - 0.5) * 10,
                 life: 1, maxLife: 1,
                 color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                 size: Math.random() * 10 + 5
               });
             }
             break;
          case 'stardust':
             particlesRef.current.push({
               x: x + (Math.random() - 0.5) * 10,
               y: y + (Math.random() - 0.5) * 10,
               vx: (Math.random() - 0.5) * 0.5,
               vy: (Math.random() - 0.5) * 0.5,
               life: 1, maxLife: 1,
               color: '#ffd700',
               size: Math.random() * 2
             });
             break;
          case 'ghost':
             if (frameSkip.current % 3 === 0) { // Spawn less frequently
               particlesRef.current.push({
                 x: x, y: y,
                 vx: 0, vy: 0,
                 life: 1, maxLife: 1,
                 color: 'rgba(255, 255, 255, 0.2)',
                 size: 10 // Radius
               });
             }
             break;
          case 'shockwave':
             if (Math.random() > 0.9) { // Occasional pulses
               particlesRef.current.push({
                 x: x, y: y,
                 vx: 0, vy: 0,
                 life: 1, maxLife: 1,
                 color: `hsla(${Math.random() * 360}, 100%, 50%, 0.5)`,
                 size: 1 // Starts small, expands
               });
             }
             break;
          case 'hyper':
             // Ribbon logic handled separately below
             particlesRef.current.push({
                x: x, y: y, vx: 0, vy: 0, life: 1, maxLife: 1, color: '#00ffff', size: 0
             });
             if (particlesRef.current.length > 20) particlesRef.current.shift();
             break;
          case 'electric':
             // Electric logic
             particlesRef.current.push({
                x: x, y: y, vx: 0, vy: 0, life: 1, maxLife: 1, color: '#00ffff', size: 0
             });
             if (particlesRef.current.length > 10) particlesRef.current.shift();
             break;
        }
      }

      // --- UPDATE & DRAW ---
      
      // Special Case: Hyper Ribbon
      if (trailStyle === 'hyper' && particlesRef.current.length > 2) {
         ctx.beginPath();
         ctx.moveTo(particlesRef.current[0].x, particlesRef.current[0].y);
         for (let i = 1; i < particlesRef.current.length - 1; i++) {
           const xc = (particlesRef.current[i].x + particlesRef.current[i + 1].x) / 2;
           const yc = (particlesRef.current[i].y + particlesRef.current[i + 1].y) / 2;
           ctx.quadraticCurveTo(particlesRef.current[i].x, particlesRef.current[i].y, xc, yc);
         }
         const last = particlesRef.current[particlesRef.current.length - 1];
         ctx.lineTo(last.x, last.y);
         ctx.lineCap = 'round';
         ctx.lineJoin = 'round';
         ctx.shadowBlur = 15;
         ctx.shadowColor = '#06b6d4';
         ctx.strokeStyle = '#22d3ee';
         ctx.lineWidth = 4;
         ctx.stroke();
         ctx.shadowBlur = 0;
         ctx.strokeStyle = '#ffffff';
         ctx.lineWidth = 2;
         ctx.stroke();
         return; // Skip standard particle loop
      }

      // Special Case: Electric
      if (trailStyle === 'electric' && particlesRef.current.length > 2) {
         ctx.beginPath();
         ctx.moveTo(particlesRef.current[0].x, particlesRef.current[0].y);
         for (let i = 1; i < particlesRef.current.length; i++) {
            const p = particlesRef.current[i];
            const jitter = 5;
            ctx.lineTo(p.x + (Math.random() - 0.5) * jitter, p.y + (Math.random() - 0.5) * jitter);
         }
         ctx.shadowBlur = 10;
         ctx.shadowColor = '#f0f';
         ctx.strokeStyle = '#f0f';
         ctx.lineWidth = 2;
         ctx.stroke();
         return;
      }

      // Special Case: Shockwave
      if (trailStyle === 'shockwave') {
         for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.size += 2; // Expand
            p.life -= 0.02;
            if (p.life <= 0) {
               particlesRef.current.splice(i, 1);
               continue;
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 2;
            ctx.globalAlpha = p.life;
            ctx.stroke();
         }
         ctx.globalAlpha = 1;
         return;
      }

      // Special Case: Ghost
      if (trailStyle === 'ghost') {
         for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.life -= 0.03;
            if (p.life <= 0) {
               particlesRef.current.splice(i, 1);
               continue;
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 200, 255, ${p.life * 0.3})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(255, 255, 255, ${p.life * 0.5})`;
            ctx.stroke();
         }
         return;
      }

      // Standard Particle Loop
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        
        if (trailStyle === 'matrix' && p.char) {
           ctx.font = '12px monospace';
           ctx.fillText(p.char, p.x, p.y);
        } else if (trailStyle === 'pixel') {
           ctx.fillRect(p.x, p.y, p.size, p.size);
        } else if (trailStyle === 'bubbles') {
           ctx.beginPath();
           ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
           ctx.strokeStyle = p.color;
           ctx.lineWidth = 1;
           ctx.stroke();
        } else {
           ctx.beginPath();
           ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
           ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

    } else if (trailStyle === 'standard') {
      // --- STANDARD DOM TRAIL ---
      if (containerRef.current) containerRef.current.style.display = 'block';
      if (canvasRef.current) canvasRef.current.style.display = 'none';

      if (pointsRef.current.length === 0) return;

      frameSkip.current++;
      if (frameSkip.current % 2 !== 0) return;

      const newPoints = pointsRef.current;
      let leader = cursorRef.current;
      const speed = 0.4;
      
      newPoints[0] = {
        x: newPoints[0].x + (leader.x - newPoints[0].x) * speed,
        y: newPoints[0].y + (leader.y - newPoints[0].y) * speed,
      };

      for (let i = 1; i < newPoints.length; i++) {
        leader = newPoints[i - 1];
        newPoints[i] = {
          x: newPoints[i].x + (leader.x - newPoints[i].x) * speed,
          y: newPoints[i].y + (leader.y - newPoints[i].y) * speed,
        };
      }
      
      elementRefs.current.forEach((el, index) => {
        if (el && newPoints[index]) {
          el.style.transform = `translate(${newPoints[index].x}px, ${newPoints[index].y}px)`;
        }
      });
    } else {
       // None
       if (containerRef.current) containerRef.current.style.display = 'none';
       if (canvasRef.current) canvasRef.current.style.display = 'none';
    }
  }, [isMounted, trailStyle]);

  useAnimation(animationCallback);

  if (!isMounted) return null;

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
          display: 'none'
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