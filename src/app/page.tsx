import type { Metadata } from 'next';
import HeroAnimation from '@/components/HeroAnimation';

export const generateMetadata = (): Metadata => ({
  title: 'Carter Moyer | Full-Stack Software Engineer',
  description:
    'Portfolio of Carter Moyer, a full-stack software engineer specializing in React, Next.js, TypeScript, and modern web experiences.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Carter Moyer | Full-Stack Software Engineer',
    description:
      'Explore featured projects, skills, and experience from Carter Moyer, a full-stack software engineer focused on modern web technology.',
    type: 'website',
    url: '/'
  }
});

export default function HomePage() {
  return (
    <>
      <HeroAnimation />
    </>
  );
}
