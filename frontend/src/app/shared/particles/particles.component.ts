import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseColor: string;
  pulsePhase: number;
}

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #particleCanvas
            aria-hidden="true"
            class="fixed inset-0 pointer-events-none z-0"></canvas>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
  `]
})
export class ParticlesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ngZone = inject(NgZone);

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId = 0;
  private mouse = { x: -9999, y: -9999 };

  // Store bound references so removeEventListener works correctly
  private boundMouseMove!: (e: MouseEvent) => void;
  private boundResize!: () => void;
  private boundVisibilityChange!: () => void;

  ngOnInit() {
    this.boundMouseMove = (e: MouseEvent) => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; };
    this.boundResize = () => { this.onResize(); };
    this.boundVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(this.animationId);
      } else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.ngZone.runOutsideAngular(() => this.animate());
      }
    };

    window.addEventListener('mousemove', this.boundMouseMove);
    window.addEventListener('resize', this.boundResize);
    document.addEventListener('visibilitychange', this.boundVisibilityChange);
  }

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.onResize();
    this.initParticles();
    // Respect reduced-motion: draw one static frame, never animate
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.drawFrame(0);
      return;
    }
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  ngOnDestroy() {
    window.removeEventListener('mousemove', this.boundMouseMove);
    window.removeEventListener('resize', this.boundResize);
    document.removeEventListener('visibilitychange', this.boundVisibilityChange);
    cancelAnimationFrame(this.animationId);
  }

  private onResize() {
    const canvas = this.canvasRef.nativeElement;
    // Cap DPR at 1.5: full retina resolution quadruples canvas fill cost for a background effect
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.initParticles();
  }

  private initParticles() {
    const isMobile = window.innerWidth < 768;
    const baseCount = Math.floor((window.innerWidth * window.innerHeight) / 22000);
    const maxCount = isMobile ? 28 : 70;
    this.particles = Array.from({ length: Math.min(baseCount, maxCount) }, () => this.createParticle());
  }

  private createParticle(): Particle {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2 + 1,
      baseColor: `rgba(79, 131, 184, ${Math.random() * 0.35 + 0.15})`,
      pulsePhase: Math.random() * Math.PI * 2
    };
  }

  private animate() {
    this.drawFrame(Date.now() * 0.001);
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private drawFrame(time: number) {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        p.vx -= (dx / dist) * 0.02;
        p.vy -= (dy / dist) * 0.02;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x > window.innerWidth)  p.x = 0;
      else if (p.x < 0)             p.x = window.innerWidth;
      if (p.y > window.innerHeight) p.y = 0;
      else if (p.y < 0)             p.y = window.innerHeight;

      const pulse = Math.sin(time * 2 + p.pulsePhase) * 0.2 + 0.8;
      this.ctx.globalAlpha = pulse;
      this.ctx.fillStyle = p.baseColor;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Connections — squared distance first, sqrt only for pairs in range
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const sq = (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2;
        if (sq < 14400) {
          const d2 = Math.sqrt(sq);
          this.ctx.globalAlpha = (1 - d2 / 120) * 0.22;
          this.ctx.strokeStyle = 'rgba(79, 131, 184, 1)';
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }

    this.ctx.globalAlpha = 1;
  }
}
