import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styles: [`
    .contact-card {
      @apply p-8 rounded-3xl bg-slate-800/40 border border-white/5 hover:border-blue-500/30 transition-all duration-300;
    }
  `]
})
export class ContactComponent {
  contactInfo = {
    email: 'Cartermoyer75@gmail.com',
    location: 'Fond du Lac, WI',
    github: 'https://github.com/Carter-75',
    linkedin: 'https://linkedin.com/in/cartermoyer'
  };

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    const mailtoLink = `mailto:${this.contactInfo.email}?subject=${encodeURIComponent(this.formData.subject)}&body=${encodeURIComponent(
      `Name: ${this.formData.name}\nEmail: ${this.formData.email}\n\n${this.formData.message}`
    )}`;
    window.location.href = mailtoLink;
  }
}
