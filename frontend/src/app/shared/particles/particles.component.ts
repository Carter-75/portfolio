import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #particleCanvas class="fixed inset-0 pointer-events-none z-0"></canvas>
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
  private particles: any[] = [];
  private animationId!: number;
  private mouse = { x: 0, y: 0 };
  
  ngOnInit() {
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.onResize();
    this.initParticles();
    
    // Run animation outside Angular to avoid unnecessary change detection cycles
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  ngOnDestroy() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onResize);
    cancelAnimationFrame(this.animationId);
  }

  private onMouseMove(e: MouseEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  private onResize() {
    const canvas = this.canvasRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    this.ctx.scale(dpr, dpr);
    this.initParticles();
  }

  private initParticles() {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 12000);
    this.particles = [];
    for (let i = 0; i < Math.min(count, 150); i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2 + 1,
      baseColor: `rgba(59, 130, 246, ${Math.random() * 0.35 + 0.15})`, // Blue palette
      pulsePhase: Math.random() * Math.PI * 2
    };
  }

  private animate() {
    const canvas = this.canvasRef.nativeElement;
    const time = Date.now() * 0.001;
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.particles.forEach((p, i) => {
      // Mouse Interaction (Gentle Repel)
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        p.vx -= (dx / dist) * 0.02;
        p.vy -= (dy / dist) * 0.02;
      }

      // Movement
      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x > window.innerWidth) p.x = 0;
      else if (p.x < 0) p.x = window.innerWidth;
      if (p.y > window.innerHeight) p.y = 0;
      else if (p.y < 0) p.y = window.innerHeight;

      // Draw Node
      const pulse = Math.sin(time * 2 + p.pulsePhase) * 0.2 + 0.8;
      this.ctx.globalAlpha = pulse;
      this.ctx.fillStyle = p.baseColor;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Connections
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist2 = Math.sqrt((p.x - p2.x)**2 + (p.y - p2.y)**2);
        
        if (dist2 < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          const opacity = 1 - (dist2 / 120);
          this.ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.22})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    });

    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }
}
