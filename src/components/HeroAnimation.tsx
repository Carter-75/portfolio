'use client';

import { useEffect, useRef } from 'react';

// For the text particles
interface TextParticle {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

// For the fire embers
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

const HeroAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width;
    let h = canvas.height;

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
    
    const fireColors = ['#ff4500', '#ff6347', '#ff8c00', '#ffd700', '#ffa500'];
    
    let embers: EmberParticle[] = [];
    let textParticles: TextParticle[] = [];
    let mainTextAlpha = 0;
    let subTextAlpha = 0;

    function createEmber(isInitial = false) {
        embers.push({
            x: Math.random() * w,
            y: isInitial ? Math.random() * h : h + 10,
            vx: Math.random() * 2 - 1,
            vy: -(Math.random() * 3 + 1),
            radius: Math.random() * 2.5 + 1,
            alpha: 1,
            decay: Math.random() * 0.01 + 0.005,
            color: fireColors[Math.floor(Math.random() * fireColors.length)]
        });
    }

    function init() {
      const textParticlesConfig: { text: string; size: number }[] = [
        { text: "Custom Websites", size: Math.max(14, w / 75) },
        { text: "Fiverr Top Seller", size: Math.max(14, w / 75) },
        { text: "Built to Impress", size: Math.max(14, w / 75) },
      ];

      embers = [];
      for (let i = 0; i < 150; i++) { 
        createEmber(true);
      }

      textParticles = textParticlesConfig.map(config => ({
        ...config,
        x: w / 2,
        y: h / 2,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
      }));

      mainTextAlpha = 0;
      subTextAlpha = 0;
    }
    
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      
      ctx.globalCompositeOperation = 'lighter';
      embers.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
            embers.splice(i, 1);
            createEmber();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        const rgb = [parseInt(p.color.slice(1, 3), 16), parseInt(p.color.slice(3, 5), 16), parseInt(p.color.slice(5, 7), 16)];
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.alpha})`;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = 'source-over';

      if (mainTextAlpha < 1) mainTextAlpha += 0.01;
      ctx.globalAlpha = mainTextAlpha;
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      
      const mainFontSize = Math.max(40, w / 20);
      ctx.font = `${mainFontSize}px sans-serif`;
      ctx.fillText('WEB MAGIC', w / 2, h / 2 - 20);
      
      if (mainTextAlpha > 0.5 && subTextAlpha < 1) subTextAlpha += 0.01;
      ctx.globalAlpha = subTextAlpha;
      
      const subFontSize = Math.max(20, w / 40);
      ctx.font = `${subFontSize}px sans-serif`;
      ctx.fillText('BY CARTER', w / 2, h / 2 + 30);
      ctx.globalAlpha = 1;

      textParticles.forEach(p => {
        // Increased friction for smoother slowdown and movement
        p.vx *= 0.995; 
        p.vy *= 0.995;

        // Greatly reduced random variations for a very subtle drift
        p.vx += (Math.random() - 0.5) * 0.005;
        p.vy += (Math.random() - 0.5) * 0.005;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const minSpeed = 0.3;
        const maxSpeed = 1.0;

        if (speed > maxSpeed) {
            p.vx = (p.vx / speed) * maxSpeed;
            p.vy = (p.vy / speed) * maxSpeed;
        } else if (speed < minSpeed && speed > 0) {
            p.vx = (p.vx / speed) * minSpeed;
            p.vy = (p.vy / speed) * minSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x + p.size < 0) p.x = w + p.size;
        if (p.x - p.size > w) p.x = -p.size;
        if (p.y + p.size < 0) p.y = h + p.size;
        if (p.y - p.size > h) p.y = -p.size;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.font = `${p.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(p.text, p.x, p.y);
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
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: '#0d0d0d',
    }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

export default HeroAnimation;