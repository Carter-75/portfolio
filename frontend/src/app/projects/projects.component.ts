import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../shared/directives/scroll-reveal.directive';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
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

  getStagger(i: number): number {
    return Math.min(i * 0.08, 0.28);
  }

  readonly projects: Project[] = [
    {
      title: "Hospitality OS",
      description: "Enterprise-grade hospitality management system with real-time state synchronization and automated guest workflows.",
      tech: ["Node.js", "Express", "Angular", "MongoDB"],
      link: "https://hotel-planner-black.vercel.app/",
      engineeringValue: [
        "Architected scalable backend with optimized MongoDB indexing for high-concurrency booking requests",
        "Implemented real-time dashboard with reactive state management in Angular",
        "Designed secure authentication and role-based access control (RBAC) for staff management"
      ],
      challenge: {
        problem: "Synchronizing complex guest states across multiple concurrent sessions without race conditions.",
        solution: "Implemented optimistic locking and atomic DB updates, ensuring 100% data integrity during peak booking loads."
      }
    },
    {
      title: "Visual Identity Infrastructure",
      description: "Strategic branding and scalable iconography systems developed for high-fidelity production environments.",
      tech: ["Adobe Illustrator", "Vector Engineering", "Brand Systems"],
      link: "#",
      engineeringValue: [
        "Mastery of Pen tool and Bezier curve manipulation for precise vector construction",
        "Designed scalable identity systems and multi-layered icon sets for production use",
        "Expertise in color theory application and typography selection for branding"
      ],
      challenge: {
        problem: "Translating complex client concepts into clean, scalable vector assets.",
        solution: "Implementation of grid-based design and non-destructive layering techniques."
      }
    },
    {
      title: "Digital Imaging & Asset Optimization",
      description: "Advanced photo-compositing and high-end asset retouching for large-scale digital deployments.",
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
      description: "A high-performance recipe management system featuring dynamic macro tracking and lazy-loaded assets.",
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
      title: "AI-Agent Outreach Pipeline",
      description: "Production-grade scraping and classification engine utilizing OpenAI and Playwright for lead identification.",
      tech: ["Next.js 14", "TypeScript", "Playwright", "OpenAI", "Matter.js"],
      link: "https://ai-mod-client-finder.vercel.app/",
      engineeringValue: [
        "Re-implemented a crash-safe AI + scraping pipeline with two-pass classification and retries",
        "Persisted streaming scan state and mod verdicts for instant resume across refreshes",
        "Delivered configurable OpenAI key handling with local preference toggles",
        "Generated synchronized metadata bundles for client-only categories"
      ],
      challenge: {
        problem: "Translating monolithic logic into a production web experience without losing resumability.",
        solution: "Built a modular Next.js architecture with SSE progress streaming and headless Chromium."
      }
    },
    {
      title: "AI Technical Education Engine",
      description: "Intelligent platform delivering tiered programming challenges with automated real-time logic evaluation.",
      tech: ["Angular 21", "TypeScript", "AI API", "JSON Schema", "Tailwind CSS"],
      link: "https://code-practice-nu.vercel.app/",
      engineeringValue: [
        "Developed dynamic curriculum engine utilizing tiered JSON-based skill trees",
        "Integrated advanced AI evaluation for automated logic assessment across four modalities",
        "Built high-performance Angular UI with responsive state persistence",
        "Engineered custom validation layers ensuring code output matches academic standards"
      ],
      challenge: {
        problem: "Transforming static data into diverse, non-repetitive AI-generated training tasks.",
        solution: "Engineered sophisticated prompt engineering pipeline with contextual anchoring."
      }
    },
    {
      title: "Enterprise Outreach Infrastructure",
      description: "High-deliverability campaign management system featuring AES-256 encrypted credential storage.",
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
      description: "Strategic calculator for financial projections utilizing complex mathematical modeling and Chart.js.",
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
      description: "Optimized mobile companion featuring fuzzy search and low-latency card lookups for active gameplay.",
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
