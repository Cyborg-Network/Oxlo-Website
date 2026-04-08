import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link'
import Button from "@/components/Button";
import FaqSection from "@/components/FaqSection";
import rocket from "../../public/images/rocket.svg";
import rocketColored from "../../public/images/rocketColored.svg";
import hero from "../../public/images/hero-animation.gif";
import shock  from "../../public/images/shock.svg";
import dollar from "../../public/images/dollar.svg";
import shield from "../../public/images/shield.svg";
import scale from "../../public/images/scale.svg";
import light from "../../public/images/light.svg";
import bulb from "../../public/images/idea.svg";
import { motion } from "framer-motion";
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

// Page-specific FAQ schema (matches visible FaqSection component content)
const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is Oxlo.ai different from Together AI, Fireworks AI, and OpenRouter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oxlo.ai is the only major inference provider that uses request-based pricing - you pay a flat fee per API call regardless of prompt length. Together AI, Fireworks AI, OpenRouter, and Replicate all charge per token (input + output), which means costs scale with prompt size. For long-context workloads like RAG pipelines or document analysis, Oxlo.ai can be 10 to 100 times cheaper. All platforms support similar open-source models, but Oxlo.ai eliminates variable billing entirely."
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
        "text": "Both Llama 3.3 70B and Qwen 3 32B are available on Oxlo.ai's Premium plan at $49.90 per month, which includes up to 2,000 API requests per day. Unlike Together AI, Fireworks AI, or OpenRouter where a single long-context query can cost $0.05 or more depending on token count, every request on Oxlo.ai costs the same flat rate regardless of prompt length. New users get a 7-day free trial with full access to all premium models."
      }
    },
    {
      "@type": "Question",
      "name": "Does Oxlo.ai have a free tier?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Oxlo.ai offers a generous free tier with 60 requests per day across 16 or more models including DeepSeek V3, Mistral 7B, Gemma 3 4B, Whisper (speech-to-text), Kokoro (text-to-speech), BGE-Large and E5-Large (embeddings), and YOLOv9/v11 (object detection). New users also get a 7-day premium trial with full access to all 40+ models. No credit card required."
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
        "text": "For long-context workloads, Oxlo.ai is the cheapest LLM inference API thanks to its unique request-based pricing model. While providers like Together AI, Fireworks AI, OpenRouter, and Replicate charge per token ($0.0002 to $0.003 per 1K tokens depending on model size), Oxlo.ai charges a flat rate per API request regardless of prompt length. The Pro plan costs $14.90 per month for 300 requests per day across all models, and Premium costs $49.90 per month for 2,000 requests per day."
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
    { "@type": "HowToStep", "position": 1, "name": "Create an Oxlo.ai Account", "text": "Sign up at https://portal.oxlo.ai/signup. No credit card required. You get a 7-day free trial with access to all 40+ models.", "url": "https://portal.oxlo.ai/signup" },
    { "@type": "HowToStep", "position": 2, "name": "Generate an API Key", "text": "Go to Dashboard > API Keys and create a new API key. Copy the key for the next step.", "url": "https://portal.oxlo.ai/dashboard/api-keys" },
    { "@type": "HowToStep", "position": 3, "name": "Install the OpenAI SDK", "text": "Install the OpenAI Python SDK with: pip install openai. Or for Node.js: npm install openai. Oxlo is fully OpenAI SDK compatible." },
    { "@type": "HowToStep", "position": 4, "name": "Make Your First API Call", "text": "Create an OpenAI client with base_url='https://api.oxlo.ai/v1' and your API key. Call client.chat.completions.create() with any supported model like 'qwen-3-32b' or 'mistral-7b'." }
  ]
};

