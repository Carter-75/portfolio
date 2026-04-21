import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, inject, afterNextRender, DestroyRef } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';
import { ScrollRevealDirective } from '../shared/directives/scroll-reveal.directive';
import gsap from 'gsap';
let HomeComponent = class HomeComponent {
    api = inject(ApiService);
    meta = inject(Meta);
    doc = inject(DOCUMENT);
    destroyRef = inject(DestroyRef);
    stats = [
        { value: '9+', label: 'Live Projects', gradient: false },
        { value: '3+', label: 'Years Building', gradient: false },
        { value: '$100', label: 'Starts From', gradient: true },
        { value: '<24h', label: 'Response Time', gradient: false },
    ];
    techStack = ['Angular', 'React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'GPT-4'];
    constructor() {
        afterNextRender(() => this.runHeroTimeline());
    }
    ngOnInit() {
        this.meta.updateTag({ name: 'description', content: 'Carter Moyer is a full-stack engineer and AI architect specializing in Angular, React, Node.js, and GPT-4 integration. Fixed-price freelance packages from $100. Based in La Crosse, WI.' });
        this.meta.updateTag({ property: 'og:title', content: 'Carter Moyer — Full-Stack Engineer & AI Architect' });
        this.meta.updateTag({ property: 'og:description', content: 'Full-stack web apps and AI tools built fast, at fixed prices. Angular · React · Node.js · GPT-4.' });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:image', content: 'https://www.carter-portfolio.fyi/images/og-image.jpg' });
        this.meta.updateTag({ property: 'og:image:width', content: '1200' });
        this.meta.updateTag({ property: 'og:image:height', content: '630' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://www.carter-portfolio.fyi/images/og-image.jpg' });
        this.injectJsonLd();
        this.checkConnectivity();
    }
    injectJsonLd() {
        const script = this.doc.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Carter Moyer',
            jobTitle: 'Full-Stack Engineer & AI Architect',
            url: 'https://www.carter-portfolio.fyi',
            email: 'help@carter-portfolio.fyi',
            sameAs: [
                'https://github.com/Carter-75',
                'https://linkedin.com/in/carter-moyer-66993b24a'
            ],
            knowsAbout: ['Angular', 'React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'GPT-4', 'AI Integration'],
            alumniOf: { '@type': 'EducationalOrganization', name: 'University of Wisconsin-La Crosse' },
            address: { '@type': 'PostalAddress', addressLocality: 'La Crosse', addressRegion: 'WI', addressCountry: 'US' }
        });
        this.doc.head.appendChild(script);
        this.destroyRef.onDestroy(() => script.remove());
    }
    checkConnectivity() {
        this.api.getData('ping').subscribe();
    }
    runHeroTimeline() {
        gsap.set('.hero-label', { y: 20 });
        gsap.set('.hero-h1', { y: 50 });
        gsap.set('.hero-sub', { y: 30 });
        gsap.set('.hero-cta', { y: 25 });
        gsap.set('.hero-visual', { x: 50 });
        gsap.set(['.hero-glow-1', '.hero-glow-2'], { scale: 0.7 });
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl
            .to('.hero-glow-1', { opacity: 0.20, scale: 1, duration: 2.0 }, 0)
            .to('.hero-glow-2', { opacity: 0.12, scale: 1, duration: 2.0 }, 0.30)
            .to('.hero-label', { opacity: 1, y: 0, duration: 0.65 }, 0.15)
            .to('.hero-h1', { opacity: 1, y: 0, duration: 0.90, ease: 'power4.out' }, 0.32)
            .to('.hero-sub', { opacity: 1, y: 0, duration: 0.70 }, 0.58)
            .to('.hero-cta', { opacity: 1, y: 0, duration: 0.65 }, 0.78)
            .to('.hero-visual', { opacity: 1, x: 0, duration: 1.00, ease: 'power2.out' }, 0.50);
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        standalone: true,
        changeDetection: ChangeDetectionStrategy.OnPush,
        imports: [CommonModule, RouterLink, ScrollRevealDirective],
        templateUrl: './home.component.html'
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map