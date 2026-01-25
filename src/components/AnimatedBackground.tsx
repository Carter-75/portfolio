'use client';

import { useEffect, useRef, memo } from 'react';
import { useDevMode } from '@/context/DevModeContext';

/**
 * Interface for ember particles (background fire effect)
 */
interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  color: string;
}

/**
 * Interface for network nodes (foreground magical web)
 */
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

/**
 * AnimatedBackground Component
 * Provides an animated canvas background with ember particles and network nodes
 * Optimized for performance with RAF and proper cleanup
 */
const AnimatedBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const isPausedRef = useRef(false);
  const { isHyperMode } = useDevMode();
  
  // Interaction Refs
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const shockwavesRef = useRef<{x: number, y: number, radius: number, maxRadius: number, strength: number, alpha: number}[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hardwareConcurrency = navigator.hardwareConcurrency || 8;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8;
    const isLowPowerDevice = hardwareConcurrency <= 4 || deviceMemory <= 4;
    const performanceScale = prefersReducedMotion ? 0 : isLowPowerDevice ? 0.6 : 1;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e: MouseEvent) => {
      if (isHyperMode) {
        shockwavesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          radius: 1,
          maxRadius: Math.max(w, h) * 0.8,
          strength: 50, // Strong push
          alpha: 1
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);

    // Use debounced resize for better performance
    let resizeTimeout: NodeJS.Timeout;
    resizeObserverRef.current = new ResizeObserver(entries => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        for (const entry of entries) {
          w = canvas.width = entry.contentRect.width;
          h = canvas.height = entry.contentRect.height;
          if (isHyperMode) initHyper(); else init();
        }
      }, 150);
    });

    if (canvas.parentElement) {
      resizeObserverRef.current.observe(canvas.parentElement);
    }
    
    // Modern gradient color palette with purple, blue, cyan, and pink tones
    const magicColors = [
      '#8b5cf6', // Purple
      '#a78bfa', // Light purple
      '#06b6d4', // Cyan
      '#14b8a6', // Teal
      '#f093fb', // Pink
      '#667eea', // Indigo
      '#c4b5fd', // Lavender
      '#22d3ee'  // Bright cyan
    ];
    
    // Standard Mode Variables
    let embers: EmberParticle[] = [];
    const emberCount = Math.max(0, Math.round(80 * performanceScale)); 
    let nodes: Node[] = [];
    const nodeCount = Math.max(0, Math.round(40 * performanceScale)); 
    const connectDistance = w / 8;

    // Hyper Mode Variables
    interface FlowParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      history: {x: number, y: number}[];
      color: string;
      baseColor: string;
      speed: number;
      angle: number;
      hueShift: number;
    }
    let flowParticles: FlowParticle[] = [];
    const flowCount = Math.max(0, Math.round(3000 * performanceScale)); // "Thousands of things"
    const noiseScale = 0.005;

    let reducedMotionRendered = false;

    function createEmber() {
        return {
            x: Math.random() * w,
            y: h + 10,
            vx: Math.random() * 4 - 2,
            vy: -(Math.random() * 3 + 1),
            radius: Math.random() * 3 + 1,
            alpha: 1,
            decay: Math.random() * 0.015 + 0.005,
            color: magicColors[Math.floor(Math.random() * magicColors.length)]
        };
    }

    function createNode() {
        return {
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 2 + 1,
            color: magicColors[Math.floor(Math.random() * magicColors.length)]
        };
    }

    function init() {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(createNode());
      }
      embers = [];
      for (let i = 0; i < emberCount; i++) {
        embers.push(createEmber());
      }
    }

    function initHyper() {
      flowParticles = [];
      for (let i = 0; i < flowCount; i++) {
        const color = magicColors[Math.floor(Math.random() * magicColors.length)];
        flowParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0,
          vy: 0,
          history: [],
          color: color,
          baseColor: color,
          speed: Math.random() * 2 + 1,
          angle: Math.random() * Math.PI * 2,
          hueShift: Math.random() * 360
        });
      }
    }
    
    function draw() {
      if (!ctx) return;

      if (prefersReducedMotion) {
        if (!reducedMotionRendered) {
          const gradient = ctx.createLinearGradient(0, 0, 0, h);
          gradient.addColorStop(0, '#0a0e27');
          gradient.addColorStop(0.5, '#1a1f3a');
          gradient.addColorStop(1, '#0f172a');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, w, h);
          reducedMotionRendered = true;
        }
        return;
      }
      if (isPausedRef.current) {
        animationFrameId.current = null;
        return;
      }

      if (isHyperMode) {
        // Hyper Mode: Quantum Flow Field
        // Fade out effect for trails
        ctx.fillStyle = 'rgba(10, 14, 39, 0.1)'; 
        ctx.fillRect(0, 0, w, h);
        
        const time = Date.now() * 0.0005;

        // Process Shockwaves
        for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
          const sw = shockwavesRef.current[i];
          sw.radius += 15; // Expand speed
          sw.alpha -= 0.02;
          
          if (sw.alpha <= 0) {
            shockwavesRef.current.splice(i, 1);
            continue;
          }

          // Draw shockwave ring
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${sw.alpha * 0.2})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        flowParticles.forEach((p) => {
          // Simple pseudo-noise flow field
          const angle = (Math.cos(p.x * noiseScale) + Math.sin(p.y * noiseScale) + time) * Math.PI;
          
          // Base flow force
          let fx = Math.cos(angle) * 0.1;
          let fy = Math.sin(angle) * 0.1;

          // Mouse Interaction (Gentle Repulsion/Flow)
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 300) {
            const force = (300 - dist) / 300;
            // Swirl around mouse
            fx += (dx / dist) * force * 0.5;
            fy += (dy / dist) * force * 0.5;
          }

          // Shockwave Interaction
          shockwavesRef.current.forEach(sw => {
            const swDx = p.x - sw.x;
            const swDy = p.y - sw.y;
            const swDist = Math.sqrt(swDx * swDx + swDy * swDy);
            
            // If particle is near the shockwave ring
            if (Math.abs(swDist - sw.radius) < 50) {
              const pushForce = (50 - Math.abs(swDist - sw.radius)) / 50;
              const angleToCenter = Math.atan2(swDy, swDx);
              fx += Math.cos(angleToCenter) * pushForce * 2;
              fy += Math.sin(angleToCenter) * pushForce * 2;
            }
          });

          p.vx += fx;
          p.vy += fy;
          
          // Limit speed
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > p.speed) {
            p.vx = (p.vx / speed) * p.speed;
            p.vy = (p.vy / speed) * p.speed;
          }

          p.x += p.vx;
          p.y += p.vy;

          // Wrap around screen
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });

      } else {
        // Standard Animation
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, '#0a0e27');   
        gradient.addColorStop(0.5, '#1a1f3a'); 
        gradient.addColorStop(1, '#0f172a');   
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
        
        embers.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            embers[i] = createEmber();
          }
          
          ctx.globalCompositeOperation = 'lighter';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${parseInt(p.color.slice(1,3),16)},${parseInt(p.color.slice(3,5),16)},${parseInt(p.color.slice(5,7),16)},${p.alpha})`;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 15; 
          ctx.fill();
        });

        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowBlur = 0;

        nodes.forEach((node, idx) => {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x > w) node.x = 0;
          if (node.x < 0) node.x = w;
          if (node.y > h) node.y = 0;
          if (node.y < 0) node.y = h;
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();

          for (let i = idx + 1; i < Math.min(idx + 6, nodes.length); i++) {
              const otherNode = nodes[i];
              const dx = node.x - otherNode.x;
              const dy = node.y - otherNode.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < connectDistance) {
                  ctx.beginPath();
                  ctx.moveTo(node.x, node.y);
                  ctx.lineTo(otherNode.x, otherNode.y);
                  const opacity = 1 - (distance / connectDistance);
                  ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.3})`;
                  ctx.lineWidth = 1;
                  ctx.stroke();
              }
          }
        });
      }

      animationFrameId.current = requestAnimationFrame(draw);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPausedRef.current = true;
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      } else {
        isPausedRef.current = false;
        if (!animationFrameId.current) {
          animationFrameId.current = requestAnimationFrame(draw);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    if (isHyperMode) initHyper(); else init();
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
      }
      if (canvas.parentElement && resizeObserverRef.current) {
          resizeObserverRef.current.unobserve(canvas.parentElement);
      }
    };
  }, [isHyperMode]); // Re-run when mode changes

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none', // Prevent interaction with background
      }}
      aria-hidden="true"
    >
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
        }}
        aria-label="Animated background decoration"
      />
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground; 