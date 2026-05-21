import { motion } from 'framer-motion';

const models = [
  'GLM 5',
  'Kimi K2.6',
  'DeepSeek V4 Flash',
  'Minimax M2.5',
  'Qwen 3 32B',
  'Llama 3.3 70B',
  'DeepSeek R1 671B',
  'Gemma 3 27B',
  'Qwen 3 Coder 30B',
  'Mistral 7B',
  'DeepSeek V3.2',
  'Whisper v3',
  'Kokoro TTS',
  'BGE-Large',
  'SDXL',
  'YOLOv11',
  'Oxlo Image Pro',
  'Llama 4 Maverick',
];

export default function Marquee() {
  const doubled = [...models, ...models];

  return (
    <div className="marquee">
      <motion.div
        className="marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
