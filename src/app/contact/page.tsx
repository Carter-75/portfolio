'use client';

import { useState, FormEvent } from 'react';
import FadeInWrapper from '@/components/FadeInWrapper';
import AnimatedButton from '@/components/AnimatedButton';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fromEmail: '',
    toEmail: 'ph75nix@proton.me',
    subject: '',
    body: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fromEmail.includes('@')) {
        alert("Please enter a valid email address for yourself.");
        return;
    }
    if (!formData.toEmail.includes('@')) {
        alert("Recipient email is not valid. Please contact support.");
        return;
    }
    if (!formData.subject.trim() || !formData.body.trim()) {
        alert("Subject and message cannot be empty.");
        return;
    }

    const mailtoLink = `mailto:${formData.toEmail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Message from: ${formData.fromEmail}\n\n${formData.body}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <FadeInWrapper>
      <section className="section is-medium has-text-centered">
        <FadeInWrapper delay={100}>
          <div className="container">
            <h1 className="title is-1 has-text-success-dark is-spaced">
              Contact Me
            </h1>
            <p className="subtitle is-4 has-text-grey-darker">
              Have a project in mind or want to connect? Send me a message, and I&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </FadeInWrapper>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '768px' }}>
          <div className="box">
            <form onSubmit={handleSubmit}>
              <FadeInWrapper delay={200} translateY={20}>
                <div className="field">
                  <label htmlFor="fromEmail" className="label">
                    Your Email <span className="has-text-danger">*</span>
                  </label>
                  <div className="control">
                    <input
                      type="email"
                      name="fromEmail"
                      id="fromEmail"
                      className="input is-success"
                      value={formData.fromEmail}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
              </FadeInWrapper>

              <FadeInWrapper delay={300} translateY={20}>
                <div className="field">
                  <label htmlFor="toEmail" className="label">
                    To
                  </label>
                  <div className="control">
                    <input
                      type="email"
                      name="toEmail"
                      id="toEmail"
                      className="input"
                      value={formData.toEmail}
                      readOnly 
                    />
                  </div>
                </div>
              </FadeInWrapper>

              <FadeInWrapper delay={400} translateY={20}>
                <div className="field">
                  <label htmlFor="subject" className="label">
                    Subject <span className="has-text-danger">*</span>
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className="input is-success"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project Inquiry"
                    />
                  </div>
                </div>
              </FadeInWrapper>

              <FadeInWrapper delay={500} translateY={20}>
                <div className="field">
                  <label htmlFor="body" className="label">
                    Message <span className="has-text-danger">*</span>
                  </label>
                  <div className="control">
                    <textarea
                      name="body"
                      id="body"
                      className="textarea is-success"
                      rows={5}
                      value={formData.body}
                      onChange={handleChange}
                      required
                      placeholder="Hello, I'd like to know more about..."
                    ></textarea>
                  </div>
                </div>
              </FadeInWrapper>

              <FadeInWrapper delay={600} translateY={20}>
                <div className="field is-grouped is-grouped-centered" style={{paddingTop: '1rem'}}>
                  <div className="control">
                    <AnimatedButton
                      type="submit"
                      animationType="wiggle"
                    >
                      <span className="button is-success is-medium is-rounded">
                        Compose Email & Send
                      </span>
                    </AnimatedButton>
                  </div>
                </div>
              </FadeInWrapper>
            </form>
          </div>
        </div>
      </section>
    </FadeInWrapper>
  );
}

export default ContactPage;
 