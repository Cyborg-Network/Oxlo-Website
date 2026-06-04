import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function SmoothScroll() {
  const lenisRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    let rafId;
    let ro;

    async function init() {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
      });
      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      // Recalculate scroll bounds whenever content height changes (long blog posts,
      // async-loaded content). Without this, Lenis caches an old page height and you
      // cannot scroll to the bottom of long pages.
      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(() => lenis.resize());
        ro.observe(document.body);
      }
    }
    init();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  // Start each new page at the top and recalc bounds after it paints.
  useEffect(() => {
    const onRouteChange = () => {
      const lenis = lenisRef.current;
      if (!lenis) return;
      lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => lenis.resize());
    };
    router.events.on('routeChangeComplete', onRouteChange);
    return () => router.events.off('routeChangeComplete', onRouteChange);
  }, [router]);

  return null;
}
