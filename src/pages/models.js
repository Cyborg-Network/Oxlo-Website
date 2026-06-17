"use client"

import { useState, useMemo } from "react"
import { Search, X, Star, Zap, Flame, MoveRight } from "lucide-react"
import Head from "next/head";
import { motion } from "framer-motion";
import TextReveal from "@/components/TextReveal";

export default function Models() {

// ItemList schema for AI entity discovery
const modelsItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Oxlo.ai AI Model Registry",
  "description": "45+ open-source and proprietary AI models available via Oxlo.ai's request-based API. Includes LLMs, vision, code, image generation, audio, embeddings, and object detection models.",
  "numberOfItems": 46,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Qwen 3 32B", "description": "State-of-the-art multilingual reasoning and agent tasks" },
    { "@type": "ListItem", "position": 2, "name": "Llama 3.3 70B", "description": "Meta's flagship 70B parameter general-purpose LLM" },
    { "@type": "ListItem", "position": 3, "name": "DeepSeek R1 671B", "description": "Deep reasoning and complex coding - full 671B MoE model" },
    { "@type": "ListItem", "position": 4, "name": "Mistral 7B", "description": "Fast and efficient general-purpose language model" },
    { "@type": "ListItem", "position": 5, "name": "Whisper Large v3", "description": "OpenAI's best speech-to-text transcription model" },
    { "@type": "ListItem", "position": 6, "name": "Oxlo Image Pro", "description": "Premium Flux 2-based image generation" },
    { "@type": "ListItem", "position": 7, "name": "BGE-Large", "description": "BAAI's top-performing text embedding model" },
    { "@type": "ListItem", "position": 8, "name": "YOLOv9", "description": "State-of-the-art real-time object detection" },
    { "@type": "ListItem", "position": 9, "name": "Kokoro 82M", "description": "Natural-sounding text-to-speech model" },
    { "@type": "ListItem", "position": 10, "name": "DeepSeek Coder 33B", "description": "Specialized model for code generation and programming assistance" },
    { "@type": "ListItem", "position": 11, "name": "Kimi K2.6", "description": "Latest multimodal reasoning model with video input and 131K context for complex multi-step tasks." },
    { "@type": "ListItem", "position": 12, "name": "Gemma 3 27B", "description": "High-resolution multimodal analysis for complex visual and text tasks." },
    { "@type": "ListItem", "position": 13, "name": "GLM 5", "description": "744B parameter MoE model for complex systems engineering and long-horizon agentic tasks." },
    { "@type": "ListItem", "position": 14, "name": "Minimax M2.5", "description": "Mixture-of-Experts model optimized for coding, agentic tool use, and complex workflows." },
    { "@type": "ListItem", "position": 15, "name": "Qwen 3 Coder 30B", "description": "State-of-the-art 30B code model for complex software engineering tasks." },
    { "@type": "ListItem", "position": 16, "name": "DeepSeek V4 Flash", "description": "Efficient MoE model with 1M context and near state-of-the-art open-source reasoning performance." }
  ]
};
  
