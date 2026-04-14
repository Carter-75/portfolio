import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styles: []
})
export class ContactComponent {
  contactInfo = {
    email: 'hello@carter-portfolio.fyi',
    phone: '(920) 904-2695',
    location: 'La Crosse, WI',
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
