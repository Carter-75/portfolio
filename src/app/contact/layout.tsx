import type { Metadata } from 'next';

export const generateMetadata = (): Metadata => ({
  title: 'Contact | Carter Moyer',
  description:
    'Get in touch with Carter Moyer for full-stack development, AI integration, and modern web projects.',
  alternates: {
    canonical: '/contact'
  },
  openGraph: {
    title: 'Contact | Carter Moyer',
    description:
      'Get in touch with Carter Moyer for full-stack development, AI integration, and modern web projects.',
    type: 'website',
    url: '/contact'
  }
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
