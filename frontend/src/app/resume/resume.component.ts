import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styles: [`
    .resume-sheet { font-family: Arial, Helvetica, sans-serif; color: #111; line-height: 1.45; }
    .resume-sheet h1, .resume-sheet h2, .resume-sheet h3 {
      font-family: Arial, Helvetica, sans-serif; text-transform: none; letter-spacing: normal;
    }
    .resume-sheet h1 { font-size: 1.9rem; font-weight: 700; color: #0f2a52; text-align: center; margin: 0; }
    .resume-sheet .r-title { text-align: center; font-weight: 700; font-size: 1.02rem; margin-top: 0.25rem; }
    .resume-sheet .r-contact { text-align: center; font-size: 0.85rem; color: #333; margin-top: 0.2rem; }
    .resume-sheet .r-contact a { color: #0f2a52; text-decoration: underline; }
    .resume-sheet h2 {
      font-size: 1.02rem; font-weight: 700; color: #0f2a52; text-transform: uppercase;
      border-bottom: 1px solid #9db2d1; padding-bottom: 0.15rem; margin: 1.1rem 0 0.45rem;
    }
    .resume-sheet h3 { font-size: 0.95rem; font-weight: 700; margin: 0.7rem 0 0.1rem; }
    .resume-sheet .r-meta { font-size: 0.85rem; color: #333; margin: 0 0 0.25rem; }
    .resume-sheet p, .resume-sheet li { font-size: 0.92rem; }
    .resume-sheet ul { margin: 0.15rem 0 0.35rem 1.15rem; padding: 0; list-style: disc; }
    .resume-sheet li { margin-bottom: 0.18rem; }
    @media print {
      .resume-actions { display: none !important; }
      .resume-sheet { box-shadow: none !important; border: none !important; border-radius: 0 !important; padding: 0 !important; max-width: none !important; }
    }
  `]
})
export class ResumeComponent implements OnInit {
  private seo = inject(SeoService);
  private doc = inject(DOCUMENT);

  ngOnInit() {
    this.seo.updateMeta(
      'Resume - Carter Moyer, Full-Stack Software Engineer',
      'Resume of Carter Moyer: Full-Stack Software Engineer and B.S. Computer Science graduate, University of Wisconsin-La Crosse, December 2026. Founder of Phoenix Websites AI. JavaScript, TypeScript, Angular, React, Next.js, Node.js, Express, MongoDB.'
    );
    this.seo.setCanonicalUrl('https://www.carter-portfolio.fyi/resume');
  }

  printResume() {
    this.doc.defaultView?.print();
  }
}
