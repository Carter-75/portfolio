import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';
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

  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: 'Computer Science student in an accelerated BS→MS program at UW-La Crosse. Full-stack engineer with expertise in Angular, React, Node.js, AI integration, and cloud deployments.' });
    this.meta.updateTag({ property: 'og:title', content: 'About Carter Moyer' });
    this.meta.updateTag({ property: 'og:description', content: 'Background, skills, experience, and credentials of Carter Moyer — full-stack engineer and AI architect.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://www.carter-portfolio.fyi/images/og-image.jpg' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://www.carter-portfolio.fyi/images/og-image.jpg' });
  }

  readonly philosophy = "I believe exceptional software is created at the intersection of technical excellence and human-centered design. My approach combines rigorous engineering practices with deep empathy for user needs, resulting in solutions that are not only functionally robust but genuinely valuable to those who use them.";

  readonly bio = `Dynamic Computer Science student in an accelerated Bachelor's-to-Master's program with proven experience architecting full-stack web applications and AI-integrated software systems. Specialized in the JavaScript/TypeScript ecosystem (React, Next.js, Node.js) and advanced AI prompt engineering to accelerate development cycles.

  Adept at leveraging cloud platforms (Vercel, CI/CD) and database architectures to build scalable, production-ready solutions. Seeking to pioneer the next generation of microservices and AI implementations through rigorous engineering and agile methodologies. My commitment to helping others was shaped by my childhood volunteering at the Fond du Lac Food Pantry, a value I bring to every technical project I undertake.`;

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
      role: 'Dairy Clerk',
      company: 'Festival Foods',
      period: 'Jun 2022 – Mar 2026',
      bullets: [
        'Manage fast-paced daily operations, prioritizing workload efficiency and precise inventory control.',
        'Train and onboard new employees on departmental procedures and customer service standards.',
        'Resolve complex customer inquiries and operational issues, ensuring consistently positive interactions.'
      ]
    }
  ];

  readonly certifications = [
    { title: 'Microsoft Office Specialist', issuer: 'Microsoft Certified Core', icon: '📄', color: '#0078D4', url: 'https://www.credly.com/badges/a53e0814-7906-43fc-99aa-87ca2d203a6e/public_url' },
    { title: 'Microsoft Word Specialist', issuer: 'Microsoft Certified', icon: '📝', color: '#2B579A', url: 'https://www.credly.com/badges/836e8596-1ad6-4190-a2b1-37f9183b6602/public_url' },
    { title: 'Microsoft Excel Specialist', issuer: 'Microsoft Certified', icon: '📊', color: '#217346', url: 'https://www.credly.com/badges/397e3a70-ab52-4d53-9025-10beb9a80472/public_url' },
    { title: 'Microsoft PowerPoint Specialist', issuer: 'Microsoft Certified', icon: '📽️', color: '#D24726', url: 'https://www.credly.com/badges/ac9b7a98-01df-4160-ab5c-b706f28120ff/public_url' },
    { title: 'Full-Stack Developer', issuer: 'Professional Experience', icon: '💻', color: '#8b5cf6' },
    { title: 'AI Integration Specialist', issuer: 'LLM & API Integration', icon: '🤖', color: '#06b6d4' },
    { title: 'Database Management', issuer: 'MySQL & SQL', icon: '🗄️', color: '#3273dc' },
    { title: 'Modern Web Development', issuer: 'React & Next.js', icon: '⚛️', color: '#61dafb' }
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
