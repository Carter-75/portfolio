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
      title: "1. Discovery & Strategy",
      description: "I start by understanding the project goals and target audience to define a clear strategy and roadmap.",
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    },{
      title: "2. Design & Prototyping",
      description: "I create wireframes and high-fidelity mockups to visualize the user experience before writing code.",
      icon: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69-.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24-.42.12.64l2 3.46c.12-.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
    },{
      title: "3. Development & Testing",
      description: "I write clean, efficient code and perform rigorous testing to ensure a high-quality, bug-free product.",
      icon: "M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2zM7 13l3 3 7-7"
    },{
      title: "4. Deployment & Feedback",
      description: "I handle the deployment process and gather feedback to iterate and improve the final solution.",
      icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
  }];

  const whyChooseUsItems = [
    {
      title: "Problem-Solver",
      description: "I excel at breaking down complex challenges into manageable solutions and enjoy finding creative answers to tough problems.",
      icon: "M12 1L9 9h6l-3 8L15 9H9z"
    },{
      title: "Collaborative Spirit",
      description: "I believe the best work comes from open communication and teamwork. I am a strong and receptive collaborator.",
      icon: "M16.5 12A4.5 4.5 0 1112 7.5a4.5 4.5 0 014.5 4.5zm0 0V15M6.75 12H6m.75 0a4.5 4.5 0 109 0m-9 0a4.5 4.5 0 119 0"
    },{
      title: "Attention to Detail",
      description: "From code structure to pixel-perfect design, I am meticulous and committed to delivering a polished final product.",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    },{
      title: "Lifelong Learner",
      description: "The tech world is always evolving, and I am dedicated to continuously learning and adapting to new technologies.",
      icon: "M21.94 11.34A10.02 10.02 0 0012 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.76 0 5.26-1.12 7.07-2.93l-1.42-1.42A8.003 8.003 0 0112 20a8 8 0 010-16c1.98 0 3.79.73 5.15 1.95l-1.5 1.5A6.03 6.03 0 0012 6a6 6 0 00-6 6c0 2.08 1.07 3.92 2.68 5.02l1.42-1.42A4.008 4.008 0 018 12a4 4 0 014-4c.78 0 1.49.23 2.1.6l1.47-1.47.37.37z"
  }];

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
            <h1 className="title is-1 is-spaced" style={{color: 'white'}}>About Me</h1>
            <p className="subtitle is-4" style={{color: '#a0a0a0'}}>
              Discover my background, my passion for technology, and my commitment to creating elegant and effective solutions.
            </p>
          </div>
        </FadeInWrapper>

        <FadeInWrapper translateY={30} delay={100}>
          <div className="box" style={bubbleStyle}>
              <h2 className="title is-3 has-text-success-dark has-text-centered-mobile mb-5">My Philosophy</h2>
              <div className="content is-medium">
              <p style={{color: '#f0f0f0'}}>
                  I believe that the best digital products are born from a blend of technical expertise and a deep understanding of user needs. My development philosophy is centered on three core principles: writing clean, maintainable code; designing intuitive and accessible user interfaces; and fostering collaborative, transparent communication. For me, a project&apos;s success isn&apos;t just measured by its functionality, but by its ability to deliver a seamless and enjoyable experience. I am committed to a process of continuous improvement, always seeking out new challenges and learning opportunities to refine my craft.
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
                <p className="subtitle is-6 is-italic mb-4" style={{color: '#a0a0a0'}}>Aspiring Software Engineer</p>
                  <div className="content">
                  <p style={{color: '#f0f0f0'}}>
                      I&apos;m an ambitious developer from Fond du Lac, WI, currently pursuing a Bachelor&apos;s in Computer Programming and a Master&apos;s in Software Engineering at the University of Wisconsin-La Crosse. I&apos;ve always been driven by a passion for creating things, and I thrive on the challenge of transforming a great idea into a polished, high-impact final product. My goal is to collaborate with clients and teams to turn their projects into gold, building solutions that are not only functional and efficient but also a pleasure to use.
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
          <div className="box" style={{...bubbleStyle, marginBottom: 0}}>
              <h2 className="title is-3 has-text-success-dark has-text-centered mb-6">Why Work With Me?</h2>
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

      </div>
    </div>
  );
} 