'use client';

import React, { useState, useRef } from 'react';

interface RippleEffectProps {
  children: React.ReactNode;
  color?: string;
  duration?: number;
  className?: string;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  key: number;
}

/**
 * RippleEffect Component
 * Creates a material-design ripple effect on click
 */
const RippleEffect: React.FC<RippleEffectProps> = ({ 
  children, 
  color = 'rgba(167, 139, 250, 0.5)',
  duration = 600,
  className = '' 
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      x,
      y,
      size,
      key: Date.now(),
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.key !== newRipple.key));
    }, duration);
  };

  return (
    <div
      ref={containerRef}
      className={className}
      onClick={addRipple}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.key}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: '50%',
            background: color,
            transform: 'scale(0)',
            animation: `ripple ${duration}ms ease-out`,
            pointerEvents: 'none',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RippleEffect;

