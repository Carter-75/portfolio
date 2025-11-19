'use client';

import React, { useRef, useState } from 'react';

interface ParticleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

/**
 * ParticleButton Component
 * A button that creates particle explosion effect on click
 */
const ParticleButton: React.FC<ParticleButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary'
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createParticles = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newParticles: Particle[] = [];
    for (let i = 0; i < 15; i++) {
      const angle = (Math.PI * 2 * i) / 15;
      const velocity = 2 + Math.random() * 2;
      
      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        size: 4 + Math.random() * 4,
      });
    }
    
    setParticles(newParticles);

    // Animate particles
    const animateParticles = () => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
          }))
          .filter(p => p.life > 0)
      );
      
      if (particles.some(p => p.life > 0)) {
        requestAnimationFrame(animateParticles);
      }
    };
    
    requestAnimationFrame(animateParticles);

    if (onClick) onClick();
  };

  const gradients = {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)',
    accent: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  };

  return (
    <button
      ref={buttonRef}
      onClick={createParticles}
      className={`button is-success ${className}`}
      style={{
        position: 'relative',
        background: gradients[variant],
        border: '1px solid rgba(139, 92, 246, 0.3)',
        overflow: 'visible',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
      {particles.map((particle, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background: variant === 'primary' ? '#a78bfa' : '#22d3ee',
            opacity: particle.life,
            pointerEvents: 'none',
            boxShadow: `0 0 10px ${variant === 'primary' ? '#a78bfa' : '#22d3ee'}`,
          }}
        />
      ))}
    </button>
  );
};

export default ParticleButton;

