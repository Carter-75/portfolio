import { ChangeDetectionStrategy, Component, OnInit, inject, DestroyRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../shared/directives/scroll-reveal.directive';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-services',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ScrollRevealDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './services.component.html',
  styles: []
})
export class ServicesComponent implements OnInit {
  private meta       = inject(Meta);
  private doc        = inject(DOCUMENT);
  private destroyRef = inject(DestroyRef);

  readonly stripePublishableKey = environment.stripePublishableKey;
  
  get isStripeConfigured(): boolean {
    const configured = !!this.stripePublishableKey && this.stripePublishableKey.startsWith('pk_');
    console.log('Stripe Config Check:', { configured, keyLength: this.stripePublishableKey?.length });
    return configured;
  }


  readonly tiers = [
    {
      id: 'simple',
      title: 'Simple Launch',
      cost: '350',
      setup: null,
      description: 'A solid foundation for your online presence. Perfect for simple, high-impact landing pages.',
      buyButtonId: 'buy_btn_1TR2ztKFF43Prn2LKQUVpHjP',
      features: ['Single Page Website', 'Responsive Engineering', 'Initial SEO Setup', 'Contact Form Integration'],
      featured: false
    },
    {
      id: 'essential',
      title: 'Essential Care',
      cost: '99',
      setup: '250',
      description: 'Peace of mind with ongoing support and maintenance. We keep your business running smoothly.',
      buyButtonId: 'buy_btn_1TR38VKFF43Prn2LLddGqcbX',
      features: ['30-Day Subscription Trial', 'Hosting & Domain Mgmt', 'Edits & Updates on Demand', '24/7 Uptime Monitoring', 'Backups & Security', 'Google Business Management'],
      featured: true
    },
    {
      id: 'professional',
      title: 'Professional Growth',
      cost: '149',
      setup: '500',
      description: 'Scaling your revenue through data-driven improvements and intelligent automation.',
      buyButtonId: 'buy_btn_1TR3GjKFF43Prn2LV9UGROX6',
      features: ['30-Day Subscription Trial', 'SEO Improvements', 'Lead Capture Optimization', 'Monthly Analytics Reports', 'AI Chatbot Upkeep', 'Ad Landing Page Testing', 'Appointment Integrations'],
      featured: false
    }
  ];

  getStagger(i: number): number {
    return i * 0.12;
  }

  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: 'Scalable web maintenance and growth plans by Carter Moyer. From $99/mo Essential Care to $149/mo Professional suites, ensuring your business scaling remains autonomous and secure.' });
    this.meta.updateTag({ property: 'og:title', content: 'Care Plans & Growth Packages — Carter Moyer' });
    this.meta.updateTag({ property: 'og:description', content: 'Transition from one-time builds to high-value recurring growth. Maintenance, SEO, and AI automation suites tailored for modern enterprise demands.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://www.carter-portfolio.fyi/images/og-image.jpg' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://www.carter-portfolio.fyi/images/og-image.jpg' });
    
    if (!this.isStripeConfigured) {
      console.error('[Stripe Config Error]: stripePublishableKey is not set up yet. Checkout is currently in testing/development mode.');
    }

    this.injectJsonLd();
  }


  private injectJsonLd() {
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      provider: {
        '@type': 'Person',
        name: 'Carter Moyer',
        url: 'https://www.carter-portfolio.fyi'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Web Maintenance & Growth Services',
        itemListElement: [
          { '@type': 'Offer', name: 'Simple Launch', price: '350', priceCurrency: 'USD', description: 'One-time website build for landing pages.' },
          { '@type': 'Offer', name: 'Essential Care', price: '99', priceCurrency: 'USD', description: 'Monthly maintenance, security, and updates.' },
          { '@type': 'Offer', name: 'Professional Growth', price: '149', priceCurrency: 'USD', description: 'Monthly SEO, analytics, and AI automation.' }
        ]
      }
    });
    this.doc.head.appendChild(script);
    this.destroyRef.onDestroy(() => script.remove());
  }
}
