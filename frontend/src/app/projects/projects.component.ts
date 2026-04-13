import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  engineeringValue?: string[];
  challenge?: {
    problem: string;
    solution: string;
  };
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styles: []
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: "Adobe Illustrator Collections",
      description: "A showcase of vector-based branding, iconography, and complex illustrations developed in Adobe AI.",
      tech: ["Adobe Illustrator", "Vector Graphics", "Brand Identity"],
      link: "#",
      engineeringValue: [
        "Mastery of Pen tool and Bezier curve manipulation for precise vector construction",
        "Designed scalable identity systems and multi-layered icon sets for production use",
        "Expertise in color theory application and typography selection for branding"
      ],
      challenge: {
        problem: "Translating complex client concepts into clean, scalable vector assets (AI files).",
        solution: "Implementation of grid-based design and non-destructive layering techniques."
      }
    },
    {
      title: "Photoshop & Digital Manipulation",
      description: "Advanced photo-compositing, high-end retouching, and digital artwork created in Adobe Photoshop (PSD/PSB).",
      tech: ["Adobe Photoshop", "Digital Compositing", "Retouching"],
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
      title: "Delish Healthy Food",
      description: "A comprehensive high-protein recipe collection featuring 76+ recipes with dynamic color themes and full macro tracking.",
      tech: ["React 18", "Vite 5", "Tailwind CSS 3", "React Router 6"],
      link: "https://delish-healthy-food.vercel.app/",
      engineeringValue: [
        "Engineered scalable recipe database architecture with efficient state management using React hooks",
        "Implemented dynamic theming system with category-based color palettes for enhanced UX",
        "Built responsive glass-morphism UI with optimized performance across devices",
        "Designed modular component architecture enabling easy feature expansion and maintenance"
      ],
      challenge: {
        problem: "Managing complex nutritional calculations and real-time macro tracking across 100+ recipes while maintaining performance.",
        solution: "Implemented memoization strategies and lazy loading patterns, reducing initial bundle size by 40%."
      }
    },
    {
      title: "AI Mod Client Finder",
      description: "Production-ready Fabric mod scanner with Playwright scraping, OpenAI classification, and resumable session storage.",
      tech: ["Next.js 14", "TypeScript", "Playwright", "OpenAI", "Anime.js", "Matter.js"],
      link: "https://ai-mod-client-finder.vercel.app/",
      engineeringValue: [
        "Re-implemented a crash-safe AI + scraping pipeline with two-pass classification, retries, and DuckDuckGo harvesting",
        "Persisted streaming scan state and mod verdicts to disk for instant resume across browser refreshes",
        "Delivered configurable OpenAI key handling with local preference toggles and privacy policy alignment",
        "Generated TXT and ZIP download bundles containing synchronized metadata for client-only categories"
      ],
      challenge: {
        problem: "Translating a monolithic PowerShell script into a production web experience without losing resumability or AI accuracy.",
        solution: "Built a modular Next.js architecture with SSE progress streaming and Playwright headless Chromium to preserve control flow."
      }
    },
    {
      title: "Animation Studio",
      description: "AI-powered 2D animation platform that democratizes creative content creation with real-time AI integration.",
      tech: ["React", "JavaScript", "Canvas API", "HTML5", "CSS3", "Web Workers"],
      link: "https://animation-studio.vercel.app/",
      engineeringValue: [
        "Built custom Canvas rendering engine with optimized frame-rate management for smooth animations",
        "Integrated AI API endpoints with intelligent error handling and retry logic",
        "Developed modular tool system architecture supporting extensible animation features",
        "Implemented real-time preview system with efficient render cycle management"
      ],
      challenge: {
        problem: "Maintaining 60fps animation performance while processing real-time AI responses and complex canvas operations.",
        solution: "Utilized Web Workers for AI API calls and implemented RAF-based rendering pipeline with request batching."
      }
    },
    {
      title: "Element Box",
      description: "A sophisticated physics-based sandbox game demonstrating advanced particle systems and real-time interactions.",
      tech: ["JavaScript", "HTML5 Canvas", "CSS3", "Bulma CSS", "Responsive Design"],
      link: "https://element-box.vercel.app/",
      engineeringValue: [
        "Engineered custom physics engine with collision detection and particle interaction systems",
        "Optimized rendering pipeline handling 10,000+ simultaneous particle calculations",
        "Built scalable element interaction system with modular rule definitions",
        "Implemented efficient spatial partitioning for O(n log n) collision detection"
      ],
      challenge: {
        problem: "Handling thousands of particle interactions per frame without performance degradation on lower-end devices.",
        solution: "Developed quadtree spatial partitioning algorithm and particle pooling system, improving performance by 300%."
      }
    },
    {
      title: "Lottery Analytics Tool",
      description: "A comprehensive financial calculator analyzing lottery winnings strategies with complex financial modeling.",
      tech: ["React", "JavaScript", "Chart.js", "Mathematical Algorithms"],
      link: "https://lottery-three.vercel.app/",
      engineeringValue: [
        "Developed sophisticated financial projection algorithms with compound interest calculations",
        "Built dynamic data visualization system using Chart.js with real-time updates",
        "Implemented comprehensive tax calculation engine accounting for federal and state brackets",
        "Designed intuitive comparison interface for annuity vs lump-sum analysis"
      ],
      challenge: {
        problem: "Accurately modeling complex tax scenarios and investment growth over 30+ year timeframes with variable rates.",
        solution: "Created modular calculation engine with year-by-year simulation factoring in inflation and tax brackets."
      }
    },
    {
      title: "DOOMlings Game Companion",
      description: "A digital companion for the Doomlings card game. Features searchable card database and optimized mobile experience.",
      tech: ["React", "Next.js", "JavaScript", "Bulma CSS", "Responsive Design"],
      link: "https://doomlings.vercel.app/",
      engineeringValue: [
        "Built efficient search and filter system for 200+ game cards with instant results",
        "Engineered responsive mobile-first design optimized for gameplay scenarios",
        "Implemented server-side rendering with Next.js for optimal load performance",
        "Designed intuitive card database schema with category and ability taxonomies"
      ],
      challenge: {
        problem: "Creating fast, accessible card search during active gameplay without disrupting player experience.",
        solution: "Implemented fuzzy search with debouncing and keyboard shortcuts, achieving <50ms search response times."
      }
    }
  ];
}
