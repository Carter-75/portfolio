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
  const { isHyperMode } = useDevMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

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
    const emberCount = 80; 
    let nodes: Node[] = [];
    const nodeCount = 40; 
    const connectDistance = w / 8;

    // Hyper Mode Variables
    interface Star {
      x: number;
      y: number;
      z: number;
      color: string;
    }
    let stars: Star[] = [];
    const starCount = 2000;
    let speed = 0.1;

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
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * w - w / 2,
          y: Math.random() * h - h / 2,
          z: Math.random() * w,
          color: magicColors[Math.floor(Math.random() * magicColors.length)]
        });
      }
    }
    
    function draw() {
      if (!ctx) return;

      if (isHyperMode) {
        // Hyper Mode Animation (Warp Speed)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trails
        ctx.fillRect(0, 0, w, h);
        
        const cx = w / 2;
        const cy = h / 2;
        
        speed = 20; // Fast warp speed

        stars.forEach((star) => {
          star.z -= speed;
          if (star.z <= 0) {
            star.z = w;
            star.x = Math.random() * w - cx;
            star.y = Math.random() * h - cy;
          }

          const x = (star.x / star.z) * w + cx;
          const y = (star.y / star.z) * h + cy;
          const size = (1 - star.z / w) * 4;
          
          if (x >= 0 && x <= w && y >= 0 && y <= h) {
            ctx.beginPath();
            ctx.fillStyle = star.color;
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
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
    
    if (isHyperMode) initHyper(); else init();
    draw();

    return () => {
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