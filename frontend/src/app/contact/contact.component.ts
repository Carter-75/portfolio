import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';
import { ScrollRevealDirective } from '../shared/directives/scroll-reveal.directive';
import gsap from 'gsap';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styles: []
})
export class ContactComponent implements OnInit {
  private meta = inject(Meta);
  private api  = inject(ApiService);

  readonly contactInfo = {
    email:    'hello@carter-portfolio.fyi',
    phone:    '(920) 904-2695',
    location: 'La Crosse, WI',
    github:   'https://github.com/Carter-75',
    linkedin: 'https://linkedin.com/in/cartermoyer'
  };

  formData = { name: '', email: '', subject: '', message: '' };

  readonly formStatus  = signal<FormStatus>('idle');
  readonly serverError = signal('');

  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: 'Get in touch with Carter Moyer for freelance web development, AI integration projects, or enterprise architectural engagements. Response within 24 hours.' });
    this.meta.updateTag({ property: 'og:title', content: 'Contact Carter Moyer' });
    this.meta.updateTag({ property: 'og:description', content: 'Reach out for project inquiries, collaborations, or just to say hello. Based in La Crosse, WI.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://www.carter-portfolio.fyi/images/og-image.jpg' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://www.carter-portfolio.fyi/images/og-image.jpg' });
  }

  onSubmit() {
    const invalids = this.findInvalidFields();
    if (invalids.length) {
      this.shakeFields(invalids);
      return;
    }
    this.submit();
  }

  private findInvalidFields(): string[] {
    const out: string[] = [];
    if (!this.formData.name.trim())    out.push('[name="name"]');
    if (!this.isValidEmail())           out.push('[name="email"]');
    if (!this.formData.subject.trim()) out.push('[name="subject"]');
    if (!this.formData.message.trim()) out.push('[name="message"]');
    return out;
  }

  private isValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email);
  }

  private shakeFields(selectors: string[]) {
    selectors.forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      gsap.timeline()
        .to(el, { x: -9, borderColor: '#ef4444', duration: 0.07 })
        .to(el, { x:  9, duration: 0.07 })
        .to(el, { x: -6, duration: 0.07 })
        .to(el, { x:  6, duration: 0.07 })
        .to(el, { x:  0, duration: 0.07 })
        .to(el, { borderColor: 'rgba(255,255,255,0.1)', duration: 0.6, delay: 0.3 });
    });
  }

  private submit() {
    this.formStatus.set('submitting');
    this.serverError.set('');

    this.api.postData<{ success: boolean; message: string }>('contact', {
      name:    this.formData.name.trim(),
      email:   this.formData.email.trim(),
      subject: this.formData.subject.trim(),
      message: this.formData.message.trim()
    }).subscribe({
      next: () => {
        this.formStatus.set('success');
        this.formData = { name: '', email: '', subject: '', message: '' };
      },
      error: (err) => {
        const msg = err?.error?.error || 'Failed to send. Please email directly at hello@carter-portfolio.fyi';
        this.serverError.set(msg);
        this.formStatus.set('error');
      }
    });
  }

  resetForm() {
    this.formStatus.set('idle');
    this.serverError.set('');
  }
}
