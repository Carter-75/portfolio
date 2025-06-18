'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import FadeInWrapper from './FadeInWrapper';

const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const createParticle = useCallback((canvas: HTMLCanvasElement) => {
    const texts = ["Top Seller", "Web Wizard", "Code Conjurer"];
    const text = texts[Math.floor(Math.random() * texts.length)];
    const fontSize = Math.random() * 15 + 10;
    const dpr = window.devicePixelRatio || 1;
    return {
      x: (canvas.width / dpr) / 2,
      y: (canvas.height / dpr) / 2,
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
      const dpr = window.devicePixelRatio || 1;
      const canvasWidth = canvas.width / dpr;
      const canvasHeight = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
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

  const showcaseItem = {
    title: "My GitHub Journey",
    description: "I love to explore new ideas and build fun, interactive things. My GitHub is a playground where I experiment with code and bring creative concepts to life. Many of these explorations become the projects you see on this site. Feel free to dive in and see what I'm currently working on!",
    linkUrl: "https://github.com/Carter-75",
    linkText: "Explore on GitHub"
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflowY: 'auto', 
      scrollSnapType: 'y mandatory',
    }}>
      <div style={{
        position: 'relative',
        zIndex: 1,
        color: '#f0f0f0',
      }}>

        {/* Main Title Section */}
        <section style={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center',
          scrollSnapAlign: 'start',
          position: 'relative'
        }}>
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />
            <h1 className="title is-1" style={{color: 'white', fontSize: 'clamp(2.5rem, 8vw, 6rem)', position: 'relative', zIndex: 2}}>WEB MAGIC</h1>
            <h2 className="subtitle is-3" style={{color: '#a0a0a0', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', position: 'relative', zIndex: 2}}>BY CARTER</h2>
        </section>

        {/* Welcome Bubble Section */}
        <section style={{ 
          minHeight: '50vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '2rem',
          scrollSnapAlign: 'start'
        }}>
          <FadeInWrapper>
            <div className="box" style={{ 
                background: 'radial-gradient(circle, rgba(44, 44, 44, 0.8) 0%, rgba(26, 26, 26, 0.9) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                maxWidth: '800px',
                textAlign: 'center'
            }}>
                <h1 className="title is-2" style={{color: '#f0f0f0', marginBottom: '1.5rem'}}>Welcome!</h1>
                <p className="subtitle is-5" style={{color: '#a0a0a0'}}>
                  This is my digital space where I showcase my passion for design and development. Here you&apos;ll find a collection of my projects, from fun experiments to more complex applications.
                </p>
                <div style={{ margin: '2em 0 1em 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1em' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.15em', marginBottom: '0.5em' }}>Want to see more or hire me?</span>
                  <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <a href="https://www.fiverr.com/s/akweW1p" target="_blank" rel="noopener noreferrer" className="button is-success is-outlined" style={{ fontWeight: 600, fontSize: '1em' }}>Visit my Fiverr Profile</a>
                    <a href="https://x.com/LPhoenix75" target="_blank" rel="noopener noreferrer" className="button is-info is-outlined" style={{ fontWeight: 600, fontSize: '1em' }}>Visit my X Profile</a>
                  </div>
                </div>
                <div style={{ marginTop: '1.5em', fontSize: '1.05em' }}>
                  To check out my projects, just go to the <b>Projects</b> tab in the navigation above!
                </div>
            </div>
          </FadeInWrapper>
        </section>

        {/* GitHub Bubble Section */}
        <section style={{ 
          minHeight: '50vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '2rem',
          scrollSnapAlign: 'start'
        }}>
           <FadeInWrapper translateY={30}>
             <div className="box" style={{ 
                background: 'radial-gradient(circle, rgba(44, 44, 44, 0.8) 0%, rgba(26, 26, 26, 0.9) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                maxWidth: '800px',
            }}>
                <h2 className="title is-2 has-text-centered">{showcaseItem.title}</h2>
                <p className="content is-medium">{showcaseItem.description}</p>
                <div className="has-text-centered">
                  <a href={showcaseItem.linkUrl} target="_blank" rel="noopener noreferrer" className="button is-success is-outlined">
                    {showcaseItem.linkText}
                  </a>
                </div>
            </div>
           </FadeInWrapper>
        </section>

      </div>
    </div>
  );
};

export default HeroAnimation;