const MODELS_DATA = [
  // --- Latest & high-demand flagship models ---
  {
    id: "kimi-k2-6",
    title: "Kimi K2.6",
    description: "Latest high-capacity reasoning model built for long context understanding, research workflows, and complex problem solving.",
    tags: ["LLM", "Text", "Long Context"],
    logo: "/images/models/moon.png",
    trending: true,
    comingSoon: false,
  },
  {
    id: "glm-5",
    title: "GLM 5",
    description: "744B parameter MoE model built for complex systems engineering, long-horizon agentic tasks, and advanced reasoning.",
    tags: ["LLM", "Reasoning", "Code"],
    logo: "/images/models/zhipu.png",
    trending: true,
    comingSoon: false,
  },
  {
    id: "deepseek-v4-flash",
    title: "DeepSeek V4 Flash",
    description: "Efficient MoE model with 1M context and near state-of-the-art open-source reasoning performance.",
    tags: ["LLM", "Reasoning", "Code"],
    logo: "/images/models/deep.png",
    trending: true,
    comingSoon: false,
  },
  {
    id: "minimax-m2-5",
    title: "Minimax M2.5",
    description: "Mixture-of-Experts model optimized for coding, agentic tool use, complex workflows, and office productivity tasks.",
    tags: ["LLM", "Code", "Reasoning"],
    logo: "/images/models/minimax.png",
    trending: true,
    comingSoon: false,
  },
  {
    id: "deepseek-r1-0528",
    title: "DeepSeek R1 0528",
    description: "Reasoning focused language model specialized for analytical tasks, coding workflows, and complex multi-step reasoning.",
    tags: ["LLM", "Reasoning", "Code"],
    logo: "/images/models/deep.png",
    trending: true,
    comingSoon: false,
  },
  {
    id: "deepseek-v3-2",
    title: "DeepSeek V3.2",
    description: "Powerful general-purpose language model delivering strong reasoning, coding, and natural language performance.",
    tags: ["LLM", "Reasoning", "Code"],
    logo: "/images/models/deep.png",
    trending: true,
    comingSoon: false,
  },
  {
    id: "kimi-k2-5",
    title: "Kimi K2.5",
    description: "High-capacity reasoning model built for long context understanding, research workflows, and multi-step problem solving.",
    tags: ["LLM", "Text", "Long Context"],
    logo: "/images/models/moon.png",
    trending: true,
    comingSoon: false,
  },
  {
    id: "kimi-k2thinking",
    title: "Kimi-K2-Thinking",
    description: "Premium reasoning-optimized language model designed for deep thinking, complex problem solving, and advanced multi-step AI tasks.",
    tags: ["LLM", "Text"],
    logo: "/images/models/moon.png",
    trending: true,
    comingSoon: false,
  },
  // --- LLMs by parameter size (descending) ---
  {
    id: "gpt-oss-120b",
    title: "GPT-OSS-120B",
    description: "Premium open-source GPT-style large language model with top-tier reasoning, coding, and natural language capabilities for high-performance AI applications",
    tags: ["LLM", "Text", "Code"],
    logo: "/images/models/gpt.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "llama-3-3-70b",
    title: "Llama-3.3-70B",
    description: "Large-scale model designed for complex reasoning and production-grade workloads.",
    tags: ["LLM", "Text"],
    logo: "/images/models/meta.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "deepseek-r1-70b",
    title: "DeepSeek R1 70B",
    description: "Flagship reasoning model offering superior accuracy and deep problem-solving capabilities for demanding AI workloads.",
    tags: ["LLM", "Reasoning"],
    logo: "/images/models/deep.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "deepseek-V3-0324",
    title: "DeepSeek V3 0324",
    description: "Advanced language model optimized for complex reasoning, structured responses, and high-performance AI assistants.",
    tags: ["LLM", "Reasoning", "Chat"],
    logo: "/images/models/deep.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "deepseek-coder-33b",
    title: "DeepSeek Coder - 33B",
    description: "Specialized model for code generation, refactoring, and programming assistance.",
    tags: ["LLM", "Code"],
    logo: "/images/models/deep.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "qwen-3-32b",
    title: "Qwen-3 32B",
    description: "Large multilingual model built for strong reasoning and generation tasks.",
    tags: ["LLM", "Text"],
    logo: "/images/models/jjj.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "qwen-3-coder",
    title: "Qwen-3 Coder 30B",
    description: "Code-focused language model for software development and technical reasoning.",
    tags: ["LLM", "Code"],
    logo: "/images/models/jjj.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "gemma-3-27b",
    title: "Gemma-3-27B",
    description: "Large language model focused on high-quality text generation and reasoning.",
    tags: ["LLM", "Text"],
    logo: "/images/models/google.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "gpt-oss-20b",
    title: "GPT-OSS-20B",
    description: "Open-source GPT-style model supporting both natural language and coding tasks.",
    tags: ["LLM", "Text", "Code"],
    logo: "/images/models/gpt.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "llama-4-maverick-17B",
    title: "Llama 4 Maverick 17B",
    description: "Efficient large language model designed for strong reasoning, conversational AI, and scalable production deployments.",
    tags: ["LLM", "Reasoning", "Chat"],
    logo: "/images/models/meta.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "ministral-3-14b-instruct",
    title: "Ministral 3 14B Instruct",
    description: "Efficient instruction tuned language model designed for conversational AI, structured responses, and scalable production applications.",
    tags: ["LLM", "Reasoning", "Chat"],
    logo: "/images/models/mistral.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "llama-3-1-8b",
    title: "Llama-3.1-8B",
    description: "Strong open-source model with excellent instruction following and reasoning quality.",
    tags: ["LLM", "Text"],
    logo: "/images/models/meta.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "deepseek-r1-8b",
    title: "DeepSeek R1 8B",
    description: "Efficient reasoning-focused language model optimized for fast, cost-effective problem solving and structured AI tasks.",
    tags: ["LLM", "Reasoning"],
    logo: "/images/models/deep.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "qwen-2-5-7b",
    title: "Qwen 2.5-7B",
    description: "Multilingual language model optimized for general reasoning and conversational tasks.",
    tags: ["LLM", "Text"],
    logo: "/images/models/jjj.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "mistral-7b",
    title: "Mistral-7B",
    description: "Fast, efficient general-purpose language model for chat, summarization, and reasoning.",
    tags: ["LLM", "Text"],
    logo: "/images/models/mistral.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "gemma-3-4b",
    title: "Gemma-3-4B",
    description: "Compact model designed for efficient inference with solid generation quality.",
    tags: ["LLM", "Text"],
    logo: "/images/models/google.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "llama-3-2-3b",
    title: "Llama-3.2-3B",
    description: "Lightweight model optimized for low-latency and cost-efficient workloads.",
    tags: ["LLM", "Text"],
    logo: "/images/models/meta.png",
    trending: false,
    comingSoon: false,
  },
  // --- Image, Vision, Audio, Embeddings ---
  {
    id: "oxlo-image-pro",
    title: "Oxlo Image Pro",
    description: "Premium image generation model delivering exceptional visual quality, precise prompt adherence, and reliable production-grade performance",
    tags: ["Image"],
    logo: "/images/models/oxlo.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "flux-1-schnell",
    title: "Flux.1 Schnell",
    description: "High-speed diffusion model optimized for rapid image generation.",
    tags: ["Image"],
    logo: "/images/models/arc.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "sd-v1-5",
    title: "Stable Diffusion v1.5",
    description: "Widely used text-to-image model for fast and flexible image generation.",
    tags: ["Image"],
    logo: "/images/models/sd.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "yolov11",
    title: "YOLOv11",
    description: "Latest YOLO model offering improved object detection accuracy and performance.",
    tags: ["Computer Vision"],
    logo: "/images/models/you.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "yolov9",
    title: "YOLOv9",
    description: "Real-time object detection model for images and video streams.",
    tags: ["Computer Vision"],
    logo: "/images/models/you.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "whisper-large-v3",
    title: "Whisper Large v3",
    description: "State-of-the-art multilingual speech-to-text model with improved accuracy, robustness, and performance for production transcription.",
    tags: ["Audio", "Speech to Text"],
    logo: "/images/models/gpt.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "whisper-large",
    title: "Whisper Large",
    description: "High-accuracy transcription model suitable for production use cases.",
    tags: ["Audio", "Speech to Text"],
    logo: "/images/models/gpt.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "whisper-medium",
    title: "Whisper-Medium",
    description: "Reliable speech recognition model for transcription and audio analysis.",
    tags: ["Audio", "Speech to Text"],
    logo: "/images/models/gpt.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "bge-large",
    title: "BGE-Large",
    description: "High-quality embedding model optimized for semantic search and RAG pipelines.",
    tags: ["Embeddings"],
    logo: "/images/models/baai.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "e5-large",
    title: "E5-Large",
    description: "Embedding model optimized for similarity search and information retrieval.",
    tags: ["Embeddings"],
    logo: "/images/models/dot.png",
    trending: false,
    comingSoon: false,
  },
  {
    id: "kokoro-82m",
    title: "Kokoro-82M",
    description: "Lightweight speech synthesis model for generating natural-sounding audio.",
    tags: ["Audio", "Text to Speech"],
    logo: "/images/models/danger.png",
    trending: false,
    comingSoon: false,
  },
  // --- Coming Soon ---
  {
    id: "oxlo-image-ultra",
    title: "Oxlo Image Ultra",
    description: "Flagship image generation model optimized for ultra-realistic visuals and delivering exceptional photorealism.",
    tags: ["Image"],
    logo: "/images/models/oxlo.png",
    trending: false,
    comingSoon: true,
  },
  {
    id: "sdxl",
    title: "Stable Diffusion 3.5 Large",
    description: "High-resolution image generation model focused on output realism and detail.",
    tags: ["Image"],
    logo: "/images/models/sd.png",
    trending: false,
    comingSoon: true,
  },
  {
    id: "oxlo-coder-fast",
    title: "Oxlo Coder Fast",
    description: "High-speed code generation model designed for rapid completions, responsive coding workflows, and efficient developer productivity",
    tags: ["LLM","Code"],
    logo: "/images/models/oxlo.png",
    trending: false,
    comingSoon: true,
  },
]

