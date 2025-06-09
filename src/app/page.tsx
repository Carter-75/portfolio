'use client';

import FadeInWrapper from '@/components/FadeInWrapper';
import Image from 'next/image';
import CoolVisual from '@/components/CoolVisual';

export default function HomePage() {
  const showcaseItems = [
    {
      delay: 400,
      title: "Future Endeavors",
      description: "I'm always looking ahead. My next goal is to build a full-stack application that explores advanced server-side rendering and modern, responsive user interfaces. The aim is to create something that is not only technically robust but also a pleasure to use. You can follow my journey and see my current work on GitHub.",
      linkUrl: "https://github.com/Carter-112",
      linkText: "See My Work on GitHub"
    }
  ];

  return (
    <FadeInWrapper>
      <section className="hero is-medium">
        <div className="hero-body p-0">
          <figure className="image" style={{ position: 'relative', height: '40vh' }}>
            <Image 
              src="/images/header.jpg" 
              alt="Web Magic by Carter"
              fill
              priority 
              style={{ objectFit: 'cover' }}
              sizes="100vw"
            />
          </figure>
        </div>
      </section>

      <section className="section is-medium has-text-centered">
        <FadeInWrapper delay={100}>
          <div className="container">
            <h1 className="title is-1 has-text-success-dark is-spaced">
              My Portfolio
            </h1>
            <p className="subtitle is-4 has-text-grey-darker">
              Welcome to my portfolio. Below you&apos;ll find a selection of my work, showcasing my skills in design and development. For more about me and my services, check out the links in the footer.
            </p>
          </div>
        </FadeInWrapper>
      </section>

      <section className="section">
        <div className="container">
          {showcaseItems.map((item, index) => (
            <FadeInWrapper 
              key={index} 
              delay={item.delay} 
              translateY={30} 
            >
              <div className="columns is-vcentered is-variable is-6 mb-6 box box-showcase-item">
                <div className={`column is-half ${index % 2 !== 0 ? 'is-order-2-desktop' : ''}`}>
                  <figure className="image is-4by3" style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                    <CoolVisual />
                  </figure>
                </div>
                <div className="column is-half">
                  <h2 className="title is-3">{item.title}</h2>
                  <p className="content is-medium">
                    {item.description}
                  </p>
                  {item.linkUrl && item.linkText && (
                    <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" className="button is-success is-outlined">
                      {item.linkText}
                    </a>
                  )}
                </div>
              </div>
            </FadeInWrapper>
          ))}
        </div>
      </section>
    </FadeInWrapper>
  );
}
