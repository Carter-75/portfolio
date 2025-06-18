'use client';

import { useEffect, useRef } from 'react';

// For the background fire
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

// For the foreground magical web
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        w = canvas.width = entry.contentRect.width;
        h = canvas.height = entry.contentRect.height;
        init();
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    
    const magicColors = ['#ff4500', '#ff6347', '#ff8c00', '#ffd700', '#ffa500', '#ffcc00', '#FFFFE0'];
    
    let embers: EmberParticle[] = [];
    const emberCount = 200;

    let nodes: Node[] = [];
    const nodeCount = 80;
    const connectDistance = w / 9;

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
    
    function draw() {
      if (!ctx) return;

      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#1a1a1a'); 
      gradient.addColorStop(1, '#000000');
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

      nodes.forEach(node => {
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

        for (let i = 0; i < nodes.length; i++) {
            const otherNode = nodes[i];
            const distance = Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2));

            if (distance < connectDistance) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(otherNode.x, otherNode.y);
                const opacity = 1 - (distance / connectDistance);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.35})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
      });

      animationFrameId.current = requestAnimationFrame(draw);
    }
    
    init();
    draw();

    return () => {
      if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
      }
      if (canvas.parentElement) {
          resizeObserver.unobserve(canvas.parentElement);
      }
    }
  }, []);

  return (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
    }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
        }}
      />
    </div>
  );
};

export default AnimatedBackground; 