import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styles: [`
    .hero-container {
      @apply relative min-h-[90vh] flex items-center px-8 max-w-7xl mx-auto overflow-hidden;
    }
    .blur-glow {
      @apply absolute -z-10 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none animate-pulse;
    }
  `]
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService);

  ngOnInit() {
    this.checkConnectivity();
  }

  private checkConnectivity() {
    this.api.getData('ping').subscribe({
      next: (res: any) => {
        if (res?.status === 'ok') {
          console.log('%c CORE STATUS: ONLINE ', 'background: #065f46; color: #fff; font-weight: bold;');
        } else {
          console.warn('%c CORE STATUS: OFFLINE ', 'background: #991b1b; color: #fff; font-weight: bold;');
        }
      },
      error: () => {
        console.error('%c CORE STATUS: OFFLINE ', 'background: #991b1b; color: #fff; font-weight: bold;');
      }
    });
  }
}
