// Lazy loaders for the vendored animation players that live in
// frontend/public/vendor/. Each loader injects its script tag at most
// once per page and resolves with the window global the player
// registers (window.Proton, window.lottie). Nothing loads at import
// time, so routes that never animate never pay for the downloads.

const cache = new Map<string, Promise<any>>();

function loadScript(src: string, globalName: string): Promise<any> {
  const existing = cache.get(src);
  if (existing) return existing;

  const promise = new Promise<any>((resolve, reject) => {
    const win = window as any;
    if (win[globalName]) {
      resolve(win[globalName]);
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      if (win[globalName]) {
        resolve(win[globalName]);
      } else {
        reject(new Error(`Loaded ${src} but window.${globalName} is missing`));
      }
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });

  cache.set(src, promise);
  // A failed load must not poison the cache; a later call may retry.
  promise.catch(() => {
    if (cache.get(src) === promise) cache.delete(src);
  });
  return promise;
}

/** Resolves with the Proton particle engine global. */
export function loadProton(): Promise<any> {
  return loadScript('/vendor/proton.min.js', 'Proton');
}

/** Resolves with the lottie-web player global. */
export function loadLottie(): Promise<any> {
  return loadScript('/vendor/lottie.min.js', 'lottie');
}
