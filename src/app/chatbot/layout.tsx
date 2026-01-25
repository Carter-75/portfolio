import type { Metadata } from 'next';

export const generateMetadata = (): Metadata => ({
  title: 'Chatbot | Carter Moyer',
  description:
    'How the portfolio chatbot was built, including architecture, features, and implementation highlights.',
  alternates: {
    canonical: '/chatbot'
  },
  openGraph: {
    title: 'Chatbot | Carter Moyer',
    description:
      'Architecture and engineering details behind the AI-powered portfolio assistant.',
    type: 'article',
    url: '/chatbot'
  }
});

export default function ChatbotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
