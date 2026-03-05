'use client';

import { useEffect } from 'react';
import { WebHaptics } from 'web-haptics';

export default function HapticsProvider() {
    useEffect(() => {
        // Check if window is defined (browser environment)
        if (typeof window === 'undefined') return;

        try {
            const haptics = new WebHaptics();

            const handleClick = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                if (target.closest('button') || target.closest('a')) {
                    haptics.trigger('nudge').catch(() => { });
                }
            };

            document.addEventListener('click', handleClick);

            return () => {
                document.removeEventListener('click', handleClick);
                if (haptics && typeof haptics.destroy === 'function') {
                    haptics.destroy();
                }
            };
        } catch (error) {
            console.warn('Web haptics not supported or failed to initialize.', error);
        }
    }, []);

    return null;
}
