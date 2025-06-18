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
          <div 
            className="navbar-item brand-text" 
            style={{ fontSize: '1.5rem' }}
          >
            WEB MAGIC BY CARTER
          </div>
          <div className="navbar-item pl-2">
            <figure className="image is-32x32">
              <Image className="is-rounded" src="/images/profile.jpg" alt="Carter Moyer" width={32} height={32} />
            </figure>
          </div>

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
              Portfolio
            </Link>
            <Link href="/projects" className={navLinkClass('/projects')}>
              Projects
            </Link>
            <Link href="/about" className={navLinkClass('/about')}>
              About
            </Link>
            <Link href="/contact" className={navLinkClass('/contact')}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
