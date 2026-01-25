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

  return (
    <>
      {/* Top Left: System Status */}
      <div className="system-hud system-hud-top-left">
        <div>SYSTEM: ONLINE</div>
        <div>MODE: HYPER_FLOW</div>
        <div>SECURE_CONN: TRUE</div>
      </div>

      {/* Top Right: Clock & FPS */}
      <div className="system-hud system-hud-top-right">
        <div>TIME: {time}</div>
        <div>FPS: {fps}</div>
        <div>MEM: OPTIMAL</div>
      </div>

      {/* Bottom Left: Coordinates */}
      <div className="system-hud system-hud-bottom-left">
        <div>POS_X: {coords.x.toString().padStart(4, '0')}</div>
        <div>POS_Y: {coords.y.toString().padStart(4, '0')}</div>
        <div>VELOCITY: NORMAL</div>
      </div>

      {/* Bottom Right: Decorative */}
      <div className="system-hud system-hud-bottom-right">
        <div>RENDER_ENGINE: CANVAS_2D</div>
        <div>PARTICLES: 3000+</div>
        <div>VERSION: 2.5.0</div>
      </div>

      {/* Corner Brackets */}
      <div className="system-hud-corner system-hud-corner-top-left" />
      <div className="system-hud-corner system-hud-corner-top-right" />
      <div className="system-hud-corner system-hud-corner-bottom-left" />
      <div className="system-hud-corner system-hud-corner-bottom-right" />
    </>
  );
}
