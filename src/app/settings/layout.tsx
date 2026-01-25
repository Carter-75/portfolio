import type { Metadata } from 'next';

export const generateMetadata = (): Metadata => ({
  title: 'Settings | Carter Moyer',
  description: 'Personalization settings for the portfolio experience.',
  alternates: {
    canonical: '/settings'
  },
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: 'Settings | Carter Moyer',
    description: 'Personalization settings for the portfolio experience.',
    type: 'website',
    url: '/settings'
  }
});

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
