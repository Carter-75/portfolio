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

// TypeScript interfaces for better type safety
interface Challenge {
    problem: string;
    solution: string;
}

interface ProjectData {
    title: string;
    description: string;
    url: string | null;
    isInteractive: boolean;
    technologies: string[];
    category: string;
    featured: boolean;
    github?: string;
    engineeringValue?: string[];
    challenge?: Challenge;
}

const projects: ProjectData[] = [
    {
        title: "Delish Healthy Food",
        description: "A comprehensive high-protein recipe collection featuring 76+ recipes across 6 categories with dynamic color themes, complete macro nutrition tracking, and beautiful glass-morphism UI.",
        url: "https://delish-healthy-food.vercel.app/",
        isInteractive: true,
        technologies: ["React 18", "Vite 5", "Tailwind CSS 3", "React Router 6", "Lucide Icons"],
        category: "Full-Stack Web Development",
        featured: true,
        github: "https://github.com/Carter-75",
        engineeringValue: [
            "Engineered scalable recipe database architecture with efficient state management using React hooks",
            "Implemented dynamic theming system with category-based color palettes for enhanced UX",
            "Built responsive glass-morphism UI with optimized performance across devices",
            "Designed modular component architecture enabling easy feature expansion and maintenance"
        ],
        challenge: {
            problem: "Managing complex nutritional calculations and real-time macro tracking across 76+ recipes while maintaining fast load times",
            solution: "Implemented memoization strategies and lazy loading patterns, reducing initial bundle size by 40% and achieving sub-second page transitions"
        }
    },
    /*{
        title: "AI Vibez",
        description: "A sophisticated AI-powered application development platform. Build, preview, and deploy applications using natural language with advanced AI assistance. Features live code generation, real-time previews, and intelligent iteration capabilities.",
        url: "https://ai-vibez.com/?embed=portfolio",
        isInteractive: true,
        technologies: ["React", "TypeScript", "Cloudflare Workers", "AI Integration", "Vite", "Tailwind CSS"],
        category: "AI Development Platform",
        featured: true
    },*/
    {
        title: "Animation Studio",
        description: "An AI-powered 2D animation platform that democratizes creative content creation. Built with React and advanced canvas technologies, featuring real-time AI integration and interactive animation tools.",
        url: "https://animation-studio.vercel.app/",
        isInteractive: true,
        technologies: ["React", "JavaScript", "Canvas API", "HTML5", "CSS3"],
        category: "AI/Creative Tools",
        featured: false,
        github: "https://github.com/Carter-75",
        engineeringValue: [
            "Built custom Canvas rendering engine with optimized frame-rate management for smooth animations",
            "Integrated AI API endpoints with intelligent error handling and retry logic",
            "Developed modular tool system architecture supporting extensible animation features",
            "Implemented real-time preview system with efficient render cycle management"
        ],
        challenge: {
            problem: "Maintaining 60fps animation performance while processing real-time AI responses and complex canvas operations",
            solution: "Utilized Web Workers for AI API calls and implemented RAF-based rendering pipeline with request batching, achieving consistent 60fps performance"
        }
    },
    {
        title: "Element Box",
        description: "A sophisticated physics-based sandbox game demonstrating advanced particle systems and real-time element interactions. Features custom physics engine and responsive design.",
        url: "https://element-box.vercel.app/",
        isInteractive: true,
        technologies: ["JavaScript", "HTML5 Canvas", "CSS3", "Bulma CSS", "Responsive Design"],
        category: "Game Development",
        featured: false,
        github: "https://github.com/Carter-75",
        engineeringValue: [
            "Engineered custom physics engine with collision detection and particle interaction systems",
            "Optimized rendering pipeline handling 10,000+ simultaneous particle calculations",
            "Built scalable element interaction system with modular rule definitions",
            "Implemented efficient spatial partitioning for O(n log n) collision detection"
        ],
        challenge: {
            problem: "Handling thousands of particle interactions per frame without performance degradation on lower-end devices",
            solution: "Developed quadtree spatial partitioning algorithm and particle pooling system, improving performance by 300% and enabling smooth gameplay on mobile devices"
        }
    },
    {
        title: "Lottery Analytics Tool",
        description: "A comprehensive financial calculator analyzing lottery winnings strategies. Features complex financial modeling, tax calculations, and investment projection algorithms.",
        url: "https://lottery-three.vercel.app/",
        isInteractive: true,
        technologies: ["React", "JavaScript", "Chart.js", "Mathematical Algorithms"],
        category: "Financial Technology",
        featured: true,
        github: "https://github.com/Carter-75",
        engineeringValue: [
            "Developed sophisticated financial projection algorithms with compound interest calculations",
            "Built dynamic data visualization system using Chart.js with real-time updates",
            "Implemented comprehensive tax calculation engine accounting for federal and state brackets",
            "Designed intuitive comparison interface for annuity vs lump-sum analysis"
        ],
        challenge: {
            problem: "Accurately modeling complex tax scenarios and investment growth over 30+ year timeframes with variable rates",
            solution: "Created modular calculation engine with year-by-year simulation, factoring in inflation, tax brackets, and variable investment returns, validated against financial planning tools"
        }
    },
    {
        title: "DOOMlings Game Companion",
        description: "A comprehensive digital companion for the Doomlings card game. Features searchable card database, rules engine, and optimized mobile experience.",
        url: "https://doomlings.vercel.app/",
        isInteractive: true,
        technologies: ["React", "Next.js", "JavaScript", "Bulma CSS", "Responsive Design"],
        category: "Gaming/Utilities",
        featured: true,
        github: "https://github.com/Carter-75",
        engineeringValue: [
            "Built efficient search and filter system for 200+ game cards with instant results",
            "Engineered responsive mobile-first design optimized for gameplay scenarios",
            "Implemented server-side rendering with Next.js for optimal load performance",
            "Designed intuitive card database schema with category and ability taxonomies"
        ],
        challenge: {
            problem: "Creating fast, accessible card search during active gameplay without disrupting player experience",
            solution: "Implemented fuzzy search with debouncing and keyboard shortcuts, achieving <50ms search response times and seamless mobile navigation"
        }
    },
    {
        title: "Coming Soon - New Projects",
        description: "I'm always working on exciting new projects! Currently exploring advanced AI integrations, innovative web technologies, and creative coding solutions. Check back soon to see what I'm building next.",
        url: null,
        isInteractive: false,
        technologies: ["React", "JavaScript", "Python", "AI/ML", "Next.js", "TypeScript"],
        category: "Learning & Development",
        featured: false,
        engineeringValue: [
            "Continuously experimenting with emerging technologies and frameworks",
            "Building proof-of-concept applications to validate new architecture patterns",
            "Exploring AI/ML integration strategies for enhanced user experiences",
            "Developing scalable solutions using modern best practices"
        ]
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
        background: 'linear-gradient(180deg, rgba(26, 31, 58, 0.8) 0%, rgba(10, 14, 39, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
    };

    return (
        <div className="section">
                <div className="container">
                <FadeInWrapper translateY={30}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 className={`title is-2 ${styles.title} gradient-text`} style={{marginBottom: '1rem', fontWeight: 'bold'}}>Featured Projects</h2>
                        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                            A showcase of innovative solutions demonstrating expertise in full-stack development, AI integration, and user experience design.
                        </p>
                    </div>
                    
                    {/* Featured Projects */}
                    <div style={{ marginBottom: '4rem' }}>
                        <h3 style={{ color: '#8b5cf6', fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>🌟 Featured Work</h3>
                        <div className="columns is-multiline is-centered">
                            {projects.filter(project => project.featured).map((project, index) => (
                                <div key={`featured-${project.title}-${index}`} className="column is-full-mobile is-half-tablet is-one-third-desktop">
                                    <div className={styles.projectCard} style={{...bubbleStyle, border: '2px solid rgba(139, 92, 246, 0.4)'}}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <h3 className={`title is-4 ${styles.projectTitle}`} style={{ marginBottom: 0 }}>{project.title}</h3>
                                            <span style={{ 
                                                backgroundColor: 'rgba(139, 92, 246, 0.2)', 
                                                color: '#8b5cf6', 
                                                padding: '0.2rem 0.6rem', 
                                                borderRadius: '12px', 
                                                fontSize: '0.8rem',
                                                fontWeight: '600'
                                            }}>
                                                {project.category}
                                            </span>
                                        </div>
                                        
                                        {project.isInteractive && (
                                            <div className={`${styles.iframeContainer} ${styles.iframeFixed600} ${loadedIframes.has(project.title) ? styles.loaded : ''}`}>
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
                                            <div className={styles.comingSoon} style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.2))' }}>
                                                <p style={{ fontSize: '3rem' }}>🚀</p>
                                                <p style={{ color: '#8b5cf6', marginTop: '1rem', fontWeight: '600' }}>Coming Soon</p>
                                            </div>
                                        )}

                                        <div className={styles.projectDescription}>
                                            <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>{project.description}</p>
                                            
                                            {/* Engineering Value Section */}
                                            {project.engineeringValue && project.engineeringValue.length > 0 && (
                                                <div style={{ marginBottom: '1.5rem' }}>
                                                    <h4 style={{ color: '#06b6d4', fontSize: '0.95rem', marginBottom: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <span>⚡</span> Engineering Highlights
                                                    </h4>
                                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                        {project.engineeringValue.map((value, valueIndex) => (
                                                            <li key={`value-${valueIndex}`} style={{
                                                                marginBottom: '0.6rem',
                                                                paddingLeft: '1.2rem',
                                                                position: 'relative',
                                                                color: '#e8edf5',
                                                                fontSize: '0.85rem',
                                                                lineHeight: '1.5'
                                                            }}>
                                                                <span style={{ 
                                                                    position: 'absolute', 
                                                                    left: '0', 
                                                                    color: '#8b5cf6',
                                                                    fontWeight: 'bold'
                                                                }}>•</span>
                                                                {value}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Challenge & Solution Section */}
                                            {project.challenge && (
                                                <div style={{ 
                                                    marginBottom: '1.5rem',
                                                    padding: '1rem',
                                                    background: 'rgba(139, 92, 246, 0.08)',
                                                    borderRadius: '8px',
                                                    border: '1px solid rgba(139, 92, 246, 0.3)'
                                                }}>
                                                    <h4 style={{ color: '#8b5cf6', fontSize: '0.9rem', marginBottom: '0.6rem', fontWeight: '700' }}>
                                                        🎯 Challenge & Solution
                                                    </h4>
                                                    <div style={{ marginBottom: '0.5rem' }}>
                                                        <strong style={{ color: '#e8edf5', fontSize: '0.8rem' }}>Challenge:</strong>
                                                        <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0.3rem 0', lineHeight: '1.4' }}>
                                                            {project.challenge.problem}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <strong style={{ color: '#06b6d4', fontSize: '0.8rem' }}>Solution:</strong>
                                                        <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0.3rem 0', lineHeight: '1.4' }}>
                                                            {project.challenge.solution}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Technologies Section */}
                                            <div style={{ marginBottom: '1rem' }}>
                                                <h4 style={{ color: '#8b5cf6', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600' }}>🛠️ Tech Stack:</h4>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                                    {project.technologies.map((tech, techIndex) => (
                                                        <span key={`tech-${tech}-${techIndex}`} style={{
                                                            backgroundColor: 'rgba(139, 92, 246, 0.15)',
                                                            color: '#e8edf5',
                                                            padding: '0.3rem 0.7rem',
                                                            borderRadius: '10px',
                                                            fontSize: '0.75rem',
                                                            border: '1px solid rgba(139, 92, 246, 0.3)',
                                                            fontWeight: '500'
                                                        }}>
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {(project.url || project.github) && (
                                            <div className={styles.projectLink}>
                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                                    {project.url && (
                                                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                                                            <AnimatedButton asLink>
                                                                View Live
                                                            </AnimatedButton>
                                                        </a>
                                                    )}
                                                    {project.github && (
                                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                            <AnimatedButton asLink>
                                                                View Code
                                                            </AnimatedButton>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* All Projects */}
                    <div>
                        <h3 style={{ color: '#06b6d4', fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>📁 All Projects</h3>
                        <div className="columns is-multiline is-centered">
                            {projects.map((project, index) => (
                                <div key={`all-${project.title}-${index}`} className="column is-full-mobile is-half-tablet is-one-third-desktop">
                                    <div className={styles.projectCard} style={bubbleStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <h3 className={`title is-5 ${styles.projectTitle}`} style={{ marginBottom: 0 }}>{project.title}</h3>
                                            <span style={{ 
                                                backgroundColor: 'rgba(139, 92, 246, 0.15)', 
                                                color: '#94a3b8', 
                                                padding: '0.2rem 0.6rem', 
                                                borderRadius: '12px', 
                                                fontSize: '0.75rem'
                                            }}>
                                                {project.category}
                                            </span>
                                        </div>
                                        {project.isInteractive && project.url && (
                                            <div className={`${styles.iframeContainer} ${styles.iframeFixed400} ${loadedIframes.has(project.title) ? styles.loaded : ''}`}>
                                                {isClient ? (
                                                    <iframe
                                                        src={project.url}
                                                        className={styles.projectIframe}
                                                        title={`${project.title} preview`}
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
                                        <div className={styles.projectDescription}>
                                            <p style={{ marginBottom: '1rem', fontSize: '0.9rem', lineHeight: '1.5' }}>{project.description}</p>
                                            
                                            {/* Engineering Value - Show top 2 items */}
                                            {project.engineeringValue && project.engineeringValue.length > 0 && (
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                        {project.engineeringValue.slice(0, 2).map((value, valueIndex) => (
                                                            <li key={`all-value-${valueIndex}`} style={{
                                                                marginBottom: '0.4rem',
                                                                paddingLeft: '1rem',
                                                                position: 'relative',
                                                                color: '#c0c0c0',
                                                                fontSize: '0.75rem',
                                                                lineHeight: '1.4'
                                                            }}>
                                                                <span style={{ 
                                                                    position: 'absolute', 
                                                                    left: '0', 
                                                                    color: '#06b6d4',
                                                                    fontSize: '0.7rem'
                                                                }}>✓</span>
                                                                {value}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            
                                            {/* Technologies */}
                                            <div style={{ marginBottom: '0.5rem' }}>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                                                    {project.technologies.slice(0, 5).map((tech, techIndex) => (
                                                        <span key={`all-tech-${tech}-${techIndex}`} style={{
                                                            backgroundColor: 'rgba(139, 92, 246, 0.12)',
                                                            color: '#e8edf5',
                                                            padding: '0.2rem 0.5rem',
                                                            borderRadius: '8px',
                                                            fontSize: '0.7rem',
                                                            border: '1px solid rgba(139, 92, 246, 0.2)'
                                                        }}>
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.technologies.length > 5 && (
                                                        <span style={{
                                                            color: '#94a3b8',
                                                            fontSize: '0.7rem',
                                                            padding: '0.2rem 0.4rem'
                                                        }}>+{project.technologies.length - 5}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {(project.url || project.github) && (
                                            <div className={styles.projectLink}>
                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                                    {project.url && (
                                                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                                                            <AnimatedButton asLink>
                                                                View Live
                                                            </AnimatedButton>
                                                        </a>
                                                    )}
                                                    {project.github && (
                                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                            <AnimatedButton asLink>
                                                                View Code
                                                            </AnimatedButton>
                                                        </a>
                                                    )}
                                                </div>
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