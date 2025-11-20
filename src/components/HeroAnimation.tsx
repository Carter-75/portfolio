'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import FadeInWrapper from './FadeInWrapper';
import { useDevMode } from '@/context/DevModeContext';

const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isHyperMode } = useDevMode();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const createParticle = useCallback((canvas: HTMLCanvasElement) => {
    const texts = ["Full-Stack Developer", "React Expert", "UI/UX Designer", "Problem Solver", "Code Architect"];
    const text = texts[Math.floor(Math.random() * texts.length)];
    const fontSize = Math.random() * 12 + 12;
    const dpr = window.devicePixelRatio || 1;
    return {
      x: (canvas.width / dpr) / 2,
      y: (canvas.height / dpr) / 2,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      text,
      font: `bold ${fontSize}px "Segoe UI", system-ui, sans-serif`,
      color: `rgba(${139 + Math.random() * 50}, ${92 + Math.random() * 90}, ${246}, ${Math.random() * 0.5 + 0.4})`,
      size: fontSize,
      friction: 0.988,
      minSpeed: 0.12 + Math.random() * 0.2,
      pulsePhase: Math.random() * Math.PI * 2,
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
      const time = Date.now() * 0.001;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        if (isHyperMode) {
          // Hyper Mode: Constellation Flow (Gentle Connection)
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Gentle repulsion if too close (Magnetic Shield)
          if (dist < 150) {
            const force = (150 - dist) / 150;
            p.vx -= (dx / dist) * force * 0.5;
            p.vy -= (dy / dist) * force * 0.5;
          }

          // Draw connection line to mouse if close enough
          if (dist < 300) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - dist / 300)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          
          // Gentle flow
          p.vx *= 0.99;
          p.vy *= 0.99;
          
          // Rainbow colors but softer
          const hue = (time * 50 + p.x * 0.1) % 360;
          p.color = `hsla(${hue}, 70%, 70%, 0.9)`;
          ctx.shadowBlur = 10;
        } else {
          // Normal Mode
          p.vx *= p.friction;
          p.vy *= p.friction;

          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed < p.minSpeed) {
              p.vx = (p.vx / speed) * p.minSpeed;
              p.vy = (p.vy / speed) * p.minSpeed;
          }
          ctx.shadowBlur = 15 * (Math.sin(time + p.pulsePhase) * 0.3 + 0.7);
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x > canvasWidth + p.size) p.x = -p.size;
        else if (p.x < -p.size) p.x = canvasWidth + p.size;
        if (p.y > canvasHeight + p.size) p.y = -p.size;
        else if (p.y < -p.size) p.y = canvasHeight + p.size;

        // Enhanced rendering with glow and pulse effects
        const pulse = Math.sin(time + p.pulsePhase) * 0.3 + 0.7;
        ctx.font = p.font;
        ctx.fillStyle = p.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = p.color;
        // ctx.shadowBlur set above based on mode
        ctx.globalAlpha = pulse;
        ctx.fillText(p.text, p.x, p.y);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [createParticle, isHyperMode]); // Added isHyperMode dependency

  const showcaseItem = {
    title: "Professional Development Journey",
    description: "As a passionate software engineer, I transform ideas into elegant digital solutions. My portfolio showcases a range of projects from interactive web applications to AI-powered tools, each designed with user experience and technical excellence in mind. I'm constantly learning and pushing the boundaries of what's possible with modern web technologies.",
    linkUrl: "https://github.com/Carter-75",
    linkText: "View My Code on GitHub"
  };

  const skills = [
    { name: "React & Next.js", level: 92 },
    { name: "TypeScript/JavaScript", level: 90 },
    { name: "Python & Java", level: 85 },
    { name: "HTML/CSS & Bulma", level: 88 },
    { name: "MySQL Databases", level: 80 }
  ];

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
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
              <h1 className="title is-1 gradient-text" style={{fontSize: 'clamp(2.5rem, 8vw, 6rem)', marginBottom: '0.5rem', fontWeight: 'bold', textShadow: '0 0 40px rgba(139, 92, 246, 0.5)'}}>CARTER MOYER</h1>
              <h2 className="subtitle is-3" style={{color: '#a78bfa', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: '600', marginBottom: '1rem', textShadow: '0 0 20px rgba(167, 139, 250, 0.3)'}}>Full-Stack Software Engineer</h2>
              <p style={{color: '#94a3b8', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '600px', margin: '0 auto'}}>Crafting innovative digital experiences with modern web technologies</p>
            </div>
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
            <div className="box glass-card" style={{ 
                maxWidth: '800px',
                textAlign: 'center',
                animation: 'fadeIn 0.8s ease-out'
            }}>
                <h1 className="title is-2 gradient-text" style={{marginBottom: '1.5rem', fontWeight: 'bold'}}>Welcome to My Portfolio</h1>
                <p className="subtitle is-5" style={{color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8'}}>
                  I&apos;m a dedicated software engineer specializing in full-stack web development and user experience design. With expertise in modern frameworks and a passion for clean, efficient code, I create digital solutions that make a difference.
                </p>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', marginBottom: '1rem', fontWeight: '600' }}>Core Technologies</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
                    {['React', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'MySQL', 'Bulma CSS'].map((tech) => (
                      <span key={tech} className="shimmer" style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
                        color: 'var(--accent-primary)',
                        padding: '0.5rem 1rem',
                        borderRadius: '24px',
                        fontSize: '0.9rem',
                        border: '1px solid var(--border-glow)',
                        fontWeight: '500',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}>{tech}</span>
                    ))}
                  </div>
                </div>

                <div style={{ margin: '2em 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1em' }}>
                  <span style={{ fontWeight: 600, fontSize: '1.1em', color: '#f0f0f0' }}>Ready to work together?</span>
                  <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <a href="/contact" className="button is-success" style={{ fontWeight: 600, fontSize: '1em' }}>Get In Touch</a>
                    <a href="/projects" className="button is-success is-outlined" style={{ fontWeight: 600, fontSize: '1em' }}>View My Projects</a>
                  </div>
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
             <div className="box glass-card float" style={{ 
                maxWidth: '900px',
            }}>
                <h2 className="title is-3 has-text-centered gradient-text" style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>{showcaseItem.title}</h2>
                <p className="content is-medium" style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8' }}>{showcaseItem.description}</p>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: 'var(--accent-secondary)', fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'center', fontWeight: '600' }}>Technical Expertise</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {skills.map((skill) => (
                      <div key={skill.name} style={{ textAlign: 'left' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <span style={{ color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: '500' }}>{skill.name}</span>
                          <span style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: '600' }}>{skill.level}%</span>
                        </div>
                        <div style={{ 
                          width: '100%', 
                          height: '8px', 
                          backgroundColor: 'rgba(139, 92, 246, 0.1)', 
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '1px solid var(--border-glow)'
                        }}>
                          <div className="glow-pulse" style={{
                            width: `${skill.level}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                            borderRadius: '8px',
                            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
                          }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="has-text-centered">
                  <a href={showcaseItem.linkUrl} target="_blank" rel="noopener noreferrer" className="button is-success is-outlined" style={{ marginRight: '1rem' }}>
                    {showcaseItem.linkText}
                  </a>
                  <a href="/about" className="button is-success">
                    Learn More About Me
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