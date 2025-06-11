'use client';

import FadeInWrapper from '@/components/FadeInWrapper';
import Image from 'next/image';
import CoolVisual from '@/components/CoolVisual';

export default function HomePage() {
  const showcaseItems = [
    {
      delay: 400,
      title: "My GitHub Journey",
      description: "I love to explore new ideas and build fun, interactive things. My GitHub is a playground where I experiment with code and bring creative concepts to life. Many of these explorations become the projects you see on this site. Feel free to dive in and see what I'm currently working on!",
      linkUrl: "https://github.com/Carter-75",
      linkText: "Explore on GitHub"
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
              Welcome!
            </h1>
            <p className="subtitle is-4 has-text-grey-darker">
              This is my digital space where I showcase my passion for design and development. Here you&apos;ll find a collection of my projects, from fun experiments to more complex applications. 
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
