import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Box, Database, Zap, HardDrive, DollarSign, ArrowRight } from "lucide-react";

// Reordered: April 15th then April 22nd
const BLOG_POSTS = [
  {
    slug: "request-based-pricing-future",
    title: "Why Request-Based Pricing is the Future of AI Inference",
    category: "Product",
    date: "15 April 2026",
    author: "Team Oxlo.ai",
    image: "/images/blogs/ai-inference.png",
    excerpt: "Token-based pricing penalizes complex reasoning and long-context prompts. Here is why we decided to pioneer a flat, predictable request-based pricing model for developers.",
    readTime: "4 min read"
  },
  {
    slug: "infrastructure-monitoring-agent",
    title: "Building the Brain: Our Infrastructure Monitoring Agent",
    category: "Engineering",
    date: "22 April 2026",
    author: "Team Oxlo.ai",
    image: "/images/blogs/monitoring-agent.png",
    excerpt: "Discover how we orchestrated autonomous agents to monitor our complex serverless backend, coordinate with our internal chat systems, and ensure 99.99% uptime for Oxlo.ai models.",
    readTime: "6 min read"
  }
];

const CATEGORIES = [
  { name: "All", icon: null },
  { name: "Engineering", icon: <Cpu size={14} /> },
  { name: "Product", icon: <Box size={14} /> },
  { name: "AI Infrastructure", icon: <Database size={14} /> },
  { name: "Learn AI", icon: <Zap size={14} /> },
  { name: "Hardware & Trends", icon: <HardDrive size={14} /> },
  { name: "Cost Optimization", icon: <DollarSign size={14} /> }
];

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = BLOG_POSTS.filter(post => 
    activeCategory === "All" || post.category === activeCategory
  );

  return (
    <>
      <Head>
        <title>Oxlo.ai Blog - Engineering & Product Updates</title>
        <meta
          name="description"
          content="Read the latest news, engineering deep dives, and product updates from the Oxlo.ai team."
        />
      </Head>

      <section className="blogs-hero-section">
        <div className="container">
          <div className="text-center">
            <motion.div
              className="blog-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Blog
            </motion.div>
            <motion.h1
              className="hero-heading unbounded-font"
              initial={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.1 }}
            >
              Oxlo.ai Blog.
            </motion.h1>
            <motion.p
              className="section-desc unbounded-font"
              initial={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.2 }}
            >
              Our team's insights on building better and scaling smarter.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="blogs-directory-section">
        <div className="container">
          <div className="blog-categories-wrapper">
            <ul className="blog-categories">
              {CATEGORIES.map((cat, i) => (
                <li key={i} className={cat.name === activeCategory ? "active" : ""}>
                  <button 
                    className="category-btn"
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    {cat.icon && <span className="cat-icon">{cat.icon}</span>}
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <motion.div 
            className="blogs-grid-new"
            layout
          >
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/blogs/${post.slug}`} className="blog-card-link-new">
                    <div className="blog-card-new">
                      <div className="blog-card-image-new">
                        <img src={post.image} alt={post.title} loading="lazy" />
                      </div>
                      <div className="blog-card-content-new">
                        <div className="blog-meta-new">
                          <span className="blog-author-new">{post.author}</span>
                          <span className="blog-dot-new">•</span>
                          <span className="blog-date-new">{post.date}</span>
                        </div>
                        <h3 className="blog-title-new unbounded-font">{post.title}</h3>
                        <p className="blog-excerpt-new">{post.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredPosts.length === 0 && (
              <div className="no-posts-found unbounded-font">
                No articles found in this category yet.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Big Bottom CTA */}
      <section className="bottom-cta-section">
        <div className="container text-center">
          <h2 className="unbounded-font">Ready to build with Oxlo.ai?</h2>
          <p className="unbounded-font">Get started building high-performance AI inference applications today.</p>
          <a href="https://portal.oxlo.ai" className="btn-bottom-cta">
            Get started <ArrowRight size={18} className="ml-2" />
          </a>
        </div>
      </section>
    </>
  );
}
