import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Scales the fixed 1280x800 preview iframe inside this frame so the rendered
 * preview always fills the frame width exactly, at any viewport size.
 * Replaces the old stepped scale-[...] classes, which only matched the frame
 * width at a few exact breakpoints and left dead bands everywhere else.
 */
@Directive({
  selector: '[previewScale]',
  standalone: true
})
export class PreviewScaleDirective implements OnInit, OnDestroy {
  private host = inject(ElementRef<HTMLElement>);
  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;
  private frameWidth = 0;

  ngOnInit(): void {
    const el = this.host.nativeElement;
    this.resizeObserver = new ResizeObserver(entries => {
      this.frameWidth = entries[0].contentRect.width;
      this.applyScale();
    });
    this.resizeObserver.observe(el);
    // The iframe is rendered inside a @defer block, so it may appear after init.
    this.mutationObserver = new MutationObserver(() => this.applyScale());
    this.mutationObserver.observe(el, { childList: true, subtree: true });
    this.applyScale();
  }

  private applyScale(): void {
    if (!this.frameWidth) return;
    const iframe = this.host.nativeElement.querySelector('iframe');
    if (iframe) {
      iframe.style.transform = `scale(${this.frameWidth / 1280})`;
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
  }
}
