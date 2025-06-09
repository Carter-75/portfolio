'use client';

import { ReactNode, useRef, forwardRef } from 'react';
import anime from 'animejs';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  animationType?: 'wiggle' | 'pulse';
  asLink?: boolean;
}

const AnimatedButton = forwardRef<HTMLButtonElement | HTMLSpanElement, AnimatedButtonProps>((
  {
    children,
    onClick,
    type = 'button',
    animationType = 'wiggle',
    asLink = false
  }, 
  ref
) => {
  const internalElementRef = useRef<HTMLButtonElement | HTMLSpanElement>(null);

  const playAnimation = () => {
    const targetToAnimate = internalElementRef.current;
    if (!targetToAnimate) {
      return;
    }

    if (typeof anime !== 'function') {
      return;
    }

    if (typeof anime.remove === 'function') {
      try {
          anime.remove(targetToAnimate);
      } catch {
        // Error removing animation is not critical
      }
    }

    let animationParams = {};
    if (animationType === 'wiggle') {
      animationParams = {
        rotate: [
          { value: -5, duration: 100, easing: 'easeInOutSine' },
          { value: 5, duration: 100, easing: 'easeInOutSine' },
          { value: -3, duration: 80, easing: 'easeInOutSine' },
          { value: 3, duration: 80, easing: 'easeInOutSine' },
          { value: 0, duration: 120, easing: 'easeOutBounce' }
        ],
        scale: [
          { value: 1.03, duration: 200, easing: 'easeOutQuad' },
          { value: 1, duration: 200, easing: 'easeInQuad' }
        ],
        duration: 500,
      };
    } else if (animationType === 'pulse') {
      animationParams = {
        scale: [
          { value: 1.05, duration: 250, easing: 'easeOutQuad' },
          { value: 1, duration: 250, easing: 'easeInQuad' }
        ],
        loop: 2,
        direction: 'alternate',
        duration: 500
      };
    }
    try {
      anime({ targets: targetToAnimate, ...animationParams });
    } catch {
      // Animation failure is not critical
    }
  };

  if (asLink) {
    return (
      <span
        ref={(el) => {
          internalElementRef.current = el;
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        onMouseEnter={playAnimation}
        onClick={onClick} 
        role="link"
        tabIndex={0}
      >
        {children}
      </span>
    );
  }

  return (
    <button
      ref={(el) => {
        internalElementRef.current = el;
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
      }}
      type={type}
      onMouseEnter={playAnimation}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton; 