import Script from 'next/script';

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
                <SocialIcon href="https://www.fiverr.com/s/Zmgb2o8">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ filter: 'invert(100%)' }}><path d="M18.7,6.3C18.7,6.3,18.7,6.3,18.7,6.3C18.7,6.3,18.7,6.3,18.7,6.3c-0.1-0.1-0.2-0.2-0.3-0.2c-0.1,0-0.1-0.1-0.2-0.1h-2.5c-0.1,0-0.2,0-0.2,0.1c-0.2,0-0.4,0.2-0.5,0.4v1.8h-2.1V6.5c0-0.2-0.2-0.4-0.5-0.4c-0.1,0-0.2,0-0.2,0.1H9.8C9.6,6.1,9.5,6.2,9.5,6.3c0,0,0,0.1,0,0.1v5.3h-1.6V6.5c0-0.2-0.2-0.4-0.5-0.4c-0.1,0-0.2,0-0.2,0.1H4.6C4.4,6.1,4.3,6.2,4.3,6.3c0,0,0,0.1,0,0.1v8.8c0,0.2,0.2,0.4,0.5,0.4h3.1c0.3,0,0.5-0.2,0.5-0.4v-3.2h1.6v3.2c0,0.2,0.2,0.4,0.5,0.4h3.1c0.3,0,0.5-0.2,0.5-0.4v-3.2h2.1c0,0,0,0,0,0v1.4c0,0.2,0.1,0.3,0.2,0.4c0.1,0.1,0.3,0.1,0.4,0.1h2.9c0.2,0,0.4-0.2,0.4-0.5V6.7C18.9,6.5,18.8,6.4,18.7,6.3z M15.9,10.2h-2.6c-0.3,0-0.5,0.2-0.5,0.5v0.7h3.1V10.2z"/></svg>
                </SocialIcon>
                <SocialIcon href="https://x.com/LPhoenix75">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </SocialIcon>
              </div>
            </div>

            {/* Right Column: Certifications */}
            <div className="column is-one-third has-text-centered">
              <h3 className="title is-6 has-text-muted mb-3">Certifications</h3>
              <div className="columns is-centered is-mobile" style={{ flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                <div data-iframe-width={badgeWidth} data-iframe-height={badgeHeight} data-share-badge-id="836e8596-1ad6-4190-a2b1-37f9183b6602" data-share-badge-host="https://www.credly.com"></div>
                <div data-iframe-width={badgeWidth} data-iframe-height={badgeHeight} data-share-badge-id="397e3a70-ab52-4d53-9025-10beb9a80472" data-share-badge-host="https://www.credly.com"></div>
                <div data-iframe-width={badgeWidth} data-iframe-height={badgeHeight} data-share-badge-id="ac9b7a98-01df-4160-ab5c-b706f28120ff" data-share-badge-host="https://www.credly.com"></div>
                <div data-iframe-width={badgeWidth} data-iframe-height={badgeHeight} data-share-badge-id="a53e0814-7906-43fc-99aa-87ca2d203a6e" data-share-badge-host="https://www.credly.com"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js" />
    </>
  );
} 