'use client';

import React, { useState, useEffect } from 'react';
import FadeInWrapper from '@/components/FadeInWrapper';
import AnimatedButton from '@/components/AnimatedButton';
import styles from '@/components/Projects.module.css';

const projects = [
    {
        title: "Animation Studio",
        description: "An AI-powered 2D animation sandbox. Bring your ideas to life by asking an AI to generate custom animations, then explore and interact with a library of dynamic creations.",
        url: "https://animation-studio.vercel.app/",
        isInteractive: true,
    },
    {
        title: "Element Box",
        description: "A digital sand painting game where you can explore how different elements interact. Play with various materials and watch as they react to each other in a physics-based sandbox.",
        url: "https://element-box.vercel.app/",
        isInteractive: true,
    },
    {
        title: "Lottery Winnings Calculator",
        description: "A calculator for lottery winnings that analyzes lump sum versus 30-year annual payments, projecting investment growth while accounting for taxes and inflation.",
        url: "https://lottery-three.vercel.app/",
        isInteractive: true,
    },
    {
        title: "Coming Soon",
        description: "I'm always working on something new. Check back soon to see my next project!",
        url: null,
        isInteractive: false,
    }
];

const ProjectsPage: React.FC = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const bubbleStyle: React.CSSProperties = {
        background: 'radial-gradient(circle, rgba(44, 44, 44, 0.8) 0%, rgba(26, 26, 26, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    };

    return (
        <div className="section">
                <div className="container">
                <FadeInWrapper translateY={30}>
                    <h2 className={`title is-2 has-text-centered ${styles.title}`} style={{color: 'white', marginBottom: '3rem'}}>My Projects</h2>
                    <div className="columns is-multiline is-centered">
                        {projects.map((project, index) => (
                            <div key={index} className="column is-full-mobile is-half-tablet is-one-third-desktop">
                                <div className={styles.projectCard} style={bubbleStyle}>
                                    <h3 className={`title is-4 ${styles.projectTitle}`}>{project.title}</h3>
                                    
                                    {project.isInteractive && (
                                        <div className={styles.iframeContainer}>
                                            {isClient ? (
                                                <iframe
                                                    src={project.url!}
                                                    className={styles.projectIframe}
                                                    title={project.title}
                                                    sandbox="allow-scripts allow-popups allow-forms"
                                                ></iframe>
                                            ) : (
                                                <div className={styles.iframeFallback}>
                                                    <p>Loading interactive preview...</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {!project.isInteractive && (
                                        <div className={styles.comingSoon}>
                                            <p>🚀</p>
                                        </div>
                                    )}

                                    <div className={styles.projectDescription}>
                                        <p>{project.description}</p>
                                    </div>

                                    {project.url && (
                                        <div className={styles.projectLink}>
                                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                                                <AnimatedButton asLink>
                                                    {project.title === "Coming Soon" ? "Stay Tuned" : `Visit ${project.title}`}
                                                </AnimatedButton>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeInWrapper>
                    </div>
                </div>
    );
};

export default ProjectsPage; 