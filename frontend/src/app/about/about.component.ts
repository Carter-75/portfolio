import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styles: [`
    .about-section {
      @apply py-20 px-6 max-w-6xl mx-auto;
    }
    .skill-card {
      @apply p-6 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-blue-500/30 transition-all duration-300;
    }
  `]
})
export class AboutComponent {
  philosophy = "I believe exceptional software is created at the intersection of technical excellence and human-centered design. My approach combines rigorous engineering practices with deep empathy for user needs, resulting in solutions that are not only functionally robust but genuinely valuable to those who use them.";
  
  bio = `I am a Computer Science graduate student at UW-La Crosse, focused on architecting intelligent systems that benefit society. AI is transforming the entire world, and I want to help ensure that transformation is positive, safe, and innovative.

  With extensive experience in AI Prompt Engineering and MEAN stack development, I build systems that bridge the gap between complex research and user-friendly applications. I have worked as an AI Trainer, optimizing machine learning models with precise programming and logical rigor. My commitment to helping others was shaped by my childhood volunteering at the Fond du Lac Food Pantry, a value I bring to every technical project I undertake.`;

  strategies = [
    { title: 'Requirements Analysis', desc: 'Thoroughly understanding project requirements and business goals to create a comprehensive development strategy.' },
    { title: 'Architecture & Design', desc: 'Designing scalable system architecture and intuitive user interfaces, focusing on performance and UX.' },
    { title: 'Clean Development', desc: 'Writing maintainable, secure code using modern best practices and industry-leading frameworks.' },
    { title: 'Testing & Reliability', desc: 'Conducting comprehensive testing and managing deployments to ensure robust, production-ready applications.' }
  ];

  strengths = [
    { category: 'Frontend', skills: ['React', 'Next.js', 'Angular', 'TypeScript', 'Tailwind', 'Bulma'] },
    { category: 'Backend', skills: ['Node.js', 'Express', 'Python', 'Java', 'C', 'RESTful APIs'] },
    { category: 'Database', skills: ['MySQL', 'Database Design', 'SQL Optimization', 'Data Modeling'] },
    { category: 'AI & Tools', skills: ['LLM Integration', 'Prompt Engineering', 'Git/GitHub', 'Code Review'] }
  ];

  certifications = [
    { title: 'Microsoft Office Specialist', issuer: 'Microsoft Certified Core', icon: '📄', color: '#0078D4' },
    { title: 'Microsoft Word Specialist', issuer: 'Microsoft Certified', icon: '📝', color: '#2B579A' },
    { title: 'Microsoft Excel Specialist', issuer: 'Microsoft Certified', icon: '📊', color: '#217346' },
    { title: 'Microsoft PowerPoint Specialist', issuer: 'Microsoft Certified', icon: '📽️', color: '#D24726' },
    { title: 'Full-Stack Developer', issuer: 'Professional Experience', icon: '💻', color: '#8b5cf6' },
    { title: 'AI Integration Specialist', issuer: 'LLM & API Integration', icon: '🤖', color: '#06b6d4' },
    { title: 'Database Management', issuer: 'MySQL & SQL', icon: '🗄️', color: '#3273dc' },
    { title: 'Modern Web Development', issuer: 'React & Next.js', icon: '⚛️', color: '#61dafb' }
  ];

  education = [
    { degree: 'MS in Software Engineering', school: 'University of Wisconsin-La Crosse', period: 'Expected 2028' },
    { degree: 'BS in Computer Programming', school: 'University of Wisconsin-La Crosse', period: 'Expected 2027' }
  ];

  references = [
    { name: 'Professor Judi Becker', role: 'College Writing Professor', desc: 'Expert in professional writing and research methodologies.' },
    { name: 'Kim Braatz', role: 'Computer Science Teacher', desc: 'Mentor in mobile app development and web programming.' },
    { name: 'Jennifer King', role: 'MOS Instructor', desc: 'Instructor for Microsoft Office Specialist certifications.' }
  ];
}
