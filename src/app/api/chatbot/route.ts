import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

/**
 * Portfolio Chatbot API Route
 * 
 * Uses OpenAI to generate intelligent responses based on Carter's portfolio data.
 * Falls back to static responses if API key is not configured.
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

// Portfolio knowledge base
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

// Simple rule-based fallback if OpenAI is not available
function getFallbackResponse(message: string): string {
  return "I'm currently in 'Offline Mode' because my OpenAI connection isn't configured, but I can tell you that Carter is a Full-Stack developer proficient in React, Next.js, Python, and AI integration. Please notify Carter to check his API keys!";
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

    const apiKey = process.env.OPENAI_API_KEY;

    // Use OpenAI if key is available
    if (apiKey) {
      const openai = new OpenAI({ apiKey });

      const systemPrompt = `
            You are an AI assistant for Carter Moyer's professional portfolio website.
            Your goal is to answer questions about Carter's skills, projects, education, and experience creatively and professionally.
            
            Here is the data about Carter you can use:
            ${JSON.stringify(portfolioData, null, 2)}
            
            Guidelines:
            - Be friendly, professional, and concise.
            - If asked about something not in the data, try to relate it to his existing skills (e.g., "While I don't see X specifically, his experience with Y suggests...") or politely admit you don't know multiple details.
            - Emphasize his Full-Stack and AI integration capabilities.
            - Keep responses under 150 words unless asked for detail.
            - You are 'Carter's AI Assistant'.
        `;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 200,
      });

      const response = completion.choices[0].message.content || "I couldn't generate a response at the moment.";

      return NextResponse.json({
        response,
        timestamp: new Date().toISOString(),
      });
    }

    // Fallback if no API key
    console.warn("OPENAI_API_KEY not found. Using fallback response.");
    const response = getFallbackResponse(message);
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

