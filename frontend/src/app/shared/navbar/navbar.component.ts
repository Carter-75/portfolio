import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styles: [`
    :host {
      @apply block fixed top-0 left-0 right-0 z-[100];
    }
    .nav-container {
      @apply transition-all duration-500 bg-[#020617]/80 backdrop-blur-2xl border-b border-white/5;
    }
    .hamburger-line {
      @apply block w-6 h-0.5 bg-blue-500 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)];
    }
  `]
})
export class NavbarComponent {
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