const FILTER_TAGS = [
  { id: "LLM", color: "#10b981" },
  { id: "Text", color: "#6366f1" },
  { id: "Image", color: "#f59e0b" },
  { id: "Audio", color: "#ec4899" },
  { id: "Embeddings", color: "#22c55e" },
  { id: "Reasoning", color: "#ef4444" },
  { id: "Code", color: "#3b82f6" },
  { id: "Computer Vision", color: "#a855f7" },
  { id: "Vision-Language Model", color: "#60a5fa" },
  { id: "Speech to Text", color: "#ec4899" },
  { id: "Text to Speech", color: "#ec4899" },
  { id: "Long Context", color: "#c9d010" },
  { id: "Chat", color: "#851eec" },
]

const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState([])

  const toggleTag = (tagId) => {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]))
  }

  const clearAll = () => {
    setSearchQuery("")
    setSelectedTags([])
  }

  const filteredModels = useMemo(() => {
    return MODELS_DATA.filter((model) => {
      const matchesSearch =
        model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => model.tags.includes(tag))

      return matchesSearch && matchesTags
    }).sort((a, b) => {
      if (a.comingSoon === b.comingSoon) return 0;
      return a.comingSoon ? 1 : -1;
    })
  }, [searchQuery, selectedTags])


  const getButtonText = (tags) => {
    const hasTag = (tagList) => tags.some(t => tagList.includes(t));
    if (hasTag(['Computer Vision'])) return 'Connect';
    if (hasTag(['Image', 'Audio', 'Speech to Text', 'Text to Speech'])) return 'Generate';
    if (hasTag(['LLM', 'Text', 'Chat', 'Reasoning', 'Code'])) return 'Chat now';
    return 'Deploy';
  }

  return (
    <>
      <Head>
        <title>AI Models - 45+ Open-Source Models for Inference | Oxlo.ai</title>
        <meta
          name="description"
          content="Browse 45+ AI models on Oxlo.ai: DeepSeek V4 Flash, Kimi K2.6, Gemma 3 27B, Qwen 3 32B, Llama 3.3 70B, DeepSeek R1, Mistral 7B, Whisper, and more. Deploy any model in seconds with request-based pricing."
        />
        <meta
          name="keywords"
          content="AI models, open-source LLM, Kimi K2.6, Gemma 3 27B, Qwen 3 32B, Llama 3.3 70B, DeepSeek R1, Mistral 7B, Whisper API, SDXL API, BGE embedding, YOLOv9 API, AI model registry"
        />
        <link rel="canonical" href="https://oxlo.ai/models" />
        <meta property="og:title" content="45+ AI Models for Inference - Oxlo.ai Model Registry" />
        <meta property="og:description" content="Deploy Kimi K2.6, Gemma 3 27B, DeepSeek R1, and 45+ more models in seconds." />
        <meta property="og:url" content="https://oxlo.ai/models" />
        <meta name="robots" content="index, follow" />

        {/* Page-specific JSON-LD: ItemList schema for model discovery */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(modelsItemListSchema) }}
        />
      </Head>

      <section className="common-section home-hero-section flow-hidden">
        <div className="container">
          <div className="home-wrap d-flex hero-wrap">
            <motion.div
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.25, duration: 1.5 }}
              initial={{ opacity: 0, translateY: 100 }}
              whileInView={{ opacity: 1, translateY: 0 }}
            >
              <TextReveal text="Model Registry" className="hero-heading" tag="h1" />
              <motion.div
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  bounce: 0.25,
                  duration: 1.5,
                  delay: 0.25,
                }}
                initial={{ opacity: 0, translateY: 50 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                <p className="home-desc">
                  Choose an open-source model and deploy it in seconds.
                </p>
              </motion.div>
            </motion.div>



            <motion.div
              viewport={{ once: true }}
              transition={{
                type: "spring",
                bounce: 0.25,
                duration: 1.5,
                delay: 0.5,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              
            </motion.div>
          </div>
          <motion.div
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.25, duration: 1.5 }}
            initial={{ opacity: 0, translateY: 100 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            className="model-library">
            <div className="search-container">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search model registry"
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="clear-search" aria-label="Clear search" onClick={() => setSearchQuery("")}>
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="tag-filters">
                {FILTER_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag.id)
                  return (
                    <button
                      key={tag.id}
                      className={`filter-pill ${isSelected ? "active" : ""}`}
                      onClick={() => toggleTag(tag.id)}
                    >
                      <Star size={13} fill={tag.color} stroke={tag.color} />
                      <span>{tag.id}</span>
                      {isSelected && <X size={14} className="pill-remove" />}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="section-header">
              <div className="title-group">
                <h2>Models</h2>
                <span className="count-badge">{filteredModels.length}</span>
              </div>
              {(searchQuery || selectedTags.length > 0) && (
                <button className="clear-all-btn" onClick={clearAll}>
                  Clear all
                </button>
              )}
            </div>

            <div className="model-grid">
              {filteredModels.map((model) => (
                <div key={model.id} className="model-card">
                  <div className="card-top">
                    <div className="brand-logo">
                      <img src={model.logo || "/placeholder.svg?height=32&width=32"} alt={model.title} />
                    </div>
                    {model.trending && (
                      <div className="trending-icon">
                        <Flame size={16} stroke="currentColor" />
                      </div>
                    )}
                  </div>

                  <div className="model-info">
                    <h3>{model.title}</h3>
                    <p className="model-desc">{model.description}</p>
                  </div>

                  <div className="card-footer">
                    <div className="card-tags">
                      {model.tags.map((tag) => {
                        const tagConfig = FILTER_TAGS.find((t) => t.id === tag) || { color: "#94a3b8" }
                        return (
                          <span key={tag} className="card-tag">
                            <Star size={12} fill={tagConfig.color} stroke={tagConfig.color} />
                            {tag}
                          </span>
                        )
                      })}
                    </div>
                    {!model.comingSoon ? (
                      <a href="https://portal.oxlo.ai/admin/models" className="deploy-btn">{getButtonText(model.tags)} <MoveRight size={15} /></a>
                    ) : (
                      <a href="" className="deploy-btn coming-soon">Coming Soon</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>



    </>
  );
}
