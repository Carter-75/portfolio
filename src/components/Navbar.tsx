'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

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

  // Navigation links configuration
  const navLinks: NavLink[] = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/about', label: 'About', icon: '💼' },
    { href: '/projects', label: 'Projects', icon: '🚀' },
    { href: '/chatbot', label: 'Chatbot', icon: '🤖' },
    { href: '/blog', label: 'Blog', icon: '📝' },
    { href: '/contact', label: 'Contact', icon: '📞' }
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
    <nav className="navbar is-success" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link 
            href="/" 
            className="navbar-item brand-text" 
            style={{ 
              fontSize: '1.4rem', 
              fontWeight: '700', 
              display: 'flex', 
              alignItems: 'center' 
            }}
            aria-label="Carter Moyer - Home"
          >
            <figure className="image is-32x32" style={{ marginRight: '0.8rem' }}>
              <Image 
                className="is-rounded" 
                src="/images/profile.jpg" 
                alt="Carter Moyer profile picture" 
                width={32} 
                height={32}
                priority
              />
            </figure>
            <span>CARTER MOYER</span>
          </Link>

          <button
            className={`navbar-burger ${isOpen ? 'is-active' : ''}`}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="navbarBasicExample"
            onClick={toggleMenu}
            type="button"
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
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={navLinkClass(link.href)}
                role="menuitem"
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                <span aria-hidden="true">{link.icon}</span> {link.label}
              </Link>
            ))}
            <div className="navbar-item">
              <div className="buttons">
                <a 
                  href="https://github.com/Carter-75" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="button is-success is-small"
                  aria-label="Visit Carter Moyer's GitHub profile"
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
