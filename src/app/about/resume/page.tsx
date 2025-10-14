'use client';

import { useEffect, useState } from 'react';

export default function ResumeViewerPage() {
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const filePath = '/files/Resume-Carter.docx';
  const viewerSrc = origin
    ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(origin + filePath)}`
    : '';

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
          <p className="has-text-grey-light has-text-centered mt-3" style={{ fontSize: '0.9rem' }}>
            If the viewer does not load, use the Download button.
          </p>
        </div>
      </div>
    </div>
  );
}


