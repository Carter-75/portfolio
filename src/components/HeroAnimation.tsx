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
    const dpr = window.devicePixelRatio || 1;
    return {
      x: Math.random() * (canvas.width / dpr),
      y: Math.random() * (canvas.height / dpr),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2 + 1,
      baseColor: `rgba(139, 92, 246, ${Math.random() * 0.4 + 0.2})`,
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
      // Force CSS size to prevent recursive layout expansion
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Re-initialize particles on resize to ensure proper distribution
      particles.length = 0;
      const pointCount = Math.floor((rect.width * rect.height) / 12000); // Responsive particle count
      for (let i = 0; i < Math.min(pointCount, 150); i++) {
        particles.push(createParticle(canvas));
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      const canvasWidth = canvas.width / dpr;
      const canvasHeight = canvas.height / dpr;
      const time = Date.now() * 0.001;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      particles.forEach((p, index) => {
        if (isHyperMode) {
          // Hyper Mode: Faster flow towards mouse
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            p.vx += (dx / dist) * 0.05;
            p.vy += (dy / dist) * 0.05;
          }

          p.vx *= 0.98;
          p.vy *= 0.98;

          // Speed limit
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 4) {
            p.vx = (p.vx / speed) * 4;
            p.vy = (p.vy / speed) * 4;
          }

          const hue = (time * 50 + p.x * 0.1) % 360;
          ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.8)`;
        } else {
          // Normal Professional Mode
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Gentle repel from mouse
          if (dist < 100) {
            p.vx -= (dx / dist) * 0.02;
            p.vy -= (dy / dist) * 0.02;
          }

          // Speed governor
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 1.5) {
            p.vx = (p.vx / speed) * 1.5;
            p.vy = (p.vy / speed) * 1.5;
          } else if (speed < 0.2) {
            p.vx = (p.vx / speed) * 0.2 || 0;
            p.vy = (p.vy / speed) * 0.2 || 0;
          }

          const pulse = Math.sin(time * 2 + p.pulsePhase) * 0.2 + 0.8;
          ctx.globalAlpha = pulse;
          ctx.fillStyle = p.baseColor;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x > canvasWidth) p.x = 0;
        else if (p.x < 0) p.x = canvasWidth;
        if (p.y > canvasHeight) p.y = 0;
        else if (p.y < 0) p.y = canvasHeight;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (isHyperMode ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Draw connections
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = isHyperMode ? 150 : 120;

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            const opacity = 1 - (dist / maxDist);
            if (isHyperMode) {
              const hue = (time * 50 + p.x * 0.1) % 360;
              ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity * 0.5})`;
            } else {
              ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.25})`; // Subtle purple connections
            }

            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [createParticle, isHyperMode]);

  const showcaseItem = {
    title: "Professional Development Journey",
    description: "As a passionate software engineer, I transform ideas into elegant digital solutions. My portfolio showcases a range of projects from interactive web applications to AI-powered tools, each designed with user experience and technical excellence in mind. I constantly learn and push the boundaries of what's possible with modern web technologies.",
    linkUrl: "https://github.com/Carter-75",
    linkText: "View My Code on GitHub"
  };

  const skills = [
    { name: "React & Next.js", level: 92 },
    { name: "TypeScript/JavaScript", level: 90 },
    { name: "Python & Java", level: 85 },
    { name: "HTML/CSS & SQL", level: 88 },
    { name: "System Architecture", level: 80 }
  ];

  return (
    <div className={styles.heroRoot}>
      <div className={styles.heroLayer}>

        {/* Main Title Section */}
        <section className={styles.heroSection}>
          <canvas ref={canvasRef} className={styles.heroCanvas} />
          <div className={styles.heroContent}>
            <h1 className={`title is-1 gradient-text ${styles.heroTitle}`}>CARTER MOYER</h1>
            <h2 className={`subtitle is-3 ${styles.heroSubtitle}`}>Software Engineer Intern Candidate</h2>
            <p className={styles.heroTagline}>Crafting robust digital solutions with modern, scalable web technologies</p>
          </div>
        </section>

        {/* Welcome Bubble Section */}
        <section className={styles.sectionCenter}>
          <FadeInWrapper>
            <div className={`box glass-card ${styles.sectionCard}`} style={{ maxWidth: '800px' }}>
              <h1 className="title is-2 gradient-text" style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>Welcome</h1>
              <p className="subtitle is-5" style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8' }}>
                I&apos;m a dedicated software engineer specializing in full-stack web development and user experience design. I am actively seeking an internship role to further hone my skills and contribute to impactful projects while continuing my education.
                <br /><br />
                In my free time, I consistently build personal projects utilizing <strong>React</strong>, <strong>TypeScript</strong>, and <strong>Python</strong> to expand my technical horizons.
              </p>

              <div style={{ marginBottom: '2rem' }}>
                <h3 className={styles.chipHeading}>Core Technologies</h3>
                <div className={styles.chipList}>
                  {['React', 'Next.js', 'Node', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C', 'MySQL'].map((tech) => (
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