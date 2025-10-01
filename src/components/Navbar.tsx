'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinkClass = (path: string) => {
    const isActive = pathname === path;
    // The .is-active class is handled by CSS for background color.
    // We just add the class and a bold font weight if it's the active path.
    return `navbar-item ${isActive ? 'is-active has-text-weight-semibold' : ''}`;
  };

  return (
    <nav className="navbar is-success" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link href="/" className="navbar-item brand-text" style={{ fontSize: '1.4rem', fontWeight: '700', display: 'flex', alignItems: 'center' }}>
            <figure className="image is-32x32" style={{ marginRight: '0.8rem' }}>
              <Image className="is-rounded" src="/images/profile.jpg" alt="Carter Moyer" width={32} height={32} />
            </figure>
            <span>CARTER MOYER</span>
          </Link>

          <a
            role="button"
            className={`navbar-burger burger ${isOpen ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded={isOpen}
            data-target="navbarBasicExample"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <Link href="/" className={navLinkClass('/')}>
              <span>🏠</span> Home
            </Link>
            <Link href="/about" className={navLinkClass('/about')}>
              <span>💼</span> About
            </Link>
            <Link href="/projects" className={navLinkClass('/projects')}>
              <span>🚀</span> Projects
            </Link>
            <Link href="/contact" className={navLinkClass('/contact')}>
              <span>📞</span> Contact
            </Link>
            <div className="navbar-item">
              <div className="buttons">
                <a href="https://github.com/Carter-75" target="_blank" rel="noopener noreferrer" className="button is-success is-small">
                  <span className="icon is-small">
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
