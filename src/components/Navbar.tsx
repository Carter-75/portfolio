'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useDevMode } from '@/context/DevModeContext';

/**
 * Navigation link configuration
 */
interface NavLink {
  href: string;
  label: string;
  icon: string;
}

/**
 * Navbar Component
 * Responsive navigation bar with mobile menu toggle and active route highlighting
 * Compliant with WCAG 2.2 accessibility standards
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { triggerEasterEgg } = useDevMode();

  // Navigation links configuration
  const navLinks: NavLink[] = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/about', label: 'About', icon: '💼' },
    { href: '/projects', label: 'Projects', icon: '🚀' },
    { href: '/chatbot', label: 'Chatbot', icon: '🤖' },
    { href: '/blog', label: 'Blog', icon: '📝' },
    { href: '/contact', label: 'Contact', icon: '📞' },
    { href: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close mobile menu on escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  /**
   * Determines the CSS class for navigation links based on active route
   */
  const navLinkClass = useCallback((path: string): string => {
    const isActive = pathname === path;
    return `navbar-item ${isActive ? 'is-active has-text-weight-semibold' : ''}`;
  }, [pathname]);

  /**
   * Toggles the mobile menu state
   */
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <nav 
      className="navbar is-success is-fixed-top" 
      role="navigation" 
      aria-label="main navigation" 
      style={{ 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(139, 92, 246, 0.15)',
        borderBottom: '1px solid rgba(139, 92, 246, 0.3)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="container">
        <div className="navbar-brand">
          <Link 
            href="/" 
            className="navbar-item brand-text navbar-brand-link" 
            style={{ 
              fontSize: '1.4rem', 
              fontWeight: '700', 
              display: 'flex', 
              alignItems: 'center',
              background: 'linear-gradient(135deg, #ffffff 0%, #e8edf5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            aria-label="Carter Moyer - Home"
          >
            <figure className="image is-32x32 navbar-brand-avatar" style={{ 
              marginRight: '0.8rem',
              border: '2px solid rgba(139, 92, 246, 0.5)',
              borderRadius: '50%',
              boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              triggerEasterEgg();
            }}
            >
              <Image 
                className="is-rounded" 
                src="/images/profile.jpg" 
                alt="Carter Moyer profile picture" 
                width={32} 
                height={32}
                priority
              />
            </figure>
            <span style={{ letterSpacing: '0.5px' }}>CARTER MOYER</span>
          </Link>

          <button
            className={`navbar-burger custom-burger ${isOpen ? 'is-active' : ''}`}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="navbarBasicExample"
            data-open={isOpen}
            onClick={toggleMenu}
            type="button"
            style={{
              transition: 'all 0.3s ease',
              border: '2px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '8px',
              background: isOpen ? 'rgba(139, 92, 246, 0.2)' : 'transparent'
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div 
          id="navbarBasicExample" 
          className={`navbar-menu ${isOpen ? 'is-active' : ''}`}
          role="menubar"
        >
          <div className="navbar-end">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`${navLinkClass(link.href)} nav-link-item`}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '8px',
                    fontWeight: isActive ? '600' : '500',
                    background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                    border: isActive ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent'
                  }}
                >
                  <span aria-hidden="true" style={{ fontSize: '1.1em', marginRight: '0.4rem' }}>{link.icon}</span> 
                  {link.label}
                </Link>
              );
            })}
            <div className="navbar-item">
              <div className="buttons">
                <a 
                  href="https://github.com/Carter-75" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="button is-success is-small github-button"
                  aria-label="Visit Carter Moyer's GitHub profile"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontWeight: '600',
                    letterSpacing: '0.5px'
                  }}
                >
                  <span className="icon is-small" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </span>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
