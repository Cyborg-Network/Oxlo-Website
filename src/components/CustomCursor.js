import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 700 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    );
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target;
      const hit = target.closest(
        'a, button, [role="button"], .btn, .box-items, .faq-question, .model-card, .card, input, textarea, .oxchat-bubble, .magnetic-wrap'
      );
      setIsHovering(!!hit);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isTouch, cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className={`cursor-dot ${isHovering ? 'hovering' : ''}`}
        style={{ left: cursorX, top: cursorY }}
      />
      <motion.div
        className={`cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{ left: ringX, top: ringY }}
      />
    </>
  );
}
