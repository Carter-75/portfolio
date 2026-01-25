import type { Metadata } from 'next';

export const generateMetadata = (): Metadata => ({
  title: 'Blog | Carter Moyer',
  description:
    'Insights and technical notes from Carter Moyer on full-stack development, AI integration, and modern web engineering.',
  alternates: {
    canonical: '/blog'
  },
  openGraph: {
    title: 'Blog | Carter Moyer',
    description:
      'Read thoughts and deep dives on software engineering, AI tooling, and web architecture by Carter Moyer.',
    type: 'website',
    url: '/blog'
  }
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
