import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { SeoService } from '../services/seo.service';
import { ScrollRevealDirective } from '../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './about.component.html',
  styles: []
})
export class AboutComponent implements OnInit {
  private meta = inject(Meta);
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.updateMeta(
      'About Carter Moyer — Full-Stack Engineer',
      'Computer Science student at UW-La Crosse. Full-stack engineer specialized in Angular, React, Node.js, and AI integration.'
    );
    this.seo.setCanonicalUrl('https://www.carter-portfolio.fyi/about');
    
    this.meta.updateTag({ property: 'og:title', content: 'About Carter Moyer' });
    this.meta.updateTag({ property: 'og:description', content: 'Background, skills, experience, and credentials of Carter Moyer — full-stack engineer and AI architect.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://www.carter-portfolio.fyi/images/og-image.jpg' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://www.carter-portfolio.fyi/images/og-image.jpg' });
  }

  readonly philosophy = "I believe exceptional software is created at the intersection of technical excellence and human-centered design. My approach combines rigorous engineering practices with deep empathy for user needs, resulting in solutions that are not only functionally robust but genuinely valuable to those who use them.";

  readonly bio = `Full-stack engineer and AI architect specialized in building high-performance web systems and intelligent automation workflows. With deep expertise in the JavaScript/TypeScript ecosystem (React, Next.js, Node.js, Angular), I bridge the gap between complex architectural requirements and seamless user experiences.

  My approach is rooted in a "Systems First" mindset—ensuring every deployment is scalable, secure, and data-driven. Whether it's architecting a custom SaaS platform or integrating agentic AI workflows with GPT-4, I focus on delivering measurable business ROI through rigorous engineering and elite-level technical execution.`;

  readonly strategies = [
    { title: 'Requirements Analysis', desc: 'Thoroughly understanding project requirements and business goals to create a comprehensive development strategy.' },
    { title: 'Architecture & Design', desc: 'Designing scalable system architecture and intuitive user interfaces, focusing on performance and UX.' },
    { title: 'Clean Development', desc: 'Writing maintainable, secure code using modern best practices and industry-leading frameworks.' },
    { title: 'Testing & Reliability', desc: 'Conducting comprehensive testing and managing deployments to ensure robust, production-ready applications.' }
  ];

  readonly strengths = [
    { category: 'Frontend', skills: ['React', 'Next.js', 'Angular', 'TypeScript', 'Tailwind', 'HTML5/CSS3'] },
    { category: 'Backend', skills: ['Node.js', 'Express', 'Python', 'Java', 'C/C++', 'RESTful APIs'] },
    { category: 'Database & Tools', skills: ['MySQL', 'MongoDB', 'Git/GitHub', 'CI/CD', 'Netlify', 'PowerShell'] },
    { category: 'AI & CompSci', skills: ['Prompt Engineering', 'LLM Integration', 'FSA/NFA', 'Agile', 'Data Structures', 'Algorithms'] }
  ];

  readonly experiences = [
    {
      role: 'Full-Stack AI Developer',
      company: 'Self-Directed (Remote)',
      period: 'Feb 2025 – Present',
      bullets: [
        'Architected and deployed scalable web applications utilizing React, Next.js, Node.js, and TypeScript.',
        'Engineered a dynamic personal portfolio website (carter-portfolio.fyi) integrating complex project showcases and contact routing.',
        'Pioneered advanced AI-assisted programming workflows, utilizing structured, rule-based prompting systems to rapidly accelerate development and debugging cycles.',
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
    { title: 'Full-Stack Developer', issuer: 'Professional Portfolio', icon: '💻', color: '#8b5cf6' },
    { title: 'AI Integration Specialist', issuer: 'LLM & API Architecture', icon: '🤖', color: '#06b6d4' },
    { title: 'Next.js Expert', issuer: 'Enterprise Deployment', icon: '⚛️', color: '#61dafb' },
    { title: 'Cloud Systems', issuer: 'Vercel & CI/CD', icon: '☁️', color: '#3273dc' }
  ];

  readonly education = [
    { degree: 'Accelerated Computer Science BS → MS', school: 'University of Wisconsin-La Crosse', period: 'Sep 2023 – Present (5-year track)' },
    { degree: 'BS Final Semester', school: 'University of Wisconsin-La Crosse', period: 'Graduating Fall 2026' }
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
