'use client';

import { useEffect, useRef, ReactNode } from 'react';
import anime from 'animejs';

interface FadeInWrapperProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  translateY?: number;
  // className?: string; // Removed className from props
}

export default function FadeInWrapper({
  children,
  delay = 0,
  duration = 800,
  translateY = 20,
  // className = '' // Removed className from default props
}: FadeInWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current; // Capture the element ref value

    if (element) {
      if (typeof anime !== 'function') {
        console.error("[FadeInWrapper] anime is not a function.", { animeImport: anime });
        return;
      }

      const animationProps = {
        targets: element,
        opacity: [0, 1],
        translateY: [translateY, 0],
        duration: duration,
        delay: delay,
        easing: 'easeOutQuad'
      };
      
      try {
        anime(animationProps);
      } catch (error) {
        console.error("[FadeInWrapper] Error during animate call:", error, "Props:", animationProps);
      }
    }

    return () => {
      // Use the captured 'element' variable for cleanup
      if (element) {
        if (typeof anime !== 'function' || typeof anime.remove !== 'function') {
            return;
        }
        try {
            anime.remove(element);
        } catch (error) {
            console.error("[FadeInWrapper] Error during anime.remove call:", error);
        }
      }
    };
  }, [delay, duration, translateY]);

  // The div will no longer be initially hidden by opacity-0 via CSS.
  // Anime.js handles the opacity transition from 0 to 1.
  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
}
