'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './Footer.module.css';

/**
 * Certification badge component
 * Displays Microsoft Office certification badges with hover effects
 */
interface CertificationBadgeProps {
  href: string;
  imageSrc: string;
  alt: string;
}

const CertificationBadge = ({ href, imageSrc, alt }: CertificationBadgeProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.certBadge}
      aria-label={`View ${alt} certification on Credly`}
    >
      {imageError ? (
        <div
          className={styles.certFallback}
          style={{
            background: alt.includes('PowerPoint') ? 'linear-gradient(135deg, #D24726 0%, #B7472A 100%)' :
                        alt.includes('Word') ? 'linear-gradient(135deg, #2B579A 0%, #1B3C6E 100%)' :
                        alt.includes('Excel') ? 'linear-gradient(135deg, #217346 0%, #185C37 100%)' :
                        'linear-gradient(135deg, #EB3C00 0%, #D13400 100%)'
          }}
        >
          <div className={styles.certFallbackLetter}>
            {alt.includes('PowerPoint') ? 'P' : 
             alt.includes('Word') ? 'W' : 
             alt.includes('Excel') ? 'X' : 'M'}
          </div>
          <div className={styles.certFallbackLabel}>
            MOS
          </div>
          <div className={styles.certFallbackBubble} />
        </div>
      ) : (
        <Image 
          src={imageSrc}
          alt={alt}
          width={55}
          height={55}
          className={styles.certImage}
          onError={() => setImageError(true)}
          loading="lazy"
          quality={90}
        />
      )}
    </a>
  );
};

/**
 * Footer Component
 * Displays copyright, social links, quick navigation, and professional certifications
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const certifications = [
    {
      href: "https://www.credly.com/badges/836e8596-1ad6-4190-a2b1-37f9183b6602/public_url",
      imageSrc: "https://images.credly.com/size/110x110/images/fd092703-61db-4e9f-9c7c-2211d44ca87d/MOS_PowerPoint.png",
      alt: "Microsoft PowerPoint Specialist"
    },
    {
      href: "https://www.credly.com/badges/397e3a70-ab52-4d53-9025-10beb9a80472/public_url",
      imageSrc: "https://images.credly.com/size/110x110/images/0b570eb3-6932-47d5-9259-fe3f2bceecfc/MOS_Word.png",
      alt: "Microsoft Word Specialist"
    },
    {
      href: "https://www.credly.com/badges/ac9b7a98-01df-4160-ab5c-b706f28120ff/public_url",
      imageSrc: "https://images.credly.com/size/110x110/images/2e489327-71c4-41ad-9c37-81b5b3a8c8c2/MOS_Excel.png",
      alt: "Microsoft Excel Specialist"
    },
    {
      href: "https://www.credly.com/badges/a53e0814-7906-43fc-99aa-87ca2d203a6e/public_url",
      imageSrc: "https://images.credly.com/size/110x110/images/1c8e3a37-2bd3-476c-8e0c-0bc6032d5150/MOS_Office.png",
      alt: "Microsoft Office Specialist"
    }
  ];

  const quickLinks = [
    { href: '/projects', icon: '🚀', text: 'View Projects' },
    { href: '/about', icon: '💼', text: 'About Me' },
    { href: '/contact', icon: '📞', text: 'Get In Touch' }
  ];

  return (
    <footer 
      className={`footer ${styles.footerRoot}`}
      role="contentinfo"
    >
      {/* Decorative gradient line at top */}
      <div className={styles.footerTopLine} />
      
      <div className="container">
        <div className="columns is-vcentered">
          {/* Left Column: Copyright & Social Links */}
          <div className="column is-two-thirds has-text-centered-mobile">
            <p className={`is-size-6 ${styles.footerCopy}`}>
              &copy; {currentYear} <span className={styles.brandGradient}>Carter Moyer</span>. All Rights Reserved.
            </p>
            <p className={`is-size-7 ${styles.footerDisclaimer}`}>
              This source code is available for demonstration purposes only. 
              You may not use, copy, or distribute this code without explicit permission.
            </p>
            
            <nav className="mt-4" aria-label="Social media links">
              <div className={styles.socialHeadingWrap}>
                <p className={styles.socialHeading}>
                  💬 Connect With Me
                </p>
              </div>
              <div className={styles.socialRow}>
                <a
                  href="https://github.com/Carter-75"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Carter Moyer's GitHub profile"
                  className={`${styles.socialLink} footer-social-link`}
                  data-variant="purple"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://x.com/LPhoenix75"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Carter Moyer's X (Twitter) profile"
                  className={`${styles.socialLink} footer-social-link`}
                  data-variant="cyan"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://www.fiverr.com/s/Zmgb2o8"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Carter Moyer's Fiverr profile"
                  className={`${styles.socialLink} footer-social-link`}
                  data-variant="magenta"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" className={styles.iconInvert} aria-hidden="true">
                    <path d="M18.7,6.3C18.7,6.3,18.7,6.3,18.7,6.3C18.7,6.3,18.7,6.3,18.7,6.3c-0.1-0.1-0.2-0.2-0.3-0.2c-0.1,0-0.1-0.1-0.2-0.1h-2.5c-0.1,0-0.2,0-0.2,0.1c-0.2,0-0.4,0.2-0.5,0.4v1.8h-2.1V6.5c0-0.2-0.2-0.4-0.5-0.4c-0.1,0-0.2,0-0.2,0.1H9.8C9.6,6.1,9.5,6.2,9.5,6.3c0,0,0,0.1,0,0.1v5.3h-1.6V6.5c0-0.2-0.2-0.4-0.5-0.4c-0.1,0-0.2,0-0.2,0.1H4.6C4.4,6.1,4.3,6.2,4.3,6.3c0,0,0,0.1,0,0.1v8.8c0,0.2,0.2,0.4,0.5,0.4h3.1c0.3,0,0.5-0.2,0.5-0.4v-3.2h1.6v3.2c0,0.2,0.2,0.4,0.5,0.4h3.1c0.3,0,0.5-0.2,0.5-0.4v-3.2h2.1c0,0,0,0,0,0v1.4c0,0.2,0.1,0.3,0.2,0.4c0.1,0.1,0.3,0.1,0.4,0.1h2.9c0.2,0,0.4-0.2,0.4-0.5V6.7C18.9,6.5,18.8,6.4,18.7,6.3z M15.9,10.2h-2.6c-0.3,0-0.5,0.2-0.5,0.5v0.7h3.1V10.2z"/>
                  </svg>
                </a>
              </div>
            </nav>
          </div>

          {/* Right Column: Quick Links & Certifications */}
          <div className="column is-one-third has-text-centered">
            <nav aria-label="Quick navigation links">
              <h3 className={styles.quickLinksTitle}>
                ⚡ Quick Links
              </h3>
              <div className={styles.quickLinksWrap}>
                <div className={styles.quickLinksList}>
                  {quickLinks.map((link) => (
                    <a 
                      key={link.href}
                      href={link.href} 
                      className="footer-quick-link"
                      aria-label={link.text}
                    >
                      <span aria-hidden="true" className={styles.quickLinkIcon}>{link.icon}</span> {link.text}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
            
            <section aria-label="Professional certifications">
              <h4 className={styles.certTitle}>
                🏆 Professional Certifications
              </h4>
              <div className={styles.certWrap}>
                {certifications.map((cert) => (
                  <CertificationBadge
                    key={cert.href}
                    href={cert.href}
                    imageSrc={cert.imageSrc}
                    alt={cert.alt}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </footer>
  );
} 