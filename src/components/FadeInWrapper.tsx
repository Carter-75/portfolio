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
    let isMounted = true;

    if (elementRef.current) {
      if (!isMounted) return;

      if (typeof anime !== 'function') {
        console.error("[FadeInWrapper] anime is not a function.", { animeImport: anime });
        return;
      }

      const currentTargets = elementRef.current;
      if (!currentTargets) {
          console.warn("[FadeInWrapper] elementRef.current became null before animation.");
          return;
      }
      
      const animationProps = {
        targets: currentTargets,
        opacity: [0, 1],
        translateY: [translateY, 0],
        duration: duration,
        delay: delay,
        easing: 'easeOutQuad'
      };
      
      // console.log("[FadeInWrapper] Animation call. Props:", animationProps); // Optional: remove for cleaner console

      try {
        anime(animationProps);
        // console.log("[FadeInWrapper] Animation initiated for:", currentTargets); // Optional: remove
      } catch (error) {
        console.error("[FadeInWrapper] Error during animate call:", error, "Props:", animationProps);
      }
    } else {
      // console.warn("[FadeInWrapper] elementRef.current is null, skipping animation."); // Optional: remove
    }

    return () => {
      isMounted = false;
      if (elementRef.current) {
        if (typeof anime !== 'function' || typeof anime.remove !== 'function') {
            // console.warn("[FadeInWrapper] anime or anime.remove is not a function, cannot remove animations.", { animeImport: anime }); // Optional: remove
            return;
        }
        try {
            anime.remove(elementRef.current);
            // console.log("[FadeInWrapper] Animations removed for:", elementRef.current); // Optional: remove
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
