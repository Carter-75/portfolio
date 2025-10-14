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

  const certifications = [
    "Computer Science Student",
    "Self-Directed Learning",
    "Project-Based Experience",
    "Continuous Skill Development"
  ];

  const bubbleStyle: React.CSSProperties = {
    background: 'radial-gradient(circle, rgba(44, 44, 44, 0.8) 0%, rgba(26, 26, 26, 0.9) 100%)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    padding: '3rem',
    marginBottom: '2rem'
  };

  return (
    <div className="section">
          <div className="container">

        <FadeInWrapper translateY={30}>
          <div className="box" style={{...bubbleStyle, textAlign: 'center'}}>
            <h1 className="title is-1 is-spaced" style={{color: 'white'}}>About Carter Moyer</h1>
            <p className="subtitle is-4" style={{color: '#a0a0a0'}}>
              Full-Stack Software Engineer | Problem Solver | Innovation Enthusiast
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <span style={{ color: '#e85d04', fontSize: '1.1rem', fontWeight: '600' }}>📍 Fond du Lac, WI</span>
              <span style={{ color: '#a0a0a0', margin: '0 1rem' }}>•</span>
              <span style={{ color: '#e85d04', fontSize: '1.1rem', fontWeight: '600' }}>🎓 Computer Science Graduate Student</span>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={100}>
          <div className="box" style={bubbleStyle}>
              <h2 className="title is-3 has-text-success-dark has-text-centered-mobile mb-5">Professional Philosophy</h2>
              <div className="content is-medium">
              <p style={{color: '#f0f0f0', lineHeight: '1.7', marginBottom: '1.5rem'}}>
                  I believe exceptional software is created at the intersection of technical excellence and human-centered design. My approach combines rigorous engineering practices with deep empathy for user needs, resulting in solutions that are not only functionally robust but genuinely valuable to those who use them.
                </p>
                <p style={{color: '#f0f0f0', lineHeight: '1.7'}}>
                  Every line of code I write is guided by principles of clarity, maintainability, and performance. I&apos;m passionate about creating digital experiences that solve real problems while pushing the boundaries of what&apos;s possible with modern web technologies.
                </p>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={200}>
          <div className="box" style={bubbleStyle}>
              <h2 className="title is-3 has-text-centered mb-6 has-text-success-dark">Who I Am</h2>
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
                  <h3 className="title is-4 has-text-success">Carter Moyer</h3>
                <p className="subtitle is-6 is-italic mb-4" style={{color: '#a0a0a0'}}>Full-Stack Software Engineer</p>
                  <div className="content">
                  <p style={{color: '#f0f0f0', lineHeight: '1.6', marginBottom: '1.2rem'}}>
                      I&apos;m a dedicated software engineer with a passion for transforming complex challenges into elegant, user-friendly solutions. Based in Fond du Lac, Wisconsin, I bring a unique blend of technical expertise and creative problem-solving to every project I undertake.
                    </p>
                    <p style={{color: '#f0f0f0', lineHeight: '1.6', marginBottom: '1.2rem'}}>
                      Currently pursuing advanced degrees in Computer Programming and Software Engineering at the University of Wisconsin-La Crosse, I combine academic rigor with practical experience to deliver cutting-edge web applications and digital solutions.
                    </p>
                    <p style={{color: '#f0f0f0', lineHeight: '1.6'}}>
                      My expertise spans frontend and backend development, with strong skills in React, JavaScript/TypeScript, Python, Java, and MySQL databases. I&apos;m particularly passionate about creating clean, efficient code and building user-friendly web applications.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={300}>
          <div className="box" style={bubbleStyle}>
              <h2 className="title is-3 has-text-success-dark has-text-centered mb-6">My Process & Skills</h2>
              <div className="columns is-multiline is-variable is-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="column is-half">
                    <article className="media">
                      <figure className="media-left">
                        <InfoIcon pathData={step.icon} />
                      </figure>
                      <div className="media-content">
                        <div className="content">
                        <p style={{color: '#f0f0f0'}}>
                            <strong className="has-text-success-dark">{step.title}</strong>
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
          <div className="box" style={bubbleStyle}>
              <h2 className="title is-3 has-text-success-dark has-text-centered mb-6">Why Choose Me</h2>
              <div className="columns is-multiline is-variable is-4">
                {whyChooseUsItems.map((item, index) => (
                    <div key={index} className="column is-half">
                         <article className="media">
                            <figure className="media-left">
                                <InfoIcon pathData={item.icon} />
                            </figure>
                            <div className="media-content">
                                <div className="content">
                              <p style={{color: '#f0f0f0'}}>
                                    <strong className="has-text-success-dark">{item.title}</strong>
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
          <div className="box" style={bubbleStyle}>
              <h2 className="title is-3 has-text-success-dark has-text-centered mb-6">Resume</h2>
              <p className="has-text-centered" style={{color: '#f0f0f0'}}>View or download my resume.</p>
              <div className="buttons is-centered mt-4">
                <a className="button is-success is-light" href="/about/resume">View Resume</a>
                <a className="button is-success" href="/files/Resume-Carter.docx" download="Resume-Carter.docx">Download Resume</a>
              </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={500}>
          <div className="box" style={bubbleStyle}>
              <h2 className="title is-3 has-text-success-dark has-text-centered mb-6">Education & Certifications</h2>
              
              <div className="columns is-variable is-4">
                <div className="column is-half">
                  <h3 className="title is-5 has-text-success">Education</h3>
                  {education.map((edu, index) => (
                    <div key={index} style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(72, 199, 116, 0.05)', borderRadius: '8px', border: '1px solid rgba(72, 199, 116, 0.2)' }}>
                      <h4 style={{ color: '#e85d04', fontWeight: '600', marginBottom: '0.5rem' }}>{edu.degree}</h4>
                      <p style={{ color: '#f0f0f0', fontWeight: '500', marginBottom: '0.3rem' }}>{edu.school}</p>
                      <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{edu.year}</p>
                      <p style={{ color: '#d0d0d0', fontSize: '0.9rem', lineHeight: '1.4' }}>{edu.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="column is-half">
                  <h3 className="title is-5 has-text-success">Certifications</h3>
                  <div style={{ marginTop: '1rem' }}>
                    {certifications.map((cert, index) => (
                      <div key={index} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '0.8rem',
                        padding: '0.8rem',
                        background: 'rgba(72, 199, 116, 0.05)',
                        borderRadius: '6px',
                        border: '1px solid rgba(72, 199, 116, 0.2)'
                      }}>
                        <span style={{ color: '#e85d04', marginRight: '0.5rem', fontSize: '1.1rem' }}>✓</span>
                        <span style={{ color: '#f0f0f0', fontSize: '0.95rem' }}>{cert}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <a href="/contact" className="button is-success">
                      Let&apos;s Work Together
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