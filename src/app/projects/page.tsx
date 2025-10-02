'use client';

/**
 * Portfolio Projects Page with Iframe Embedding
 * 
 * This component showcases interactive projects using secure iframe embedding.
 * Each project URL should support iframe embedding with proper security headers.
 * 
 * For projects to work properly in iframes, they need:
 * - X-Frame-Options: SAMEORIGIN or ALLOWALL for carter-portfolio.fyi
 * - Content-Security-Policy: frame-ancestors directive allowing this domain
 * - Proper CORS headers for cross-origin requests
 * 
 * Projects with iframe support:
 * - AI Vibez: Full iframe support with responsive design
 * - Animation Studio: Basic iframe support
 * - Element Box: Basic iframe support  
 * - Doomlings: Needs iframe support implementation
 * - Lottery Tool: Basic iframe support
 */

import React, { useState, useEffect } from 'react';
import FadeInWrapper from '@/components/FadeInWrapper';
import AnimatedButton from '@/components/AnimatedButton';
import styles from '@/components/Projects.module.css';

const projects = [
    {
        title: "AI Vibez",
        description: "A sophisticated AI-powered application development platform. Build, preview, and deploy applications using natural language with advanced AI assistance. Features live code generation, real-time previews, and intelligent iteration capabilities.",
        url: "https://ai-vibez.com/?embed=portfolio",
        isInteractive: true,
        technologies: ["React", "TypeScript", "Cloudflare Workers", "AI Integration", "Vite", "Tailwind CSS"],
        category: "AI Development Platform",
        featured: true
    },
    {
        title: "Animation Studio",
        description: "An AI-powered 2D animation platform that democratizes creative content creation. Built with React and advanced canvas technologies, featuring real-time AI integration and interactive animation tools.",
        url: "https://animation-studio.vercel.app/",
        isInteractive: true,
        technologies: ["React", "JavaScript", "Canvas API", "HTML5", "CSS3"],
        category: "AI/Creative Tools",
        featured: true
    },
    {
        title: "Element Box",
        description: "A sophisticated physics-based sandbox game demonstrating advanced particle systems and real-time element interactions. Features custom physics engine and responsive design.",
        url: "https://element-box.vercel.app/",
        isInteractive: true,
        technologies: ["JavaScript", "HTML5 Canvas", "CSS3", "Bulma CSS", "Responsive Design"],
        category: "Game Development",
        featured: true
    },
    {
        title: "Lottery Analytics Tool",
        description: "A comprehensive financial calculator analyzing lottery winnings strategies. Features complex financial modeling, tax calculations, and investment projection algorithms.",
        url: "https://lottery-three.vercel.app/",
        isInteractive: true,
        technologies: ["React", "JavaScript", "Chart.js", "Mathematical Algorithms"],
        category: "Financial Technology",
        featured: false
    },
    {
        title: "DOOMlings Game Companion",
        description: "A comprehensive digital companion for the Doomlings card game. Features searchable card database, rules engine, and optimized mobile experience.",
        url: "https://doomlings.vercel.app/",
        isInteractive: true,
        technologies: ["React", "Next.js", "JavaScript", "Bulma CSS", "Responsive Design"],
        category: "Gaming/Utilities",
        featured: false
    },
    {
        title: "Personal Learning Projects",
        description: "Continuously working on various learning projects to expand my skills in web development, exploring new frameworks and technologies. Always experimenting with creative coding solutions.",
        url: null,
        isInteractive: false,
        technologies: ["React", "JavaScript", "Python", "Java", "MySQL", "HTML/CSS"],
        category: "Learning & Development",
        featured: true
    }
];

