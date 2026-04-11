import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  engineeringValue?: string;
  challenge?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styles: [`
    .projects-grid {
      @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8;
    }
    .project-card {
      @apply bg-slate-800/40 border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-slate-800/60 hover:border-blue-500/20;
    }
  `]
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: "Delish Healthy Food",
      description: "76+ high-protein recipes with macro tracking and glass-morphism UI.",
      tech: ["React", "Tailwind CSS", "Vite"],
      link: "https://delish-healthy-food.vercel.app/",
      engineeringValue: "Built a custom data-normalization pipeline for recipe macros.",
      challenge: "Optimizing image loading for 70+ high-res food assets."
    },
    {
      title: "AI Mod Client Finder",
      description: "Fabric mod scanner with Playwright scraping and OpenAI classification.",
      tech: ["Next.js", "Playwright", "OpenAI"],
      link: "https://ai-mod-client-finder.vercel.app/",
      engineeringValue: "Implemented a self-healing scraping worker using Playwright.",
      challenge: "Handling OpenAI rate limits during bulk mod classification."
    },
    {
      title: "Animation Studio",
      description: "AI-powered 2D animation platform with real-time canvas rendering.",
      tech: ["React", "Canvas API", "Web Workers"],
      link: "https://animation-studio.vercel.app/",
      engineeringValue: "Offloaded heavy physics calculations to multi-threaded Web Workers.",
      challenge: "Maintaining 60FPS while rendering 1000+ interactive nodes."
    },
    {
      title: "Lottery Analytics Tool",
      description: "Financial modeling for lottery winnings and tax calculations.",
      tech: ["React", "Chart.js"],
      link: "https://lottery-three.vercel.app/",
      engineeringValue: "Engineered a complex tax-logic engine covering multi-state scenarios.",
      challenge: "Visualizing 30-year inflation projections with interactive charts."
    },
    {
      title: "DOOMlings Game Companion",
      description: "A comprehensive digital companion for the Doomlings card game.",
      tech: ["React", "Next.js", "Bulma CSS"],
      link: "https://doomlings.vercel.app/",
      engineeringValue: "Developed a fuzzy-search engine for fast card retrieval (<50ms).",
      challenge: "Synchronizing state across multiple expansion packs."
    },
    {
      title: "Element Box",
      description: "Physics roadmap for 10,000+ interactive particles.",
      tech: ["JavaScript", "HTML5 Canvas"],
      link: "https://elementbox.vercel.app/", // Verified link from old code
      engineeringValue: "Implemented spatial partitioning for efficient collision detection.",
      challenge: "Managing memory allocation for massive browser-based particle arrays."
    }
  ];
}
