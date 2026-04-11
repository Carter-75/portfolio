import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  content: string[];
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styles: [`
    .blog-card {
      @apply bg-slate-800/40 border border-white/5 rounded-3xl p-8 transition-all duration-300 hover:bg-slate-800/60 hover:border-blue-500/30 cursor-pointer;
    }
    .post-detail {
       @apply bg-slate-800/40 border border-white/5 rounded-3xl p-12 max-w-4xl mx-auto;
    }
  `]
})
export class BlogComponent {
  selectedPostId: string | null = null;

  blogPosts: BlogPost[] = [
    {
      id: 'prompt-engineering-best-practices',
      title: 'Prompt Engineering Best Practices',
      subtitle: 'How I Structure Prompts for Reliable AI Outputs',
      date: 'Nov 17, 2024',
      category: 'AI Development',
      readTime: '8 min read',
      tags: ['AI', 'LLM', 'Prompt Engineering'],
      excerpt: 'Discover the systematic approach I use for crafting effective prompts that generate consistent, high-quality results.',
      content: [
        'Prompt engineering is both an art and a science. I use a systematic approach that consistently produces reliable results.',
        '**The Foundation: Be Specific and Structured**\n\nVague prompts produce vague results.',
        '**Context is Everything**\n\nLLMs perform dramatically better when given proper context.',
        '**Preventing Hallucinations**\n\nTo minimize AI hallucinations: request citations, break complex tasks into smaller steps, and verify outputs.'
      ]
    },
    {
      id: 'cursor-ai-workflow',
      title: 'My Cursor AI Development Workflow',
      subtitle: 'Accelerating Development Without Sacrificing Quality',
      date: 'Nov 17, 2024',
      category: 'Development Tools',
      readTime: '10 min read',
      tags: ['Cursor AI', 'IDE', 'Workflow'],
      excerpt: 'How I leverage Cursor AI to accelerate development while maintaining code quality and best practices.',
      content: [
        'Cursor AI has transformed my development workflow. Here\'s how I use it effectively while maintaining control.',
        '**The Foundation: Rules Files**\n\nThe secret to Cursor\'s power is proper configuration via .mdc files.',
        '**The Edit-Check-Test Cycle**\n\nI never accept generated code without reading every line and testing functionality.'
      ]
    },
    {
      id: 'preventing-ai-hallucinations',
      title: 'Preventing AI Hallucinations and Bugs',
      subtitle: 'Techniques for Reliable AI-Generated Code',
      date: 'Nov 17, 2024',
      category: 'AI Development',
      readTime: '7 min read',
      tags: ['AI', 'Code Quality', 'Testing'],
      excerpt: 'Practical strategies I use to catch and prevent AI-generated bugs, hallucinations, and technical errors.',
      content: [
        'AI tools are powerful, but they\'re not infallible. Here\'s my systematic approach to ensuring AI-generated code is reliable.',
        '**Understanding AI Hallucinations**\n\nAI models can "hallucinate" by inventing non-existent APIs or functions.',
        '**The Verification Checklist**\n\nBefore accepting any AI-generated code, I verify imports, type safety, logic correctness, and security concerns.'
      ]
    },
    {
      id: 'efficient-ai-code',
      title: 'Keeping AI-Generated Code Efficient',
      subtitle: 'Optimization Strategies for AI Assistance',
      date: 'Nov 17, 2024',
      category: 'Performance',
      readTime: '6 min read',
      tags: ['Performance', 'Optimization', 'AI'],
      excerpt: 'How I ensure AI-generated code remains performant, maintainable, and follows best practices.',
      content: [
        'AI tools excel at generating working code, but not always efficient code. Here\'s my approach to keeping AI-generated code lean.',
        '**Common AI Inefficiencies**\n\nAI tends toward "safe" solutions that work but aren\'t optimized.',
        '**Optimization Process**\n\nProfile first, identify bottlenecks, and optimize strategically.'
      ]
    },
    {
      id: 'scalable-systems-rules-files',
      title: 'Using Rules Files for Scalable Systems',
      subtitle: 'How I Keep Large Projects Organized and Consistent',
      date: 'Nov 17, 2024',
      category: 'Architecture',
      readTime: '9 min read',
      tags: ['Architecture', 'Organization', 'Cursor AI'],
      excerpt: 'The system I use to maintain consistency, quality, and organization across large projects using comprehensive rules files.',
      content: [
        'As projects grow, maintaining consistency becomes challenging. Rules files are my solution for keeping codebases organized.',
        '**What Are Rules Files?**\n\nRules files are comprehensive documentation that defines architectural patterns and security requirements.',
        '**The Structure of Effective Rules**\n\nMy rules file template includes Global Principles, Frontend/Backend Architecture, and Security Rules.'
      ]
    }
  ];

  get selectedPost(): BlogPost | undefined {
    return this.blogPosts.find(p => p.id === this.selectedPostId);
  }

  selectPost(id: string) {
    this.selectedPostId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closePost() {
    this.selectedPostId = null;
  }
}
