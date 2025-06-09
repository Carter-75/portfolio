'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface Particle {
  x: number;
  y: number;
  p_x: number;
  p_y: number;
  radius: number;
  speed: number;
}

const CoolVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let a: number, b: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // This is a more robust way to handle resizing
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            w = canvas.width = entry.contentRect.width;
            h = canvas.height = entry.contentRect.height;
        }
    });

    // We observe the parent of the canvas for more reliable size updates
    if (canvas.parentElement) {
        resizeObserver.observe(canvas.parentElement);
    }


    const opts = {
      particleColor: "rgb(200,200,200)",
      lineColor: "rgb(200,200,200)",
      particleAmount: 40,
      defaultRadius: 2,
      variantRadius: 2,
      defaultSpeed: 1,
      variantSpeed: 1,
      linkRadius: 200
    };
    
    let a_b = opts.particleAmount;
    const particles: Particle[] = [];

    for (let i = 0; i < a_b; i++) {
      particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          p_x: 2 * Math.random() - 1,
          p_y: 2 * Math.random() - 1,
          radius: opts.defaultRadius + opts.variantRadius * Math.random(),
          speed: opts.defaultSpeed + opts.variantSpeed * Math.random()
      });
    }

    function draw() {
        ctx!.clearRect(0, 0, w, h);
        
        particles.forEach(p1 => {
            p1.x += p1.p_x * p1.speed;
            p1.y += p1.p_y * p1.speed;

            if (p1.x < 0) { p1.x = w; }
            if (p1.x > w) { p1.x = 0; }
            if (p1.y < 0) { p1.y = h; }
            if (p1.y > h) { p1.y = 0; }
            
            ctx!.beginPath();
            ctx!.arc(p1.x, p1.y, p1.radius, 0, 2 * Math.PI);
            ctx!.fillStyle = opts.particleColor;
            ctx!.fill();
            
            particles.forEach(p2 => {
                let distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                if (distance < opts.linkRadius) {
                    ctx!.beginPath();
                    ctx!.moveTo(p1.x, p1.y);
                    ctx!.lineTo(p2.x, p2.y);
                    ctx!.strokeStyle = opts.lineColor;
                    ctx!.lineWidth = 1 - distance / opts.linkRadius;
                    ctx!.stroke();
                }
            });
        });

        requestAnimationFrame(draw);
    }
    
    draw();

    return () => {
        if (canvas.parentElement) {
            resizeObserver.unobserve(canvas.parentElement);
        }
    }

  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#1a1a1a',
      borderRadius: 'inherit'
    }}>
      <canvas ref={canvasRef} style={{ display: 'block' }}></canvas>
    </div>
  );
};

export default CoolVisual; 