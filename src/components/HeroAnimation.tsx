'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import FadeInWrapper from './FadeInWrapper';

const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      font: `${fontSize}px "Segoe UI", system-ui, sans-serif`,
      color: `rgba(72, 199, 116, ${Math.random() * 0.4 + 0.3})`,
      size: fontSize,
      friction: 0.985,
      minSpeed: 0.15 + Math.random() * 0.25,
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
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
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
    title: "Professional Development Journey",
    description: "As a passionate software engineer, I transform ideas into elegant digital solutions. My portfolio showcases a range of projects from interactive web applications to AI-powered tools, each designed with user experience and technical excellence in mind. I'm constantly learning and pushing the boundaries of what's possible with modern web technologies.",
    linkUrl: "https://github.com/Carter-75",
    linkText: "View My Code on GitHub"
  };

  const skills = [
    { name: "React & Next.js", level: 95 },
    { name: "TypeScript/JavaScript", level: 90 },
    { name: "Node.js & APIs", level: 85 },
    { name: "UI/UX Design", level: 88 },
    { name: "Database Design", level: 82 }
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
              <h1 className="title is-1" style={{color: 'white', fontSize: 'clamp(2.5rem, 8vw, 6rem)', marginBottom: '0.5rem'}}>CARTER MOYER</h1>
              <h2 className="subtitle is-3" style={{color: '#48c774', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: '500', marginBottom: '1rem'}}>Full-Stack Software Engineer</h2>
              <p style={{color: '#a0a0a0', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '600px', margin: '0 auto'}}>Crafting innovative digital experiences with modern web technologies</p>
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
            <div className="box" style={{ 
                background: 'radial-gradient(circle, rgba(44, 44, 44, 0.8) 0%, rgba(26, 26, 26, 0.9) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                maxWidth: '800px',
                textAlign: 'center'
            }}>
                <h1 className="title is-2" style={{color: '#f0f0f0', marginBottom: '1.5rem'}}>Welcome to My Portfolio</h1>
                <p className="subtitle is-5" style={{color: '#a0a0a0', marginBottom: '2rem'}}>
                  I'm a dedicated software engineer specializing in full-stack web development and user experience design. With expertise in modern frameworks and a passion for clean, efficient code, I create digital solutions that make a difference.
                </p>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: '#48c774', fontSize: '1.2rem', marginBottom: '1rem', fontWeight: '600' }}>Core Technologies</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
                    {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'].map((tech) => (
                      <span key={tech} style={{
                        backgroundColor: 'rgba(72, 199, 116, 0.1)',
                        color: '#48c774',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        border: '1px solid rgba(72, 199, 116, 0.3)'
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
             <div className="box" style={{ 
                background: 'radial-gradient(circle, rgba(44, 44, 44, 0.8) 0%, rgba(26, 26, 26, 0.9) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                maxWidth: '900px',
            }}>
                <h2 className="title is-3 has-text-centered" style={{ color: '#f0f0f0', marginBottom: '1.5rem' }}>{showcaseItem.title}</h2>
                <p className="content is-medium" style={{ color: '#a0a0a0', marginBottom: '2rem', lineHeight: '1.6' }}>{showcaseItem.description}</p>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: '#48c774', fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'center', fontWeight: '600' }}>Technical Expertise</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {skills.map((skill) => (
                      <div key={skill.name} style={{ textAlign: 'left' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                          <span style={{ color: '#f0f0f0', fontSize: '0.9rem' }}>{skill.name}</span>
                          <span style={{ color: '#48c774', fontSize: '0.8rem' }}>{skill.level}%</span>
                        </div>
                        <div style={{ 
                          width: '100%', 
                          height: '6px', 
                          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${skill.level}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #48c774, #3b9a5d)',
                            transition: 'width 1s ease-out'
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