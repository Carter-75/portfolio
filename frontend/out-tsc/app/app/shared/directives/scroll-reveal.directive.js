import { __decorate } from "tslib";
import { Directive, ElementRef, Input, inject } from '@angular/core';
import gsap from 'gsap';
let ScrollRevealDirective = class ScrollRevealDirective {
    srY = 40;
    srX = 0;
    srDelay = 0;
    srDuration = 0.75;
    el = inject((ElementRef));
    observer;
    ngAfterViewInit() {
        if (typeof window === 'undefined')
            return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        gsap.set(this.el.nativeElement, { opacity: 0, y: this.srY, x: this.srX });
        this.observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting)
                return;
            gsap.to(this.el.nativeElement, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: this.srDuration,
                delay: this.srDelay,
                ease: 'power3.out',
                onComplete: () => gsap.set(this.el.nativeElement, { clearProps: 'y,x' })
            });
            this.observer.unobserve(this.el.nativeElement);
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        this.observer.observe(this.el.nativeElement);
    }
    ngOnDestroy() {
        this.observer?.disconnect();
    }
};
__decorate([
    Input()
], ScrollRevealDirective.prototype, "srY", void 0);
__decorate([
    Input()
], ScrollRevealDirective.prototype, "srX", void 0);
__decorate([
    Input()
], ScrollRevealDirective.prototype, "srDelay", void 0);
__decorate([
    Input()
], ScrollRevealDirective.prototype, "srDuration", void 0);
ScrollRevealDirective = __decorate([
    Directive({
        selector: '[scrollReveal]',
        standalone: true
    })
], ScrollRevealDirective);
export { ScrollRevealDirective };
//# sourceMappingURL=scroll-reveal.directive.js.map