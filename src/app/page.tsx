'use client';

import FadeInWrapper from '@/components/FadeInWrapper';

export default function HomePage() {
  const showcaseItems = [
    {
      delay: 400,
      title: "Coming Soon",
      description: "I am currently working on an exciting new project that will be featured here. It involves [mention a technology or concept, e.g., 'machine learning and serverless architecture'] to solve [mention the problem]. Stay tuned for updates!",
      imageUrl: "https://placehold.co/600x400/d32f2f/1a1a1a?text=Coming+Soon&font=lora"
    }
  ];

  return (
    <FadeInWrapper>
      <section className="hero is-medium">
        <div className="hero-body p-0">
          <figure className="image">
            <img src="/images/header.jpg" alt="Web Magic by Carter" />
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
              Welcome to my portfolio. Here you'll find a selection of my best work, showcasing my skills in design and development.
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
                  <figure className="image is-4by3">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      style={{ objectFit: 'cover' }} 
                    />
                  </figure>
                </div>
                <div className="column is-half">
                  <h2 className="title is-3">{item.title}</h2>
                  <p className="content is-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeInWrapper>
          ))}
        </div>
      </section>
    </FadeInWrapper>
  );
}
