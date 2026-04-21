import { __decorate } from "tslib";
import { Component, ViewChild, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
let ParticlesComponent = class ParticlesComponent {
    canvasRef;
    ngZone = inject(NgZone);
    ctx;
    particles = [];
    animationId = 0;
    mouse = { x: -9999, y: -9999 };
    // Store bound references so removeEventListener works correctly
    boundMouseMove;
    boundResize;
    boundVisibilityChange;
    ngOnInit() {
        this.boundMouseMove = (e) => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; };
        this.boundResize = () => { this.onResize(); };
        this.boundVisibilityChange = () => {
            if (document.hidden) {
                cancelAnimationFrame(this.animationId);
            }
            else {
                this.ngZone.runOutsideAngular(() => this.animate());
            }
        };
        window.addEventListener('mousemove', this.boundMouseMove);
        window.addEventListener('resize', this.boundResize);
        document.addEventListener('visibilitychange', this.boundVisibilityChange);
    }
    ngAfterViewInit() {
        this.ctx = this.canvasRef.nativeElement.getContext('2d');
        this.onResize();
        this.initParticles();
        this.ngZone.runOutsideAngular(() => this.animate());
    }
    ngOnDestroy() {
        window.removeEventListener('mousemove', this.boundMouseMove);
        window.removeEventListener('resize', this.boundResize);
        document.removeEventListener('visibilitychange', this.boundVisibilityChange);
        cancelAnimationFrame(this.animationId);
    }
    onResize() {
        const canvas = this.canvasRef.nativeElement;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        this.ctx.scale(dpr, dpr);
        this.initParticles();
    }
    initParticles() {
        const isMobile = window.innerWidth < 768;
        const baseCount = Math.floor((window.innerWidth * window.innerHeight) / 12000);
        const maxCount = isMobile ? 40 : 120;
        this.particles = Array.from({ length: Math.min(baseCount, maxCount) }, () => this.createParticle());
    }
    createParticle() {
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            radius: Math.random() * 2 + 1,
            baseColor: `rgba(59, 130, 246, ${Math.random() * 0.35 + 0.15})`,
            pulsePhase: Math.random() * Math.PI * 2
        };
    }
    animate() {
        const time = Date.now() * 0.001;
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
            if (p.x > window.innerWidth)
                p.x = 0;
            else if (p.x < 0)
                p.x = window.innerWidth;
            if (p.y > window.innerHeight)
                p.y = 0;
            else if (p.y < 0)
                p.y = window.innerHeight;
            const pulse = Math.sin(time * 2 + p.pulsePhase) * 0.2 + 0.8;
            this.ctx.globalAlpha = pulse;
            this.ctx.fillStyle = p.baseColor;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fill();
            // Connections — only compute upper triangle
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const d2 = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                if (d2 < 120) {
                    this.ctx.globalAlpha = (1 - d2 / 120) * 0.22;
                    this.ctx.strokeStyle = 'rgba(59, 130, 246, 1)';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.globalAlpha = 1;
        this.animationId = requestAnimationFrame(() => this.animate());
    }
};
__decorate([
    ViewChild('particleCanvas')
], ParticlesComponent.prototype, "canvasRef", void 0);
ParticlesComponent = __decorate([
    Component({
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
], ParticlesComponent);
export { ParticlesComponent };
//# sourceMappingURL=particles.component.js.map