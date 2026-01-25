'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import FadeInWrapper from './FadeInWrapper';
import { useDevMode } from '@/context/DevModeContext';
import styles from './HeroAnimation.module.css';

const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isHyperMode } = useDevMode();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current = { 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        };
      } else {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }
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
      ctx.setTransform(1, 0, 0, 1, 0, 0);
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
    <div className={styles.heroRoot}>
      <div className={styles.heroLayer}>

        {/* Main Title Section */}
        <section className={styles.heroSection}>
            <canvas ref={canvasRef} className={styles.heroCanvas} />
            <div className={styles.heroContent}>
              <h1 className={`title is-1 gradient-text ${styles.heroTitle}`}>CARTER MOYER</h1>
              <h2 className={`subtitle is-3 ${styles.heroSubtitle}`}>Full-Stack Software Engineer</h2>
              <p className={styles.heroTagline}>Crafting innovative digital experiences with modern web technologies</p>
            </div>
        </section>

        {/* Welcome Bubble Section */}
        <section className={styles.sectionCenter}>
          <FadeInWrapper>
            <div className={`box glass-card ${styles.sectionCard}`} style={{ maxWidth: '800px' }}>
                <h1 className="title is-2 gradient-text" style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>Welcome to My Portfolio</h1>
                <p className="subtitle is-5" style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8' }}>
                  I&apos;m a dedicated software engineer specializing in full-stack web development and user experience design. With expertise in modern frameworks and a passion for clean, efficient code, I create digital solutions that make a difference.
                </p>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h3 className={styles.chipHeading}>Core Technologies</h3>
                  <div className={styles.chipList}>
                    {['React', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'MySQL', 'Bulma CSS'].map((tech) => (
                      <span key={tech} className={`shimmer ${styles.chip}`}>{tech}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.ctaBlock}>
                  <span className={styles.ctaTitle}>Ready to work together?</span>
                  <div className={styles.ctaButtons}>
                    <a href="/contact" className={`button is-success ${styles.ctaButton}`}>Get In Touch</a>
                    <a href="/projects" className={`button is-success is-outlined ${styles.ctaButton}`}>View My Projects</a>
                  </div>
                </div>
            </div>
          </FadeInWrapper>
        </section>

        {/* GitHub Bubble Section */}
        <section className={styles.sectionCenter}>
           <FadeInWrapper translateY={30}>
             <div className="box glass-card float" style={{ maxWidth: '900px' }}>
                <h2 className="title is-3 has-text-centered gradient-text" style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>{showcaseItem.title}</h2>
                <p className="content is-medium" style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8' }}>{showcaseItem.description}</p>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h3 className={styles.skillsHeading}>Technical Expertise</h3>
                  <div className={styles.skillsGrid}>
                    {skills.map((skill) => (
                      <div key={skill.name} className={styles.skillRow}>
                        <div className={styles.skillHeader}>
                          <span className={styles.skillName}>{skill.name}</span>
                          <span className={styles.skillValue}>{skill.level}%</span>
                        </div>
                        <div className={styles.skillBar}>
                          <div className={`glow-pulse ${styles.skillBarFill}`} style={{ width: `${skill.level}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`has-text-centered ${styles.linkButtons}`}>
                  <a href={showcaseItem.linkUrl} target="_blank" rel="noopener noreferrer" className="button is-success is-outlined">
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