const ProjectsPage: React.FC = () => {
    const [isClient, setIsClient] = useState(false);
    const [loadedIframes, setLoadedIframes] = useState<Set<string>>(new Set());

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleIframeLoad = (projectTitle: string) => {
        setLoadedIframes(prev => new Set(prev).add(projectTitle));
    };

    const handleIframeError = (projectTitle: string) => {
        console.warn(`Failed to load iframe for project: ${projectTitle}`);
        // Could add error state management here if needed
    };

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
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 className={`title is-2 ${styles.title}`} style={{color: 'white', marginBottom: '1rem'}}>Featured Projects</h2>
                        <p style={{ color: '#a0a0a0', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                            A showcase of innovative solutions demonstrating expertise in full-stack development, AI integration, and user experience design.
                        </p>
                    </div>
                    
                    {/* Featured Projects */}
                    <div style={{ marginBottom: '4rem' }}>
                        <h3 style={{ color: '#e85d04', fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>🌟 Featured Work</h3>
                        <div className="columns is-multiline is-centered">
                            {projects.filter(project => project.featured).map((project, index) => (
                                <div key={index} className="column is-full-mobile is-half-tablet is-one-third-desktop">
                                    <div className={styles.projectCard} style={{...bubbleStyle, border: '2px solid rgba(72, 199, 116, 0.3)'}}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <h3 className={`title is-4 ${styles.projectTitle}`} style={{ marginBottom: 0 }}>{project.title}</h3>
                                            <span style={{ 
                                                backgroundColor: 'rgba(72, 199, 116, 0.2)', 
                                                color: '#e85d04', 
                                                padding: '0.2rem 0.6rem', 
                                                borderRadius: '12px', 
                                                fontSize: '0.8rem',
                                                fontWeight: '600'
                                            }}>
                                                {project.category}
                                            </span>
                                        </div>
                                        
                                        {project.isInteractive && (
                                            <div className={`${styles.iframeContainer} ${loadedIframes.has(project.title) ? styles.loaded : ''}`}>
                                                {isClient ? (
                                                    <iframe
                                                        src={project.url!}
                                                        className={styles.projectIframe}
                                                        title={project.title}
                                                        sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-modals allow-downloads"
                                                        loading="lazy"
                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                        onLoad={() => handleIframeLoad(project.title)}
                                                        onError={() => handleIframeError(project.title)}
                                                        data-loaded={loadedIframes.has(project.title)}
                                                    ></iframe>
                                                ) : (
                                                    <div className={styles.iframeFallback}>
                                                        <p>Loading interactive preview...</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {!project.isInteractive && (
                                            <div className={styles.comingSoon} style={{ background: 'linear-gradient(135deg, rgba(72, 199, 116, 0.1), rgba(72, 199, 116, 0.2))' }}>
                                                <p style={{ fontSize: '3rem' }}>⚡</p>
                                                <p style={{ color: '#e85d04', marginTop: '1rem', fontWeight: '600' }}>In Development</p>
                                            </div>
                                        )}

                                        <div className={styles.projectDescription}>
                                            <p style={{ marginBottom: '1rem' }}>{project.description}</p>
                                            
                                            <div style={{ marginBottom: '1rem' }}>
                                                <h4 style={{ color: '#e85d04', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600' }}>Technologies:</h4>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                                                    {project.technologies.map((tech, techIndex) => (
                                                        <span key={techIndex} style={{
                                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                            color: '#e0e0e0',
                                                            padding: '0.2rem 0.5rem',
                                                            borderRadius: '10px',
                                                            fontSize: '0.75rem'
                                                        }}>
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {project.url && (
                                            <div className={styles.projectLink}>
                                                <a href={project.url} target="_blank" rel="noopener noreferrer">
                                                    <AnimatedButton asLink>
                                                        {project.isInteractive ? "Explore Live Demo" : "Learn More"}
                                                    </AnimatedButton>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* All Projects */}
                    <div>
                        <h3 style={{ color: '#e85d04', fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>📁 All Projects</h3>
                        <div className="columns is-multiline is-centered">
                            {projects.map((project, index) => (
                                <div key={index} className="column is-full-mobile is-half-tablet is-one-third-desktop">
                                    <div className={styles.projectCard} style={bubbleStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <h3 className={`title is-5 ${styles.projectTitle}`} style={{ marginBottom: 0 }}>{project.title}</h3>
                                            <span style={{ 
                                                backgroundColor: 'rgba(160, 160, 160, 0.2)', 
                                                color: '#a0a0a0', 
                                                padding: '0.2rem 0.6rem', 
                                                borderRadius: '12px', 
                                                fontSize: '0.75rem'
                                            }}>
                                                {project.category}
                                            </span>
                                        </div>
                                        
                                        <div className={styles.projectDescription}>
                                            <p style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>{project.description}</p>
                                            
                                            <div style={{ marginBottom: '1rem' }}>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                                                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                                                        <span key={techIndex} style={{
                                                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                            color: '#c0c0c0',
                                                            padding: '0.15rem 0.4rem',
                                                            borderRadius: '8px',
                                                            fontSize: '0.7rem'
                                                        }}>
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.technologies.length > 4 && (
                                                        <span style={{
                                                            color: '#a0a0a0',
                                                            fontSize: '0.7rem',
                                                            padding: '0.15rem 0.4rem'
                                                        }}>+{project.technologies.length - 4} more</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {project.url && (
                                            <div className={styles.projectLink}>
                                                <a href={project.url} target="_blank" rel="noopener noreferrer">
                                                    <AnimatedButton asLink>
                                                        View Project
                                                    </AnimatedButton>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeInWrapper>
                    </div>
                </div>
    );
};

export default ProjectsPage; 