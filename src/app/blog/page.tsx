 'use client';

import type { Metadata } from 'next';

import FadeInWrapper from '@/components/FadeInWrapper';
import Link from 'next/link';
import { useState, type KeyboardEvent } from 'react';
import styles from './Blog.module.css';

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

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const handleCardActivate = (postId: string) => {
    setSelectedPost(postId);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLButtonElement>, postId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardActivate(postId);
    }
  };

  const blogPosts: BlogPost[] = [
    {
      id: 'prompt-engineering-best-practices',
      title: 'Prompt Engineering Best Practices',
      subtitle: 'How I Structure Prompts for Reliable AI Outputs',
      date: 'November 17, 2024',
      category: 'AI Development',
      readTime: '8 min read',
      tags: ['AI', 'LLM', 'Prompt Engineering', 'Best Practices'],
      excerpt: 'Discover the systematic approach I use for crafting effective prompts that generate consistent, high-quality results from large language models.',
      content: [
        'Prompt engineering is both an art and a science. After working extensively with LLMs across multiple projects, I\'ve developed a systematic approach that consistently produces reliable results.',
        
        '**The Foundation: Be Specific and Structured**\n\nVague prompts produce vague results. Instead of "create a function," I use: "Create a TypeScript function named validateEmail that takes a string parameter, returns a boolean, uses regex to validate email format, and includes JSDoc comments explaining the validation rules."',
        
        '**Context is Everything**\n\nLLMs perform dramatically better when given proper context. I always include:\n• The project\'s purpose and constraints\n• Relevant technical stack\n• Code style preferences\n• Expected output format\n• Edge cases to consider',
        
        '**The Role-Play Technique**\n\nStarting prompts with "You are an expert X..." primes the model for specialized knowledge. For database queries, I might say: "You are an expert MySQL database architect. Design a schema for..." This consistently produces more sophisticated responses.',
        
        '**Iterative Refinement**\n\nRarely is the first prompt perfect. I treat prompt engineering as an iterative process:\n1. Start with a clear but general prompt\n2. Analyze the output for gaps\n3. Add constraints and specifics\n4. Refine until the output matches requirements',
        
        '**Preventing Hallucinations**\n\nTo minimize AI hallucinations:\n• Request citations or reasoning\n• Break complex tasks into smaller steps\n• Ask for acknowledgment of limitations\n• Cross-verify critical information\n• Use temperature settings appropriately',
        
        '**Real Example from My Work**\n\nWhen building the portfolio chatbot, instead of: "Make it answer questions about my portfolio" — I used: "Create a chatbot that can answer questions about skills, projects, and experience. It should search a knowledge base, provide specific examples, gracefully handle unknown queries, and maintain conversation context."',
        
        '**The Power of Examples**\n\nIncluding examples in prompts dramatically improves results. Show the AI 1-2 examples of your desired format, and it will follow that pattern consistently.',
        
        '**Key Takeaways:**\n• Specificity beats cleverness\n• Context transforms output quality\n• Iterate and refine systematically\n• Verify and validate all outputs\n• Document what works for future use'
      ]
    },
    {
      id: 'cursor-ai-workflow',
      title: 'My Cursor AI Development Workflow',
      subtitle: 'Accelerating Development Without Sacrificing Quality',
      date: 'November 17, 2024',
      category: 'Development Tools',
      readTime: '10 min read',
      tags: ['Cursor AI', 'IDE', 'Workflow', 'Productivity'],
      excerpt: 'How I leverage Cursor AI to accelerate development while maintaining code quality, organization, and best practices.',
      content: [
        'Cursor AI has transformed my development workflow, but not by blindly accepting every suggestion. Here\'s how I use it effectively while maintaining control and quality.',
        
        '**The Foundation: Rules Files**\n\nThe secret to Cursor\'s power is proper configuration. I maintain a comprehensive `.cursor/rules/global.mdc` file that defines:\n• Project architecture standards\n• Security requirements\n• Code style preferences\n• Framework-specific patterns\n• Common pitfalls to avoid',
        
        'This ensures Cursor suggests code that aligns with my standards from the start, rather than requiring constant corrections.',
        
        '**Strategic Use Cases**\n\n**Where Cursor Excels:**\n• Boilerplate generation (API routes, components, schemas)\n• Type definitions and interfaces\n• Test case creation\n• Documentation writing\n• Refactoring repetitive code\n• Quick syntax lookups',
        
        '**Where I Stay in Control:**\n• Core business logic\n• Security-critical code\n• Database schema design\n• Architecture decisions\n• Performance optimization',
        
        '**The Composer Workflow**\n\nCursor\'s Composer mode is incredibly powerful when used correctly. My typical flow:\n\n1. **Clear Intent:** "Create a React component for displaying project cards with these specific props..."\n2. **Review Structure:** Check the scaffolding before accepting\n3. **Iterative Refinement:** Request specific changes\n4. **Manual Polish:** Add personal touches and optimizations',
        
        '**Preventing AI Bloat**\n\nCursor can generate overly complex solutions. I combat this by:\n• Requesting "minimal implementation"\n• Specifying "no external dependencies unless necessary"\n• Asking for "simplest approach that works"\n• Reviewing and simplifying after generation',
        
        '**The Edit-Check-Test Cycle**\n\nI never accept generated code without:\n1. Reading every line\n2. Checking for security issues\n3. Testing functionality\n4. Verifying it matches patterns in the codebase\n5. Running linter and type checks',
        
        '**Tab Autocomplete Strategy**\n\nCursor\'s autocomplete is fantastic for:\n• Completing obvious patterns\n• Filling in type definitions\n• Generating similar repeated code\n\nBut I disable it when:\n• Writing critical logic\n• Designing new algorithms\n• Making architectural decisions',
        
        '**Real Example: Building the Chatbot**\n\nFor the portfolio chatbot:\n• Cursor generated the component structure\n• I wrote the core logic and state management\n• Cursor helped with TypeScript types\n• I designed the API architecture\n• Cursor generated CSS modules\n• I refined animations and interactions',
        
        '**Time Savings Reality Check**\n\nCursor doesn\'t make me 10x faster at everything. It makes me:\n• 5x faster at boilerplate\n• 3x faster at writing tests\n• 2x faster at documentation\n• Equal speed at complex logic (but with better ideas)\n• Faster at learning new APIs',
        
        '**Key Principles:**\n• Configure before coding (rules files)\n• Generate, then refine\n• Never blindly accept\n• Maintain architectural control\n• Use it as a tool, not a replacement\n• Quality over speed, always'
      ]
    },
    {
      id: 'preventing-ai-hallucinations',
      title: 'Preventing AI Hallucinations and Bugs',
      subtitle: 'Techniques for Reliable AI-Generated Code',
      date: 'November 17, 2024',
      category: 'AI Development',
      readTime: '7 min read',
      tags: ['AI', 'Code Quality', 'Testing', 'Best Practices'],
      excerpt: 'Practical strategies I use to catch and prevent AI-generated bugs, hallucinations, and technical errors before they reach production.',
      content: [
        'AI tools are powerful, but they\'re not infallible. Here\'s my systematic approach to ensuring AI-generated code is reliable, correct, and production-ready.',
        
        '**Understanding AI Hallucinations**\n\nAI models can "hallucinate" by:\n• Inventing non-existent APIs or functions\n• Mixing syntax from different languages\n• Creating plausible-sounding but incorrect logic\n• Fabricating package names or imports\n• Making confident statements about uncertain information',
        
        '**The Verification Checklist**\n\nBefore accepting any AI-generated code, I verify:\n\n**1. Imports and Dependencies**\n✓ All imports actually exist\n✓ Package names are correct\n✓ Versions are compatible\n✓ No circular dependencies',
        
        '**2. Type Safety**\n✓ TypeScript types are accurate\n✓ Props match interfaces\n✓ Return types are correct\n✓ No implicit any types',
        
        '**3. Logic Correctness**\n✓ Algorithm actually solves the problem\n✓ Edge cases are handled\n✓ Error conditions are caught\n✓ Side effects are managed',
        
        '**4. Security Concerns**\n✓ No SQL injection vulnerabilities\n✓ Input is sanitized\n✓ Authentication is verified\n✓ Sensitive data is protected',
        
        '**Testing AI-Generated Code**\n\n**Immediate Tests:**\n• Does it compile/run?\n• Do TypeScript checks pass?\n• Does the linter complain?\n• Are there console errors?',
        
        '**Functional Tests:**\n• Does it work with valid inputs?\n• How does it handle edge cases?\n• What happens with invalid data?\n• Are error messages meaningful?',
        
        '**Catching Subtle Bugs**\n\nAI often creates code that "works" but has issues:\n\n**Memory Leaks:**\n```typescript\n// AI might generate\nuseEffect(() => {\n  const interval = setInterval(...);\n  // Missing cleanup!\n});\n\n// Should be\nuseEffect(() => {\n  const interval = setInterval(...);\n  return () => clearInterval(interval);\n}, []);\n```',
        
        '**Race Conditions:**\nAI doesn\'t always consider async timing. I always review async/await usage for potential race conditions.',
        
        '**Performance Issues:**\nAI might create working but inefficient code (O(n²) when O(n) is possible). I profile and optimize after generation.',
        
        '**The "Explain This" Technique**\n\nWhen suspicious of generated code, I ask the AI: "Explain line-by-line what this code does and why." Hallucinations often become obvious during explanation.',
        
        '**Documentation as Verification**\n\nI ask AI to document generated code with:\n• Function purposes\n• Parameter descriptions\n• Return value explanations\n• Potential side effects\n\nIf it can\'t accurately document the code, the code is probably wrong.',
        
        '**Cross-Verification Methods**\n\n**1. Multiple Sources:**\nFor critical code, I compare AI suggestions with official docs',
        
        '**2. Incremental Generation:**\nGenerate small pieces, verify each, then combine',
        
        '**3. Test-First Approach:**\nWrite tests first, then let AI generate code to pass them',
        
        '**4. Code Review Mindset:**\nReview AI code as strictly as junior developer code',
        
        '**Red Flags to Watch For:**\n• Overly complex solutions to simple problems\n• Mixing programming paradigms oddly\n• Comments that don\'t match the code\n• Deprecated API usage\n• Missing error handling\n• Suspicious "magic numbers"',
        
        '**Real Example: Database Query**\n\nAI generated:\n```javascript\nconst users = db.query("SELECT * FROM users WHERE id = " + userId);\n```\n\n🚨 Red flags: SQL injection, no error handling, synchronous query\n\nCorrected version:\n```javascript\ntry {\n  const [users] = await db.query(\n    "SELECT * FROM users WHERE id = ?",\n    [userId]\n  );\n  return users;\n} catch (error) {\n  logger.error("Database query failed:", error);\n  throw new DatabaseError("Failed to fetch user");\n}\n```',
        
        '**Best Practices Summary:**\n• Verify every import and API call\n• Run type checkers and linters\n• Test thoroughly before accepting\n• Review logic for correctness\n• Check security implications\n• Profile performance on critical paths\n• Document and explain generated code\n• Treat AI as a junior developer: review everything'
      ]
    },
    {
      id: 'efficient-ai-code',
      title: 'Keeping AI-Generated Code Efficient',
      subtitle: 'Optimization Strategies for AI Assistance',
      date: 'November 17, 2024',
      category: 'Performance',
      readTime: '6 min read',
      tags: ['Performance', 'Optimization', 'AI', 'Best Practices'],
      excerpt: 'How I ensure AI-generated code remains performant, maintainable, and follows best practices for production systems.',
      content: [
        'AI tools excel at generating working code, but not always efficient code. Here\'s my approach to keeping AI-generated code lean, fast, and production-ready.',
        
        '**The Efficiency Mindset**\n\nAI tends toward "safe" solutions that work but aren\'t optimized. I actively guide it toward efficiency by:\n• Explicitly requesting "optimized" or "efficient" implementations\n• Specifying performance constraints\n• Asking for Big O analysis\n• Requesting multiple approaches to compare',
        
        '**Common AI Inefficiencies**\n\n**1. Unnecessary Re-renders (React)**\n```typescript\n// AI often generates\nfunction Component({ data }) {\n  const processed = expensiveOperation(data);\n  return <div>{processed}</div>;\n}\n\n// Should be\nfunction Component({ data }) {\n  const processed = useMemo(\n    () => expensiveOperation(data),\n    [data]\n  );\n  return <div>{processed}</div>;\n}\n```',
        
        '**2. Inefficient Loops**\n```javascript\n// AI might use\nfor (let i = 0; i < array.length; i++) {\n  for (let j = 0; j < array.length; j++) {\n    // O(n²) when unnecessary\n  }\n}\n\n// Often can be\nconst map = new Map(array.map(item => [item.id, item]));\n// O(n) with Map lookup\n```',
        
        '**3. Memory Bloat**\nAI doesn\'t always clean up:\n• Event listeners\n• Intervals/timeouts\n• Large data structures\n• Subscription connections',
        
        '**Optimization Process**\n\n**Step 1: Profile First**\nBefore optimizing AI code, I measure:\n• Render times (React DevTools)\n• API response times\n• Memory usage\n• Bundle size impact',
        
        '**Step 2: Identify Bottlenecks**\nFocus on:\n• Frequently called functions\n• Large data operations\n• Expensive calculations\n• Network requests',
        
        '**Step 3: Optimize Strategically**\nNot all code needs optimization. I prioritize:\n• User-facing performance\n• Critical path operations\n• Repeatedly executed code\n• Resource-intensive operations',
        
        '**Database Query Optimization**\n\nAI often generates working but slow queries:\n\n**Before:**\n```sql\nSELECT * FROM users\nWHERE email IN (\n  SELECT email FROM subscriptions\n  WHERE active = 1\n);\n```\n\n**Optimized:**\n```sql\nSELECT u.id, u.name, u.email\nFROM users u\nINNER JOIN subscriptions s ON u.email = s.email\nWHERE s.active = 1\nAND u.deleted_at IS NULL;\n```\n\nChanges:\n• SELECT specific columns (not *)\n• Use JOIN instead of subquery\n• Add WHERE filters\n• Ensure indexes exist',
        
        '**Frontend Bundle Optimization**\n\nAI doesn\'t consider bundle size. I add:\n\n```typescript\n// Dynamic imports for large components\nconst HeavyChart = lazy(() => import("./HeavyChart"));\n\n// Code splitting at route level\nconst Projects = lazy(() => import("./pages/Projects"));\n\n// Conditional loading\nif (condition) {\n  const module = await import("./optional-feature");\n}\n```',
        
        '**API Request Optimization**\n\n**AI\'s Approach:**\nMultiple sequential requests\n\n**Optimized Approach:**\n• Batch requests when possible\n• Use Promise.all() for parallel requests\n• Implement request caching\n• Add request deduplication',
        
        '**React Performance Patterns**\n\n**Memoization Strategy:**\n```typescript\n// Expensive calculations\nconst computed = useMemo(() => calculate(data), [data]);\n\n// Stable callbacks\nconst handleClick = useCallback(() => {\n  doSomething(id);\n}, [id]);\n\n// Component memoization\nexport default memo(ExpensiveComponent);\n```',
        
        '**Real Example: Chatbot Optimization**\n\nIn the portfolio chatbot:\n\n**Before AI Optimization:**\n• Rendered all messages without virtualization\n• Fetched full conversation history every message\n• No request debouncing\n• Unoptimized CSS animations',
        
        '**After Optimization:**\n• Implemented scroll-based message virtualization\n• Added smart caching for conversation history\n• Debounced API calls (300ms)\n• Used CSS transform for animations (GPU accelerated)\n• Reduced re-renders with useCallback\n\n**Result:** 60% faster initial load, 80% fewer re-renders',
        
        '**Efficiency Checklist:**\n\n**Frontend:**\n□ Memoize expensive calculations\n□ Use lazy loading for heavy components\n□ Optimize images (WebP, lazy loading)\n□ Minimize bundle size\n□ Reduce re-renders\n□ Use efficient CSS (transforms over layout changes)',
        
        '**Backend:**\n□ Index database columns\n□ Use connection pooling\n□ Implement caching\n□ Batch operations\n□ Optimize queries\n□ Add rate limiting',
        
        '**General:**\n□ Profile before optimizing\n□ Focus on hot paths\n□ Measure impact of changes\n□ Don\'t over-optimize\n□ Document why optimizations exist',
        
        '**Key Principles:**\n• AI generates working code, you make it efficient\n• Profile, don\'t guess\n• Optimize where it matters\n• Measure the impact\n• Maintain readability alongside performance\n• Document non-obvious optimizations'
      ]
    },
    {
      id: 'scalable-systems-rules-files',
      title: 'Using Rules Files for Scalable Systems',
      subtitle: 'How I Keep Large Projects Organized and Consistent',
      date: 'November 17, 2024',
      category: 'Architecture',
      readTime: '9 min read',
      tags: ['Architecture', 'Organization', 'Cursor AI', 'Best Practices'],
      excerpt: 'The system I use to maintain consistency, quality, and organization across large projects using comprehensive rules files and documentation.',
      content: [
        'As projects grow, maintaining consistency becomes challenging. Rules files are my solution for keeping large codebases organized, maintainable, and aligned with best practices.',
        
        '**What Are Rules Files?**\n\nRules files are comprehensive documentation that defines:\n• Architectural patterns\n• Code style standards\n• Security requirements\n• Common pitfalls to avoid\n• Framework-specific guidelines\n• Project-specific conventions',
        
        'For Cursor AI, I use `.cursor/rules/global.mdc` to ensure AI suggestions follow project standards.',
        
        '**The Structure of Effective Rules**\n\nMy rules file template:\n\n```markdown\n# PROJECT RULES FILE\n\n## 0. Universal Intelligence Rule\n- Adapt to project needs\n- Don\'t add unnecessary complexity\n\n## 1. Global Principles\n- Security first\n- Clarity over cleverness\n- Modularity and separation of concerns\n\n## 2. Frontend Architecture\n- Component structure\n- State management approach\n- Styling conventions\n\n## 3. Backend Architecture\n- API design patterns\n- Database interaction\n- Error handling\n\n## 4. Security Rules\n- Authentication patterns\n- Input validation\n- Data protection\n\n## 5. Testing Requirements\n- Test coverage standards\n- Testing patterns\n```',
        
        '**Real Example: My Portfolio Rules**\n\nFrom my `.cursor/rules/global.mdc`:\n\n**Universal Adaptation:**\n```\nOnly include backend if:\n• User explicitly requests fullstack\n• Server-side logic required\n• Persistent DB needed\n• Authentication required\n\nFor simple demos:\n• Avoid unnecessary layers\n• Avoid login unless needed\n• Keep it simple\n```',
        
        'This prevents AI from over-engineering simple projects.',
        
        '**Security Rules That Work**\n\n```\nENFORCE:\n• Parameterized queries ONLY\n• Input sanitization always\n• HttpOnly cookies for auth\n• HTTPS in production\n• Rate limiting on auth endpoints\n\nNEVER:\n• String-based SQL\n• Unvalidated input\n• localStorage for tokens\n• Exposed secrets\n```',
        
        'Clear "always" and "never" rules eliminate ambiguity.',
        
        '**Architecture Decision Trees**\n\nInstead of rigid requirements, I use decision trees:\n\n```\nFRONTEND ONLY PROJECT:\n→ No backend\n→ No auth\n→ No database\n→ No CORS setup\n\nFULLSTACK WITHOUT AUTH:\n→ React + Express\n→ Database + APIs\n→ NO login/JWT\n→ Strict CORS\n\nFULLSTACK WITH AUTH:\n→ Full security model\n→ HttpOnly cookies\n→ Role-based access\n→ Rate limiting\n```',
        
        'This helps AI (and developers) choose appropriate patterns.',
        
        '**Framework-Specific Guidelines**\n\n**React Rules:**\n```\nUSE:\n• Functional components\n• Custom hooks for logic\n• Context for global state\n• memo for expensive renders\n\nAVOID:\n• Prop drilling\n• Direct DOM manipulation\n• Unnecessary re-renders\n• dangerouslySetInnerHTML (unless sanitized)\n```',
        
        '**Express Rules:**\n```\nREQUIRED STRUCTURE:\n/routes\n/controllers\n/services\n/middleware\n\nMIDDLEWARE ORDER:\n1. Security (helmet, cors)\n2. Parsing (express.json)\n3. Logging\n4. Rate limiting\n5. Validation\n6. Auth\n7. Route handlers\n```',
        
        '**Database Best Practices:**\n```\nMYSQL RULES:\n• Connection pooling always\n• Parameterized queries ONLY\n• Index foreign keys\n• Normalize unless intentional\n• SSL/TLS in production\n• Backup strategy defined\n```',
        
        '**Comment and Documentation Rules**\n\n```\nCOMMENT RULES:\n• Explain WHY, not WHAT\n• No trivial comments\n• Update with code changes\n• Document complex algorithms\n• Add JSDoc for functions\n\nBad:  // Set x to 5\n      x = 5;\n\nGood: // Timeout in seconds for cache expiration\n      const CACHE_TTL = 5;\n```',
        
        '**Error Handling Standards**\n\n```\nERROR HANDLING:\n• Try-catch on async operations\n• Global error handler (Express)\n• User-friendly error messages\n• Log errors with context\n• Never expose stack traces to users\n• Return appropriate HTTP status codes\n```',
        
        '**Performance Guidelines**\n\n```\nOPTIMIZATION PRIORITIES:\n1. Correctness\n2. Clarity\n3. Performance\n\nProfile before optimizing\nMemoize expensive calculations\nLazy load heavy components\nIndex database queries\nUse caching strategically\n```',
        
        '**How Rules Files Scale Projects**\n\n**For Solo Development:**\n• Maintains consistency over time\n• Refreshes best practices when resuming\n• Guides AI assistance effectively\n• Documents decisions for future self',
        
        '**For Team Development:**\n• Onboards new developers quickly\n• Ensures consistent code style\n• Reduces code review debates\n• Captures institutional knowledge\n• Prevents repeated mistakes',
        
        '**Rules File Maintenance**\n\n**When to Update:**\n• Found a better pattern\n• Encountered new edge case\n• Team agreed on new standard\n• Framework updated\n• Security best practice changed',
        
        '**Review Schedule:**\n• Quick check: Every new feature\n• Deep review: Monthly\n• Major revision: Quarterly or on framework updates',
        
        '**Real Impact on My Portfolio**\n\nBefore rules file:\n• Inconsistent component structure\n• Security gaps\n• Mixed architectural patterns\n• Repetitive AI corrections',
        
        'After rules file:\n• Consistent code style\n• Security built-in\n• Clear patterns followed\n• AI generates correct code first time',
        
        '**Creating Your Rules File**\n\n**Start Simple:**\n1. Document current architecture\n2. List security requirements\n3. Define code style\n4. Add common patterns\n5. Note pitfalls encountered',
        
        '**Grow Iteratively:**\n• Add rules as issues arise\n• Document solutions to problems\n• Capture team agreements\n• Refine based on experience',
        
        '**Key Benefits:**\n• Consistency across the project\n• Faster development (no repeated decisions)\n• Better AI assistance\n• Easier onboarding\n• Captured knowledge\n• Reduced technical debt\n• Clearer code reviews',
        
        '**Essential Sections:**\n1. Project overview and goals\n2. Architectural patterns\n3. Security requirements\n4. Code style and conventions\n5. Testing standards\n6. Deployment procedures\n7. Common pitfalls\n8. Decision-making frameworks',
        
        '**Final Thoughts:**\n\nRules files aren\'t bureaucracy—they\'re force multipliers. They turn implicit knowledge into explicit standards, enabling faster development without sacrificing quality. Combined with AI tools like Cursor, they ensure consistency at scale.',
        
        'Start small, grow iteratively, and watch your project organization improve dramatically.'
      ]
    }
  ];

  const selectedPostData = selectedPost 
    ? blogPosts.find(post => post.id === selectedPost)
    : null;

  if (selectedPostData) {
    return (
      <div className="section">
        <div className="container">
          <FadeInWrapper translateY={30}>
            <button
              onClick={() => setSelectedPost(null)}
              className={`button is-success mb-5 ${styles.backButton}`}
            >
              <span>←</span> Back to Blog
            </button>
            <div className={`box bubble-card bubble-card-radial ${styles.detailWrapper}`}>
              <div className="mb-5">
                <span className={styles.badge}>
                  {selectedPostData.category}
                </span>
              </div>

              <h1 className={`title is-1 is-spaced ${styles.detailTitle}`}>
                {selectedPostData.title}
              </h1>
              <p className={`subtitle is-4 ${styles.detailSubtitle}`}>
                {selectedPostData.subtitle}
              </p>

              <div className={styles.detailMeta}>
                <span>📅 {selectedPostData.date}</span>
                <span>⏱️ {selectedPostData.readTime}</span>
              </div>

              <div className={styles.detailTags}>
                {selectedPostData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={styles.detailTagPill}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className={`content ${styles.detailContent}`}>
                {selectedPostData.content.map((paragraph, index) => {
                  if (paragraph.includes('```')) {
                    const code = paragraph.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
                    return (
                      <pre key={index} className={styles.codeBlock}>
                        <code>{code}</code>
                      </pre>
                    );
                  }

                  return (
                    <div key={index} className={styles.detailParagraph}>
                      {paragraph.split('\n').map((line, lineIndex) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return (
                            <h3 key={lineIndex} className={styles.detailHeading}>
                              {line.replace(/\*\*/g, '')}
                            </h3>
                          );
                        }
                        if (line.startsWith('**') && line.includes(':')) {
                          const [bold, rest] = line.split(':**');
                          return (
                            <p key={lineIndex} className={styles.detailLabel}>
                              <strong className={styles.highlightPurple}>{bold.replace('**', '')}:</strong>
                              {rest}
                            </p>
                          );
                        }
                        if (line.startsWith('•') || line.startsWith('✓') || line.startsWith('□') || line.startsWith('🚨')) {
                          return (
                            <p key={lineIndex} className={styles.detailListItem}>
                              {line}
                            </p>
                          );
                        }
                        return line ? <p key={lineIndex} className={styles.detailParagraph}>{line}</p> : null;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`box bubble-card bubble-card-radial ${styles.pageCard} ${styles.centeredCard}`}>
              <h3 className={`title is-4 ${styles.detailTitle}`}>
                Want to learn more about my work?
              </h3>
              <div className={styles.actions}>
                <Link href="/projects" className="button is-success">
                  View Projects
                </Link>
                <Link href="/about" className="button is-outlined is-success">
                  About Me
                </Link>
                <Link href="/contact" className="button is-outlined is-success">
                  Get in Touch
                </Link>
              </div>
            </div>
          </FadeInWrapper>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        
        <FadeInWrapper translateY={30}>
          <div className={`box bubble-card bubble-card-radial ${styles.pageCard} ${styles.centeredCard}`}>
            <h1 className={`title is-1 is-spaced gradient-text ${styles.titleBold}`}>
              <span className={styles.heroIcon} aria-hidden="true">📝</span>
              Engineering Blog
            </h1>
            <p className={`subtitle is-4 ${styles.subtitle}`}>
              Insights on AI Development, Best Practices, and Modern Web Engineering
            </p>
          </div>
        </FadeInWrapper>

        <div className="columns is-multiline">
          {blogPosts.map((post, index) => (
            <FadeInWrapper key={post.id} translateY={30} delay={100 + (index * 50)}>
              <div className="column is-full">
                <button 
                  type="button"
                  className={`box bubble-card bubble-card-radial ${styles.pageCard} ${styles.postCard}`}
                  onClick={() => handleCardActivate(post.id)}
                  onKeyDown={(event) => handleCardKeyDown(event, post.id)}
                >
                  <div className="mb-4">
                    <span className={styles.badge}>
                      {post.category}
                    </span>
                  </div>

                  <h2 className={`title is-3 ${styles.postTitle}`}>
                    {post.title}
                  </h2>
                  <p className={`subtitle is-5 ${styles.postSubtitle}`}>
                    {post.subtitle}
                  </p>

                  <p className={styles.postExcerpt}>
                    {post.excerpt}
                  </p>

                  <div className={styles.metaRow}>
                    <div className={styles.metaDetails}>
                      <span>📅 {post.date}</span>
                      <span>⏱️ {post.readTime}</span>
                    </div>

                    <div className={styles.tags}>
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={styles.tagPill}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.readMore}>
                    <span>
                      Read More →
                    </span>
                  </div>
                </button>
              </div>
            </FadeInWrapper>
          ))}
        </div>

        <FadeInWrapper translateY={30} delay={400}>
          <div className={`box bubble-card bubble-card-radial ${styles.pageCard} ${styles.centeredCard}`}>
            <h3 className={`title is-4 ${styles.postTitle}`}>
              Have questions about my approach?
            </h3>
            <p className={styles.postExcerpt}>
              Try the AI chatbot or reach out directly!
            </p>
            <Link href="/contact" className="button is-success is-medium">
              <span>Get in Touch</span>
            </Link>
          </div>
        </FadeInWrapper>

      </div>
    </div>
  );
}

export const generateMetadata = (): Metadata => ({
  title: 'Blog | Carter Moyer',
  description:
    'Insights and technical notes from Carter Moyer on full-stack development, AI integration, and modern web engineering.',
  alternates: {
    canonical: '/blog'
  },
  openGraph: {
    title: 'Blog | Carter Moyer',
    description:
      'Read thoughts and deep dives on software engineering, AI tooling, and web architecture by Carter Moyer.',
    type: 'website',
    url: '/blog'
  }
});

