import Script from 'next/script';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="content has-text-centered">
          <div className="container p-4">
            <h3 className="title is-5 has-text-muted">My Microsoft Certifications</h3>
            <div className="columns is-centered is-vcentered" style={{ flexWrap: 'wrap', gap: '1rem' }}>
              <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="836e8596-1ad6-4190-a2b1-37f9183b6602" data-share-badge-host="https://www.credly.com"></div>
              <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="397e3a70-ab52-4d53-9025-10beb9a80472" data-share-badge-host="https://www.credly.com"></div>
              <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="ac9b7a98-01df-4160-ab5c-b706f28120ff" data-share-badge-host="https://www.credly.com"></div>
              <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="a53e0814-7906-43fc-99aa-87ca2d203a6e" data-share-badge-host="https://www.credly.com"></div>
            </div>
          </div>
          <p>
            &copy; {new Date().getFullYear()} WEB MAGIC BY CARTER. All rights reserved.
          </p>
          <p className="is-size-7">
            Built with Next.js, <a href="https://bulma.io" target="_blank" rel="noopener noreferrer">Bulma</a>, and Anime.js.
          </p>
        </div>
      </footer>
      <Script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js" />
    </>
  );
} 