export default function Home() {

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
    { icon: sixOne, title: "Chatbots & AI Assistants", description: "Build chatbots and assistants for support, internal tools, and workflows.", models: "LLaMA-3.1-8B, Mistral-7B-Instruct-v0.2", delay: 0 },
    { icon: sixTwo, title: "Document Q&A and RAG", description: "Query documents, PDFs, and knowledge bases using retrieval-augmented generation.", models: "BGE-Large-v1.5, E5-Large-v2, LLaMA-3.1-8B", delay: 0.1 },
    { icon: sixThree, title: "Text Generation & Summarization", description: "Generate, rewrite, or summarize text for apps and internal systems.", models: "Mixtral-8x7B-Instruct, Mistral-7B-Instruct-v0.2", delay: 0.2 },
    { icon: sixFour, title: "Image Understanding", description: "Analyze images for classification, detection, or visual understanding.", models: "YOLOv8, CLIP-ViT-L/14", delay: 0.3 },
    { icon: sixFive, title: "Speech-to-Text", description: "Convert audio into text for transcription and analysis workflows.", models: "Whisper-Large-v3, Whisper-Medium", delay: 0.4 },
    { icon: sixSix, title: "Batch AI Processing", description: "Process large volumes of AI requests efficiently using async or batch workflows.", models: "LLaMA-3.1-8B, Mixtral-8x7B, BGE-Large-v1.5", delay: 0.5 },
  ];

  return (
    <>
      <Head>
        <title>Oxlo.ai - AI Inference API with Request-Based Pricing | 40+ Models</title>
        <meta
          name="description"
          content="Developer-first AI inference platform with request-based pricing. Run 40+ open-source models (Qwen 3 32B, Llama 3.3 70B, DeepSeek R1, Mistral, Whisper, SDXL) via OpenAI-compatible API. Pay per request, not per token. Free tier available."
        />
        <meta
          name="keywords"
          content="AI inference API, LLM API, request-based pricing, Together AI alternative, Fireworks AI alternative, OpenRouter alternative, cheapest LLM API, Qwen 3 32B API, Llama 3.3 70B API, DeepSeek R1 API, OpenAI SDK compatible, open-source AI models, GPU inference"
        />
        <link rel="canonical" href="https://oxlo.ai" />

        {/* OpenGraph */}
        <meta property="og:title" content="Oxlo.ai - AI Inference API with Request-Based Pricing" />
        <meta property="og:description" content="Run 40+ AI models via OpenAI-compatible API. Pay per request, not per token. Free tier available." />
        <meta property="og:url" content="https://oxlo.ai" />
        <meta property="og:site_name" content="Oxlo.ai" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Oxlo.ai - AI Inference API with Request-Based Pricing" />
        <meta name="twitter:description" content="Run 40+ AI models via OpenAI-compatible API. Pay per request, not per token." />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Page-specific JSON-LD: FAQ and HowTo schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      </Head>

      <section className="miner-soon-section soon-section flow-hidden">
        <div className="container">
          <div className="home-wrap d-flex a-center">
            <motion.div
              className="d-left"
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.25, duration: 2 }}
              initial={{ opacity: 0, translateX: -200 }}
              whileInView={{ opacity: 1, translateX: 0 }}
            >
              <div className="hw-left">
                <h1 className="hero-heading">
                  <span className="break">Build AI</span>
                  <span className="break">Pay LESS</span>
                  <span className="break">Ship FASTER</span>
                </h1>
                <p className="home-desc">
                  A developer-first AI Inference platform with radically lower compute costs.
                </p>
                <Button
                  title="Get started for free"
                  link="https://portal.oxlo.ai/"
                  size="btn-md"
                  icon={rocket}
                />
              </div>
            </motion.div>

            <motion.div
              className="d-right"
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.25, duration: 2 }}
              initial={{ opacity: 0, translateX: 200 }}
              whileInView={{ opacity: 1, translateX: 0 }}
            >
              <div className="hw-right">
                <div className="animated-emblem">
                  <svg width="108" height="96" viewBox="0 0 108 96" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M54 11C79.002 11 97 28.7477 97 48C97 67.2523 79.002 85 54 85C28.998 85 11 67.2523 11 48C11 28.7477 28.998 11 54 11Z" stroke="#1F272C" strokeWidth="22" /><path d="M54 11C79.002 11 97 28.7477 97 48C97 67.2523 79.002 85 54 85C28.998 85 11 67.2523 11 48C11 28.7477 28.998 11 54 11Z" stroke="#03F7B5" strokeWidth="22" className="progress" fill="none" /><path d="M46.9873 47.4873L9.5 10L18 4.5L53.9182 40.6441L88.5 6.5L95.5 13L60.7549 47.5238L97.5 84.5L90.5 91L53.8674 54.3674L17 91L9.5 84.5L46.9873 47.4873Z" fill="#04080E" /></svg>
                </div>
                <Image src={hero} alt="home-cover-image" />
              </div>
            </motion.div>
          </div>
          {/* <div className="highlight-note">
            <Image src={rocketColored} alt="Rocket" /> 1500+ early access signups in our first week
          </div> */}
          <div className="achievement-wrap">
            <Link href="https://stlpartners.com/articles/edge-computing/50-edge-computing-companies-to-watch-in-2026/"
               target="_blank" rel="noopener">
                <Image src={STL} alt="STL Partners — Top edge companies for 2026"/>
            </Link>
            <Link href="https://www.f6s.com/company/cyborg-network" target="_blank" rel="noopener">
                <Image src={f6s} alt="AI"/>
            </Link>
            <Link href="https://peerpush.net/p/oxloai-uosi" target="_blank" rel="noopener">
                <Image src={TopProd} alt="AI"/>
            </Link>
          </div>
        </div>
      </section>

      <section className="common-section fiveg-section">
        <div className="container">
          <div className="fiveg-wrap flow-hidden">
            <div className="d-flex">
              <div className="d-left">
                <motion.h1
                  className="hero-heading"
                  viewport={{ once: true }}
                  transition={{ ease: "easeInOut", duration: 1 }}
                  initial={{ opacity: 0, translateX: -75 }}
                  whileInView={{ opacity: 1, translateX: 0 }}
                >
                  Ready to build? Create a free account and start running AI without worrying about tokens or surprise bills.
                </motion.h1>
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
                  Oxlo.ai is built for developers and teams that care about cost clarity. Pricing is designed to be significantly more affordable, with simple request-based plans instead of token-based billing.
                </motion.p>
                <motion.div
                  viewport={{ once: true }}
                  transition={{ ease: "easeInOut", duration: 1.25 }}
                  initial={{ opacity: 0, translateY: 25 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                >
                <Button
                  title="Start running AI in seconds"
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
            <motion.h2 className="section-heading"  viewport={{ once: true }} transition={{ ease: "easeInOut", duration: 0.5 }} initial={{ opacity: 0, translateY: 100 }} whileInView={{ opacity: 1, translateY: 0 }}>Applications</motion.h2>
          </div>
          <div className='box-wrap'>
            <div className='box-border'></div>
            {aiUseCases.map((item, index) => (
              <motion.div
                key={index}
                className="box-content"
                viewport={{ once: true }}
                transition={{ ease: "easeInOut", duration: 0.5, delay: item.delay }}
                initial={{ opacity: 0, translateY: 50 }}
                whileInView={{ opacity: 1, translateY: 0 }}
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

      <section className='common-section pill-section'>
        <div className='container'>
          <div className='text-center'>
          <motion.div className='section-badge' viewport={{ once: true }} transition={{ ease: "easeInOut", duration: 0.5 }} initial={{ opacity: 0, translateY: 50 }} whileInView={{ opacity: 1, translateY: 0 }}>
            <Image src={bulb} alt='bulb-icon' />
            <span>Rethinking AI Pricing</span>
          </motion.div>
          <motion.h2 className="section-heading"  viewport={{ once: true }} transition={{ ease: "easeInOut", duration: 0.5, delay: 0.25 }} initial={{ opacity: 0, translateY: 50 }} whileInView={{ opacity: 1, translateY: 0 }}>How <span class="text-gradient">Oxlo.ai</span> Stands Out</motion.h2>  
          <motion.p
            className="section-desc"
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }}
            initial={{ opacity: 0, translateY: 50 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            A practical comparison across pricing models, developer experience, and ease of deployment.
          </motion.p>
          </div>
          <div className="comparison-container">
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
          </div>
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

      {/* Visible FAQ Section — matches JSON-LD FAQPage schema for GEO/AEO */}
      <FaqSection />

      <section className="common-section newsletter-section">
        <div className="container">
          <div className="ns-wrap">
            <div className="ns-content">
              <motion.h2
                className="section-heading"
                viewport={{ once: true }}
                transition={{ ease: "easeInOut", duration: 0.75 }}
                initial={{ opacity: 0, translateY: 75 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                Ready to build?
              </motion.h2>
              <motion.p
                className="section-desc"
                viewport={{ once: true }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.25 }}
                initial={{ opacity: 0, translateY: 75 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                Run AI models without worrying about usage calculations.
              </motion.p>
              <motion.div
                viewport={{ once: true }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.5 }}
                initial={{ opacity: 0, translateY: 75 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                <Button
                  title="Deploy Now"
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
