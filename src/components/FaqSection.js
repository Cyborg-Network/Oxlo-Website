import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import TextReveal from "@/components/TextReveal";

const FAQ_ITEMS = [
  {
    question: "Is Oxlo.ai an alternative to Together AI, Fireworks AI or OpenRouter?",
    answer: "Yes. Oxlo.ai is a cost-efficient alternative for teams running large reasoning models in production. Unlike token-based providers, Oxlo.ai charges a flat monthly rate regardless of request volume or output length.",
  },
  {
    question: "How is Oxlo.ai different from Together AI, Fireworks AI, and OpenRouter?",
    answer: "Oxlo.ai is your go-to inference provider that uses request-based pricing - you pay a flat fee per API call regardless of prompt length. Together AI, Fireworks AI, OpenRouter, and Replicate all charge per token (input + output), which means costs scale with prompt size. For long-context workloads like RAG pipelines or document analysis, Oxlo.ai can be 10-100x cheaper. All platforms support similar open-source models, but Oxlo.ai eliminates variable billing entirely.",
  },
  {
    question: "What is request-based pricing for AI APIs?",
    answer: "Request-based pricing means you pay a flat fee per API call regardless of how many tokens are in your prompt or response. A 100-token request costs the same as a 50,000-token request. This is different from token-based pricing used by OpenAI, Together AI, Fireworks AI, OpenRouter, and Replicate, where costs scale linearly with input and output tokens. Oxlo.ai is the first major inference provider to offer request-based pricing, making costs completely predictable for developers.",
  },
  {
    question: "Is Oxlo.ai OpenAI SDK compatible?",
    answer: "Yes, Oxlo.ai is fully compatible with the OpenAI Python and Node.js SDKs. To switch from OpenAI, Together AI, Fireworks AI, or OpenRouter, you only need to change the base_url parameter to https://api.oxlo.ai/v1. All features work including streaming, function calling, JSON mode, vision models, embeddings, and image generation. No other code changes are required.",
  },
  {
    question: "How do I switch from other providers to Oxlo.ai?",
    answer: "Switching from any OpenAI-compatible provider to Oxlo.ai requires changing only one line of code. Replace your current base_url (e.g. api.together.xyz/v1, api.fireworks.ai/inference/v1, or openrouter.ai/api/v1) with https://api.oxlo.ai/v1 and update your API key. All other code stays identical. Sign up at oxlo.ai, generate an API key, and you're ready.",
  },
  {
    question: "How much does it cost to run Llama 3.3 70B or Qwen 3 32B on Oxlo.ai?",
    answer: "Both Llama 3.3 70B and Qwen 3 32B are available on Oxlo.ai's Premium plan at $49.90/month, which includes up to 2,000 API requests per day. Unlike Together AI, Fireworks AI, or OpenRouter where a single long-context query can cost $0.05+ depending on token count, every request on Oxlo.ai costs the same flat rate regardless of prompt length. New users get a 5-day free trial with full access to all premium models.",
  },
  {
    question: "Does Oxlo.ai have a free tier?",
    answer: "Yes, Oxlo.ai offers a generous free tier with 60 requests per day across 16+ models including DeepSeek V3, Mistral 7B, Gemma 3 4B, Whisper (speech-to-text), Kokoro (text-to-speech), BGE-Large and E5-Large (embeddings), and YOLOv9/v11 (object detection). New users also get a 5-day premium trial with full access to all 40+ models. No credit card required.",
  },
  {
    question: "Which open-source models does Oxlo.ai support?",
    answer: "Oxlo.ai supports over 40 models across 7 categories: Text/Chat (Qwen 3 32B, Llama 3.3 70B, DeepSeek R1, Mistral 7B, Gemma 3, Llama 4 Maverick), Code (Qwen 3 Coder 30B, DeepSeek Coder 33B), Vision (Gemma 3 27B, Kimi VL), Image Gen (Oxlo Image Pro, SDXL, SD 3.5 Large), Audio (Whisper Large v3, Kokoro 82M TTS), Embeddings (BGE-Large, E5-Large), and Detection (YOLOv9, YOLOv11).",
  },
  {
    question: "What is the cheapest LLM inference API in 2026?",
    answer: "For long-context workloads, Oxlo.ai is the cheapest LLM inference API thanks to its unique request-based pricing model. While providers like Together AI, Fireworks AI, OpenRouter, and Replicate charge per token ($0.0002-$0.003 per 1K tokens depending on model size), Oxlo.ai charges a flat rate per API request regardless of prompt length. The Pro plan costs $14.90/month for 300 requests/day across all models, and Premium costs $49.90/month for 2,000 requests/day.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <ChevronDown
          size={20}
          className={`faq-chevron ${isOpen ? "rotated" : ""}`}
        />
      </button>
      <div className={`faq-answer ${isOpen ? "expanded" : ""}`}>
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="common-section faq-section" id="faq">
      <div className="container">
        <div className="text-center">
          <TextReveal text="Frequently Asked Questions" highlights={["Questions"]} className="section-heading" tag="h2" />
          <motion.p
            className="section-desc"
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.2 }}
            initial={{ opacity: 0, translateY: 30 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            Everything developers ask about Oxlo.ai, request-based pricing, and switching from other providers.
          </motion.p>
        </div>
        <motion.div
          className="faq-container"
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 0.5, delay: 0.3 }}
          initial={{ opacity: 0, translateY: 40 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          {FAQ_ITEMS.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => toggleFaq(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
