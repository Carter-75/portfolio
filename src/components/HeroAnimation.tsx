'use client';

import React, { useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import FadeInWrapper from './FadeInWrapper';

const HeroAnimation = () => {
  const showcaseItem = {
    title: "My GitHub Journey",
    description: "I love to explore new ideas and build fun, interactive things. My GitHub is a playground where I experiment with code and bring creative concepts to life. Many of these explorations become the projects you see on this site. Feel free to dive in and see what I'm currently working on!",
    linkUrl: "https://github.com/Carter-75",
    linkText: "Explore on GitHub"
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflowY: 'auto', 
      scrollSnapType: 'y mandatory',
    }}>
      {/* Scrollable Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        color: '#f0f0f0',
      }}>

        {/* Main Title Section */}
        <section style={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center',
          scrollSnapAlign: 'start'
        }}>
            <h1 className="title is-1" style={{color: 'white', fontSize: 'clamp(2.5rem, 8vw, 6rem)'}}>WEB MAGIC</h1>
            <h2 className="subtitle is-3" style={{color: '#a0a0a0', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'}}>BY CARTER</h2>
        </section>

        {/* Welcome Bubble Section */}
        <section style={{ 
          minHeight: '70vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '2rem',
          scrollSnapAlign: 'start'
        }}>
          <FadeInWrapper>
            <div className="box" style={{ 
                background: 'radial-gradient(circle, rgba(44, 44, 44, 0.8) 0%, rgba(26, 26, 26, 0.9) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                maxWidth: '800px',
                textAlign: 'center'
            }}>
                <h1 className="title is-2" style={{color: '#f0f0f0', marginBottom: '1.5rem'}}>Welcome!</h1>
                <p className="subtitle is-5" style={{color: '#a0a0a0'}}>
                  This is my digital space where I showcase my passion for design and development. Here you&apos;ll find a collection of my projects, from fun experiments to more complex applications.
                </p>
                <div style={{ margin: '2em 0 1em 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.15em', marginBottom: '0.5em' }}>Want to see more or hire me?</span>
                  <a href="https://www.fiverr.com/s/akweW1p" target="_blank" rel="noopener noreferrer" className="button is-success is-outlined" style={{ fontWeight: 600, fontSize: '1em' }}>Visit my Fiverr Profile</a>
                </div>
                <div style={{ marginTop: '1.5em', fontSize: '1.05em' }}>
                  To check out my projects, just go to the <b>Projects</b> tab in the navigation above!
                </div>
            </div>
          </FadeInWrapper>
        </section>

        {/* GitHub Bubble Section */}
        <section style={{ 
          minHeight: '70vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '2rem',
          scrollSnapAlign: 'start'
        }}>
           <FadeInWrapper translateY={30}>
             <div className="box" style={{ 
                background: 'radial-gradient(circle, rgba(44, 44, 44, 0.8) 0%, rgba(26, 26, 26, 0.9) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                maxWidth: '800px',
            }}>
                <h2 className="title is-2 has-text-centered">{showcaseItem.title}</h2>
                <p className="content is-medium">{showcaseItem.description}</p>
                <div className="has-text-centered">
                  <a href={showcaseItem.linkUrl} target="_blank" rel="noopener noreferrer" className="button is-success is-outlined">
                    {showcaseItem.linkText}
                  </a>
                </div>
            </div>
           </FadeInWrapper>
        </section>

      </div>
    </div>
  );
};

export default HeroAnimation;