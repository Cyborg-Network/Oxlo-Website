import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: (delay) => ({
    transition: {
      staggerChildren: 0.04,
      delayChildren: delay,
    },
  }),
};

const wordAnim = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TextReveal({
  text,
  highlights = [],
  className = '',
  delay = 0,
  tag = 'h2',
}) {
  const words = text.split(' ');
  const Tag = motion[tag];

  return (
    <Tag
      className={`text-reveal ${className}`}
      variants={container}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {words.map((w, i) => (
        <span key={i} className="tr-mask">
          <motion.span
            className={`tr-word${highlights.includes(w) ? ' text-gradient' : ''}`}
            variants={wordAnim}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
