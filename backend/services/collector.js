/**
 * Collector Service
 * Uses Axios to fetch/scrape the live portfolio data for AI context.
 */
const axios = require('axios');

const getPortfolioContext = async () => {
  const prodUrl = process.env.PROD_FRONTEND_URL || 'https://carter-portfolio.fyi';
  const resumeUrl = process.env.RESUME_URL || 'https://smallpdf.com/file#s=cd7e8dd2-4436-4f28-985e-6b866b38f2cb';
  
  let externalContent = "";
  try {
    console.log(`INFO: Scraping live site at ${prodUrl}...`);
    const response = await axios.get(prodUrl);
    externalContent = response.data.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').substring(0, 1000);
  } catch (err) {
    console.warn("WARN: Scraper failed, using local fallback data.", err.message);
  }

  const data = {
    owner: "Carter Moyer",
    title: "Full-Stack Software Engineer & Computer Science Student",
    philosophy: "Aggressive automation and scalability. I build systems to write code faster.",
    education: {
      degree: "Accelerated Computer Science Bachelor’s → Master’s Program (5-year track)",
      school: "University of Wisconsin – La Crosse",
      timeline: "2023 - 2026",
      coursework: ["Full-Stack Web Development", "Data Structures", "Algorithms", "Object-Oriented Programming", "Operating Systems"]
    },
    technicalSkills: {
      languages: ["JavaScript", "TypeScript", "Python", "Java (3 years)", "C", "C++", "PowerShell", "SQL", "HTML5", "CSS3", "Bash/Zsh (Bootstrapping Scripts)"],
      frameworks: ["React", "Next.js", "Node.js", "Express", "RESTful APIs"],
      concepts: ["Data Structures & Algorithms", "Compilers", "Automata Theory (FSA/NFA)", "Regex", "OOP"],
      ai: ["Advanced Prompt Engineering", "LLM Integration", "Cursor", "AI-Assisted Development Workflows"],
      tools: ["Git/GitHub", "CI/CD", "Automated Testing", "MySQL", "Vercel", "Netlify", "Agile Development"]
    },
    experience: [
      {
        role: "Full-Stack AI Developer",
        company: "Self-Directed",
        timeline: "Feb 2025 – Present",
        highlights: [
          "Architected and deployed scalable web applications utilizing React, Next.js, Node.js, and TypeScript.",
          "Engineered carter-portfolio.fyi integrating complex project showcases.",
          "Engineered autonomous bootstrapping scripts for rapid full-stack project initialization.",
          "Pioneered advanced AI-assisted programming workflows using rule-based prompting."
        ]
      },
      {
        role: "AI Trainer",
        company: "Outlier (Remote)",
        timeline: "Nov 2025 – Present",
        highlights: [
          "Evaluate and debug complex code-related tasks to improve ML model accuracy.",
          "Optimize LLM task completion speed through rigorous testing.",
          "Assess technical outputs for logic, efficiency, and syntax correctness."
        ]
      },
      {
        role: "Dairy Clerk",
        company: "Festival Foods",
        timeline: "Jun 2022 – Mar 2026",
        highlights: [
          "Prioritize workload efficiency and precise inventory control.",
          "Train and onboard new employees.",
          "Resolve complex customer inquiries."
        ]
      }
    ],
    projects: [
      {
        title: "Delish Healthy Food",
        description: "76+ high-protein recipes with macro tracking and glass-morphism UI.",
        tech: ["React", "Tailwind CSS", "Vite"]
      },
      {
        title: "AI Mod Client Finder",
        description: "Fabric mod scanner with Playwright scraping and OpenAI classification.",
        tech: ["Next.js", "Playwright", "OpenAI"]
      },
      {
        title: "Animation Studio",
        description: "AI-powered 2D animation platform with real-time canvas rendering.",
        tech: ["React", "Canvas API", "Web Workers"]
      },
      {
        title: "Element Box",
        description: "Physics roadmap for 10,000+ interactive particles.",
        tech: ["JavaScript", "HTML5 Canvas"]
      },
      {
        title: "Lottery Analytics Tool",
        description: "Financial modeling for lottery winnings strategy and tax projections.",
        tech: ["React", "Chart.js"]
      },
      {
        title: "DOOMlings Game Companion",
        description: "Searchable digital companion for card games with <50ms fuzzy search.",
        tech: ["Next.js", "Bulma"]
      }
    ],
    blogPosts: [
      { id: 'prompt-engineering-best-practices', title: 'Prompt Engineering Best Practices' },
      { id: 'cursor-ai-workflow', title: 'My Cursor AI Development Workflow' },
      { id: 'preventing-ai-hallucinations', title: 'Preventing AI Hallucinations and Bugs' },
      { id: 'scalable-systems-rules-files', title: 'Using Rules Files for Scalable Systems' }
    ],
    resumeUrl: resumeUrl,
    contact: "📍 La Crosse, WI | Cartermoyer75@gmail.com | (920) 904-2695"
  };

  // Convert to a giant text block for RAG
  let contextBlock = `PORTFOLIO CONTEXT FOR CARTER MOYER (Live Scrape Snippet: ${externalContent})\n\n`;
  contextBlock += `Role: ${data.owner} - ${data.title}\n`;
  contextBlock += `Education: ${data.education.degree} at ${data.education.school} (${data.education.timeline})\n`;
  contextBlock += `Philosophy: ${data.philosophy}\n\n`;
  contextBlock += `TECHNICAL SKILLS:\n`;
  contextBlock += `- Languages: ${data.technicalSkills.languages.join(", ")}\n`;
  contextBlock += `- Frameworks: ${data.technicalSkills.frameworks.join(", ")}\n`;
  contextBlock += `- AI: ${data.technicalSkills.ai.join(", ")}\n\n`;
  contextBlock += `EXPERIENCE:\n`;
  data.experience.forEach(exp => {
    contextBlock += `- ${exp.role} at ${exp.company} (${exp.timeline}): ${exp.highlights.join(" ")}\n`;
  });
  contextBlock += `\nBLOG TOPICS:\n`;
  data.blogPosts.forEach(post => {
    contextBlock += `- ${post.title}\n`;
  });
  contextBlock += `\nRESUME LINK: ${data.resumeUrl}\n`;

  return contextBlock;
};

module.exports = { getPortfolioContext };
