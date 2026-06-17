import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link'
import Button from "@/components/Button";
import FaqSection from "@/components/FaqSection";
import TextReveal from "@/components/TextReveal";
import CountUp from "@/components/CountUp";
import Marquee from "@/components/Marquee";
import rocket from "../../public/images/rocket.svg";
import rocketColored from "../../public/images/rocketColored.svg";
import heroGif from "../../public/images/hero-animation.gif";
import shock from "../../public/images/shock.svg";
import dollar from "../../public/images/dollar.svg";
import shield from "../../public/images/shield.svg";
import scale from "../../public/images/scale.svg";
import light from "../../public/images/light.svg";
import bulb from "../../public/images/idea.svg";
import { motion, useScroll, useTransform } from "framer-motion";

function RevealLine({ words, startDelay = 0, className = '' }) {
  return (
    <span className={`break ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="tr-mask">
          <motion.span
            className="tr-word"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: {
                y: '0%',
                opacity: 1,
                transition: {
                  duration: 0.6,
                  delay: startDelay + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
import sixOne from '../../public/images/six/one.svg'
import sixTwo from '../../public/images/six/two.svg'
import sixThree from '../../public/images/six/three.svg'
import sixFour from '../../public/images/six/four.svg'
import sixFive from '../../public/images/six/five.svg'
import sixSix from '../../public/images/six/six.svg'
import oxlo from '../../public/images/logo-dark.svg'
import firework from '../../public/images/firework.svg'
import openrouter from '../../public/images/openrouter.svg'
import together from '../../public/images/together.svg'
import f6s from '../../public/images/f6s.png'
import STL from '../../public/images/STL.webp'
import TopProd from '../../public/images/badge.png'
import CostCalculator from "@/components/CostCalculator";
import BenchmarkSection from "@/components/BenchmarkSection";
import PrivacyHighlight from "@/components/PrivacyHighlight";

// Page-specific FAQ schema (matches visible FaqSection component content)
const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Oxlo.ai an alternative to Together AI, Fireworks AI or OpenRouter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Oxlo.ai is a cost-efficient alternative for teams running large reasoning models in production. Unlike token-based providers, Oxlo.ai charges a flat monthly rate regardless of request volume or output length."
      }
    },
    {
      "@type": "Question",
      "name": "How is Oxlo.ai different from Together AI, Fireworks AI, and OpenRouter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oxlo.ai is your go-to inference provider that uses request-based pricing - you pay a flat fee per API call regardless of prompt length. Together AI, Fireworks AI, OpenRouter, and Replicate all charge per token (input + output), which means costs scale with prompt size. For long-context workloads like RAG pipelines or document analysis, Oxlo.ai can be 10 to 100 times cheaper. All platforms support similar open-source models, but Oxlo.ai eliminates variable billing entirely."
      }
    },
    {
      "@type": "Question",
      "name": "What is request-based pricing for AI APIs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Request-based pricing means you pay a flat fee per API call regardless of how many tokens are in your prompt or response. A 100-token request costs the same as a 50,000-token request. This is different from token-based pricing used by OpenAI, Together AI, Fireworks AI, OpenRouter, and Replicate, where costs scale linearly with input and output tokens. Oxlo.ai is the first major inference provider to offer request-based pricing, making costs completely predictable for developers."
      }
    },
    {
      "@type": "Question",
      "name": "Is Oxlo.ai OpenAI SDK compatible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Oxlo.ai is fully compatible with the OpenAI Python and Node.js SDKs. To switch from OpenAI, Together AI, Fireworks AI, or OpenRouter, you only need to change the base_url parameter to https://api.oxlo.ai/v1. All features work including streaming, function calling, JSON mode, vision models, embeddings, and image generation. No other code changes are required."
      }
    },
    {
      "@type": "Question",
      "name": "How do I switch from other providers to Oxlo.ai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Switching from any OpenAI-compatible provider to Oxlo.ai requires changing only one line of code. Replace your current base_url (e.g. api.together.xyz/v1, api.fireworks.ai/inference/v1, or openrouter.ai/api/v1) with https://api.oxlo.ai/v1 and update your API key. All other code stays identical. Sign up at oxlo.ai, generate an API key, and you are ready."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to run Llama 3.3 70B or Qwen 3 32B on Oxlo.ai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both Llama 3.3 70B and Qwen 3 32B are available on Oxlo.ai's Premium plan at $350 per month, which includes up to 5,000 API requests per day. Unlike Together AI, Fireworks AI, or OpenRouter where a single long-context query can cost $0.05 or more depending on token count, every request on Oxlo.ai costs the same flat rate regardless of prompt length. New users get a 5-day free trial with full access to all premium models."
      }
    },
    {
      "@type": "Question",
      "name": "Does Oxlo.ai have a free tier?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Oxlo.ai offers a generous free tier with 60 requests per day across 16 or more models including DeepSeek V3, Mistral 7B, Gemma 3 4B, Whisper (speech-to-text), Kokoro (text-to-speech), BGE-Large and E5-Large (embeddings), and YOLOv9/v11 (object detection). New users also get a 5-day premium trial with full access to all 40+ models. No credit card required."
      }
    },
    {
      "@type": "Question",
      "name": "Which open-source models does Oxlo.ai support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oxlo.ai supports over 40 models across 7 categories. For text and chat: Qwen 3 32B, Llama 3.3 70B, DeepSeek R1 671B, DeepSeek V3, Mistral 7B, Gemma 3, Llama 4 Maverick, and more. For code: Qwen 3 Coder 30B, DeepSeek Coder 33B. For vision: Gemma 3 27B, Kimi VL. For images: Oxlo Image Pro (Flux 2), SDXL, Stable Diffusion 3.5 Large. For audio: Whisper Large v3, Whisper Turbo, Kokoro 82M TTS. For embeddings: BGE-Large, E5-Large. For detection: YOLOv9, YOLOv11."
      }
    },
    {
      "@type": "Question",
      "name": "What is the cheapest LLM inference API in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For long-context workloads, Oxlo.ai is the cheapest LLM inference API thanks to its unique request-based pricing model. While providers like Together AI, Fireworks AI, OpenRouter, and Replicate charge per token ($0.0002 to $0.003 per 1K tokens depending on model size), Oxlo.ai charges a flat rate per API request regardless of prompt length. The Pro plan costs $80 per month for 1,000 requests per day across all models, and Premium costs $350 per month for 5,000 requests per day."
      }
    },
    {
      "@type": "Question",
      "name": "Does Oxlo.ai train on my data or sell it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Oxlo.ai never sells your data and never uses your prompts or outputs to train models. Your inputs stay yours. Inference requests are processed to return your response, not to build training datasets."
      }
    },
    {
      "@type": "Question",
      "name": "How does Kimi K2.6 on Oxlo.ai compare to GPT-5.4, Claude Opus 4.6, and Gemini 3.1 Pro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kimi K2.6, available on Oxlo.ai, matches or beats the frontier labs on many agentic, coding, reasoning, and vision benchmarks. It leads on DeepSearchQA (92.5 f1), DeepSearchQA accuracy (83.0), HLE-Full with tools (54.0), and SWE-Bench Pro (58.6), based on the Kimi K2.6 report at kimi.com."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get Started with Oxlo.ai API",
  "description": "Set up your first AI API call with Oxlo.ai in under 2 minutes. Works with any OpenAI-compatible SDK.",
  "totalTime": "PT2M",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Create an Oxlo.ai Account", "text": "Sign up at https://portal.oxlo.ai/signup. No credit card required. You get a 5-day free trial with access to all 40+ models.", "url": "https://portal.oxlo.ai/signup" },
    { "@type": "HowToStep", "position": 2, "name": "Generate an API Key", "text": "Go to Dashboard > API Keys and create a new API key. Copy the key for the next step.", "url": "https://portal.oxlo.ai/dashboard/api-keys" },
    { "@type": "HowToStep", "position": 3, "name": "Install the OpenAI SDK", "text": "Install the OpenAI Python SDK with: pip install openai. Or for Node.js: npm install openai. Oxlo is fully OpenAI SDK compatible." },
    { "@type": "HowToStep", "position": 4, "name": "Make Your First API Call", "text": "Create an OpenAI client with base_url='https://api.oxlo.ai/v1' and your API key. Call client.chat.completions.create() with any supported model like 'qwen-3-32b' or 'mistral-7b'." }
  ]
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Oxlo.ai",
  "url": "https://oxlo.ai",
  "logo": "https://oxlo.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-dark.cc7a6d8d.svg&w=256&q=75",
  "description": "Developer-first AI inference platform with request-based pricing.",
  "sameAs": [
    "https://github.com/Cyborg-Network",
    "https://www.linkedin.com/company/cyborg-network",
    "https://www.f6s.com/company/cyborg-network"
  ]
};

// Fallback stats in case API is unavailable
const FALLBACK_STATS = { users: 700, models_available: 45, countries: 100, tokens_display: "556M" };

export default function Home() {
  const [stats, setStats] = useState(FALLBACK_STATS);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  useEffect(() => {
    let cancelled = false;
    async function loadStats(attempt = 0) {
      try {
        const res = await fetch("https://api.oxlo.ai/stats", { cache: "no-store" });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = await res.json();
        // Merge over the fallback so a partial response never blanks any stat.
        if (!cancelled && data && typeof data === "object") {
          setStats(prev => ({ ...prev, ...data }));
        }
      } catch {
        // Retry a few times before falling back to the static numbers.
        if (!cancelled && attempt < 3) {
          setTimeout(() => loadStats(attempt + 1), 1000 * (attempt + 1));
        }
      }
    }
    loadStats();
    return () => { cancelled = true; };
  }, []);

  const pricingFeatures = [
    { name: "Request-based pricing (not tokens)", oxlo: true, others: false },
    { name: "Subscription plans with fixed monthly usage", oxlo: true, others: false },
    { name: "Free tier without credit card", oxlo: true, others: false },
    { name: "Pricing independent of prompt length", oxlo: true, others: false },
    { name: "No model-specific pricing math", oxlo: true, others: false },
    { name: "Usage limits visible upfront", oxlo: true, others: false },
  ];

  const capabilityFeatures = [
    { name: "High-performance AI APIs", oxlo: true, others: true },
    { name: "Production-ready infrastructure", oxlo: true, others: true },
    { name: "Open-source model support", oxlo: true, others: true },
    { name: "Enterprise-grade reliability", oxlo: true, others: true },
  ];

  const aiUseCases = [
    { icon: sixOne, title: "Chatbots & AI Assistants", description: "Build chatbots and assistants for support, internal tools, and workflows.", models: "DeepSeek V3.2, Llama 3.3 70B, Qwen 3 32B", delay: 0 },
    { icon: sixTwo, title: "Document Q&A and RAG", description: "Query documents, PDFs, and knowledge bases using retrieval-augmented generation.", models: "BGE-Large, E5-Large, DeepSeek R1", delay: 0.1 },
    { icon: sixThree, title: "Text Generation & Summarization", description: "Generate, rewrite, or summarize text for apps and internal systems.", models: "Qwen 3 32B, GPT-OSS 120B, Llama 3.3 70B", delay: 0.2 },
    { icon: sixFour, title: "Image Understanding", description: "Analyze images for classification, detection, or visual understanding.", models: "YOLOv9, YOLOv11, Gemma 3 27B", delay: 0.3 },
    { icon: sixFive, title: "Speech & Audio", description: "Convert audio into text or generate speech for transcription and voice workflows.", models: "Whisper Large v3, Whisper Turbo, Kokoro TTS", delay: 0.4 },
    { icon: sixSix, title: "Batch AI Processing", description: "Process large volumes of AI requests efficiently using async or batch workflows.", models: "Llama 3.1 8B, DeepSeek V3.2, BGE-Large", delay: 0.5 },
  ];

  return (
    <>
      <Head>
        <title>Oxlo.ai | Frontier AI Models, Lower Cost, Total Privacy</title>
        <meta
          name="description"
          content="Run Kimi K2.6, DeepSeek V4 Flash, and 45+ frontier AI models on an OpenAI-compatible API. Request-based pricing, benchmark performance that matches the top labs, and we never sell your data or train on your prompts."
        />
        <meta
          name="keywords"
          content="AI inference API, LLM API, request-based pricing, Together AI alternative, Fireworks AI alternative, OpenRouter alternative, cheapest LLM API, Qwen 3 32B API, Llama 3.3 70B API, DeepSeek R1 API, OpenAI SDK compatible, open-source AI models, GPU inference"
        />
        <link rel="canonical" href="https://oxlo.ai" />

        {/* OpenGraph */}
        <meta property="og:title" content="Oxlo.ai - AI Inference API with Request-Based Pricing" />
        <meta property="og:description" content="Frontier AI models on an OpenAI-compatible API. Request-based pricing, top-lab benchmark performance, and we never train on your prompts." />
        <meta property="og:url" content="https://oxlo.ai" />
        <meta property="og:site_name" content="Oxlo.ai" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Oxlo.ai - AI Inference API with Request-Based Pricing" />
        <meta name="twitter:description" content="Frontier AI models on an OpenAI-compatible API. Request-based pricing, top-lab performance, no training on your prompts." />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Page-specific JSON-LD: FAQ and HowTo schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      </Head>

      <section className="miner-soon-section soon-section" ref={heroRef}>
        <div className="container">
          <motion.div className="home-wrap d-flex a-center" style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div
              className="d-left"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hw-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '25px' }}>
                    <Link href="https://www.g2.com/products/oxlo-ai/" target="_blank" rel="noopener">
                      <div className="section-badge" style={{ marginBottom: 0 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        <span>Rate us on G2</span>
                      </div>
                    </Link>
                    <Button
                      title="View benchmarks"
                      link="#benchmarks"
                      size="btn-sm"
                      theme="light"
                      icon={scale}
                    />
                  </div>
                </motion.div>
                <motion.h1 className="hero-heading pillar-hero" initial="hidden" animate="visible">
                  <RevealLine words={["Privacy-first", "inference"]} startDelay={0.4} />
                  <RevealLine words={["stack", "for"]} startDelay={0.6} />
                  <RevealLine words={["your", "agents."]} startDelay={0.8} className="hero-highlight" />
                </motion.h1>
                <motion.p
                  className="home-desc"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Run Kimi K2.6 and 45+ open source models with unlimited agentic tool calls, secure failover, and zero data retention or training
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}
                >
                  <Button
                    title="Get started for free"
                    link="https://portal.oxlo.ai/"
                    size="btn-md"
                    icon={rocket}
                  />
                  <a href="https://www.producthunt.com/products/oxlo-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-oxlo-ai" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1169408&theme=light&t=1781677436010" alt="Oxlo.ai - Scale across AI models without scaling your bill | Product Hunt" width="250" height="54" />
                  </a>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="d-right"
              style={{ y: heroImageY }}
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hw-right">
                <div className="animated-emblem">
                  <svg width="108" height="96" viewBox="0 0 108 96" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M54 11C79.002 11 97 28.7477 97 48C97 67.2523 79.002 85 54 85C28.998 85 11 67.2523 11 48C11 28.7477 28.998 11 54 11Z" stroke="#1F272C" strokeWidth="22" /><path d="M54 11C79.002 11 97 28.7477 97 48C97 67.2523 79.002 85 54 85C28.998 85 11 67.2523 11 48C11 28.7477 28.998 11 54 11Z" stroke="#03F7B5" strokeWidth="22" className="progress" fill="none" /><path d="M46.9873 47.4873L9.5 10L18 4.5L53.9182 40.6441L88.5 6.5L95.5 13L60.7549 47.5238L97.5 84.5L90.5 91L53.8674 54.3674L17 91L9.5 84.5L46.9873 47.4873Z" fill="#04080E" /></svg>
                </div>
                <Image src={heroGif} alt="Oxlo.ai AI inference animation" unoptimized />
              </div>
            </motion.div>
          </motion.div>
          {/* Stats Strip */}
          <div className="stats-strip" style={{ marginTop: '40px', marginBottom: '20px' }}>
            {[
              { value: stats.users, label: "Active Users" },
              { value: stats.models_available, label: "Models Available" },
              { value: stats.countries, label: "Countries" },
              { value: stats.tokens_display, label: "Tokens Processed" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="stats-strip__item"
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.7, delay: i * 0.1 }}
              >
                <div className="stats-strip__number"><span className="stats-strip__accent"><CountUp end={stat.value} /></span></div>
                <div className="stats-strip__label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="achievement-wrap"
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.8, delay: 0.3 }}
          >
            <Link href="https://stlpartners.com/articles/edge-computing/50-edge-computing-companies-to-watch-in-2026/"
              target="_blank" rel="noopener">
              <Image src={STL} alt="STL Partners — Top edge companies for 2026" />
            </Link>
            <Link href="https://www.f6s.com/company/cyborg-network" target="_blank" rel="noopener">
              <Image src={f6s} alt="AI" />
            </Link>
            <Link href="https://peerpush.net/p/oxloai-uosi" target="_blank" rel="noopener">
              <Image src={TopProd} alt="AI" />
            </Link>
          </motion.div>
          <Marquee />
        </div>
      </section>

      {/* Cost Calculator - positioned after hero */}
      <section className="common-section" id="cost-calculator" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="container">
          <CostCalculator />
        </div>
      </section>

      <section className="common-section fiveg-section">
        <div className="container">
          <div className="fiveg-wrap flow-hidden">
            <div className="d-flex">
              <div className="d-left">
                <TextReveal
                  text="Ready to build? Create a free account and start shipping without worrying about your AI bill."
                  className="hero-heading"
                  tag="h1"
                />
                <motion.div
                  viewport={{ once: true }}
                  transition={{ ease: "easeInOut", duration: 1.25 }}
                  initial={{ opacity: 0, translateY: 25 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                >
                  <div className="pill-wrap">
                    <ul>
                      <li><Image src={dollar} alt="dollar" />Affordable</li>
                      <li><Image src={shield} alt="shield" />Reliable</li>
                      <li><Image src={scale} alt="scale" />Scalable</li>
                      <li><Image src={light} alt="light" />Fast</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
              <div className="d-right">
                <motion.p
                  className="hero-desc"
                  viewport={{ once: true }}
                  transition={{ ease: "easeInOut", duration: 1 }}
                  initial={{ opacity: 0, translateX: 75 }}
                  whileInView={{ opacity: 1, translateX: 0 }}
                >
                  Oxlo.ai is built for developers and AI teams who want cost clarity without complexity. A flat monthly plan means your infrastructure bill is always known, always fixed, and never a surprise.
                </motion.p>
                <motion.div
                  viewport={{ once: true }}
                  transition={{ ease: "easeInOut", duration: 1.25 }}
                  initial={{ opacity: 0, translateY: 25 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                >
                  <Button
                    title="Start building for free"
                    link="https://portal.oxlo.ai/"
                    size="btn-md"
                    icon={shock}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='common-section nine-section bottom-blur'>
        <div className='container'>
          <div className='text-center'>
            <TextReveal text="What teams build on Oxlo.ai" className="section-heading" tag="h2" />
          </div>
          <div className='box-wrap'>
            <div className='box-border'></div>
            {aiUseCases.map((item, index) => (
              <motion.div
                key={index}
                className="box-content"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.8, delay: index * 0.1 }}
                initial={{ opacity: 0, y: 60, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
              >
                <div className="box-items">
                  <div className="box-icon">
                    <Image src={item.icon} alt={item.title} />
                  </div>

                  <div className="box-text">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span>{item.models}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BenchmarkSection />

      <section className='common-section pill-section'>
        <div className='container'>
          <div className='text-center'>
            <motion.div className='section-badge' viewport={{ once: true }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.7 }} initial={{ opacity: 0, y: 30, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}>
              <Image src={bulb} alt='bulb-icon' />
              <span>Why teams switch to Oxlo.ai</span>
            </motion.div>
            <TextReveal text="How Oxlo.ai Stands Out" highlights={["Oxlo.ai"]} className="section-heading" tag="h2" delay={0.15} />
            <motion.p
              className="section-desc"
              viewport={{ once: true }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.8, delay: 0.3 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Frontier-class performance at request-based pricing, not premium per-token rates. The same results for less.<br/>Here is how we compare.
            </motion.p>
          </div>



          <motion.div
            className="comparison-container"
            viewport={{ once: true, margin: "-80px" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.9, delay: 0.2 }}
          >
            <div className="table-row header-row">
              <div className="cell">Features</div>
              <div className="cell"><Image src={oxlo} alt="Oxlo.ai" /></div>
              <div className="cell"><Image src={firework} alt="Fireworks AI" /></div>
              <div className="cell"><Image src={openrouter} alt="OpenRouter" /></div>
              <div className="cell"><Image src={together} alt="Together AI" /></div>
            </div>

            <div className="table-row section-title-row">
              <div className="cell section-title">Pricing</div>
              <div className="cell"></div><div className="cell"></div><div className="cell"></div><div className="cell"></div>
            </div>

            {pricingFeatures.map((f, i) => (
              <div key={i} className="table-row">
                <div className="cell">{f.name}</div>
                <div className="cell">
                  <div className="icon-circle icon-check-green">
                    <div className="check-mark"></div>
                  </div>
                </div>
                {[1, 2, 3].map(n => (
                  <div key={n} className="cell">
                    <div className="icon-circle icon-cross-gray">
                      <div className="cross-mark"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div className="table-row section-title-row">
              <div className="cell section-title">Platform Capabilities</div>
              <div className="cell"></div><div className="cell"></div><div className="cell"></div><div className="cell"></div>
            </div>

            {capabilityFeatures.map((f, i) => (
              <div key={i} className="table-row">
                <div className="cell">{f.name}</div>
                <div className="cell">
                  <div className="icon-circle icon-check-green">
                    <div className="check-mark"></div>
                  </div>
                </div>
                {[1, 2, 3].map(n => (
                  <div key={n} className="cell">
                    <div className="icon-circle icon-check-green">
                      <div className="check-mark"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
          <motion.div
            className="text-center"
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", duration: 0.75, delay: 0.5 }}
            initial={{ opacity: 0, translateY: 75 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            <Button
              title="Get started with Oxlo.ai"
              link="https://portal.oxlo.ai/"
              size="btn-md"
              icon={rocket}
            />
          </motion.div>
        </div>
      </section>

      <PrivacyHighlight />

      {/* Visible FAQ Section — matches JSON-LD FAQPage schema for GEO/AEO */}
      <FaqSection />

      <section className="common-section newsletter-section">
        <div className="container">
          <div className="ns-wrap">
            <div className="ns-content">
              <TextReveal text="Ready to build?" className="section-heading" tag="h2" />
              <motion.p
                className="section-desc"
                viewport={{ once: true }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.25 }}
                initial={{ opacity: 0, translateY: 75 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                Flat monthly pricing. Your AI infrastructure cost, sorted.
              </motion.p>
              <motion.div
                viewport={{ once: true }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.5 }}
                initial={{ opacity: 0, translateY: 75 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                <Button
                  title="Start for free"
                  link="https://portal.oxlo.ai/"
                  size="btn-md"
                  icon={rocket}
                  theme="light"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>



    </>
  );
}
