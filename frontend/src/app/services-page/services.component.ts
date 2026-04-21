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
  readonly isStripeConfigured = !!this.stripePublishableKey && this.stripePublishableKey.startsWith('pk_');


  readonly tiers = [
    {
      id: 'simple',
      title: 'Simple',
      cost: '100',
      description: 'Perfect for personal blogs or basic landing pages.',
      buyButtonId: 'buy_btn_1TMBskGpTv6ynWY8BjUTxJfx',
      features: ['Single Page Website', 'Responsive Design', 'Contact Form', 'Basic SEO'],
      featured: false
    },
    {
      id: 'better',
      title: 'Better',
      cost: '250',
      description: 'Ideal for portfolios and small businesses.',
      buyButtonId: 'buy_btn_1TMBtIGpTv6ynWY8RwcUCJ1m',
      features: ['Up to 5 Pages', 'Dynamic Content', 'Animations', 'CMS Integration', 'Advanced SEO'],
      featured: true
    },
    {
      id: 'professional',
      title: 'Professional',
      cost: '475',
      description: 'Full-scale solution for serious businesses.',
      buyButtonId: 'buy_btn_1TMBteGpTv6ynWY8FvAM6EHm',
      features: ['Unlimited Pages', 'E-commerce / Stripe', 'User Authentication', 'Database Integration', 'Admin Dashboard', 'Premium Support'],
      featured: false
    }
  ];

  getStagger(i: number): number {
    return i * 0.12;
  }

  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: 'Freelance web development services by Carter Moyer. Fixed-price packages from $100 for landing pages to $475 for full-stack applications with auth, database, and admin dashboards.' });
    this.meta.updateTag({ property: 'og:title', content: 'Services & Pricing — Carter Moyer' });
    this.meta.updateTag({ property: 'og:description', content: 'Transparent, fixed-price web development packages. Simple landing pages to enterprise-grade full-stack builds.' });
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
        name: 'Web Development Services',
        itemListElement: [
          { '@type': 'Offer', name: 'Simple Website', price: '100', priceCurrency: 'USD', description: 'Single page website, responsive design, contact form, and basic SEO.' },
          { '@type': 'Offer', name: 'Better Website', price: '250', priceCurrency: 'USD', description: 'Up to 5 pages, dynamic content, animations, CMS integration, and advanced SEO.' },
          { '@type': 'Offer', name: 'Professional Website', price: '475', priceCurrency: 'USD', description: 'Unlimited pages, e-commerce, user authentication, database integration, admin dashboard, and premium support.' }
        ]
      }
    });
    this.doc.head.appendChild(script);
    this.destroyRef.onDestroy(() => script.remove());
  }
}
