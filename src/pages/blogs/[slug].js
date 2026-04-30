import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { ArrowLeft, Clock, Calendar, User, Facebook, Linkedin, ArrowRight } from "lucide-react";

// X (formerly Twitter) official SVG logo
const XLogo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

// Reordered: April 15th then April 22nd
const ALL_POSTS = [
  {
    slug: "request-based-pricing-future",
    title: "Why Request-Based Pricing is the Future of AI Inference",
    category: "Product",
    date: "15 April 2026",
    author: "Team Oxlo.ai",
    role: "Product Strategy",
    image: "/images/blogs/ai-inference.png",
    readTime: "4 min read",
    excerpt: "Token-based pricing penalizes complex reasoning and long-context prompts. Here is why we decided to pioneer a flat, predictable request-based pricing model for developers.",
    content: `
      <p>Token-based pricing has been the industry standard since the dawn of the GPT era. But as models become more capable of complex reasoning and long-context analysis, paying per token is becoming a massive tax on innovation.</p>
      
      <h2 id="problem-with-tokens">The Problem with Tokens in Agentic Workflows</h2>
      <p>When you are building an agentic workflow that requires passing 30,000 tokens of context just to ask a simple question, token pricing makes your unit economics impossible. You are penalized for providing the model with the context it needs to be accurate.</p>
      <p>For example, if an AI agent needs to read a 50-page PDF to extract a single data point, traditional token pricing charges you for all 50 pages of input tokens. As developers build systems that loop, retry, and evaluate their own outputs, these token costs multiply exponentially. This forces engineering teams to compromise on context size, ultimately degrading the quality of the AI application.</p>
      
      <h2 id="what-is-request-based">What is Request-Based Pricing?</h2>
      <p>Request-based pricing is a paradigm shift in how AI inference is billed. Instead of counting individual input and output tokens, developers pay a flat, predictable fee for an API request, regardless of the prompt length or response size.</p>
      <ul>
        <li><strong>Predictable Costs:</strong> A 100-token prompt costs the exact same as a 50,000-token prompt.</li>
        <li><strong>Unleash Context Windows:</strong> Pass entire codebases, legal documents, or long-term memory to the model without worrying about budget overruns.</li>
        <li><strong>Simplified Billing:</strong> Finance teams can easily forecast AI infrastructure costs based on daily active users and expected request volume, rather than variable token consumption.</li>
      </ul>

      <h2 id="leading-the-transition">Why Oxlo.ai is Leading the Transition</h2>
      <p>At Oxlo.ai, we believe developers should pay for compute requests, not context length. By optimizing our underlying GPU infrastructure for high-throughput batching and continuous batching algorithms (like vLLM), we have decoupled the cost of context from the cost of the request.</p>
      
      <blockquote>
        "Token counting is the new 'minutes plan' of the cell phone era. It is restrictive, unpredictable, and ultimately anti-developer. Request-based pricing is unlimited data for AI."
      </blockquote>

      <h2 id="impact-on-seo">The Impact on AEO and SEO</h2>
      <p>As Answer Engine Optimization (AEO) and traditional Search Engine Optimization (SEO) increasingly rely on large-scale content generation and analysis, marketing teams are running massive automated workflows. Token-based providers make parsing thousands of web pages prohibitively expensive. With Oxlo.ai's request-based model, SEO platforms can ingest massive HTML payloads and generate highly targeted, contextual answers at a fraction of the cost, ensuring better ranking in AI-driven search results.</p>
      
      <p>The future of AI is context-heavy, agentic, and autonomous. It's time our pricing models reflected that reality. Join us at Oxlo.ai and build without limits.</p>
    `,
    toc: [
      { id: "problem-with-tokens", title: "The Problem with Tokens" },
      { id: "what-is-request-based", title: "What is Request-Based Pricing?" },
      { id: "leading-the-transition", title: "Leading the Transition" },
      { id: "impact-on-seo", title: "The Impact on SEO" }
    ]
  },
  {
    slug: "infrastructure-monitoring-agent",
    title: "Building the Brain: Our Infrastructure Monitoring Agent",
    category: "Engineering",
    date: "22 April 2026",
    author: "Team Oxlo.ai",
    role: "Engineering",
    image: "/images/blogs/monitoring-agent.png",
    readTime: "6 min read",
    excerpt: "Discover how we orchestrated autonomous agents to monitor our complex serverless backend, coordinate with our internal chat systems, and ensure 99.99% uptime for Oxlo.ai models.",
    content: `
      <p>As Oxlo.ai's user base scaled rapidly, managing our serverless GPU backend became increasingly complex. We needed a way to proactively monitor inference clusters, instantly route traffic around degraded hardware, and alert our engineering team before customers noticed anything wrong.</p>
      
      <h2 id="challenge-of-scale">The Challenge of Scale</h2>
      <p>Our initial monitoring setup relied on standard polling mechanisms and basic dashboards. However, when orchestrating 40+ large language models across distributed GPU nodes, traditional APM tools were too slow. A node failing mid-generation could cause a 45-second timeout for a user - completely unacceptable for production workloads.</p>
      
      <blockquote>
        "We didn't just need a dashboard. We needed an autonomous system that could understand the context of an error and take corrective action instantly."
      </blockquote>

      <h2 id="orchestrating-agentic">Orchestrating the Agentic Solution</h2>
      <p>We decided to build an internal <strong>Infrastructure Monitoring Agent</strong>. Instead of hardcoded rules, we built a multi-agent system powered by our own LLM APIs. Here is how it works:</p>
      
      <ul>
        <li><strong>The Watcher Agent:</strong> Continuously streams real-time telemetry from our proxy nodes, analyzing latency distributions and error rates per model.</li>
        <li><strong>The Diagnostic Agent:</strong> When the Watcher detects an anomaly (e.g., Llama 3 70B latency spiking by 400%), the Diagnostic Agent runs a series of lightweight test inferences against the specific nodes.</li>
        <li><strong>The Orchestrator:</strong> If a node is deemed unhealthy, the Orchestrator instantly updates the routing mesh to bypass the faulty node and re-queues affected requests seamlessly.</li>
      </ul>

      <h2 id="internal-chat">Connecting to Internal Chat Systems</h2>
      <p>The magic happens in how this system communicates. We integrated the Orchestrator directly into our Slack and Discord developer channels. When an issue occurs, the bot doesn't just send a generic alert. It sends a contextual breakdown:</p>
      
      <div class="code-block">
        <code>
[URGENT] High Latency on Node: us-east-gpu-04
Model affected: DeepSeek R1
Action taken: Node isolated. Traffic rerouted to us-east-gpu-05.
Impact: 0 failed requests, 12 delayed by ~2s.
        </code>
      </div>

      <p>The engineering team can then chat directly with the agent in the channel to query logs, ask for a root cause analysis based on recent commits, or manually override the routing decisions.</p>

      <h2 id="the-result">The Result</h2>
      <p>Since deploying the Monitoring Agent, our mean time to recovery (MTTR) has dropped from 4 minutes to under 3 seconds. The agent handles 95% of transient hardware failures autonomously while we sleep.</p>
      <p>We are continuing to refine the agent's contextual awareness. Stay tuned!</p>
    `,
    toc: [
      { id: "challenge-of-scale", title: "The Challenge of Scale" },
      { id: "orchestrating-agentic", title: "Orchestrating the Agentic Solution" },
      { id: "internal-chat", title: "Connecting to Internal Chat Systems" },
      { id: "the-result", title: "The Result" }
    ]
  }
];

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  // Don't render until router is ready
  if (!router.isReady) return null;

  const post = ALL_POSTS.find(p => p.slug === slug);
  const relatedPosts = ALL_POSTS.filter(p => p.slug !== slug);

  if (!post) {
    return (
      <div className="container" style={{ paddingTop: "150px", minHeight: "60vh", textAlign: "center" }}>
        <h2>Post not found</h2>
        <Link href="/blogs"><Button title="Back to Blogs" /></Link>
      </div>
    );
  }

  const postUrl = typeof window !== 'undefined' ? window.location.href : `https://oxlo.ai/blogs/${slug}`;

  return (
    <>
      <Head>
        <title>{post.title} | Oxlo.ai Blog</title>
        <meta name="description" content={post.title} />
      </Head>

      <div className="blog-post-wrapper">
        <div className="container">
          <Link href="/blogs" className="blog-back-nav">
            <ArrowLeft size={16} /> Back to Blogs
          </Link>

          {/* Heading Section Before Columns */}
          <div className="blog-post-header-new">
            <div className="blog-meta-tags-new">
              <span className="category-tag-new unbounded-font">{post.category}</span>
            </div>
            <motion.h1 
              className="blog-main-title unbounded-font"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {post.title}
            </motion.h1>
            <p className="blog-subtitle-new">{post.excerpt}</p>
          </div>

          <div className="blog-two-column-layout">
            {/* Sticky Left Sidebar */}
            <aside className="blog-sidebar">
              <div className="sticky-wrapper">
                <div className="sidebar-section">
                  <div className="sidebar-label">Author</div>
                  <div className="sidebar-value">{post.author}</div>
                </div>
                
                <div className="sidebar-section">
                  <div className="sidebar-label">Date</div>
                  <div className="sidebar-value flex-align">
                    <Calendar size={14} className="mr-2" /> {post.date}
                  </div>
                </div>

                {post.toc && post.toc.length > 0 && (
                  <div className="sidebar-section toc-section">
                    <div className="sidebar-label">Table of contents</div>
                    <ul className="toc-list">
                      {post.toc.map((item, idx) => (
                        <li key={idx}>
                          <a href={`#${item.id}`}>{item.title}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="sidebar-section share-section">
                  <div className="sidebar-label">Share</div>
                  <div className="social-icons">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer">
                      <Facebook size={18} />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer">
                      <XLogo size={18} />
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>

                <div className="sidebar-section get-started-section">
                  <a href="https://portal.oxlo.ai" className="btn-get-started-sidebar">
                    Get started
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <article className="blog-main-content">
              <motion.div 
                className="blog-hero-image-new"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <img src={post.image} alt={post.title} />
              </motion.div>

              <motion.div
                className="blog-rich-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="related-articles-section">
            <div className="container">
              <h2>Related articles</h2>
              <div className="blogs-grid-new">
                {relatedPosts.map((rPost, index) => (
                  <Link href={`/blogs/${rPost.slug}`} key={index} className="blog-card-link-new">
                    <div className="blog-card-new">
                      <div className="blog-card-image-new">
                        <img src={rPost.image} alt={rPost.title} loading="lazy" />
                      </div>
                      <div className="blog-card-content-new">
                        <div className="blog-meta-new">
                          <span className="blog-author-new">{rPost.author}</span>
                          <span className="blog-dot-new">•</span>
                          <span className="blog-date-new">{rPost.date}</span>
                        </div>
                        <h3 className="blog-title-new unbounded-font">{rPost.title}</h3>
                        <p className="blog-excerpt-new">{rPost.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
      </div>
    </>
  );
}
