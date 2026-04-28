import { ChangeDetectionStrategy, Component, OnInit, inject, afterNextRender, DestroyRef } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';
import { SeoService } from '../services/seo.service';
import { ScrollRevealDirective } from '../shared/directives/scroll-reveal.directive';
import gsap from 'gsap';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ScrollRevealDirective],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private api        = inject(ApiService);
  private seo        = inject(SeoService);
  private meta       = inject(Meta);
  private doc        = inject(DOCUMENT);
  private destroyRef = inject(DestroyRef);

  readonly stats = [
    { value: '9+',   label: 'Live Projects',  gradient: false },
    { value: '3+',   label: 'Years Building',  gradient: false },
    { value: '$99',  label: 'Starts From',     gradient: true  },
    { value: '<24h', label: 'Response Time',   gradient: false },
  ];

  readonly techStack = ['Angular', 'React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'GPT-4'];

  constructor() {
    afterNextRender(() => this.runHeroTimeline());
  }

  ngOnInit() {
    this.seo.updateMeta(
      'Carter Moyer — Full-Stack Engineer & AI Architect',
      'Carter Moyer: Full-stack engineer & AI architect. Specialized in Angular, React, & GPT-4. High-performance, fixed-price web solutions starting at $99.'
    );
    this.seo.setCanonicalUrl('https://www.carter-portfolio.fyi/home');
    
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

  private injectJsonLd() {
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      'name': 'Carter Moyer Development',
      'image': 'https://www.carter-portfolio.fyi/images/og-image.jpg',
      'url': 'https://www.carter-portfolio.fyi',
      'priceRange': '$$',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'La Crosse',
        'addressRegion': 'WI',
        'postalCode': '54601',
        'addressCountry': 'US'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 43.8138,
        'longitude': -91.2519
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '18:00'
      },
      'sameAs': [
        'https://github.com/Carter-75',
        'https://linkedin.com/in/carter-moyer-66993b24a'
      ],
      'knowsAbout': ['Angular', 'React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'GPT-4', 'AI Integration']
    });
    this.doc.head.appendChild(script);
    this.destroyRef.onDestroy(() => script.remove());
  }

  private checkConnectivity() {
    this.api.getData<{ status: string }>('ping').subscribe();
  }

  private runHeroTimeline() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl
      .from('.hero-glow-1', { opacity: 0, scale: 0.7, duration: 2.0 }, 0)
      .from('.hero-glow-2', { opacity: 0, scale: 0.7, duration: 2.0 }, 0.30)
      .from('.hero-label',  { opacity: 0, y: 20,    duration: 0.65 }, 0.15)
      .from('.hero-h1',     { opacity: 0, y: 50,    duration: 0.90, ease: 'power4.out' }, 0.32)
      .from('.hero-sub',    { opacity: 0, y: 30,    duration: 0.70 }, 0.58)
      .from('.hero-cta',    { opacity: 0, y: 25,    duration: 0.65 }, 0.78)
      .from('.hero-visual', { opacity: 0, x: 50,    duration: 1.00, ease: 'power2.out' }, 0.50);
  }
}
