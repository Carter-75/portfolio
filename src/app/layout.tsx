import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import 'bulma/css/bulma.min.css';
import './globals.css';
import './custom-bulma.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AnimatedBackground, MouseTrail, PortfolioChatbot, SystemHUD } from "@/components/ClientAnimations";
import { DevModeProvider } from "@/context/DevModeContext";
import DevPanel from "@/components/DevPanel";
import HapticsProvider from "@/components/HapticsProvider";

const syne = Syne({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#7c5cfc',
};

export const metadata: Metadata = {
  title: "Carter Moyer - Full-Stack Software Engineer | Portfolio",
  description: "Experienced full-stack software engineer specializing in React, Next.js, and modern web technologies. Discover my projects and professional experience in building scalable digital solutions.",
  authors: [{ name: "Carter Moyer" }],
  keywords: ["Full-Stack Developer", "React", "Next.js", "TypeScript", "Web Development", "Software Engineer"],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: '512x512' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
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
 * Uses Syne (headings) + DM Sans (body) — modern, distinctive pairing
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} has-navbar-fixed-top`}>
      <body className={`${dmSans.className} has-navbar-fixed-top app-body`}>
        <ErrorBoundary>
          <DevModeProvider>
            <AnimatedBackground />
            <DevPanel />
            <MouseTrail />
            <SystemHUD />
            <PortfolioChatbot />
            <HapticsProvider />
            <div className="app-shell">
              <Navbar />
              <main id="main-content" className="is-flex-grow-1" role="main">
                <ErrorBoundary>
                  {children}
                </ErrorBoundary>
              </main>
              <Footer />
            </div>
            <Analytics />
          </DevModeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
