import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { SeoService } from '../services/seo.service';
import { ScrollRevealDirective } from '../shared/directives/scroll-reveal.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ScrollRevealDirective, RouterLink],
  templateUrl: './about.component.html',
  styles: []
})
export class AboutComponent implements OnInit {
  private meta = inject(Meta);
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.updateMeta(
      'About Carter Moyer — Full-Stack Engineer & AI Developer',
      'Computer Science undergraduate at UW-La Crosse graduating December 2026. Specialized in JavaScript, TypeScript, Java, Python, C, SQL, MongoDB, PowerShell, and AI prompt engineering.'
    );
    this.seo.setCanonicalUrl('https://www.carter-portfolio.fyi/about');
    
    this.meta.updateTag({ property: 'og:title', content: 'About Carter Moyer' });
    this.meta.updateTag({ property: 'og:description', content: 'Background, skills, experience, and credentials of Carter Moyer — full-stack engineer and AI developer.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://www.carter-portfolio.fyi/images/og-image.jpg' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://www.carter-portfolio.fyi/images/og-image.jpg' });
  }

  readonly philosophy = "I believe exceptional software is created at the intersection of technical excellence and human-centered design. My approach combines rigorous engineering practices with deep empathy for user needs, resulting in solutions that are not only functionally robust but genuinely valuable to those who use them.";

  readonly bio = `Full-stack engineer and Computer Science undergraduate at the University of Wisconsin-La Crosse (Graduating December 2026). Specialized in building high-performance web systems across JavaScript, TypeScript, Java, Python, C, SQL, MongoDB, and PowerShell, with certified expertise in data entry and Microsoft Office (Excel, Word, PowerPoint).

  I pioneer a modern AI-assisted engineering methodology: leveraging state-of-the-art prompt engineering techniques (such as few-shot prompting, chain-of-thought, and prompt chaining) to rapidly architect solutions with AI as an assistant, while personally auditing, refactoring, and editing every line of generated code to maintain production-grade reliability and architectural rigor.`;

  readonly strategies = [
    { title: 'Requirements Analysis', desc: 'Thoroughly understanding project requirements and business goals to create a comprehensive development strategy.' },
    { title: 'Architecture & Design', desc: 'Designing scalable system architecture and intuitive user interfaces, focusing on performance and UX.' },
    { title: 'Clean Development', desc: 'Writing maintainable, secure code using modern best practices and industry-leading frameworks.' },
    { title: 'Testing & Reliability', desc: 'Conducting comprehensive testing and managing deployments to ensure robust, production-ready applications.' }
  ];

  readonly strengths = [
    { category: 'Core Languages & Stack', skills: ['JavaScript', 'TypeScript', 'Java', 'Python', 'C', 'SQL', 'MongoDB', 'PowerShell', 'Full-Stack Dev'] },
    { category: 'Data & Productivity', skills: ['Data Entry', 'Microsoft Excel', 'Microsoft Word', 'Microsoft PowerPoint', 'Data Verification', 'Spreadsheet Modeling'] },
    { category: 'AI Prompting Techniques', skills: ['Few-Shot Prompting', 'Chain-of-Thought (CoT)', 'Role & Persona Framing', 'Prompt Chaining', 'Structured JSON Outputs', 'Iterative Refinement', 'Context Grounding'] },
    { category: 'Frameworks & Web', skills: ['Angular', 'React', 'Next.js', 'Node.js', 'Express', 'Tailwind', 'RESTful APIs'] },
    { category: 'Tools & Workflows', skills: ['Git/GitHub', 'CI/CD', 'Vercel', 'Netlify', 'AI-Assisted Workflows', 'Code Auditing'] }
  ];

  readonly experiences = [
    {
      role: 'Full-Stack Developer',
      company: 'Self-Directed (Remote)',
      period: 'Feb 2025 – Present',
      bullets: [
        'Architected and deployed scalable web applications utilizing React, Next.js, Node.js, and TypeScript.',
        'Engineered a dynamic personal portfolio website (carter-portfolio.fyi) integrating complex project showcases and contact routing.',
        'Implemented modern development workflows to accelerate feature delivery and debugging cycles.',
        'Managed CI/CD pipelines and deployed full-stack environments across Vercel, Netlify, and custom cloud hosting platforms.'
      ]
    },
    {
      role: 'AI Trainer',
      company: 'Outlier (Remote)',
      period: 'Nov 2025 – Present',
      bullets: [
        'Evaluate and debug complex, code-related tasks, algorithms, and AI research prompts to improve machine learning model accuracy.',
        'Optimize LLM task completion speed and consistency through rigorous testing and structured evaluation workflows.',
        'Demonstrate high-level reliability in assessing advanced technical outputs for logic, efficiency, and syntax correctness.'
      ]
    },
    {
      role: 'Operations Lead (Inventory Mgmt)',
      company: 'Retail Operations',
      period: 'Jun 2022 – Mar 2026',
      bullets: [
        'Managed high-throughput daily operations, optimizing inventory workflows and workload efficiency.',
        'Onboarded and mentored new personnel on operational standards and communication protocols.',
        'Developed systems for resolving complex logistical issues and operational bottlenecks.'
      ]
    }
  ];

  readonly certifications = [
    { title: 'Data Intelligence & Entry', issuer: 'Phoenix Data Portal', icon: '📊', color: '#3b82f6', url: 'https://phoenixwebsites.ai/data' },
    { title: 'Microsoft Office Specialist', issuer: 'Excel, Word, PowerPoint', icon: '📜', color: '#10b981', url: 'https://www.credly.com/badges/836e8596-1ad6-4190-a2b1-37f9183b6602/public_url' },
    { title: 'Full-Stack Developer', issuer: 'Professional Portfolio', icon: '💻', color: '#8b5cf6', url: 'https://carter-portfolio.fyi/projects' },
    { title: 'Next.js Expert', issuer: 'Enterprise Deployment', icon: '⚛️', color: '#61dafb', url: null }
  ];

  readonly education = [
    { degree: 'Bachelor of Science in Computer Science', school: 'University of Wisconsin-La Crosse', period: 'Sep 2023 – Dec 2026 (Graduating Dec 2026)' }
  ];

  readonly references = [
    { name: 'Professor Judi Becker', role: 'College Writing Professor', desc: 'Expert in professional writing and research methodologies.' },
    { name: 'Kim Braatz', role: 'Computer Science Teacher', desc: 'Mentor in mobile app development and web programming.' },
    { name: 'Jennifer King', role: 'MOS Instructor', desc: 'Instructor for Microsoft Office Specialist certifications.' }
  ];

  getStagger(i: number): number {
    return Math.min(i * 0.12, 0.36);
  }
}
