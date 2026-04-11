import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styles: [`
    .service-card {
      @apply p-8 rounded-3xl bg-slate-800/40 border border-white/5 hover:border-blue-500/40 transition-all duration-500 flex flex-col h-full;
    }
    .tier-featured {
      @apply ring-2 ring-blue-500 bg-blue-500/10;
    }
  `]
})
export class ServicesComponent {
  tiers = [
    {
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
}
