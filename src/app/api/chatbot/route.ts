import { NextRequest, NextResponse } from 'next/server';

/**
 * Portfolio Chatbot API Route
 * 
 * This endpoint handles chatbot requests and provides intelligent responses
 * about Carter's portfolio, skills, projects, and experience.
 * 
 * Future enhancements:
 * - Connect to Python backend with MySQL for advanced AI processing
 * - Implement vector embeddings for semantic search
 * - Add conversation history and context management
 * - Integrate with LLM API for dynamic responses
 */

interface ChatRequest {
  message: string;
}

interface PortfolioKnowledge {
  skills: {
    frontend: string[];
    backend: string[];
    database: string[];
    ai: string[];
    tools: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    highlights: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
  experience: string[];
}

// Portfolio knowledge base - would be stored in MySQL in production
const portfolioData: PortfolioKnowledge = {
  skills: {
    frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bulma'],
    backend: ['Node.js', 'Express', 'Python', 'RESTful APIs', 'Server Architecture'],
    database: ['MySQL', 'Database Design', 'SQL Optimization', 'Data Modeling'],
    ai: ['LLM Integration', 'Prompt Engineering', 'API Integration', 'AI-Assisted Development'],
    tools: ['Git/GitHub', 'Cursor AI', 'Agile Methodology', 'VS Code']
  },
  projects: [
    {
      name: 'Delish Healthy Food',
      description: 'A comprehensive high-protein recipe collection with 76+ recipes, dynamic theming, and macro tracking',
      technologies: ['React 18', 'Vite 5', 'Tailwind CSS 3', 'React Router 6'],
      highlights: [
        'Engineered scalable recipe database architecture',
        'Implemented dynamic theming system',
        'Built responsive glass-morphism UI',
        'Reduced initial bundle size by 40%'
      ]
    },
    {
      name: 'Animation Studio',
      description: 'AI-powered 2D animation platform with real-time AI integration',
      technologies: ['React', 'Canvas API', 'AI Integration'],
      highlights: [
        'Built custom Canvas rendering engine',
        'Integrated AI API endpoints',
        'Achieved consistent 60fps performance'
      ]
    },
    {
      name: 'Element Box',
      description: 'Physics-based sandbox game with custom physics engine',
      technologies: ['JavaScript', 'HTML5 Canvas', 'Bulma CSS'],
      highlights: [
        'Engineered custom physics engine',
        'Optimized for 10,000+ particle calculations',
        'Improved performance by 300%'
      ]
    },
    {
      name: 'Lottery Analytics Tool',
      description: 'Financial calculator with complex modeling and tax calculations',
      technologies: ['React', 'Chart.js', 'Mathematical Algorithms'],
      highlights: [
        'Developed financial projection algorithms',
        'Built dynamic data visualization',
        'Implemented tax calculation engine'
      ]
    },
    {
      name: 'DOOMlings Game Companion',
      description: 'Digital companion for Doomlings card game with searchable database',
      technologies: ['React', 'Next.js', 'Bulma CSS'],
      highlights: [
        'Built efficient search system for 200+ cards',
        'Engineered mobile-first design',
        'Achieved <50ms search response times'
      ]
    }
  ],
  education: [
    {
      degree: 'Master of Science in Software Engineering',
      school: 'University of Wisconsin-La Crosse',
      year: 'Expected 2028'
    },
    {
      degree: 'Bachelor of Science in Computer Programming',
      school: 'University of Wisconsin-La Crosse',
      year: 'Expected 2027'
    }
  ],
  experience: [
    'Full-stack software engineer with hands-on experience',
    'AI/LLM integration specialist',
    'Prompt engineering expert',
    'Database design and optimization',
    'Modern web application development'
  ]
};

function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Skills and technologies
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
    const allSkills = [
      ...portfolioData.skills.frontend,
      ...portfolioData.skills.backend,
      ...portfolioData.skills.database,
      ...portfolioData.skills.ai
    ];
    
    if (lowerMessage.includes('frontend') || lowerMessage.includes('front-end')) {
      return `Carter's frontend skills include: ${portfolioData.skills.frontend.join(', ')}. He specializes in building responsive, performant user interfaces with modern frameworks.`;
    }
    
    if (lowerMessage.includes('backend') || lowerMessage.includes('back-end')) {
      return `Carter's backend expertise includes: ${portfolioData.skills.backend.join(', ')}. He builds scalable server architectures and RESTful APIs.`;
    }
    
    if (lowerMessage.includes('database') || lowerMessage.includes('sql')) {
      return `Carter works extensively with databases, particularly ${portfolioData.skills.database.join(', ')}. He focuses on efficient schema design and query optimization.`;
    }
    
