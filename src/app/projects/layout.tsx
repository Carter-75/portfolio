import type { Metadata } from 'next';

export const generateMetadata = (): Metadata => ({
  title: 'Projects | Carter Moyer',
  description:
    'Explore featured and experimental projects by Carter Moyer, spanning full-stack web apps, AI tooling, and creative technology.',
  alternates: {
    canonical: '/projects'
  },
  openGraph: {
    title: 'Projects | Carter Moyer',
    description:
      'Explore featured and experimental projects by Carter Moyer, spanning full-stack web apps, AI tooling, and creative technology.',
    type: 'website',
    url: '/projects'
  }
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
