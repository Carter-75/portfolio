'use client';

import React, { ReactNode } from 'react';

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowAnimation?: boolean;
}

/**
 * GradientCard Component
 * A modern glassmorphism card with gradient borders and optional glow effects
 */
const GradientCard: React.FC<GradientCardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = true,
  glowAnimation = false 
}) => {
  const baseStyles: React.CSSProperties = {
    background: 'rgba(26, 31, 58, 0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  };

  const hoverStyles: React.CSSProperties = hoverEffect ? {
    cursor: 'pointer',
  } : {};

  const cardClassName = `glass-card ${hoverEffect ? 'hover-lift' : ''} ${glowAnimation ? 'glow-pulse' : ''} ${className}`;

  return (
    <div 
      className={cardClassName}
      style={{ ...baseStyles, ...hoverStyles }}
    >
      {children}
    </div>
  );
};

export default GradientCard;

