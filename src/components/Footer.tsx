'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    Credly?: {
      load: () => void;
    };
  }
}

const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="is-inline-block mx-2">
    <span className="icon is-medium">
      {children}
    </span>
  </a>
);

export default function Footer() {
  const badgeWidth = "80";
  const badgeHeight = "150";

  useEffect(() => {
    // Reload Credly badges when component mounts or when script loads
    const loadCredlyBadges = () => {
      if (typeof window !== 'undefined' && window.Credly) {
        window.Credly.load();
      }
    };

    // Try to load badges after a short delay
    const timer = setTimeout(loadCredlyBadges, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="columns is-vcentered">
            {/* Left Column: Copyright & Socials */}
            <div className="column is-two-thirds has-text-centered-mobile">
              <p className="is-size-6">
                &copy; {new Date().getFullYear()} Carter Moyer. All Rights Reserved.
              </p>
              <p className="is-size-7" style={{ marginTop: '0.5rem' }}>
                This source code is available for demonstration purposes only. You may not use, copy, or distribute this code without explicit permission.
              </p>
              <div className="mt-4">
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: '#e85d04', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Connect With Me</p>
                </div>
                <SocialIcon href="https://github.com/Carter-75">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </SocialIcon>
                <SocialIcon href="https://x.com/LPhoenix75">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </SocialIcon>
                <SocialIcon href="https://www.fiverr.com/s/Zmgb2o8">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ filter: 'invert(100%)' }}><path d="M18.7,6.3C18.7,6.3,18.7,6.3,18.7,6.3C18.7,6.3,18.7,6.3,18.7,6.3c-0.1-0.1-0.2-0.2-0.3-0.2c-0.1,0-0.1-0.1-0.2-0.1h-2.5c-0.1,0-0.2,0-0.2,0.1c-0.2,0-0.4,0.2-0.5,0.4v1.8h-2.1V6.5c0-0.2-0.2-0.4-0.5-0.4c-0.1,0-0.2,0-0.2,0.1H9.8C9.6,6.1,9.5,6.2,9.5,6.3c0,0,0,0.1,0,0.1v5.3h-1.6V6.5c0-0.2-0.2-0.4-0.5-0.4c-0.1,0-0.2,0-0.2,0.1H4.6C4.4,6.1,4.3,6.2,4.3,6.3c0,0,0,0.1,0,0.1v8.8c0,0.2,0.2,0.4,0.5,0.4h3.1c0.3,0,0.5-0.2,0.5-0.4v-3.2h1.6v3.2c0,0.2,0.2,0.4,0.5,0.4h3.1c0.3,0,0.5-0.2,0.5-0.4v-3.2h2.1c0,0,0,0,0,0v1.4c0,0.2,0.1,0.3,0.2,0.4c0.1,0.1,0.3,0.1,0.4,0.1h2.9c0.2,0,0.4-0.2,0.4-0.5V6.7C18.9,6.5,18.8,6.4,18.7,6.3z M15.9,10.2h-2.6c-0.3,0-0.5,0.2-0.5,0.5v0.7h3.1V10.2z"/></svg>
                </SocialIcon>
              </div>
            </div>

            {/* Right Column: Quick Links & Info */}
            <div className="column is-one-third has-text-centered">
              <h3 className="title is-6 has-text-success mb-3">Quick Links</h3>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a href="/projects" className="footer-quick-link">
                    🚀 View Projects
                  </a>
                  <a href="/about" className="footer-quick-link">
                    💼 About Me
                  </a>
                  <a href="/contact" className="footer-quick-link">
                    📞 Get In Touch
                  </a>
                </div>
              </div>
              
              <div>
                <h4 style={{ color: '#e85d04', fontSize: '0.9rem', marginBottom: '1rem' }}>Professional Certifications</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                  <div data-iframe-width={badgeWidth} data-iframe-height={badgeHeight} data-share-badge-id="836e8596-1ad6-4190-a2b1-37f9183b6602" data-share-badge-host="https://www.credly.com"></div>
                  <div data-iframe-width={badgeWidth} data-iframe-height={badgeHeight} data-share-badge-id="397e3a70-ab52-4d53-9025-10beb9a80472" data-share-badge-host="https://www.credly.com"></div>
                  <div data-iframe-width={badgeWidth} data-iframe-height={badgeHeight} data-share-badge-id="ac9b7a98-01df-4160-ab5c-b706f28120ff" data-share-badge-host="https://www.credly.com"></div>
                  <div data-iframe-width={badgeWidth} data-iframe-height={badgeHeight} data-share-badge-id="a53e0814-7906-43fc-99aa-87ca2d203a6e" data-share-badge-host="https://www.credly.com"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Script 
        type="text/javascript" 
        src="https://cdn.credly.com/assets/utilities/embed.js" 
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.Credly) {
            window.Credly.load();
          }
        }}
      />
    </>
  );
} 