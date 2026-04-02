'use client';

import FadeInWrapper from '@/components/FadeInWrapper';
import AnimatedButton from '@/components/AnimatedButton';
import { useState } from 'react';

// ... existing code ...

export default function ContactPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [agreedToLegal, setAgreedToLegal] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const contactMethods = [
    // ... existing methods
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

  const pricingTiers = [
    {
      id: "simple",
      name: "Simple",
      price: "$25",
      description: "Perfect for personal blogs or basic landing pages.",
      features: ["Single Page Website", "Responsive Design", "Contact Form", "Basic SEO"],
      color: "#3e8ed0" // Info blueish
    },
    {
      id: "better",
      name: "Better",
      price: "$100",
      description: "Ideal for portfolios and small businesses.",
      features: ["Up to 5 Pages", "Dynamic Content", "Animations", "CMS Integration", "Advanced SEO"],
      color: "#8b5cf6" // Primary purple
    },
    {
      id: "professional",
      name: "Professional",
      price: "$250",
      description: "Full-scale solution for serious businesses.",
      features: ["Unlimited Pages", "E-commerce / Stripe", "User Authentication", "Database Integration", "Admin Dashboard", "Premium Support"],
      color: "#f14668" // Danger reddish for pop
    }
  ];

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier || !agreedToLegal) return;
    setIsCheckingOut(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      tier: selectedTier,
      name: formData.get('checkout_name'),
      email: formData.get('checkout_email'),
      projectType: formData.get('checkout_project_type'),
      message: formData.get('checkout_message'),
    };

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.url) {
        window.location.href = result.url;
      } else {
        alert('Something went wrong. Please try again.');
        setIsCheckingOut(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">

            <FadeInWrapper translateY={30}>
              <div className="has-text-centered mb-6">
                <h1 className="title is-1 is-spaced gradient-text" style={{ fontWeight: '800', letterSpacing: '-0.03em' }}>
                  Let&apos;s Work Together
                </h1>
                <p className="subtitle is-5" style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.65' }}>
                  Ready to bring your ideas to life? I&apos;m here to help you create exceptional digital experiences.
                </p>
                <p style={{ color: 'var(--accent-primary-hover)', fontSize: '0.95rem', fontWeight: '500' }}>
                  Currently accepting new projects &bull; Remote &amp; Local collaborations welcome
                </p>
              </div>
            </FadeInWrapper>

            <div className="columns is-variable is-4">
              <div className="column is-two-thirds">
                <FadeInWrapper translateY={30} delay={100}>
                  <div className="box bubble-card bubble-card-radial" style={{ padding: '2.5rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading, Syne, sans-serif)', color: 'var(--accent-primary-hover)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.75rem', letterSpacing: '-0.01em' }}>Send a Message</h2>
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

                {/* Pricing / Web Build Request Section */}
                <FadeInWrapper translateY={30} delay={300}>
                  <div className="mt-6">
                    <h2 className="title is-3 has-text-centered mb-5 gradient-text" style={{ fontWeight: '800', letterSpacing: '-0.025em' }}>Website Build Packages</h2>
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem' }}>Choose a package to fast-track your project with a dedicated build.</p>

                    <div className="columns is-multiline">
                      {pricingTiers.map((tier) => (
                        <div key={tier.id} className="column is-one-third">
                          <div
                            className={`box bubble-card ${selectedTier === tier.id ? 'is-selected' : ''}`}
                            style={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              border: selectedTier === tier.id ? `2px solid ${tier.color}` : '1px solid rgba(122, 99, 240, 0.2)',
                              cursor: 'pointer',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              transform: selectedTier === tier.id ? 'translateY(-4px)' : 'none',
                              boxShadow: selectedTier === tier.id ? `0 12px 32px ${tier.color}40` : 'none'
                            }}
                            onClick={() => setSelectedTier(tier.id)}
                          >
                            <h3 style={{ fontFamily: 'var(--font-heading, Syne, sans-serif)', fontWeight: '700', fontSize: '1.1rem', color: tier.color, marginBottom: '0.25rem', letterSpacing: '-0.01em' }}>{tier.name}</h3>
                            <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-heading, Syne, sans-serif)', color: '#f0f4ff', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>{tier.price}</div>
                            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.5' }}>{tier.description}</p>
                            <ul style={{ listStyle: 'none', marginLeft: 0, marginBottom: 'auto', padding: 0 }}>
                              {tier.features.map((feat, i) => (
                                <li key={i} style={{ marginBottom: '0.45rem', fontSize: '0.85rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                  <span style={{ color: tier.color, fontWeight: '700' }}>✓</span> {feat}
                                </li>
                              ))}
                            </ul>
                            <button
                              className="button is-fullwidth mt-4"
                              style={{
                                background: selectedTier === tier.id ? tier.color : 'rgba(124, 92, 252, 0.1)',
                                color: selectedTier === tier.id ? 'white' : 'var(--text-secondary)',
                                border: selectedTier === tier.id ? 'none' : '1px solid rgba(124, 92, 252, 0.2)',
                                fontFamily: 'var(--font-body, DM Sans, sans-serif)',
                                fontWeight: '600',
                                borderRadius: '8px',
                                transition: 'all 0.25s ease'
                              }}
                            >
                              {selectedTier === tier.id ? 'Selected ✓' : 'Select Plan'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedTier && (
                      <div className="box bubble-card bubble-card-radial mt-5 p-5">
                        <h3 className="title is-5 mb-4" style={{ color: 'white' }}>
                          Complete Your Request: <span style={{ color: pricingTiers.find(t => t.id === selectedTier)?.color }}>{pricingTiers.find(t => t.id === selectedTier)?.name} Package</span>
                        </h3>
                        <form onSubmit={handleCheckout}>
                          <div className="columns">
                            <div className="column">
                              <div className="field">
                                <label className="label" style={{ color: '#e8edf5' }}>Name</label>
                                <div className="control">
                                  <input className="input glass-input" type="text" name="checkout_name" required placeholder="Your Name" />
                                </div>
                              </div>
                            </div>
                            <div className="column">
                              <div className="field">
                                <label className="label" style={{ color: '#e8edf5' }}>Email</label>
                                <div className="control">
                                  <input className="input glass-input" type="email" name="checkout_email" required placeholder="your@email.com" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="field">
                            <label className="label" style={{ color: '#e8edf5' }}>Project Type</label>
                            <div className="control">
                              <input className="input glass-input" type="text" name="checkout_project_type" required placeholder="e.g., Portfolio, Small Business Site..." />
                            </div>
                          </div>

                          <div className="field">
                            <label className="label" style={{ color: '#e8edf5' }}>Additional Details</label>
                            <div className="control">
                              <textarea className="textarea glass-input" name="checkout_message" rows={3} placeholder="Any specific requirements?"></textarea>
                            </div>
                          </div>

                          <div className="field">
                            <div className="control">
                              <label className="checkbox" style={{ color: '#cbd5e1' }}>
                                <input
                                  type="checkbox"
                                  checked={agreedToLegal}
                                  onChange={(e) => setAgreedToLegal(e.target.checked)}
                                  style={{ marginRight: '0.5rem' }}
                                />
                                I agree to the <a href="#" style={{ color: '#8b5cf6' }}>Terms of Service</a> and <a href="#" style={{ color: '#8b5cf6' }}>Privacy Policy</a>.
                              </label>
                            </div>
                          </div>

                          <div className="field mt-4">
                            <div className="control">
                              <button
                                type="submit"
                                className={`button is-primary is-fullwidth ${isCheckingOut ? 'is-loading' : ''}`}
                                disabled={!agreedToLegal || isCheckingOut}
                                style={{
                                  backgroundColor: agreedToLegal ? pricingTiers.find(t => t.id === selectedTier)?.color : '#333',
                                  border: 'none',
                                  fontWeight: 'bold',
                                  transition: 'background-color 0.3s'
                                }}
                              >
                                Proceed to Payment ({pricingTiers.find(t => t.id === selectedTier)?.price})
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}

                  </div>
                </FadeInWrapper>

              </div>

                  <div className="column is-one-third">
                    <FadeInWrapper translateY={30} delay={200}>
                      <div className="box bubble-card bubble-card-radial contact-card-compact">
                        <h3 style={{ fontFamily: 'var(--font-heading, Syne, sans-serif)', color: 'var(--accent-primary-hover)', fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Get In Touch</h3>
                        {contactMethods.map((method, index) => (
                          <div key={index} className="contact-method-card">
                            <div className="contact-method-header">
                              <span className="contact-method-icon">{method.icon}</span>
                              <strong style={{ color: 'var(--text-primary)', fontSize: '0.92rem' }}>{method.title}</strong>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem' }}>{method.description}</p>
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
                          <h4 style={{ fontFamily: 'var(--font-heading, Syne, sans-serif)', color: 'var(--accent-primary-hover)', fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>Services Offered</h4>
                          {services.map((service, index) => (
                            <div key={index} className="contact-service-item">
                              <span className="contact-service-check">✓</span>
                              <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>{service}</span>
                            </div>
                          ))}
                        </div>

                        <div className="contact-quick-response">
                          <p style={{ color: 'var(--accent-primary-hover)', fontSize: '0.82rem', fontWeight: '600' }}>Quick Response</p>
                          <p style={{ color: 'var(--text-primary)', fontSize: '0.78rem', marginTop: '0.25rem' }}>Typically within 24 hours</p>
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


