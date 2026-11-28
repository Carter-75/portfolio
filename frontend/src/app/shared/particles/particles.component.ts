import { Component, ElementRef, OnDestroy, ViewChild, AfterViewInit, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadProton } from '../animation/anim-loader';

// Fixed full-screen background dust, driven by the Proton particle
// engine (vendored, lazily loaded). Slow steel-blue motes drift across
// the viewport and fade out over their life; a sparse few are off-white.
// The field pauses while the document is hidden and is never started
// under prefers-reduced-motion. If the player fails to load, the page
// simply keeps its plain background.
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
export class ParticlesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ngZone = inject(NgZone);

  private ProtonLib: any = null;
  private proton: any = null;
  private animationId = 0;
  private running = false;
  private destroyed = false;
  private resizeTimer: ReturnType<typeof setTimeout> | null = null;

  private boundResize = () => {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.rebuildField(), 250);
  };

  private boundVisibilityChange = () => {
    if (document.hidden) {
      this.stopLoop();
    } else if (this.proton) {
      this.startLoop();
    }
  };

  async ngAfterViewInit() {
    // Reduced motion: nothing is started, the canvas stays empty.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener('resize', this.boundResize);
    document.addEventListener('visibilitychange', this.boundVisibilityChange);

    try {
      this.ProtonLib = await loadProton();
    } catch {
      return; // Player unavailable: plain background, no error surfaces.
    }
    if (this.destroyed) return;

    this.buildField();
    if (!document.hidden) this.startLoop();
  }

  ngOnDestroy() {
    this.destroyed = true;
    this.stopLoop();
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    window.removeEventListener('resize', this.boundResize);
    document.removeEventListener('visibilitychange', this.boundVisibilityChange);
    this.teardownField();
  }

  private rebuildField() {
    if (this.destroyed || !this.ProtonLib) return;
    this.teardownField();
    this.buildField();
  }

  private buildField() {
    const Proton = this.ProtonLib;
    const canvas = this.canvasRef.nativeElement;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Cap DPR at 1.5, as before: full retina resolution quadruples the
    // canvas fill cost for a background effect. Proton works in CSS
    // pixels; the context transform maps them onto the scaled canvas.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const narrow = width < 768;
    // Emission rate times average life (11s) holds the live count near
    // the cap: about 80 on wide screens, about 36 on narrow ones.
    const emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(
      new Proton.Span(narrow ? 1 : 2, narrow ? 2 : 5),
      new Proton.Span(0.35, 0.6)
    );
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Radius(new Proton.Span(0.8, 2.2)));
    emitter.addInitialize(new Proton.Life(new Proton.Span(8, 14)));
    emitter.addInitialize(
      new Proton.Position(new Proton.RectZone(0, 0, width, height))
    );
    emitter.addInitialize(
      new Proton.Velocity(new Proton.Span(4, 14), new Proton.Span(0, 360), 'polar')
    );
    // Weighted toward the two steel blues; off-white appears sparsely.
    emitter.addBehaviour(
      new Proton.Color(['#4f83b8', '#33587e', '#4f83b8', '#33587e', '#f8fafc'])
    );
    emitter.addBehaviour(new Proton.Alpha(new Proton.Span(0.25, 0.55), 0));
    emitter.addBehaviour(new Proton.RandomDrift(10, 10, 0.35));
    emitter.addBehaviour(
      new Proton.CrossZone(new Proton.RectZone(0, 0, width, height), 'cross')
    );
    emitter.emit();

    const proton = new Proton();
    proton.addEmitter(emitter);
    proton.addRenderer(new Proton.CanvasRenderer(canvas));
    this.proton = proton;
  }

  private teardownField() {
    if (this.proton) {
      this.proton.destroy();
      this.proton = null;
    }
    const canvas = this.canvasRef?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  private startLoop() {
    if (this.running || this.destroyed) return;
    this.running = true;
    this.ngZone.runOutsideAngular(() => {
      const tick = () => {
        if (!this.running || this.destroyed) return;
        this.proton?.update();
        this.animationId = requestAnimationFrame(tick);
      };
      tick();
    });
  }

  private stopLoop() {
    this.running = false;
    cancelAnimationFrame(this.animationId);
  }
}
