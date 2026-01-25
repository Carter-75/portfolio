'use client';

import FadeInWrapper from '@/components/FadeInWrapper';
import AnimatedButton from '@/components/AnimatedButton';

export default function ContactPage() {
  const contactMethods = [
    {
      title: "Email",
      description: "Best for detailed project discussions",
      value: "cartermoyer75@gmail.com",
      icon: "✉️",
      action: "mailto:cartermoyer75@gmail.com"
    },
    {
      title: "LinkedIn",
      description: "Professional networking and opportunities",
      value: "Connect with me",
      icon: "💼",
      action: "https://www.linkedin.com/in/carter-moyer-66993b24a"
    },
    {
      title: "Phone",
      description: "For urgent inquiries",
      value: "Available upon request",
      icon: "📞",
      action: null
    }
  ];

  const services = [
    "Full-Stack Web Development",
    "React & Next.js Applications",
    "JavaScript & TypeScript Development",
    "HTML/CSS & Bulma Framework",
    "MySQL Database Design",
    "Python & Java Programming"
  ];

  return (
    <div className="section">
          <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            
            <FadeInWrapper translateY={30}>
              <div className="has-text-centered mb-6">
                <h1 className="title is-1 is-spaced gradient-text" style={{fontWeight: 'bold' }}>
              Let&apos;s Work Together
            </h1>
                <p className="subtitle is-4" style={{ color: '#94a3b8', marginBottom: '1rem' }}>
                  Ready to bring your ideas to life? I&apos;m here to help you create exceptional digital experiences.
            </p>
            <p style={{ color: '#8b5cf6', fontSize: '1.1rem', fontWeight: '500' }}>
              🚀 Currently accepting new projects • 🌍 Remote & Local collaborations welcome
            </p>
          </div>
        </FadeInWrapper>

            <div className="columns is-variable is-4">
              <div className="column is-two-thirds">
                <FadeInWrapper translateY={30} delay={100}>
                  <div className="box bubble-card bubble-card-radial" style={{ padding: '3rem' }}>
                    <h2 className="title is-4" style={{ color: '#8b5cf6', marginBottom: '1.5rem' }}>Send Me a Message</h2>
                    <form action="https://formspree.io/f/mqkrvvzb" method="POST">
                    <div className="columns is-variable is-2">
                      <div className="column">
                        <div className="field">
                            <label className="label" style={{ color: '#e8edf5' }}>Full Name *</label>
                          <div className="control">
                              <input className="input glass-input" type="text" name="name" placeholder="John Doe" required />
                            </div>
                          </div>
                      </div>
                      <div className="column">
                        <div className="field">
                            <label className="label" style={{ color: '#e8edf5' }}>Email Address *</label>
                          <div className="control">
                              <input className="input glass-input" type="email" name="email" placeholder="john@company.com" required />
                            </div>
                          </div>
                      </div>
                    </div>
                    
                    <div className="field">
                        <label className="label" style={{ color: '#e8edf5' }}>Company/Organization</label>
                      <div className="control">
                          <input className="input glass-input" type="text" name="company" placeholder="Your Company Name (Optional)" />
                        </div>
                      </div>
                      
                    <div className="field">
                        <label className="label" style={{ color: '#e8edf5' }}>Project Type</label>
                      <div className="control">
                          <div className="select is-fullwidth">
                            <select name="project_type" style={{ backgroundColor: 'rgba(20, 20, 20, 0.7)', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'white' }}>
                              <option value="">Select Project Type (Optional)</option>
                              <option value="web-development">Web Development</option>
                              <option value="mobile-app">Mobile Application</option>
                              <option value="ecommerce">E-commerce Platform</option>
                              <option value="consulting">Technical Consulting</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>

                    <div className="field">
                        <label className="label" style={{ color: '#e8edf5' }}>Project Details *</label>
                      <div className="control">
                          <textarea className="textarea glass-input" name="message" placeholder="Tell me about your project vision, timeline, budget range, and any specific requirements..." rows={6} required></textarea>
                        </div>
                      </div>

                      <div className="field is-grouped is-justify-content-space-between" style={{ alignItems: 'center' }}>
                        <div>
                          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>* Required fields</p>
                        </div>
                      <div className="control">
                          <AnimatedButton type="submit">Send Project Inquiry</AnimatedButton>
                        </div>
                      </div>
                    </form>
                    </div>
                  </FadeInWrapper>
              </div>
              
              <div className="column is-one-third">
                <FadeInWrapper translateY={30} delay={200}>
                  <div className="box bubble-card bubble-card-radial contact-card-compact">
                    <h3 className="title is-5" style={{ color: '#8b5cf6', marginBottom: '1.5rem' }}>Get In Touch</h3>
                    
                    {contactMethods.map((method, index) => (
                      <div key={index} className="contact-method-card">
                        <div className="contact-method-header">
                          <span className="contact-method-icon">{method.icon}</span>
                          <strong style={{ color: '#e8edf5' }}>{method.title}</strong>
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{method.description}</p>
                        {method.action ? (
                          <a href={method.action} target={method.action.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="contact-method-link">
                            {method.value}
                          </a>
                        ) : (
                          <span className="contact-method-muted">{method.value}</span>
                        )}
                      </div>
                    ))}
                    
                    <div className="contact-services">
                      <h4 style={{ color: '#8b5cf6', fontSize: '1rem', marginBottom: '1rem' }}>Services Offered</h4>
                      {services.map((service, index) => (
                        <div key={index} className="contact-service-item">
                          <span className="contact-service-check">✓</span>
                          <span style={{ color: '#e8edf5', fontSize: '0.9rem' }}>{service}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="contact-quick-response">
                      <p style={{ color: '#8b5cf6', fontSize: '0.9rem', fontWeight: '600' }}>⚡ Quick Response</p>
                      <p style={{ color: '#e8edf5', fontSize: '0.8rem' }}>I typically respond within 24 hours</p>
                    </div>
                  </div>
                </FadeInWrapper>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
 
