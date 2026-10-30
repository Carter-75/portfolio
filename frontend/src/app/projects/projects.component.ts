import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../shared/directives/scroll-reveal.directive';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  repo?: string;
  engineeringValue?: string[];
  challenge?: { problem: string; solution: string; };
}

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styles: []
})
export class ProjectsComponent implements OnInit {
  private meta = inject(Meta);
  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: 'Portfolio of full-stack and AI projects by Carter Moyer — including live React, Angular, Next.js, and Node.js applications deployed on Vercel.' });
    this.meta.updateTag({ property: 'og:title', content: 'Projects — Carter Moyer' });
    this.meta.updateTag({ property: 'og:description', content: 'Live projects spanning AI automation, hospitality management, recipe apps, and financial analytics.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://www.carter-portfolio.fyi/images/og-image.jpg' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://www.carter-portfolio.fyi/images/og-image.jpg' });
  }

  private loadedPreviews = new Set<string>();

  isLoaded(title: string): boolean {
    return this.loadedPreviews.has(title);
  }

  markLoaded(title: string): void {
    this.loadedPreviews.add(title);
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getStagger(i: number): number {
    return Math.min(i * 0.08, 0.28);
  }

  readonly projects: Project[] = [
    {
      title: "Dream Chat",
      description: "Public AI chat website that interprets dreams and answers questions on lucid dreaming, sleep paralysis, the Gateway Process, and Mall World, grounded in a labeled knowledge base.",
      tech: ["Angular 21", "Express", "Node.js", "OpenAI", "Tailwind CSS", "Vercel"],
      link: "https://dream-chat-tawny.vercel.app/",
      repo: "https://github.com/Carter-75/dream-chat",
      engineeringValue: [
        "Built a retrieval layer over a labeled dream knowledge base so answers stay grounded in documented research, firsthand accounts, and traditions, kept separate by source type",
        "Designed a public, no-login chat experience with per-IP and global rate limits (10 per minute, 50 per day per IP, 500 per day global) to control AI costs",
        "Shipped as an installable PWA on Vercel with an Angular 21 frontend and an Express API, with iframe headers set for portfolio embedding",
        "Integrated OpenAI chat completions (gpt-5-nano) with retry handling for reliable, complete answers"
      ],
      challenge: {
        problem: "Answering open-ended dream questions without inventing facts or mixing folklore in with research.",
        solution: "Grounded the model in a chunked, source-labeled corpus with keyword retrieval, so each answer draws on labeled sources instead of free generation."
      }
    },
    {
      title: "Hospitality OS",
      description: "Personal project: a full-stack hospitality management system built end-to-end and deployed live, with real-time state synchronization and automated guest workflows.",
      tech: ["Node.js", "Express", "Angular", "MongoDB"],
      link: "https://hotel-planner-black.vercel.app/",
      engineeringValue: [
        "Architected the backend with optimized MongoDB indexing, designed to handle concurrent booking requests cleanly",
        "Implemented real-time dashboard with reactive state management in Angular",
        "Designed secure authentication and role-based access control (RBAC) for staff management"
      ],
      challenge: {
        problem: "Keeping guest and booking state consistent when several sessions change it at the same time.",
        solution: "Implemented optimistic locking and atomic database updates, so simultaneous changes cannot silently overwrite each other."
      }
    },
    {
      title: "Visual Identity Infrastructure",
      description: "Personal design project: a strategic branding and scalable iconography system built to production standards, with grid-based vector construction and multi-format output.",
      tech: ["Adobe Illustrator", "Vector Engineering", "Brand Systems"],
      link: "#",
      engineeringValue: [
        "Mastery of Pen tool and Bezier curve manipulation for precise vector construction",
        "Designed scalable identity systems and multi-layered icon sets for web and print use",
        "Expertise in color theory application and typography selection for branding"
      ],
      challenge: {
        problem: "Translating abstract concepts into clean, scalable vector assets.",
        solution: "Implementation of grid-based design and non-destructive layering techniques."
      }
    },
    {
      title: "Digital Imaging & Asset Optimization",
      description: "Personal project: advanced photo compositing and high-end asset retouching, built around non-destructive, print-ready workflows.",
      tech: ["Adobe Photoshop", "Digital Compositing", "Asset Pipelines"],
      link: "#",
      engineeringValue: [
        "Advanced proficiency in non-destructive editing workflows and smart objects",
        "Complex masking, frequency separation, and color grading for high-end photography",
        "Designing large-scale (PSB) assets with optimized layer management for high resolution"
      ],
      challenge: {
        problem: "Managing massive file sizes (PSB) while maintaining high-performance editing and fidelity.",
        solution: "Optimized layer structure and efficient use of linked smart objects."
      }
    },
    {
      title: "Allowlist Kitchen",
      description: "Personal project: a client-only family recipe site serving 36 meals, each validated ingredient by ingredient against my checked food allowlist, with every ingredient shown next to the exact allowlist entry it was checked against.",
      tech: ["React 18", "Vite 5", "Tailwind CSS 3", "React Router 6"],
      link: "https://allowlist-kitchen.vercel.app/",
      engineeringValue: [
        "Built 36 complete recipes (8 breakfasts, 7 lunches, 12 dinners, 9 treats) with amounts, steps, and per-serving macro estimates",
        "Linked every ingredient to its allowlist entry, with a pantry page listing verdicts and conditions",
        "Computed counts, averages, live search, and quick filters from bundled JSON at runtime so displayed numbers cannot drift from the content",
        "Shipped with no backend, no accounts, no analytics, and no ads"
      ],
      challenge: {
        problem: "Keeping every meal honest to a strict ingredient allowlist where anything unlisted is unapproved.",
        solution: "Stored meals and pantry data as JSON validated against the allowlist, and derived all displayed stats from that data instead of hardcoding them."
      }
    },
    {
      title: "Fabric Mod Client Detector",
      description: "Personal project: a web app that classifies Minecraft Fabric mod .jar files as CLIENT, SERVER, BOTH, or UNKNOWN so players can strip client-only mods before moving a world to a dedicated server. Re-implements my find-client-mods.ps1 script.",
      tech: ["Next.js 14", "TypeScript", "React 18", "Bulma", "Matter.js", "Anime.js"],
      link: "https://ai-mod-client-finder.vercel.app/",
      engineeringValue: [
        "Used Modrinth API client_side and server_side data as the primary classifier, with no AI or key needed when it is decisive",
        "Added an optional OpenAI fallback that uses the visitor's key, then a server env key, then reports an honest UNKNOWN",
        "Kept the server stateless with a single POST /api/classify endpoint that classifies one jar per request",
        "Persisted the mod list and every verdict in browser localStorage so scans resume after a refresh"
      ],
      challenge: {
        problem: "Turning a local PowerShell script into a web app that runs on serverless hosting without browser automation.",
        solution: "Dropped Playwright for Modrinth data plus plain HTTP lookups, and moved scan state into the browser so the server stores nothing."
      }
    },
    {
      title: "Technical Education Engine",
      description: "Personal project: an interactive coding-practice platform delivering tiered programming challenges with automated, real-time logic evaluation.",
      tech: ["Angular 21", "TypeScript", "AI API", "JSON Schema", "Tailwind CSS"],
      link: "https://code-practice-nu.vercel.app/",
      engineeringValue: [
        "Developed dynamic curriculum engine utilizing tiered JSON-based skill trees",
        "Integrated advanced logic assessment across four evaluation modalities",
        "Built high-performance Angular UI with responsive state persistence",
        "Engineered custom validation layers that check code output against expected results"
      ],
      challenge: {
        problem: "Transforming static data into diverse, non-repetitive training tasks.",
        solution: "Engineered sophisticated data generation pipeline with contextual anchoring."
      }
    },
    {
      title: "Enterprise Outreach Infrastructure",
      description: "Built for my own business: the campaign management and inbox system behind Phoenix Websites AI outreach, with AES-256 encrypted credential storage and automated mailbox sync.",
      tech: ["Next.js 15", "Node.js", "MongoDB", "Vercel Functions", "AES-256 Encryption"],
      link: "https://cold-emailing-website.vercel.app/",
      engineeringValue: [
        "Designed brand-agnostic infrastructure with dynamic port discovery and secure config",
        "Implemented transparent AES-256-GCM encryption for sensitive user credentials",
        "Optimized MongoDB connection pooling for Vercel Serverless Functions",
        "Built real-time tracking analytics with automated campaign scheduling"
      ],
      challenge: {
        problem: "Managing sensitive outreach credentials across insecure environments.",
        solution: "Implemented robust encryption layer with soft-failure fallbacks and optimized sync scripts."
      }
    },
    {
      title: "Financial Simulation Engine",
      description: "Personal project: a lottery winnings planner that tracks lump sum and annuity scenarios side by side, with tax modeling and sustainable withdrawal math, all running client-side.",
      tech: ["Next.js 14", "TypeScript", "Bulma"],
      link: "https://lottery-three.vercel.app/",
      engineeringValue: [
        "Tracked lump sum and annuity as two alternative scenarios updated with interest, annuity payments, and spending",
        "Modeled taxes across 2024 federal brackets plus capital gains and inflation",
        "Calculated sustainable withdrawal limits that still reach a legacy goal",
        "Persisted plans in localStorage with CSV and JSON export plus JSON import"
      ],
      challenge: {
        problem: "Modeling investment growth, taxes, and spending over decades for two payout options.",
        solution: "Built a client-side calculation engine with year-by-year simulation factoring in inflation, with no data sent to a server."
      }
    },
    {
      title: "Reactive Gameplay Database",
      description: "Personal project: a companion app for the Doomlings card game that tracks a live game, including players, age deck, dominants, trinkets, and Meaning of Life scoring, with card search by name or effect.",
      tech: ["Next.js 15", "React 18", "TypeScript", "Tailwind CSS", "Custom CSS"],
      link: "https://doomlings.vercel.app/",
      engineeringValue: [
        "Built card search by name or effect across card data loaded from JSON",
        "Engineered responsive mobile-first design optimized for use at the table",
        "Implemented game state persistence plus named save slots",
        "Built an age deck builder mixing normal ages, merchant ages, and catastrophes"
      ],
      challenge: {
        problem: "Keeping card lookups and game tracking quick during an active game.",
        solution: "Loaded all card data as JSON at runtime and kept game state local so lookups never wait on a server."
      }
    }
  ];
}
