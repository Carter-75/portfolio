import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadLottie } from '../animation/anim-loader';

// Thin wrapper around the vendored lottie-web player. The player script
// loads lazily the first time a component instance appears. Under
// prefers-reduced-motion the component renders nothing at all.
@Component({
  selector: 'app-lottie-player',
  standalone: true,
  imports: [CommonModule],
  template: `<div #host class="lottie-host" aria-hidden="true"></div>`,
  styles: [`
    :host {
      display: block;
    }
    .lottie-host {
      width: 100%;
      height: 100%;
    }
    .lottie-host svg {
      display: block;
    }
  `]
})
export class LottiePlayerComponent implements AfterViewInit, OnDestroy {
  /** Path to the Lottie JSON, served from the app root (public/). */
  @Input({ required: true }) src = '';
  @Input() loop = false;
  @Input() autoplay = true;

  @ViewChild('host') hostRef!: ElementRef<HTMLDivElement>;

  private animation: any = null;
  private destroyed = false;

  async ngAfterViewInit() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      const lottie = await loadLottie();
      if (this.destroyed || !this.hostRef) return;
      this.animation = lottie.loadAnimation({
        container: this.hostRef.nativeElement,
        renderer: 'svg',
        loop: this.loop,
        autoplay: this.autoplay,
        path: this.src
      });
    } catch {
      // Player or JSON failed to load: the host simply stays blank.
    }
  }

  ngOnDestroy() {
    this.destroyed = true;
    if (this.animation) {
      this.animation.destroy();
      this.animation = null;
    }
  }
}
