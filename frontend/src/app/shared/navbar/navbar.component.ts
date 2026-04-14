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
      @apply transition-all duration-500 bg-[#020617]/80 backdrop-blur-3xl border-b border-white/5;
    }
    .hamburger-line {
      @apply block w-6 h-0.5 bg-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)];
    }
    .glass-button {
      @apply bg-white/5 rounded-lg border border-white/10 active:scale-95 transition-all;
    }
  `]
})
export class NavbarComponent {
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
    this.syncScrollLock();
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.syncScrollLock();
  }

  private syncScrollLock() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.isMenuOpen() ? 'hidden' : '';
    }
  }
}
