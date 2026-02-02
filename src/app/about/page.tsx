import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import FadeInWrapper from '@/components/FadeInWrapper';
import Image from 'next/image';
import styles from './About.module.css';

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

export const generateMetadata = (): Metadata => ({
  title: 'About | Carter Moyer',
  description:
    'Learn about Carter Moyer, a full-stack software engineer focused on modern web development, AI integration, and scalable systems.',
  alternates: {
    canonical: '/about'
  },
  openGraph: {
    title: 'About | Carter Moyer',
    description:
      'Background, technical strengths, certifications, and professional philosophy of Carter Moyer.',
    type: 'article',
    url: '/about'
  }
});

export default function AboutPage() {
  const processSteps = [
    {
      title: "1. Requirements Analysis",
      description: "I begin by thoroughly understanding project requirements, user needs, and business objectives to create a comprehensive development strategy.",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    }, {
      title: "2. Architecture & Design",
      description: "I design scalable system architecture and create intuitive user interfaces, focusing on both performance and user experience.",
      icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
    }, {
      title: "3. Development & Implementation",
      description: "I write clean, maintainable code using modern best practices, with emphasis on security, performance, and scalability.",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    }, {
      title: "4. Testing & Deployment",
      description: "I conduct comprehensive testing and manage deployment processes, ensuring robust, reliable production-ready applications.",
      icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    }];

  const whyChooseUsItems = [
    {
      title: "Technical Excellence",
      description: "I deliver high-quality, scalable solutions using industry best practices and cutting-edge technologies to ensure optimal performance and maintainability.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    }, {
      title: "User-Centric Approach",
      description: "Every project begins with understanding the end user. I create intuitive, accessible interfaces that provide exceptional user experiences.",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    }, {
      title: "Agile Development",
      description: "I follow agile methodologies with clear communication, regular updates, and iterative development to deliver projects on time and budget.",
      icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    }, {
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
          <div className={`box bubble-card ${styles.sectionCard} ${styles.heroCard}`}>
            <h1 className={`title is-1 is-spaced gradient-text ${styles.titleBold}`}>About Carter Moyer</h1>
            <p className={`subtitle is-4 ${styles.heroSubtitle}`}>
              Full-Stack Software Engineer | Problem Solver | Innovation Enthusiast
            </p>
            <div className={styles.heroMeta}>
              <span className={styles.heroMetaPrimary}>📍 Fond du Lac, WI</span>
              <span className={styles.metaSeparator}>•</span>
              <span className={styles.heroMetaSecondary}>🎓 Computer Science Graduate Student</span>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={100}>
          <div className={`box bubble-card ${styles.sectionCard}`}>
            <h2 className={`title is-3 gradient-text has-text-centered-mobile mb-5 ${styles.titleBold}`}>Professional Philosophy</h2>
            <div className="content is-medium">
              <p className={styles.bodyText}>
                I believe exceptional software is created at the intersection of technical excellence and human-centered design. My approach combines rigorous engineering practices with deep empathy for user needs, resulting in solutions that are not only functionally robust but genuinely valuable to those who use them.
              </p>
              <p className={styles.bodyText}>
                Every line of code I write is guided by principles of clarity, maintainability, and performance. I&apos;m passionate about creating digital experiences that solve real problems while pushing the boundaries of what&apos;s possible with modern web technologies.
              </p>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={200}>
          <div className={`box bubble-card ${styles.sectionCard}`}>
            <h2 className={`title is-3 has-text-centered mb-6 gradient-text ${styles.titleBold}`}>Who I Am</h2>
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
                <h3 className={`title is-4 ${styles.highlightPurple}`}>Carter Moyer</h3>
                <p className={`subtitle is-6 is-italic mb-4 ${styles.heroSubtitle}`}>Full-Stack Software Engineer</p>
                <div className="content">
                  <p className={styles.bodyTextTight}>
                    I&apos;m a dedicated software engineer with a passion for transforming complex challenges into elegant, user-friendly solutions. Based in Fond du Lac, Wisconsin, I bring a unique blend of technical expertise and creative problem-solving to every project I undertake.
                  </p>
                  <p className={styles.bodyTextTight}>
                    Currently pursuing advanced degrees in Computer Programming and Software Engineering at the University of Wisconsin-La Crosse, I combine academic rigor with practical experience to deliver cutting-edge web applications and digital solutions.
                  </p>
                  <p className={styles.bodyTextTight}>
                    My expertise spans frontend and backend development, with strong skills in React, JavaScript/TypeScript, Python, Java, and MySQL databases. I&apos;m particularly passionate about creating clean, efficient code and building user-friendly web applications.
                  </p>
                  <p className={styles.bodyTextTight}>
                    I have hands-on experience integrating AI technologies, including Large Language Models (LLMs), into production applications. From crafting effective prompts to building robust API integrations, I leverage AI as a practical tool to enhance functionality and user experience. My work includes implementing intelligent features, optimizing AI responses, and ensuring reliable performance in real-world applications.
                  </p>
                  <p className={styles.bodyTextTight}>
                    Beyond traditional development, I specialize in prompt engineering and AI-assisted development workflows, utilizing tools like Cursor AI to accelerate development while maintaining code quality. I understand how to prevent AI hallucinations, structure projects for scalability, and implement best practices that keep systems maintainable and efficient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={300}>
          <div className={`box bubble-card ${styles.sectionCard}`}>
            <h2 className={`title is-3 gradient-text has-text-centered mb-6 ${styles.titleBold}`}>My Process & Skills</h2>
            <div className="columns is-multiline is-variable is-4">
              {processSteps.map((step, index) => (
                <div key={index} className="column is-half">
                  <article className="media">
                    <figure className="media-left">
                      <InfoIcon pathData={step.icon} />
                    </figure>
                    <div className="media-content">
                      <div className="content">
                        <p className={styles.mediaText}>
                          <strong className={styles.highlightPurple}>{step.title}</strong>
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
          <div className={`box bubble-card ${styles.sectionCard}`}>
            <h2 className={`title is-3 gradient-text has-text-centered mb-6 ${styles.titleBold}`}>Why Choose Me</h2>
            <div className="columns is-multiline is-variable is-4">
              {whyChooseUsItems.map((item, index) => (
                <div key={index} className="column is-half">
                  <article className="media">
                    <figure className="media-left">
                      <InfoIcon pathData={item.icon} />
                    </figure>
                    <div className="media-content">
                      <div className="content">
                        <p className={styles.mediaText}>
                          <strong className={styles.highlightCyan}>{item.title}</strong>
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
          <div className={`box bubble-card ${styles.sectionCard}`}>
            <h2 className={`title is-3 gradient-text has-text-centered mb-6 ${styles.titleBold}`}>Technical Strengths & Core Competencies</h2>
            <p className={`has-text-centered mb-5 ${styles.sectionIntro}`}>
              A comprehensive overview of my technical expertise and capabilities
            </p>
            <div className="columns is-multiline is-variable is-4">
              {technicalStrengths.map((strength, index) => (
                <div key={index} className="column is-half">
                  <div className={styles.skillCard}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillIcon}>{strength.icon}</span>
                      <h3 className={styles.skillTitle}>
                        {strength.category}
                      </h3>
                    </div>
                    <div className={styles.skillPills}>
                      {strength.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className={styles.skillPill}>
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
          <div className={`box bubble-card ${styles.sectionCard}`}>
            <h2 className={`title is-3 gradient-text has-text-centered mb-6 ${styles.titleBold}`}>Resume</h2>
            <p className={`has-text-centered ${styles.mediaText}`}>Download my resume.</p>
            <div className="buttons is-centered mt-4">
              <a className="button is-success" href="/files/Resume-Carter.docx" download="Resume-Carter.docx">Download Resume</a>
              <a className="button is-success is-outlined" href="https://smallpdf.com/file#s=e4adc8e4-c94a-4703-8ed3-52eff8d1cb02" target="_blank" rel="noopener noreferrer">View PDF Online</a>
            </div>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={500}>
          <div className={`box bubble-card ${styles.sectionCard}`}>
            <h2 className={`title is-3 gradient-text has-text-centered mb-6 ${styles.titleBold}`}>Education & Professional Certifications</h2>

            <div className="columns is-variable is-6 is-multiline">
              {/* Education Section - Full Width */}
              <div className="column is-full">
                <h3 className={`title is-4 has-text-centered mb-5 ${styles.sectionTitle} is-flex is-justify-content-center is-align-items-center`}>
                  <span>🎓</span>
                  <span className={styles.highlightCyan}>Education</span>
                </h3>
                <div className="columns is-variable is-4">
                  {education.map((edu, index) => (
                    <div key={index} className="column is-half">
                      <div className={styles.educationCard}>
                        <div className="mb-4">
                          <h4 className={styles.educationTitle}>
                            {edu.degree}
                          </h4>
                          <p className={styles.educationSchool}>
                            {edu.school}
                          </p>
                          <p className={styles.educationYear}>
                            <span>📅</span> {edu.year}
                          </p>
                        </div>
                        <p className={styles.bodyTextTight}>
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications Section - Full Width */}
              <div className="column is-full">
                <h3 className={`title is-4 has-text-centered mb-5 ${styles.sectionTitle} is-flex is-justify-content-center is-align-items-center`}>
                  <span>🏆</span>
                  <span className={styles.highlightPurple}>Professional Certifications & Expertise</span>
                </h3>
                <div className="columns is-multiline is-variable is-4">
                  {certifications.map((cert, index) => {
                    const certStyle = { '--cert-color': cert.color } as CSSProperties;

                    const CertContent = (
                      <>
                        <div className={styles.certIcon}>
                          {cert.icon}
                        </div>
                        <h4 className={styles.certTitle}>
                          {cert.title}
                        </h4>
                        <p className={styles.certIssuer}>
                          {cert.issuer}
                        </p>
                      </>
                    );

                    return (
                      <div key={index} className="column is-half-tablet is-one-quarter-desktop">
                        {cert.credlyUrl ? (
                          <a
                            href={cert.credlyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.certLink}
                          >
                            <div
                              className={styles.certCard}
                              style={certStyle}
                            >
                              {CertContent}
                            </div>
                          </a>
                        ) : (
                          <div className={styles.certCard} style={certStyle}>
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
                <div className={styles.callout}>
                  <p className={styles.calloutText}>
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