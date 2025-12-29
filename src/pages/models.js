"use client"

import { useState, useMemo } from "react"
import { Search, X, Star, Zap, Flame, MoveRight } from "lucide-react"
import Head from "next/head";
import { motion } from "framer-motion";

export default function Models() {
  
const MODELS_DATA = [
  {
    id: "mistral-7b",
    title: "Mistral-7B",
    description: "Fast, lightweight language model for chat, summaries, and basic reasoning.",
    tags: ["LLM", "Text"],
    logo: "/images/models/mistral.png",
    trending: true,
  },
  {
    id: "llama-3-1-8b",
    title: "Llama-3.1-8B",
    description: "Strong open-source model with excellent instruction following and reasoning quality.",
    tags: ["LLM", "Text"],
    logo: "/images/models/meta.png",
    trending: true,
  },
  {
    id: "qwen-7b",
    title: "Qwen-7B",
    description: "Multilingual language model optimized for general reasoning and conversational tasks.",
    tags: ["LLM", "Text"],
    logo: "/images/models/jjj.png",
    trending: true,
  },
  {
    id: "sd-v1-5",
    title: "Stable Diffusion v1.5",
    description: "Widely used text-to-image model for fast and flexible image generation.",
    tags: ["Image"],
    logo: "/images/models/sd.png",
    trending: true,
  },
  {
    id: "whisper-medium",
    title: "Whisper-Medium",
    description: "Reliable speech recognition model for transcription and audio analysis.",
    tags: ["Audio", "Speech to Text"],
    logo: "/images/models/gpt.png",
    trending: true,
  },
  {
    id: "deepseek-coder",
    title: "DeepSeek Coder",
    description: "Specialized model for code generation, refactoring, and programming assistance.",
    tags: ["LLM", "Code"],
    logo: "/images/models/deep.png",
    trending: true,
  },
  {
    id: "llama-3-1-70b",
    title: "Llama-3.1-70B",
    description: "Large-scale model designed for complex reasoning and production-grade workloads.",
    tags: ["LLM", "Text"],
    logo: "/images/models/meta.png",
    trending: true,
  },
  {
    id: "sdxl",
    title: "Stable Diffusion XL (SDXL)",
    description: "High-resolution image generation model with improved realism and detail.",
    tags: ["Image"],
    logo: "/images/models/sd.png",
    trending: true,
  },
  {
    id: "yolov8",
    title: "YOLOv8",
    description: "Real-time object detection model for images and video streams.",
    tags: ["Computer Vision"],
    logo: "/images/models/you.png",
    trending: true,
  },
  {
    id: "whisper-large",
    title: "Whisper Large",
    description: "High-accuracy transcription model for long audio and noisy environments.",
    tags: ["Audio", "Speech to Text"],
    logo: "/images/models/gpt.png",
    trending: true,
  },
  {
    id: "whisper-large-v3",
    title: "Whisper Large v3",
    description: "High-accuracy transcription model for long audio and noisy environments.",
    tags: ["Audio", "Speech to Text"],
    logo: "/images/models/gpt.png",
    trending: true,
  },
  {
    id: "qwen-14b",
    title: "Qwen-14B",
    description: "Mid-sized model offering stronger reasoning and generation than smaller variants.",
    tags: ["LLM", "Text"],
    logo: "/images/models/jjj.png",
    trending: true,
  },
  {
    id: "mistral-24b",
    title: "Mistral-24B",
    description: "High-capacity model for advanced reasoning and longer context workloads.",
    tags: ["LLM", "Text"],
    logo: "/images/models/mistral.png",
    trending: true,
  },
  {
    id: "gemma-27b",
    title: "Gemma-27B",
    description: "Large language model focused on high-quality text generation and reasoning.",
    tags: ["LLM", "Text"],
    logo: "/images/models/google.png",
    trending: true,
  },
  {
    id: "qwen-32b",
    title: "Qwen-32B",
    description: "Large multilingual model built for strong reasoning and generation tasks.",
    tags: ["LLM", "Text"],
    logo: "/images/models/jjj.png",
    trending: false,
  },
  {
    id: "gpt-oss",
    title: "GPT-OSS",
    description: "Open-source large language models inspired by GPT-style conversational AI.",
    tags: ["LLM", "Text", "Code"],
    logo: "/images/models/gpt.png",
    trending: false,
  },
  {
    id: "deepseek-r1",
    title: "DeepSeek R1",
    description: "Model optimized for structured reasoning and problem-solving workflows.",
    tags: ["LLM", "Reasoning"],
    logo: "/images/models/deep.png",
    trending: false,
  },
  {
    id: "kimi",
    title: "Kimi",
    description: "Large-context language model designed for long documents and extended reasoning.",
    tags: ["LLM", "Text"],
    logo: "/images/models/moon.png",
    trending: false,
  },
  {
    id: "bge-large",
    title: "BGE-Large",
    description: "High-quality embedding model optimized for semantic search and RAG pipelines.",
    tags: ["Embeddings"],
    logo: "/images/models/baai.png",
    trending: false,
  },
  {
    id: "e5-large",
    title: "E5-Large",
    description: "Embedding model optimized for similarity search and information retrieval.",
    tags: ["Embeddings"],
    logo: "/images/models/dot.png",
    trending: false,
  },
  {
    id: "gemma-3-4b",
    title: "Gemma-3-4B",
    description: "Compact model designed for efficient inference with solid generation quality.",
    tags: ["LLM", "Text"],
    logo: "/images/models/google.png",
    trending: false,
  },
  {
    id: "llama-3-2-3b",
    title: "Llama-3.2-3B",
    description: "Lightweight model optimized for low-latency and cost-efficient workloads.",
    tags: ["LLM", "Text"],
    logo: "/images/models/meta.png",
    trending: false,
  },
  {
    id: "llama-3-8b",
    title: "Llama-3-8B",
    description: "General-purpose language model suitable for chat and content generation.",
    tags: ["LLM", "Text"],
    logo: "/images/models/meta.png",
    trending: false,
  },
  {
    id: "llama-2-7b",
    title: "Llama-2-7B",
    description: "Earlier-generation open-source model for basic language tasks.",
    tags: ["LLM", "Text"],
    logo: "/images/models/meta.png",
    trending: false,
  },
  {
    id: "qwen-3-coder",
    title: "Qwen-3 Coder",
    description: "Code-focused language model for software development and technical reasoning.",
    tags: ["LLM", "Code"],
    logo: "/images/models/jjj.png",
    trending: false,
  },
  {
    id: "yolov9",
    title: "YOLOv9",
    description: "Latest YOLO model offering improved object detection accuracy and performance.",
    tags: ["Computer Vision"],
    logo: "/images/models/you.png",
    trending: false,
  },
  {
    id: "kimi-k2-vl",
    title: "Kimi K2 VL",
    description: "Multimodal model combining visual understanding with language reasoning.",
    tags: ["Vision-Language Model"],
    logo: "/images/models/moon.png",
    trending: false,
  },
  {
    id: "flux-1-schnell",
    title: "Flux.1 Schnell",
    description: "High-speed diffusion model optimized for rapid image generation.",
    tags: ["Image"],
    logo: "/images/models/arc.png",
    trending: false,
  },
  {
    id: "whisper-v3-turbo",
    title: "Whisper-v3 Turbo",
    description: "Optimized Whisper variant for faster transcription with lower latency.",
    tags: ["Audio", "Speech to Text"],
    logo: "/images/models/gpt.png",
    trending: false,
  },
  {
    id: "kokoro-82m",
    title: "Kokoro-82M",
    description: "Lightweight speech synthesis model for generating natural-sounding audio.",
    tags: ["Audio", "Text to Speech"],
    logo: "/images/models/danger.png",
    trending: false,
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
    })
  }, [searchQuery, selectedTags])

  return (
    <>
      <Head>
        <title>Models</title>
        <meta
          name="description"
          content="Model Registry - Choose an open-source model and deploy it in seconds."
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
              <h1 className="hero-heading">Model Registry</h1>
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
                    <button className="deploy-btn">Deploy <MoveRight size={15} /></button>
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
