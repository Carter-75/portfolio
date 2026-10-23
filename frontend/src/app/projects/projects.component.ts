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
      title: "Content Delivery Architecture",
      description: "Personal project: a high-performance recipe management app featuring dynamic macro tracking and lazy-loaded assets, deployed live.",
      tech: ["React 18", "Vite 5", "Tailwind CSS 3", "React Router 6"],
      link: "https://delish-healthy-food.vercel.app/",
      engineeringValue: [
        "Engineered scalable recipe database architecture with efficient state management",
        "Implemented dynamic theming system with category-based color palettes",
        "Built responsive glass-morphism UI with optimized performance across devices",
        "Designed modular component architecture enabling easy feature expansion"
      ],
      challenge: {
        problem: "Managing complex calculations across 100+ items while maintaining performance.",
        solution: "Implemented memoization strategies and lazy loading, reducing initial bundle size by 40%."
      }
    },
    {
      title: "Outreach Pipeline",
      description: "Personal project: a production-grade scraping and classification engine using Playwright for automated lead research, with crash-safe, resumable scan state.",
      tech: ["Next.js 14", "TypeScript", "Playwright", "OpenAI", "Matter.js"],
      link: "https://ai-mod-client-finder.vercel.app/",
      engineeringValue: [
        "Re-implemented a crash-safe scraping pipeline with advanced classification and retries",
        "Persisted streaming scan state and mod verdicts for instant resume across refreshes",
        "Delivered configurable OpenAI key handling with local preference toggles",
        "Generated synchronized metadata bundles for saved research categories"
      ],
      challenge: {
        problem: "Translating monolithic logic into a production web experience without losing resumability.",
        solution: "Built a modular Next.js architecture with SSE progress streaming and headless Chromium."
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
      description: "Personal project: a lottery and financial projection calculator built on mathematical modeling and Chart.js, with annuity vs lump-sum comparison.",
      tech: ["React", "JavaScript", "Chart.js", "Mathematical Algorithms"],
      link: "https://lottery-three.vercel.app/",
      engineeringValue: [
        "Developed sophisticated financial projection algorithms with compound interest",
        "Built dynamic data visualization system using Chart.js with real-time updates",
        "Implemented comprehensive tax calculation engine accounting for federal and state brackets",
        "Designed intuitive comparison interface for annuity vs lump-sum analysis"
      ],
      challenge: {
        problem: "Modeling complex scenarios and investment growth over 30+ year timeframes.",
        solution: "Created modular calculation engine with year-by-year simulation factoring in inflation."
      }
    },
    {
      title: "Reactive Gameplay Database",
      description: "Personal project: a mobile companion app for the Doomlings card game, with fuzzy search and low-latency lookups across 200+ cards during live games.",
      tech: ["React", "Next.js", "JavaScript", "Bulma CSS", "Responsive Design"],
      link: "https://doomlings.vercel.app/",
      engineeringValue: [
        "Built efficient search and filter system for 200+ game cards with instant results",
        "Engineered responsive mobile-first design optimized for gameplay scenarios",
        "Implemented server-side rendering with Next.js for optimal load performance",
        "Designed intuitive card database schema with category and ability taxonomies"
      ],
      challenge: {
        problem: "Creating fast card search during active gameplay without disrupting experience.",
        solution: "Implemented fuzzy search with debouncing, achieving <50ms response times."
      }
    }
  ];
}
