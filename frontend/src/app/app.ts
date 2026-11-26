import {
  Component, ChangeDetectionStrategy, inject, signal
} from '@angular/core';
import {
  RouterOutlet, RouterLink, Router, NavigationEnd
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  trigger, transition, style, animate, query
} from '@angular/animations';
import { ChatbotComponent }   from './chatbot/chatbot.component';
import { NavbarComponent }    from './shared/navbar/navbar.component';
import { ParticlesComponent } from './shared/particles/particles.component';
import { ConnectPanelComponent } from './shared/connect-panel/connect-panel.component';

const routeFade = trigger('routeFade', [
  transition('* => *', [
    query(':leave', [
      animate('150ms ease-in', style({ opacity: 0 }))
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(14px)' }),
      animate('360ms cubic-bezier(0.33, 1, 0.68, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true })
  ])
]);

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, ChatbotComponent, NavbarComponent, ParticlesComponent, ConnectPanelComponent],
  animations: [routeFade],
  template: `
    <app-particles></app-particles>
    <app-navbar></app-navbar>

    <main class="min-h-screen pt-24 md:pt-32 relative z-10">
      <div [@routeFade]="routeKey()">
        <router-outlet></router-outlet>
      </div>
    </main>

    <footer class="py-16 px-6 md:py-32 md:px-8 border-t border-white/5 bg-slate-950 relative z-10">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">
        <div class="flex flex-col gap-6 max-w-sm">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center font-black text-white shadow-2xl" aria-hidden="true">CM</div>
            <span class="text-xl font-black tracking-tight text-white italic">Carter <span class="text-blue-600">Moyer</span></span>
          </div>
          <p class="text-slate-500 text-sm font-medium leading-relaxed">
            Architecting high-performance applications with a relentless focus on technical excellence.
          </p>
          <div class="mt-2">
            <app-connect-panel />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-32 leading-loose">
          <div class="flex flex-col gap-4">
            <span class="text-white font-black uppercase tracking-[0.3em] fluid-tiny mb-2">Navigation</span>
            <nav class="flex flex-col gap-1" aria-label="Footer navigation">
              <a routerLink="/home"     class="nav-link w-fit">Home</a>
              <a routerLink="/about"    class="nav-link w-fit">About</a>
              <a routerLink="/projects" class="nav-link w-fit">Projects</a>
              <a routerLink="/resume"   class="nav-link w-fit">Resume</a>
              <a routerLink="/contact"  class="nav-link w-fit">Contact</a>
            </nav>
          </div>
          <div class="flex flex-col items-center md:items-end gap-2 shrink-0">
            <p class="fluid-tiny font-black text-slate-700 uppercase tracking-[0.4em]">© 2026 Carter Moyer</p>
          </div>
        </div>
      </div>
    </footer>

    @defer (on idle) {
      <app-chatbot />
    }
  `
})
export class App {
  private router = inject(Router);
  readonly routeKey = signal(0);

  constructor() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => this.routeKey.update(n => n + 1));
  }
}
