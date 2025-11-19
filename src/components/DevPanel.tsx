'use client';

import { useDevMode } from '@/context/DevModeContext';
import { useEffect, useState } from 'react';
import styles from './DevPanel.module.css';

export default function DevPanel() {
  const { isDevOpen, isHyperMode, setHyperMode, toggleDevPanel } = useDevMode();
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    if (isDevOpen) {
      const lines = [
        '> SYSTEM_OVERRIDE_DETECTED',
        '> ACCESS_LEVEL: ADMIN',
        '> INITIALIZING DEV_TOOLS...',
        '> READY.'
      ];
      let delay = 0;
      setTerminalLines([]);
      
      lines.forEach(line => {
        setTimeout(() => {
          setTerminalLines(prev => [...prev, line]);
        }, delay);
        delay += 300;
      });
    }
  }, [isDevOpen]);

  if (!isDevOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.title}>{'/// DEV_CONSOLE_V1.0 ///'}</span>
          <button onClick={toggleDevPanel} className={styles.closeBtn}>[X]</button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.terminal}>
            {terminalLines.map((line, i) => (
              <div key={i} className={styles.line}>{line}</div>
            ))}
            <div className={styles.cursor}>_</div>
          </div>

          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <label className={styles.label}>ANIMATION_OVERHAUL_PROTOCOL</label>
              <div className={styles.toggleWrapper}>
                <input 
                  type="checkbox" 
                  id="hyper-mode" 
                  checked={isHyperMode}
                  onChange={(e) => setHyperMode(e.target.checked)}
                  className={styles.checkbox}
                />
                <label htmlFor="hyper-mode" className={styles.toggle}></label>
                <span className={styles.status}>{isHyperMode ? 'ACTIVE' : 'STANDBY'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
