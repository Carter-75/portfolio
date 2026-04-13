import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styles: []
})
export class AboutComponent {
  philosophy = "I believe exceptional software is created at the intersection of technical excellence and human-centered design. My approach combines rigorous engineering practices with deep empathy for user needs, resulting in solutions that are not only functionally robust but genuinely valuable to those who use them.";
  
  bio = `I am a Computer Science senior at UW-La Crosse, in my final semester (Fall 2026), focused on architecting intelligent systems that benefit society. AI is transforming the entire world, and I want to help ensure that transformation is positive, safe, and innovative.

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
    { title: 'Microsoft Office Specialist', issuer: 'Microsoft Certified Core', icon: '📄', color: '#0078D4', url: 'https://www.credly.com/badges/a53e0814-7906-43fc-99aa-87ca2d203a6e/public_url' },
    { title: 'Microsoft Word Specialist', issuer: 'Microsoft Certified', icon: '📝', color: '#2B579A', url: 'https://www.credly.com/badges/836e8596-1ad6-4190-a2b1-37f9183b6602/public_url' },
    { title: 'Microsoft Excel Specialist', issuer: 'Microsoft Certified', icon: '📊', color: '#217346', url: 'https://www.credly.com/badges/397e3a70-ab52-4d53-9025-10beb9a80472/public_url' },
    { title: 'Microsoft PowerPoint Specialist', issuer: 'Microsoft Certified', icon: '📽️', color: '#D24726', url: 'https://www.credly.com/badges/ac9b7a98-01df-4160-ab5c-b706f28120ff/public_url' },
    { title: 'Full-Stack Developer', issuer: 'Professional Experience', icon: '💻', color: '#8b5cf6' },
    { title: 'AI Integration Specialist', issuer: 'LLM & API Integration', icon: '🤖', color: '#06b6d4' },
    { title: 'Database Management', issuer: 'MySQL & SQL', icon: '🗄️', color: '#3273dc' },
    { title: 'Modern Web Development', issuer: 'React & Next.js', icon: '⚛️', color: '#61dafb' }
  ];

  education = [
    { degree: 'BS in Computer Science', school: 'University of Wisconsin-La Crosse', period: 'Graduating Fall 2026 (Final Semester)' },
    { degree: 'MS in Software Engineering', school: 'University of Wisconsin-La Crosse', period: 'Future — Date TBD' }
  ];

  references = [
    { name: 'Professor Judi Becker', role: 'College Writing Professor', desc: 'Expert in professional writing and research methodologies.' },
    { name: 'Kim Braatz', role: 'Computer Science Teacher', desc: 'Mentor in mobile app development and web programming.' },
    { name: 'Jennifer King', role: 'MOS Instructor', desc: 'Instructor for Microsoft Office Specialist certifications.' }
  ];
}
