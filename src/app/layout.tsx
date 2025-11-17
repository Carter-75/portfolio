import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import 'bulma/css/bulma.min.css';
import './globals.css';
import './custom-bulma.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AnimatedBackground, MouseTrail, PortfolioChatbot } from "@/components/ClientAnimations";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#48c774',
};

export const metadata: Metadata = {
  title: "Carter Moyer - Full-Stack Software Engineer | Portfolio",
  description: "Experienced full-stack software engineer specializing in React, Next.js, and modern web technologies. Discover my projects and professional experience in building scalable digital solutions.",
  authors: [{ name: "Carter Moyer" }],
  keywords: ["Full-Stack Developer", "React", "Next.js", "TypeScript", "Web Development", "Software Engineer"],
  openGraph: {
    title: "Carter Moyer - Full-Stack Software Engineer",
    description: "Experienced full-stack software engineer specializing in React, Next.js, and modern web technologies.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/**
 * Root Layout Component
 * Provides the base HTML structure, global styles, and shared components
 * Implements modern Next.js 15 best practices with App Router
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className} style={{background: 'transparent'}}>
        <ErrorBoundary>
          <AnimatedBackground />
          <MouseTrail />
          <PortfolioChatbot />
          <div style={{ 
            position: 'relative', 
            zIndex: 1, 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            <Navbar />
            <main className="is-flex-grow-1" role="main">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}
