'use client';

import FadeInWrapper from '@/components/FadeInWrapper';
import Image from 'next/image';

// Helper for SVG icons, can be expanded or replaced with a proper icon library
const InfoIcon = ({ pathData, size = 'is-medium' }: { pathData: string, size?: string }) => (
  <span className={`icon ${size} has-text-success`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d={pathData}></path>
    </svg>
  </span>
);

interface Certification {
  title: string;
  issuer: string;
  icon: string;
  color: string;
  credlyUrl?: string;
}

export default function AboutPage() {
  const processSteps = [
    {
      title: "1. Requirements Analysis",
      description: "I begin by thoroughly understanding project requirements, user needs, and business objectives to create a comprehensive development strategy.",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    },{
      title: "2. Architecture & Design",
      description: "I design scalable system architecture and create intuitive user interfaces, focusing on both performance and user experience.",
      icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
    },{
      title: "3. Development & Implementation",
      description: "I write clean, maintainable code using modern best practices, with emphasis on security, performance, and scalability.",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    },{
      title: "4. Testing & Deployment",
      description: "I conduct comprehensive testing and manage deployment processes, ensuring robust, reliable production-ready applications.",
      icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
  }];

  const whyChooseUsItems = [
    {
      title: "Technical Excellence",
      description: "I deliver high-quality, scalable solutions using industry best practices and cutting-edge technologies to ensure optimal performance and maintainability.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },{
      title: "User-Centric Approach",
      description: "Every project begins with understanding the end user. I create intuitive, accessible interfaces that provide exceptional user experiences.",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },{
      title: "Agile Development",
      description: "I follow agile methodologies with clear communication, regular updates, and iterative development to deliver projects on time and budget.",
      icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    },{
      title: "Continuous Innovation",
      description: "I stay current with emerging technologies and industry trends, continuously improving my skills to deliver modern, future-proof solutions.",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
  }];

  const education = [
    {
      degree: "Master of Science in Software Engineering",
      school: "University of Wisconsin-La Crosse",
      year: "Expected 2028",
      description: "Advanced software development methodologies, system architecture, and project management."
    },
    {
      degree: "Bachelor of Science in Computer Programming",
      school: "University of Wisconsin-La Crosse",
      year: "Expected 2027",
      description: "Comprehensive foundation in programming languages, algorithms, and software development principles."
    }
  ];

  const certifications: Certification[] = [
    {
      title: "Microsoft Office Specialist",
      issuer: "Microsoft Certified",
      icon: "📄",
      color: "#0078D4",
      credlyUrl: "https://www.credly.com/badges/a53e0814-7906-43fc-99aa-87ca2d203a6e/public_url"
    },
    {
      title: "Microsoft Word Specialist",
      issuer: "Microsoft Certified",
      icon: "📝",
      color: "#2B579A",
      credlyUrl: "https://www.credly.com/badges/397e3a70-ab52-4d53-9025-10beb9a80472/public_url"
    },
    {
      title: "Microsoft Excel Specialist",
      issuer: "Microsoft Certified",
      icon: "📊",
      color: "#217346",
      credlyUrl: "https://www.credly.com/badges/ac9b7a98-01df-4160-ab5c-b706f28120ff/public_url"
    },
    {
      title: "Microsoft PowerPoint Specialist",
      issuer: "Microsoft Certified",
      icon: "📽️",
      color: "#D24726",
      credlyUrl: "https://www.credly.com/badges/836e8596-1ad6-4190-a2b1-37f9183b6602/public_url"
    },
    {
      title: "Full-Stack Developer",
      issuer: "Professional Experience",
      icon: "💻",
      color: "#8b5cf6"
    },
    {
      title: "Database Management",
      issuer: "MySQL & SQL",
      icon: "🗄️",
      color: "#3273dc"
    },
    {
      title: "AI Integration Specialist",
      issuer: "LLM & API Integration",
      icon: "🤖",
      color: "#06b6d4"
    },
    {
      title: "Modern Web Development",
      issuer: "React & Next.js",
      icon: "⚛️",
      color: "#61dafb"
    }
  ];

  const technicalStrengths = [
    {
      category: "Frontend Development",
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5/CSS3", "Responsive Design"],
      icon: "🎨"
    },
    {
      category: "Backend Development",
      skills: ["Node.js", "Express", "Python", "RESTful APIs", "Server Architecture"],
      icon: "⚙️"
    },
    {
      category: "Database & Data",
      skills: ["MySQL", "Database Design", "SQL Optimization", "Data Modeling"],
      icon: "📊"
    },
    {
      category: "AI & Modern Tools",
      skills: ["LLM Integration", "Prompt Engineering", "API Integration", "AI-Assisted Development"],
      icon: "🚀"
    },
    {
      category: "Development Practices",
      skills: ["Git/GitHub", "Agile Methodology", "Code Review", "Testing", "Documentation"],
      icon: "🔧"
    }
  ];

  return (
    <div className="section">
          <div className="container">

        <FadeInWrapper translateY={30}>
          <div className="box bubble-card" style={{ textAlign: 'center', padding: '3rem', marginBottom: '2rem' }}>
            <h1 className="title is-1 is-spaced gradient-text" style={{fontWeight: 'bold'}}>About Carter Moyer</h1>
            <p className="subtitle is-4" style={{color: '#94a3b8'}}>
              Full-Stack Software Engineer | Problem Solver | Innovation Enthusiast
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <span style={{ color: '#8b5cf6', fontSize: '1.1rem', fontWeight: '600' }}>📍 Fond du Lac, WI</span>
              <span style={{ color: '#94a3b8', margin: '0 1rem' }}>•</span>
              <span style={{ color: '#06b6d4', fontSize: '1.1rem', fontWeight: '600' }}>🎓 Computer Science Graduate Student</span>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={100}>
          <div className="box bubble-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
              <h2 className="title is-3 gradient-text has-text-centered-mobile mb-5" style={{fontWeight: 'bold'}}>Professional Philosophy</h2>
              <div className="content is-medium">
              <p style={{color: '#e8edf5', lineHeight: '1.7', marginBottom: '1.5rem'}}>
                  I believe exceptional software is created at the intersection of technical excellence and human-centered design. My approach combines rigorous engineering practices with deep empathy for user needs, resulting in solutions that are not only functionally robust but genuinely valuable to those who use them.
                </p>
                <p style={{color: '#e8edf5', lineHeight: '1.7'}}>
                  Every line of code I write is guided by principles of clarity, maintainability, and performance. I&apos;m passionate about creating digital experiences that solve real problems while pushing the boundaries of what&apos;s possible with modern web technologies.
                </p>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={200}>
          <div className="box bubble-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
              <h2 className="title is-3 has-text-centered mb-6 gradient-text" style={{fontWeight: 'bold'}}>Who I Am</h2>
              <div className="columns is-vcentered is-multiline">
                <div className="column is-one-third has-text-centered">
                <figure className="image is-256x256 mb-4 image-bubble">
                    <Image 
                      src="/images/profile.jpg"
                      alt="A photo of Carter Moyer"
                      width={256}
                      height={256}
                      priority
                    />
                  </figure>
                </div>
                <div className="column is-two-thirds">
                  <h3 className="title is-4" style={{color: '#8b5cf6'}}>Carter Moyer</h3>
                <p className="subtitle is-6 is-italic mb-4" style={{color: '#94a3b8'}}>Full-Stack Software Engineer</p>
                  <div className="content">
                  <p style={{color: '#e8edf5', lineHeight: '1.6', marginBottom: '1.2rem'}}>
                      I&apos;m a dedicated software engineer with a passion for transforming complex challenges into elegant, user-friendly solutions. Based in Fond du Lac, Wisconsin, I bring a unique blend of technical expertise and creative problem-solving to every project I undertake.
                    </p>
                    <p style={{color: '#e8edf5', lineHeight: '1.6', marginBottom: '1.2rem'}}>
                      Currently pursuing advanced degrees in Computer Programming and Software Engineering at the University of Wisconsin-La Crosse, I combine academic rigor with practical experience to deliver cutting-edge web applications and digital solutions.
                    </p>
                    <p style={{color: '#e8edf5', lineHeight: '1.6', marginBottom: '1.2rem'}}>
                      My expertise spans frontend and backend development, with strong skills in React, JavaScript/TypeScript, Python, Java, and MySQL databases. I&apos;m particularly passionate about creating clean, efficient code and building user-friendly web applications.
                    </p>
                    <p style={{color: '#e8edf5', lineHeight: '1.6', marginBottom: '1.2rem'}}>
                      I have hands-on experience integrating AI technologies, including Large Language Models (LLMs), into production applications. From crafting effective prompts to building robust API integrations, I leverage AI as a practical tool to enhance functionality and user experience. My work includes implementing intelligent features, optimizing AI responses, and ensuring reliable performance in real-world applications.
                    </p>
                    <p style={{color: '#e8edf5', lineHeight: '1.6'}}>
                      Beyond traditional development, I specialize in prompt engineering and AI-assisted development workflows, utilizing tools like Cursor AI to accelerate development while maintaining code quality. I understand how to prevent AI hallucinations, structure projects for scalability, and implement best practices that keep systems maintainable and efficient.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={300}>
          <div className="box bubble-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
              <h2 className="title is-3 gradient-text has-text-centered mb-6" style={{fontWeight: 'bold'}}>My Process & Skills</h2>
              <div className="columns is-multiline is-variable is-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="column is-half">
                    <article className="media">
                      <figure className="media-left">
                        <InfoIcon pathData={step.icon} />
                      </figure>
                      <div className="media-content">
                        <div className="content">
                        <p style={{color: '#e8edf5'}}>
                            <strong style={{color: '#8b5cf6'}}>{step.title}</strong>
                            <br />
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={400}>
          <div className="box bubble-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
              <h2 className="title is-3 gradient-text has-text-centered mb-6" style={{fontWeight: 'bold'}}>Why Choose Me</h2>
              <div className="columns is-multiline is-variable is-4">
                {whyChooseUsItems.map((item, index) => (
                    <div key={index} className="column is-half">
                         <article className="media">
                            <figure className="media-left">
                                <InfoIcon pathData={item.icon} />
                            </figure>
                            <div className="media-content">
                                <div className="content">
                              <p style={{color: '#e8edf5'}}>
                                    <strong style={{color: '#06b6d4'}}>{item.title}</strong>
                                    <br />
                                    {item.description}
                                </p>
                                </div>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={450}>
          <div className="box bubble-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
            <h2 className="title is-3 gradient-text has-text-centered mb-6" style={{fontWeight: 'bold'}}>Technical Strengths & Core Competencies</h2>
            <p className="has-text-centered mb-5" style={{color: '#94a3b8', fontSize: '1.1rem'}}>
              A comprehensive overview of my technical expertise and capabilities
            </p>
            <div className="columns is-multiline is-variable is-4">
              {technicalStrengths.map((strength, index) => (
                <div key={index} className="column is-half">
                  <div style={{ 
                    padding: '1.5rem', 
                    background: 'rgba(139, 92, 246, 0.08)', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    height: '100%'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '2rem', marginRight: '0.8rem' }}>{strength.icon}</span>
                      <h3 style={{ color: '#8b5cf6', fontWeight: '600', fontSize: '1.1rem', margin: 0 }}>
                        {strength.category}
                      </h3>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {strength.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} style={{
                          backgroundColor: 'rgba(139, 92, 246, 0.15)',
                          color: '#e8edf5',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          border: '1px solid rgba(139, 92, 246, 0.3)'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={475}>
          <div className="box bubble-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
              <h2 className="title is-3 gradient-text has-text-centered mb-6" style={{fontWeight: 'bold'}}>Resume</h2>
              <p className="has-text-centered" style={{color: '#e8edf5'}}>Download my resume.</p>
              <div className="buttons is-centered mt-4">
                <a className="button is-success" href="/files/Resume-Carter.docx" download="Resume-Carter.docx">Download Resume</a>
                <a className="button is-success is-outlined" href="https://smallpdf.com/file#s=85c5744b-b4eb-4063-89f3-38a439b6066e" target="_blank" rel="noopener noreferrer">View PDF Online</a>
              </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={500}>
          <div className="box bubble-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
              <h2 className="title is-3 gradient-text has-text-centered mb-6" style={{fontWeight: 'bold'}}>Education & Professional Certifications</h2>
              
              <div className="columns is-variable is-6 is-multiline">
                {/* Education Section - Full Width */}
                <div className="column is-full">
                  <h3 className="title is-4 has-text-centered mb-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#06b6d4' }}>
                    <span>🎓</span> Education
                  </h3>
                  <div className="columns is-variable is-4">
                    {education.map((edu, index) => (
                      <div key={index} className="column is-half">
                        <div style={{ 
                          padding: '1.5rem', 
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)', 
                          borderRadius: '12px', 
                          border: '2px solid rgba(139, 92, 246, 0.25)',
                          height: '100%',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}>
                          <div style={{ marginBottom: '0.8rem' }}>
                            <h4 style={{ color: '#8b5cf6', fontWeight: '700', fontSize: '1.15rem', marginBottom: '0.6rem', lineHeight: '1.3' }}>
                              {edu.degree}
                            </h4>
                            <p style={{ color: '#06b6d4', fontWeight: '600', fontSize: '1rem', marginBottom: '0.4rem' }}>
                              {edu.school}
                            </p>
                            <p style={{ 
                              color: '#94a3b8', 
                              fontSize: '0.9rem', 
                              marginBottom: '0.8rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.4rem'
                            }}>
                              <span>📅</span> {edu.year}
                            </p>
                          </div>
                          <p style={{ 
                            color: '#e8edf5', 
                            fontSize: '0.95rem', 
                            lineHeight: '1.5',
                            borderTop: '1px solid rgba(139, 92, 246, 0.2)',
                            paddingTop: '0.8rem'
                          }}>
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Certifications Section - Full Width */}
                <div className="column is-full">
                  <h3 className="title is-4 has-text-centered mb-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#8b5cf6' }}>
                    <span>🏆</span> Professional Certifications & Expertise
                  </h3>
                  <div className="columns is-multiline is-variable is-4">
                    {certifications.map((cert, index) => {
                      const CertContent = (
                        <>
                          <div style={{ 
                            fontSize: '3rem', 
                            marginBottom: '1rem',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                          }}>
                            {cert.icon}
                          </div>
                          <h4 style={{ 
                            color: '#e8edf5', 
                            fontWeight: '700', 
                            fontSize: '1rem', 
                            marginBottom: '0.5rem',
                            lineHeight: '1.2'
                          }}>
                            {cert.title}
                          </h4>
                          <p style={{ 
                            color: '#94a3b8', 
                            fontSize: '0.85rem',
                            fontWeight: '500'
                          }}>
                            {cert.issuer}
                          </p>
                        </>
                      );

                      const cardStyle = { 
                        padding: '1.5rem',
                        background: `linear-gradient(135deg, ${cert.color}15 0%, ${cert.color}05 100%)`,
                        borderRadius: '12px',
                        border: `2px solid ${cert.color}40`,
                        textAlign: 'center' as const,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column' as const,
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: cert.credlyUrl ? 'pointer' : 'default',
                        boxShadow: `0 4px 12px ${cert.color}20`
                      };

                      return (
                        <div key={index} className="column is-half-tablet is-one-quarter-desktop">
                          {cert.credlyUrl ? (
                            <a 
                              href={cert.credlyUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none' }}
                            >
                              <div 
                                style={cardStyle}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'translateY(-5px)';
                                  e.currentTarget.style.boxShadow = `0 8px 20px ${cert.color}40`;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'translateY(0)';
                                  e.currentTarget.style.boxShadow = `0 4px 12px ${cert.color}20`;
                                }}
                              >
                                {CertContent}
                              </div>
                            </a>
                          ) : (
                            <div style={cardStyle}>
                              {CertContent}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="column is-full">
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '2rem',
                    background: 'rgba(139, 92, 246, 0.08)',
                    borderRadius: '12px',
                    border: '1px solid rgba(139, 92, 246, 0.25)'
                  }}>
                    <p style={{ color: '#e8edf5', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                      Ready to work together on your next project?
                    </p>
                    <a href="/contact" className="button is-success is-medium">
                      <span className="icon">
                        <span>💼</span>
                      </span>
                      <span>Let&apos;s Work Together</span>
                    </a>
                  </div>
                </div>
              </div>
          </div>
        </FadeInWrapper>

      </div>
    </div>
  );
} 