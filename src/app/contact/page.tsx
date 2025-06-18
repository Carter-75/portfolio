'use client';

import FadeInWrapper from '@/components/FadeInWrapper';
import AnimatedButton from '@/components/AnimatedButton';

export default function ContactPage() {
  const bubbleStyle: React.CSSProperties = {
    background: 'radial-gradient(circle, rgba(44, 44, 44, 0.8) 0%, rgba(26, 26, 26, 0.9) 100%)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    padding: '3rem',
  };

  return (
    <div className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            
            <FadeInWrapper translateY={30}>
              <div className="has-text-centered mb-6">
                <h1 className="title is-1 is-spaced" style={{ color: 'white' }}>
                  Contact Me
                </h1>
                <p className="subtitle is-4" style={{ color: '#a0a0a0' }}>
                  Have a question, a project idea, or just want to connect? Send me a message!
                </p>
              </div>
            </FadeInWrapper>

            <FadeInWrapper translateY={30} delay={100}>
              <div className="box" style={bubbleStyle}>
                <form action="https://formspree.io/f/mqkrvvzb" method="POST">
                  <div className="field">
                    <label className="label" style={{ color: '#f0f0f0' }}>Name</label>
                    <div className="control">
                      <input className="input glass-input" type="text" name="name" placeholder="Your Name" required />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" style={{ color: '#f0f0f0' }}>Email</label>
                    <div className="control">
                      <input className="input glass-input" type="email" name="email" placeholder="your@email.com" required />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" style={{ color: '#f0f0f0' }}>Message</label>
                    <div className="control">
                      <textarea className="textarea glass-input" name="message" placeholder="Let's build something amazing together..." required></textarea>
                    </div>
                  </div>

                  <div className="field is-grouped is-justify-content-center">
                    <div className="control">
                      <AnimatedButton type="submit">Send Message</AnimatedButton>
                    </div>
                  </div>
                </form>
              </div>
            </FadeInWrapper>

          </div>
        </div>
      </div>
    </div>
  );
}
 