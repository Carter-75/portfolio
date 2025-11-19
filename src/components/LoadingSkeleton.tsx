'use client';

import { CSSProperties } from 'react';

/**
 * LoadingSkeleton Component
 * Provides a grayish skeleton UI while content is loading
 * Mimics the actual layout structure for smooth perceived performance
 */

const shimmerStyle: CSSProperties = {
  background: 'linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 2s infinite',
};

export default function LoadingSkeleton() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .skeleton-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
        zIndex: 9999,
        pointerEvents: 'none'
      }}>
        {/* Animated Background Skeleton */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}>
          {/* Ember particles simulation */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`ember-${i}`}
              className="skeleton-pulse"
              style={{
                position: 'absolute',
                bottom: `${Math.random() * 30}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                borderRadius: '50%',
                background: '#3a3a3a',
                opacity: 0.3,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
          
          {/* Network nodes simulation */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`node-${i}`}
              className="skeleton-pulse"
              style={{
                position: 'absolute',
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: '#4a4a4a',
                opacity: 0.4,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Navbar Skeleton */}
        <div style={{
          position: 'relative',
          zIndex: 10000,
          background: 'rgba(40, 40, 40, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '1rem 0',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Logo skeleton */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  ...shimmerStyle
                }} />
                <div style={{
                  width: '150px',
                  height: '24px',
                  borderRadius: '4px',
                  ...shimmerStyle
                }} />
              </div>
              
              {/* Nav links skeleton */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`nav-${i}`}
                    style={{
                      width: `${60 + Math.random() * 30}px`,
                      height: '16px',
                      borderRadius: '4px',
                      ...shimmerStyle,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div style={{
          position: 'relative',
          zIndex: 10000,
          maxWidth: '1200px',
          margin: '4rem auto',
          padding: '0 1.5rem'
        }}>
          {/* Hero Section Skeleton */}
          <div style={{
            textAlign: 'center',
            padding: '3rem 0'
          }}>
            {/* Main title */}
            <div style={{
              margin: '0 auto 1.5rem',
              width: '70%',
              maxWidth: '600px',
              height: '48px',
              borderRadius: '8px',
              ...shimmerStyle
            }} />
            
            {/* Subtitle */}
            <div style={{
              margin: '0 auto 1rem',
              width: '50%',
              maxWidth: '400px',
              height: '24px',
              borderRadius: '6px',
              ...shimmerStyle,
              animationDelay: '0.2s'
            }} />
            
            {/* Description lines */}
            {[...Array(3)].map((_, i) => (
              <div
                key={`desc-${i}`}
                style={{
                  margin: '0.8rem auto',
                  width: `${60 - i * 10}%`,
                  maxWidth: '500px',
                  height: '16px',
                  borderRadius: '4px',
                  ...shimmerStyle,
                  animationDelay: `${0.3 + i * 0.1}s`
                }}
              />
            ))}

            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '2rem'
            }}>
              {[...Array(2)].map((_, i) => (
                <div
                  key={`btn-${i}`}
                  style={{
                    width: '140px',
                    height: '42px',
                    borderRadius: '6px',
                    ...shimmerStyle,
                    animationDelay: `${0.6 + i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Cards Grid Skeleton */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '4rem'
          }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={`card-${i}`}
                style={{
                  background: 'rgba(40, 40, 40, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Card icon */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  ...shimmerStyle,
                  animationDelay: `${0.8 + i * 0.15}s`
                }} />
                
                {/* Card title */}
                <div style={{
                  width: '80%',
                  height: '20px',
                  borderRadius: '4px',
                  marginBottom: '0.75rem',
                  ...shimmerStyle,
                  animationDelay: `${0.9 + i * 0.15}s`
                }} />
                
                {/* Card description */}
                {[...Array(3)].map((_, j) => (
                  <div
                    key={`card-line-${j}`}
                    style={{
                      width: `${95 - j * 15}%`,
                      height: '14px',
                      borderRadius: '4px',
                      marginBottom: '0.5rem',
                      ...shimmerStyle,
                      animationDelay: `${1 + i * 0.15 + j * 0.05}s`
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'rgba(40, 40, 40, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '0.75rem 1.5rem',
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          zIndex: 10001
        }}>
          {/* Spinner */}
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid rgba(139, 92, 246, 0.3)',
            borderTop: '2px solid #8b5cf6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <span style={{
            color: '#8b5cf6',
            fontSize: '0.9rem',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            Loading Experience...
          </span>
        </div>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
}

