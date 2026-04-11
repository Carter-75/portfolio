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
    // Safer regex to strip tags and scripts
    externalContent = response.data
      .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gmi, ' ')
      .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gmi, ' ')
      .replace(/<[^>]*>?/gm, ' ')
      .replace(/\s+/g, ' ')
      .substring(0, 1500);
  } catch (err) {
    console.warn("WARN: Scraper failed, using local fallback data.", err.message);
  }

  const data = {
    owner: "Carter Moyer",
    title: "Full-Stack Software Engineer & Computer Science Student",
    philosophy: "I believe exceptional software is created at the intersection of technical excellence and human-centered design. I combine rigorous engineering with deep empathy for user needs.",
    education: [
      { degree: "MS in Software Engineering", school: "University of Wisconsin-La Crosse", period: "Expected 2028" },
      { degree: "BS in Computer Programming", school: "University of Wisconsin-La Crosse", period: "Expected 2027" }
    ],
    technicalSkills: {
      languages: ["JavaScript", "TypeScript", "Python", "Java", "C", "SQL", "HTML5", "CSS3", "PowerShell"],
      frameworks: ["React", "Next.js", "Angular", "Node.js", "Express", "RESTful APIs", "Tailwind CSS"],
      ai: ["Advanced Prompt Engineering", "LLM Integration", "Transformers.js", "AI-Assisted Development Workflows"],
      tools: ["Git/GitHub", "MySQL", "Vercel", "Agile Development", "Docker", "Playwright"]
    },
    certifications: [
      "Microsoft Office Specialist (Core, Word, Excel, PowerPoint)",
      "Full-Stack Developer (Professional Expertise)",
      "AI Integration Specialist (LLM & API)",
      "Modern Web Development (React & Next.js)"
    ],
    experience: [
      {
        role: "Full-Stack AI Developer",
        company: "Self-Directed",
        timeline: "Feb 2025 – Present",
        highlights: [
          "Architected and deployed scalable web applications utilizing React, Next.js, Node.js, and TypeScript.",
          "Engineered carter-portfolio.fyi integrating complex project showcases.",
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
      }
    ],
    projects: [
      {
        title: "Delish Healthy Food",
        description: "76+ high-protein recipes with macro tracking and glass-morphism UI.",
        tech: ["React", "Vite", "Tailwind"],
        engineering: "Engineered scalable recipe database architecture with efficient state management using React hooks."
      },
      {
        title: "AI Mod Client Finder",
        description: "Fabric mod scanner with Playwright scraping and OpenAI classification.",
        tech: ["Next.js", "Playwright", "OpenAI"],
        engineering: "Re-implemented a crash-safe AI + scraping pipeline with two-pass classification and retries."
      },
      {
        title: "Animation Studio",
        description: "AI-powered 2D animation platform with real-time canvas rendering.",
        tech: ["React", "Canvas API", "Web Workers"],
        engineering: "Offloaded heavy physics calculations to multi-threaded Web Workers for smooth 60FPS performance."
      },
      {
        title: "Element Box",
        description: "Physics roadmap for 10,000+ interactive particles.",
        tech: ["JavaScript", "HTML5 Canvas"],
        engineering: "Implemented spatial partitioning (Quadtrees) for efficient collision detection in massive particle arrays."
      },
      {
        title: "Lottery Analytics Tool",
        description: "Financial modeling for lottery winnings and tax projections.",
        tech: ["React", "Chart.js"],
        engineering: "Engineered a complex tax-logic engine covering multi-state scenarios and 30-year projections."
      },
      {
        title: "DOOMlings Game Companion",
        description: "Searchable digital companion for card games with <50ms fuzzy search.",
        tech: ["Next.js", "Bulma"],
        engineering: "Developed a custom fuzzy-search engine for fast card retrieval during active gameplay."
      }
    ],
    resumeUrl: resumeUrl,
    contact: "📍 La Crosse, WI | Cartermoyer75@gmail.com"
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
