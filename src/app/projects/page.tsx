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
            problem: "Managing complex nutritional calculations and real-time macro tracking across 100+ recipes while maintaining fast load times",
            solution: "Implemented memoization strategies and lazy loading patterns, reducing initial bundle size by 40% and achieving sub-second page transitions"
        }
    },
    {
        title: "AI Mod Client Finder",
        description: "Production-ready Fabric mod scanner that mirrors a resiliency-focused PowerShell workflow with Playwright scraping, OpenAI classification, and resumable session storage. Ships frictionless UI, compliance-driven privacy tooling, and downloadable ZIP exports for multiplayer migrations.",
        url: "https://ai-mod-client-finder.vercel.app/",
        isInteractive: true,
        technologies: ["Next.js 14", "TypeScript", "Playwright", "OpenAI", "Bulma", "Anime.js", "Matter.js"],
        category: "AI Assisted Tooling",
        featured: true,
        github: "https://github.com/Carter-75/ai-mod-client-finder",
        engineeringValue: [
            "Re-implemented a crash-safe AI + scraping pipeline with two-pass classification, retries, and DuckDuckGo harvesting per mod",
            "Persisted streaming scan state, logs, and mod verdicts to disk for instant resume across browser refreshes and server restarts",
            "Delivered configurable OpenAI key handling with local preference toggles, privacy policy alignment, and optional ad slot isolation",
            "Generated TXT and ZIP download bundles containing synchronized metadata for client-only and unknown mod categories"
        ],
        challenge: {
            problem: "Translating a monolithic PowerShell script into a production web experience without losing resumability, rate limits, or AI accuracy",
            solution: "Built a modular Next.js architecture with SSE progress streaming, Playwright headless Chromium, and OpenAI completions to preserve every control flow while exposing a modern UX"
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
    const [erroredIframes, setErroredIframes] = useState<Set<string>>(new Set());

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleIframeLoad = (projectTitle: string) => {
        setLoadedIframes(prev => new Set(prev).add(projectTitle));
        setErroredIframes(prev => {
            const next = new Set(prev);
            next.delete(projectTitle);
            return next;
        });
    };

    const handleIframeError = (projectTitle: string) => {
        console.warn(`Failed to load iframe for project: ${projectTitle}`);
        setErroredIframes(prev => new Set(prev).add(projectTitle));
    };

    return (
        <div className="section">
                <div className="container">
                <FadeInWrapper translateY={30}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h1 className={`title is-2 ${styles.title} gradient-text`} style={{ marginBottom: '1rem' }}>Featured Projects</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto', lineHeight: '1.65' }}>
                            A showcase of innovative solutions demonstrating expertise in full-stack development, AI integration, and user experience design.
                        </p>
                    </div>
                    
                    {/* Featured Projects */}
                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontFamily: 'var(--font-heading, Syne, sans-serif)', color: 'var(--accent-primary-hover)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center' }}>Featured Work</h2>
                        <div className="columns is-multiline is-centered">
                            {projects.filter(project => project.featured).map((project, index) => (
                                <div key={`featured-${project.title}-${index}`} className="column is-full-mobile is-half-tablet is-one-third-desktop">
                                    <div className={`${styles.projectCard} ${styles.projectBubble}`} style={{ borderColor: 'rgba(124, 92, 252, 0.45)' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                                            <h3 className={`title is-4 ${styles.projectTitle}`} style={{ marginBottom: 0, flex: 1 }}>{project.title}</h3>
                                            <span style={{ 
                                                backgroundColor: 'rgba(124, 92, 252, 0.12)', 
                                                color: 'var(--accent-primary-hover)', 
                                                padding: '0.2rem 0.7rem', 
                                                borderRadius: '100px', 
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                whiteSpace: 'nowrap',
                                                border: '1px solid rgba(124, 92, 252, 0.25)',
                                                flexShrink: 0
                                            }}>
                                                {project.category}
                                            </span>
                                        </div>
                                        
                                        {project.isInteractive && (
                                            <div
                                                className={`${styles.iframeContainer} ${styles.iframeFixed600}`}
                                                data-loaded={loadedIframes.has(project.title)}
                                                data-error={erroredIframes.has(project.title)}
                                            >
                                                {isClient ? (
                                                    erroredIframes.has(project.title) ? (
                                                        <div className={styles.iframeFallback} role="status" aria-live="polite">
                                                            <p>Preview unavailable right now.</p>
                                                            {project.url && (
                                                                <a href={project.url} target="_blank" rel="noopener noreferrer">
                                                                    Open project in a new tab
                                                                </a>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <iframe
                                                            src={project.url!}
                                                            className={styles.projectIframe}
                                                            title={`${project.title} interactive preview`}
                                                            sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-modals allow-downloads"
                                                            loading="lazy"
                                                            referrerPolicy="strict-origin-when-cross-origin"
                                                            onLoad={() => handleIframeLoad(project.title)}
                                                            onError={() => handleIframeError(project.title)}
                                                            data-loaded={loadedIframes.has(project.title)}
                                                        ></iframe>
                                                    )
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
                                            <p style={{ marginBottom: '1.5rem', lineHeight: '1.7', color: 'var(--text-primary)' }}>{project.description}</p>
                                            
                                            {/* Engineering Value Section */}
                                            {project.engineeringValue && project.engineeringValue.length > 0 && (
                                                <div style={{ marginBottom: '1.5rem' }}>
                                                    <h4 style={{ fontFamily: 'var(--font-heading, Syne, sans-serif)', color: 'var(--accent-secondary)', fontSize: '0.78rem', marginBottom: '0.8rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                                        Engineering Highlights
                                                    </h4>
                                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                        {project.engineeringValue.map((value, valueIndex) => (
                                                            <li key={`value-${valueIndex}`} style={{
                                                                marginBottom: '0.5rem',
                                                                paddingLeft: '1.1rem',
                                                                position: 'relative',
                                                                color: 'var(--text-primary)',
                                                                fontSize: '0.84rem',
                                                                lineHeight: '1.55'
                                                            }}>
                                                                <span style={{ 
                                                                    position: 'absolute', 
                                                                    left: '0', 
                                                                    color: 'var(--accent-primary)',
                                                                    fontWeight: '700'
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
                                                    padding: '1.1rem 1.25rem',
                                                    background: 'rgba(124, 92, 252, 0.07)',
                                                    borderRadius: '12px',
                                                    border: '1px solid rgba(124, 92, 252, 0.25)'
                                                }}>
                                                    <h4 style={{ fontFamily: 'var(--font-heading, Syne, sans-serif)', color: 'var(--accent-primary-hover)', fontSize: '0.78rem', marginBottom: '0.75rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                                        Challenge & Solution
                                                    </h4>
                                                    <div style={{ marginBottom: '0.6rem' }}>
                                                        <strong style={{ color: 'var(--text-primary)', fontSize: '0.8rem' }}>Challenge:</strong>
                                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: '0.3rem 0', lineHeight: '1.5' }}>
                                                            {project.challenge.problem}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <strong style={{ color: 'var(--accent-secondary)', fontSize: '0.8rem' }}>Solution:</strong>
                                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: '0.3rem 0', lineHeight: '1.5' }}>
                                                            {project.challenge.solution}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Technologies Section */}
                                            <div style={{ marginBottom: '1rem' }}>
                                                <h4 style={{ fontFamily: 'var(--font-heading, Syne, sans-serif)', color: 'var(--text-secondary)', fontSize: '0.72rem', marginBottom: '0.6rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Tech Stack</h4>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                                    {project.technologies.map((tech, techIndex) => (
                                                        <span key={`tech-${tech}-${techIndex}`} style={{
                                                            backgroundColor: 'rgba(124, 92, 252, 0.1)',
                                                            color: '#c4b5fd',
                                                            padding: '0.3rem 0.7rem',
                                                            borderRadius: '100px',
                                                            fontSize: '0.74rem',
                                                            border: '1px solid rgba(124, 92, 252, 0.25)',
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
                        <h2 style={{ fontFamily: 'var(--font-heading, Syne, sans-serif)', color: 'var(--accent-secondary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center' }}>All Projects</h2>
                        <div className="columns is-multiline is-centered">
                            {projects.map((project, index) => (
                                <div key={`all-${project.title}-${index}`} className="column is-full-mobile is-half-tablet is-one-third-desktop">
                                    <div className={`${styles.projectCard} ${styles.projectBubble}`}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                            <h3 className={`title is-5 ${styles.projectTitle}`} style={{ marginBottom: 0, flex: 1 }}>{project.title}</h3>
                                            <span style={{ 
                                                backgroundColor: 'rgba(124, 92, 252, 0.08)', 
                                                color: 'var(--text-secondary)', 
                                                padding: '0.15rem 0.6rem', 
                                                borderRadius: '100px', 
                                                fontSize: '0.72rem',
                                                border: '1px solid rgba(124, 92, 252, 0.15)',
                                                flexShrink: 0
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
                                            <p style={{ marginBottom: '1rem', fontSize: '0.88rem', lineHeight: '1.65', color: 'var(--text-primary)' }}>{project.description}</p>
                                            
                                            {/* Engineering Value - Show top 2 items */}
                                            {project.engineeringValue && project.engineeringValue.length > 0 && (
                                                <div style={{ marginBottom: '0.85rem' }}>
                                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                        {project.engineeringValue.slice(0, 2).map((value, valueIndex) => (
                                                            <li key={`all-value-${valueIndex}`} style={{
                                                                marginBottom: '0.4rem',
                                                                paddingLeft: '1rem',
                                                                position: 'relative',
                                                                color: 'var(--text-secondary)',
                                                                fontSize: '0.78rem',
                                                                lineHeight: '1.5'
                                                            }}>
                                                                <span style={{ 
                                                                    position: 'absolute', 
                                                                    left: '0', 
                                                                    color: 'var(--accent-secondary)',
                                                                    fontSize: '0.7rem',
                                                                    fontWeight: '700'
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
                                                            backgroundColor: 'rgba(124, 92, 252, 0.08)',
                                                            color: '#c4b5fd',
                                                            padding: '0.2rem 0.55rem',
                                                            borderRadius: '100px',
                                                            fontSize: '0.71rem',
                                                            border: '1px solid rgba(124, 92, 252, 0.2)',
                                                            fontWeight: '500'
                                                        }}>
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.technologies.length > 5 && (
                                                        <span style={{
                                                            color: 'var(--text-secondary)',
                                                            fontSize: '0.71rem',
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