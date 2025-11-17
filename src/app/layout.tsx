import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bulma/css/bulma.min.css';
import './globals.css';
import './custom-bulma.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseTrail from "@/components/MouseTrail";
import PortfolioChatbot from "@/components/PortfolioChatbot";
import { Analytics } from "@vercel/analytics/react";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carter Moyer - Full-Stack Software Engineer | Portfolio",
  description: "Experienced full-stack software engineer specializing in React, Next.js, and modern web technologies. Discover my projects and professional experience in building scalable digital solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className} style={{background: 'transparent'}}>
        <AnimatedBackground />
        <MouseTrail />
        <PortfolioChatbot />
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main className="is-flex-grow-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
