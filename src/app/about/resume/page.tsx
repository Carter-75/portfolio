'use client';

import { useEffect, useMemo, useState } from 'react';

type ViewerChoice = 'office' | 'google';

export default function ResumeViewerPage() {
  const [origin, setOrigin] = useState('');
  const [viewer, setViewer] = useState<ViewerChoice>('office');
  const [suggestAlternate, setSuggestAlternate] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    // If initial viewer doesn't appear quickly, suggest switching
    const timer = setTimeout(() => setSuggestAlternate(true), 5000);
    return () => clearTimeout(timer);
  }, [viewer, origin]);

  const filePath = '/files/Resume-Carter.docx';

  const viewerSrc = useMemo(() => {
    if (!origin) return '';
    const absoluteUrl = origin + filePath;
    if (viewer === 'office') {
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteUrl)}`;
    }
    // google viewer
    return `https://docs.google.com/gview?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;
  }, [origin, viewer]);

  return (
    <div className="section">
      <div className="container">
        <div className="box" style={{
          background: 'radial-gradient(circle, rgba(44, 44, 44, 0.8) 0%, rgba(26, 26, 26, 0.9) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          padding: '1.5rem'
        }}>
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <a className="button is-light" href="/about">← Back to About</a>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <a className="button is-success" href={filePath} download="Resume-Carter.docx">Download</a>
              </div>
            </div>
          </div>

          <h1 className="title is-3 has-text-success-dark has-text-centered">Resume Viewer</h1>

          <div className="buttons is-centered mb-3">
            <button
              className={`button ${viewer === 'office' ? 'is-success' : 'is-light'}`}
              onClick={() => setViewer('office')}
            >
              Office Viewer
            </button>
            <button
              className={`button ${viewer === 'google' ? 'is-success' : 'is-light'}`}
              onClick={() => setViewer('google')}
            >
              Google Viewer
            </button>
          </div>

          {!viewerSrc ? (
            <div className="has-text-centered" style={{ padding: '3rem' }}>
              <button className="button is-loading is-success is-light">Loading viewer…</button>
            </div>
          ) : (
            <div style={{ height: '80vh', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <iframe
                title="Resume Viewer"
                src={viewerSrc}
                style={{ width: '100%', height: '100%', border: '0' }}
                allowFullScreen
              />
            </div>
          )}

          {suggestAlternate && (
            <p className="has-text-grey-light has-text-centered mt-3" style={{ fontSize: '0.9rem' }}>
              Having trouble loading? Try switching viewers above or use the Download button.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}



