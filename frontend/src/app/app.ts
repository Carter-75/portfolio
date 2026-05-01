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
  imports: [RouterOutlet, RouterLink, ChatbotComponent, NavbarComponent, ParticlesComponent],
  animations: [routeFade],
  template: `
    <app-particles></app-particles>
    <app-navbar></app-navbar>

    <main class="min-h-screen pt-32 relative z-10">
      <div [@routeFade]="routeKey()">
        <router-outlet></router-outlet>
      </div>
    </main>

    <footer class="py-32 px-8 border-t border-white/5 bg-slate-950 relative z-10">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
        <div class="flex flex-col gap-6 max-w-sm">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center font-black text-white shadow-2xl" aria-hidden="true">CM</div>
            <span class="text-xl font-black tracking-tight text-white italic">Carter <span class="text-blue-600">Moyer</span></span>
          </div>
          <p class="text-slate-500 text-sm font-medium leading-relaxed">
            Architecting high-performance applications and intelligent automation suites with a relentless focus on technical excellence.
          </p>
          <div class="flex gap-4 mt-2">
            <a href="https://github.com/Carter-75" target="_blank" rel="noopener noreferrer"
               class="w-10 h-10 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center hover:bg-blue-700 transition-all text-slate-400 hover:text-white"
               aria-label="Carter Moyer on GitHub">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a href="https://linkedin.com/in/carter-moyer-66993b24a" target="_blank" rel="noopener noreferrer"
               class="w-10 h-10 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center hover:bg-blue-700 transition-all text-slate-400 hover:text-white"
               aria-label="Carter Moyer on LinkedIn">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 leading-loose">
          <div class="flex flex-col gap-4">
            <span class="text-white font-black uppercase tracking-[0.3em] fluid-tiny mb-2">Navigation</span>
            <nav class="flex flex-col gap-1" aria-label="Footer navigation">
              <a routerLink="/home"     class="!text-white hover:text-blue-500 transition-colors text-sm font-bold py-2 px-3 -ml-3 rounded-lg hover:bg-white/5">Home</a>
              <a routerLink="/about"    class="!text-white hover:text-blue-500 transition-colors text-sm font-bold py-2 px-3 -ml-3 rounded-lg hover:bg-white/5">About</a>
              <a routerLink="/projects" class="!text-white hover:text-blue-500 transition-colors text-sm font-bold py-2 px-3 -ml-3 rounded-lg hover:bg-white/5">Projects</a>
              <a routerLink="/contact"  class="!text-white hover:text-blue-500 transition-colors text-sm font-bold py-2 px-3 -ml-3 rounded-lg hover:bg-white/5">Contact</a>
            </nav>
          </div>
          <div class="flex flex-col items-center md:items-end gap-2 shrink-0">
            <p class="fluid-tiny font-black text-slate-700 uppercase tracking-[0.4em]">© 2026 carter-portfolio.fyi</p>
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
