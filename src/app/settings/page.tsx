'use client';

import { useDevMode } from '@/context/DevModeContext';
import FadeInWrapper from '@/components/FadeInWrapper';

export default function SettingsPage() {
  const { trailStyle, setTrailStyle } = useDevMode();

  const trails = [
    { id: 'none', name: 'STEALTH_MODE', desc: 'No trail visible' },
    { id: 'standard', name: 'KINETIC_ORB', desc: 'Classic smooth follower' },
    { id: 'hyper', name: 'NEON_RIBBON', desc: 'Glowing cybernetic line' },
    { id: 'fire', name: 'INFERNO_BLAZE', desc: 'Rising flame particles' },
    { id: 'ice', name: 'FROST_SHARD', desc: 'Falling ice crystals' },
    { id: 'matrix', name: 'DIGITAL_RAIN', desc: 'Falling code characters' },
    { id: 'rainbow', name: 'PRISM_FLOW', desc: 'Multicolor particle stream' },
    { id: 'sparkle', name: 'STAR_DUST', desc: 'Glittering white sparkles' },
    { id: 'bubbles', name: 'AQUA_SPHERE', desc: 'Floating blue bubbles' },
    { id: 'electric', name: 'VOLT_ARC', desc: 'Jagged lightning bolts' },
    { id: 'pixel', name: '8_BIT_CRUMB', desc: 'Retro square pixels' },
    { id: 'paint', name: 'SPLATTER_INK', desc: 'Colorful paint drops' },
    { id: 'stardust', name: 'GOLDEN_HAZE', desc: 'Subtle gold dust' },
    { id: 'ghost', name: 'PHANTOM_ECHO', desc: 'Fading afterimages' },
    { id: 'shockwave', name: 'PULSE_WAVE', desc: 'Expanding energy rings' },
  ];

  return (
    <div className="container section" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <FadeInWrapper>
        <div className="box glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="title is-2 gradient-text has-text-centered" style={{ marginBottom: '2rem' }}>
            System Preferences
          </h1>
          
          <div className="columns is-multiline">
            <div className="column is-12">
              <div className="field">
                <label className="label" style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>
                  Cursor Trail Module
                </label>
                <p className="help" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Select your preferred visual interface for the mouse cursor. This setting persists across sessions.
                </p>
                
                <div className="control">
                  <div className="select is-fullwidth is-medium">
                    <select 
                      value={trailStyle} 
                      onChange={(e) => setTrailStyle(e.target.value)}
                      style={{
                        background: 'rgba(30, 41, 59, 0.6)',
                        color: '#e2e8f0',
                        borderColor: 'rgba(139, 92, 246, 0.3)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {trails.map(trail => (
                        <option key={trail.id} value={trail.id}>
                          {trail.name} - {trail.desc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInWrapper>
    </div>
  );
}
