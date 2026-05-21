import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function CountUp({ end, suffix = '+', duration = 2000 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const numEnd = typeof end === 'number' ? end : parseInt(end, 10) || 0;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(numEnd * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, end, duration]);

  const extra =
    typeof end === 'string' ? end.replace(/[0-9]/g, '') : '';

  return (
    <span ref={ref}>
      {count}
      {extra}
      {suffix}
    </span>
  );
}
