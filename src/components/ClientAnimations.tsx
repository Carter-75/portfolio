'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import LoadingSkeleton from './LoadingSkeleton';

/**
 * Client-side wrapper for heavy animation components
 * Uses dynamic imports with SSR disabled for better performance
 * Wrapped in Suspense with skeleton loading UI
 * This component must be a client component to use ssr: false option
 */

// Dynamically import heavy animation components for better performance
const AnimatedBackgroundDynamic = dynamic(() => import("@/components/AnimatedBackground"), {
  ssr: false,
  loading: () => null
});

const MouseTrailDynamic = dynamic(() => import("@/components/MouseTrail"), {
  ssr: false,
  loading: () => null
});

const PortfolioChatbotDynamic = dynamic(() => import("@/components/PortfolioChatbot"), {
  ssr: false,
  loading: () => null
});

/**
 * Wrapped components with Suspense boundaries
 */
export const AnimatedBackground = () => (
  <Suspense fallback={<LoadingSkeleton />}>
    <AnimatedBackgroundDynamic />
  </Suspense>
);

export const MouseTrail = () => (
  <Suspense fallback={null}>
    <MouseTrailDynamic />
  </Suspense>
);

export const PortfolioChatbot = () => (
  <Suspense fallback={null}>
    <PortfolioChatbotDynamic />
  </Suspense>
);

