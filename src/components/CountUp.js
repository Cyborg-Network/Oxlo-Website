import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function CountUp({ end, suffix = '+', duration = 2000 }) {
  const ref = useRef(null);
  // Trigger as soon as ~20% of the number scrolls into view. A negative rootMargin
  // here used to block the animation on short mobile viewports, leaving counters
  // stuck on 0; `amount` is reliable on touch devices with native scrolling.
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [count, setCount] = useState(0);

  // Numeric target + any trailing unit (e.g. "M" in "556M"). Recomputed when `end`
  // changes, so async-loaded stats re-animate instead of sticking on the fallback.
  const numEnd = typeof end === 'number' ? end : parseInt(String(end), 10) || 0;
  const extra = typeof end === 'string' ? end.replace(/[0-9.,\s]/g, '') : '';

  useEffect(() => {
    if (!isInView) return undefined;
    const start = performance.now();
    let raf;
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(numEnd * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, numEnd, duration]);

  return (
    <span ref={ref}>
      {count}
      {extra}
      {suffix}
    </span>
  );
}
