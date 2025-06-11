'use client';

import React, { useState, useEffect } from 'react';
import FadeInWrapper from '@/components/FadeInWrapper';
import AnimatedButton from '@/components/AnimatedButton';
import styles from '@/components/Projects.module.css';

const projects = [
    {
        title: "Animation Studio",
        description: "An AI-powered 2D animation sandbox. Bring your ideas to life by asking an AI to generate custom animations, then explore and interact with a library of dynamic creations.",
        url: "https://animation-studio-l3bhphw5v-carters-projects-7dd7e086.vercel.app/",
        isInteractive: true,
    },
    {
        title: "Element Box",
        description: "A digital sand painting game where you can explore how different elements interact. Play with various materials and watch as they react to each other in a physics-based sandbox.",
        url: "https://element-hpiego236-carters-projects-7dd7e086.vercel.app/",
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

    return (
        <FadeInWrapper>
            <section className={`section ${styles.projectsSection}`} id="projects">
                <div className="container">
                    <h2 className={`title is-2 has-text-centered ${styles.title}`}>My Projects</h2>
                    <div className="columns is-multiline is-centered">
                        {projects.map((project, index) => (
                            <div key={index} className="column is-full-mobile is-half-tablet is-one-third-desktop">
                                <div className={styles.projectCard}>
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
                </div>
            </section>
        </FadeInWrapper>
    );
};

export default ProjectsPage; 