    return `Carter is a full-stack developer with expertise in: ${allSkills.slice(0, 8).join(', ')}, and more. His technical strengths span frontend development, backend systems, database management, and AI integration. Visit the About page for a complete breakdown!`;
  }

  // Projects
  if (lowerMessage.includes('project')) {
    const projectNames = portfolioData.projects.map(p => p.name);
    
    // Specific project inquiry
    const foundProject = portfolioData.projects.find(p => 
      lowerMessage.includes(p.name.toLowerCase())
    );
    
    if (foundProject) {
      return `${foundProject.name}: ${foundProject.description}. Built with ${foundProject.technologies.join(', ')}. Key highlights: ${foundProject.highlights.slice(0, 2).join('; ')}. Check out the Projects page for more details!`;
    }
    
    return `Carter has built several impressive projects including: ${projectNames.join(', ')}. Each project showcases different engineering skills from AI integration to physics engines to financial modeling. Would you like to know more about a specific project?`;
  }

  // AI and LLM experience
  if (lowerMessage.includes('ai') || lowerMessage.includes('llm') || lowerMessage.includes('prompt') || lowerMessage.includes('chatbot')) {
    return `Carter has hands-on experience integrating AI technologies, particularly Large Language Models (LLMs), into production applications. He specializes in prompt engineering, API integration, and AI-assisted development using tools like Cursor AI. He's built several AI-powered features including this chatbot, which demonstrates his ability to create intelligent, context-aware systems. Visit the Chatbot page to learn about how this assistant was built!`;
  }

  // Experience and background
  if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('about')) {
    return `Carter is a full-stack software engineer currently pursuing advanced degrees in Computer Programming and Software Engineering at UW-La Crosse. He has experience building scalable web applications, integrating AI technologies, and optimizing database systems. His work spans from creative tools like animation platforms to practical utilities like financial calculators. Check out the About page for more details!`;
  }

  // Education
  if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('university') || lowerMessage.includes('school')) {
    return `Carter is pursuing two degrees at the University of Wisconsin-La Crosse: a Master of Science in Software Engineering (expected 2028) and a Bachelor of Science in Computer Programming (expected 2027). He combines academic rigor with practical hands-on development experience.`;
  }

  // Contact
  if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
    return `You can reach Carter through the Contact page on this website. He's available for full-stack development projects, AI integration work, consulting opportunities, and collaborative projects. Feel free to get in touch!`;
  }

  // Specific technologies
  if (lowerMessage.includes('react') || lowerMessage.includes('next')) {
    return `Carter is highly proficient in React and Next.js. He's built multiple production applications including this portfolio site using Next.js 15 with the App Router. He understands modern React patterns, hooks, server components, and performance optimization.`;
  }

  if (lowerMessage.includes('python')) {
    return `Carter uses Python for backend development, scripting, and AI integration. He's building this chatbot's backend with Python to connect to MySQL and handle advanced AI processing. Python is one of his core backend languages alongside Node.js.`;
  }

  if (lowerMessage.includes('mysql') || lowerMessage.includes('database')) {
    return `Carter specializes in MySQL database design and optimization. He understands proper schema design, indexing strategies, query optimization, and data modeling. The chatbot system includes a MySQL backend for storing conversation context and portfolio data.`;
  }

  // Cursor AI and tools
  if (lowerMessage.includes('cursor')) {
    return `Carter is an expert user of Cursor AI for development. He leverages AI-assisted development to accelerate coding while maintaining quality, uses rules files to keep systems organized, and understands how to prevent AI hallucinations and bugs. He's exploring creating a blog post about his Cursor AI best practices!`;
  }

  // General greeting
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return `Hello! I'm Carter's AI assistant. I can help you learn about his skills, projects, experience, and expertise. What would you like to know?`;
  }

  // Thank you
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return `You're welcome! Feel free to ask any other questions about Carter's work, skills, or projects. I'm here to help!`;
  }

  // Default response
  return `That's an interesting question! I can tell you about Carter's technical skills, his projects (like Delish Healthy Food, Animation Studio, Element Box, etc.), his experience with AI/LLM integration, his education, or how to contact him. What would you like to know more about?`;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    // Generate response based on portfolio knowledge
    const response = generateResponse(message.trim());

    // TODO: In production, call Python backend with MySQL for advanced processing
    // const pythonBackendUrl = process.env.PYTHON_BACKEND_URL;
    // const advancedResponse = await fetch(`${pythonBackendUrl}/chat`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message, context: portfolioData })
    // });

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

