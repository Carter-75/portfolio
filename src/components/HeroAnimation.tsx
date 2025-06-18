'use client';

import React, { useRef, useEffect, useCallback } from 'react';

const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const createParticle = useCallback((canvas: HTMLCanvasElement) => {
    const texts = ["Top Seller", "Web Wizard", "Code Conjurer"];
    const text = texts[Math.floor(Math.random() * texts.length)];
    const fontSize = Math.random() * 15 + 10; // 10px to 25px
    return {
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      text,
      font: `${fontSize}px "Helvetica Neue", sans-serif`,
      color: `rgba(255, 100, 100, ${Math.random() * 0.5 + 0.2})`,
      size: fontSize,
      friction: 0.98,
      minSpeed: 0.2 + Math.random() * 0.3,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: ReturnType<typeof createParticle>[] = [];

    const resizeCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const addParticles = (count: number) => {
        for (let i = 0; i < count; i++) {
            particles.push(createParticle(canvas));
        }
    };
    
    addParticles(15);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / (2 * (window.devicePixelRatio || 1));
      const centerY = canvas.height / (2 * (window.devicePixelRatio || 1));

      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      
      const mainFontSize = Math.min(window.innerWidth / 10, 80);
      ctx.font = `bold ${mainFontSize}px "Helvetica Neue", sans-serif`;
      ctx.fillText('WEB MAGIC', centerX, centerY - mainFontSize * 0.2);
      
      const subFontSize = mainFontSize * 0.4;
      ctx.font = `bold ${subFontSize}px "Helvetica Neue", sans-serif`;
      ctx.fillText('BY CARTER', centerX, centerY + subFontSize);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        p.vx *= p.friction;
        p.vy *= p.friction;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < p.minSpeed) {
            p.vx = (p.vx / speed) * p.minSpeed;
            p.vy = (p.vy / speed) * p.minSpeed;
        }

        const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

        if (p.x > canvasWidth + p.size) p.x = -p.size;
        else if (p.x < -p.size) p.x = canvasWidth + p.size;
        if (p.y > canvasHeight + p.size) p.y = -p.size;
        else if (p.y < -p.size) p.y = canvasHeight + p.size;

        ctx.font = p.font;
        ctx.fillStyle = p.color;
        ctx.fillText(p.text, p.x, p.y);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [createParticle]);

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 60px)' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
    </div>
  );
};

export default HeroAnimation;