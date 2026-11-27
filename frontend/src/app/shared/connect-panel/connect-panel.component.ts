import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ConnectLink {
  label: string;
  url: string;
}

@Component({
  selector: 'app-connect-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <button type="button" (click)="toggle()" aria-haspopup="dialog" [attr.aria-expanded]="open()"
       class="h-10 px-4 rounded-lg bg-slate-900 border border-white/5 inline-flex items-center gap-2.5 hover:bg-blue-700 transition-all text-slate-300 hover:text-white"
       aria-label="Open the Connect panel with every platform link">
      <svg class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="17" cy="6" r="2.5" />
        <circle cx="17" cy="18" r="2.5" />
        <path stroke-linecap="round" d="M8.2 10.8 14.8 7.2M8.2 13.2l6.6 3.6" />
      </svg>
      <span class="text-sm font-bold tracking-wide">Connect</span>
    </button>

    <!-- Backdrop -->
    <div (click)="close()" aria-hidden="true"
         class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-opacity duration-300"
         [class.opacity-0]="!open()" [class.opacity-100]="open()"
         [class.pointer-events-none]="!open()" [class.invisible]="!open()"></div>

    <!-- Slide-out panel -->
    <aside role="dialog" aria-modal="true" aria-label="Connect: every platform link"
           class="fixed inset-y-0 right-0 w-[22rem] max-w-[90vw] bg-slate-950 border-l border-white/10 shadow-2xl z-[120] flex flex-col transition-transform [transition-duration:320ms] [transition-timing-function:var(--ease-spring-soft)]"
           [class.translate-x-0]="open()" [class.translate-x-full]="!open()"
           [class.invisible]="!open()">
      <div class="flex items-start justify-between p-6 border-b border-white/5">
        <div>
          <h2 class="text-xl font-black tracking-tight text-white">Connect</h2>
          <p class="text-slate-500 text-sm font-medium mt-1">One place for every platform.</p>
        </div>
        <button type="button" (click)="close()" aria-label="Close the Connect panel"
           class="w-9 h-9 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-700 transition-all">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto p-4" aria-label="Platform links">
        <ul class="flex flex-col gap-1.5">
          <li *ngFor="let link of links; let i = index">
            <a [href]="link.url" target="_blank" rel="noopener noreferrer" (click)="close()"
               class="flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border border-white/5 bg-slate-900/60 hover:bg-blue-950 hover:border-blue-600/40 transition-all group">
              <span class="text-sm tracking-wide" [class.font-black]="i === 0" [class.text-white]="i === 0" [class.font-semibold]="i !== 0" [class.text-slate-300]="i !== 0">{{ link.label }}</span>
              <svg class="w-4 h-4 shrink-0 text-slate-500 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>

      <p class="p-6 pt-2 text-slate-600 text-xs font-medium leading-relaxed">
        The fastest way to reach me is still the contact page or hello@phoenixwebsites.ai.
      </p>
    </aside>
  `
})
export class ConnectPanelComponent {
  readonly open = signal(false);

  readonly links: ConnectLink[] = [
    { label: 'Free website audit', url: 'https://phoenixwebsites.ai' },
    { label: 'YouTube',            url: 'https://www.youtube.com/@phoenixwebsites' },
    { label: 'TikTok',             url: 'https://www.tiktok.com/@phoenixwebsites.ai' },
    { label: 'Facebook',           url: 'https://www.facebook.com/61595196375218' },
    { label: 'X',                  url: 'https://x.com/CarterM75' },
    { label: 'LinkedIn',           url: 'https://www.linkedin.com/in/carter-moyer-66993b24a' },
    { label: 'Patreon',            url: 'https://www.patreon.com/c/PhoenixWebsites' },
    { label: 'Fiverr',             url: 'https://www.fiverr.com/ph75nix' },
    { label: 'Gumroad',            url: 'https://ph75nix.gumroad.com' },
    { label: 'Product Hunt',       url: 'https://www.producthunt.com/@ph75nix' },
    { label: 'GitHub',             url: 'https://github.com/Carter-75' }
  ];

  toggle(): void {
    this.open.update(v => !v);
  }

  close(): void {
    this.open.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.close();
  }
}
