'use client';

import { useDevMode } from '@/context/DevModeContext';
import { useEffect, useState } from 'react';

export default function SystemHUD() {
  const { isHyperMode } = useDevMode();
  const [fps, setFps] = useState(60);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState('');

  useEffect(() => {
    if (!isHyperMode) return;

    // FPS Counter
    let frameCount = 0;
    let lastTime = performance.now();
    
    const updateFPS = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(updateFPS);
    };
    const fpsId = requestAnimationFrame(updateFPS);

    // Mouse Coords
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Clock
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));

    return () => {
      cancelAnimationFrame(fpsId);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, [isHyperMode]);

  if (!isHyperMode) return null;

  const style = {
    fontFamily: "'Courier New', monospace",
    color: 'rgba(34, 211, 238, 0.7)',
    fontSize: '12px',
    pointerEvents: 'none' as const,
    position: 'fixed' as const,
    zIndex: 9998,
    textShadow: '0 0 5px rgba(34, 211, 238, 0.5)',
  };

  return (
    <>
      {/* Top Left: System Status */}
      <div style={{ ...style, top: 20, left: 20 }}>
        <div>SYSTEM: ONLINE</div>
        <div>MODE: HYPER_FLOW</div>
        <div>SECURE_CONN: TRUE</div>
      </div>

      {/* Top Right: Clock & FPS */}
      <div style={{ ...style, top: 20, right: 20, textAlign: 'right' }}>
        <div>TIME: {time}</div>
        <div>FPS: {fps}</div>
        <div>MEM: OPTIMAL</div>
      </div>

      {/* Bottom Left: Coordinates */}
      <div style={{ ...style, bottom: 20, left: 20 }}>
        <div>POS_X: {coords.x.toString().padStart(4, '0')}</div>
        <div>POS_Y: {coords.y.toString().padStart(4, '0')}</div>
        <div>VELOCITY: NORMAL</div>
      </div>

      {/* Bottom Right: Decorative */}
      <div style={{ ...style, bottom: 20, right: 20, textAlign: 'right' }}>
        <div>RENDER_ENGINE: CANVAS_2D</div>
        <div>PARTICLES: 3000+</div>
        <div>VERSION: 2.5.0</div>
      </div>

      {/* Corner Brackets */}
      <div style={{ position: 'fixed', top: 10, left: 10, width: 30, height: 30, borderTop: '2px solid rgba(139, 92, 246, 0.5)', borderLeft: '2px solid rgba(139, 92, 246, 0.5)', zIndex: 9998, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: 10, right: 10, width: 30, height: 30, borderTop: '2px solid rgba(139, 92, 246, 0.5)', borderRight: '2px solid rgba(139, 92, 246, 0.5)', zIndex: 9998, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: 10, left: 10, width: 30, height: 30, borderBottom: '2px solid rgba(139, 92, 246, 0.5)', borderLeft: '2px solid rgba(139, 92, 246, 0.5)', zIndex: 9998, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: 10, right: 10, width: 30, height: 30, borderBottom: '2px solid rgba(139, 92, 246, 0.5)', borderRight: '2px solid rgba(139, 92, 246, 0.5)', zIndex: 9998, pointerEvents: 'none' }} />
    </>
  );
}
