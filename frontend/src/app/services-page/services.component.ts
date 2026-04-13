import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styles: []
})
export class ServicesComponent {
  private http = inject(HttpClient);
  isProcessing = false;

  tiers = [
    {
      id: 'simple',
      title: 'Simple',
      cost: '25',
      description: 'Perfect for personal blogs or basic landing pages.',
      features: [
        'Single Page Website',
        'Responsive Design',
        'Contact Form',
        'Basic SEO'
      ],
      featured: false
    },
    {
      id: 'better',
      title: 'Better',
      cost: '100',
      description: 'Ideal for portfolios and small businesses.',
      features: [
        'Up to 5 Pages',
        'Dynamic Content',
        'Animations',
        'CMS Integration',
        'Advanced SEO'
      ],
      featured: true
    },
    {
      id: 'professional',
      title: 'Professional',
      cost: '250',
      description: 'Full-scale solution for serious businesses.',
      features: [
        'Unlimited Pages',
        'E-commerce / Stripe',
        'User Authentication',
        'Database Integration',
        'Admin Dashboard',
        'Premium Support'
      ],
      featured: false
    }
  ];

  initializeCheckout(tier: any) {
    if (this.isProcessing) return;
    this.isProcessing = true;

    // Collect default data for the demo checkout
    // In a real scenario, this might come from a modal or state
    const checkoutData = {
      tier: tier.id,
      email: 'carter-visitor@example.com', // Placeholder
      name: 'Valued Client',
      projectType: tier.title + ' Build',
      message: 'Initial build request from portfolio.'
    };

    const apiUrl = '/api/stripe/checkout';
    
    this.http.post<{ url: string }>(apiUrl, checkoutData).subscribe({
      next: (res) => {
        if (res.url) {
          window.location.href = res.url;
        } else {
          alert('Failed to initialize Stripe. Please check your network.');
          this.isProcessing = false;
        }
      },
      error: (err) => {
        console.error('Checkout error:', err);
        alert('Payment service unavailable. Please contact Carter directly.');
        this.isProcessing = false;
      }
    });
  }
}
