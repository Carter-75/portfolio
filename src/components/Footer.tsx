import Script from 'next/script';

export default function Footer() {
  const badgeWidth = "80";
  const badgeHeight = "150";

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="columns is-vcentered">
            {/* Left Column: Copyright Info */}
            <div className="column is-two-thirds has-text-centered-mobile">
              <p className="is-size-6">
                &copy; {new Date().getFullYear()} WEB MAGIC BY CARTER.
                <br />
                All rights reserved.
              </p>
              <p className="is-size-7" style={{ marginTop: '0.5rem' }}>
                Built with Next.js, <a href="https://bulma.io" target="_blank" rel="noopener noreferrer">Bulma</a>, and Anime.js.
              </p>
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