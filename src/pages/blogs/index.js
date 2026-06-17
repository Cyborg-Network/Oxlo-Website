import Head from "next/head";
import Link from "next/link";
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Box, Database, Zap, HardDrive, DollarSign, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getBlogImage } from "@/lib/blogUtils";

const POSTS_PER_PAGE = 18;

const CATEGORIES = [
  { name: "All", icon: null },
  { name: "Engineering", icon: <Cpu size={14} /> },
  { name: "Product", icon: <Box size={14} /> },
  { name: "AI Infrastructure", icon: <Database size={14} /> },
  { name: "Learn AI", icon: <Zap size={14} /> },
  { name: "Hardware & Trends", icon: <HardDrive size={14} /> },
  { name: "Cost Optimization", icon: <DollarSign size={14} /> }
];

export async function getServerSideProps() {
  // Read fresh from Neon on every request — picks up new API-posted content instantly
  const { getPublishedPosts } = await import("@/lib/blogStore");

  let posts = [];
  try {
    const published = await getPublishedPosts({ listingOnly: true });
    posts = published.map(({ slug, title, category, date, author, image, excerpt, readTime }) => ({
      slug,
      title,
      category,
      date,
      author,
      image: image || "",
      excerpt,
      readTime,
    }));
  } catch (err) {
    console.error("blogs/index getServerSideProps error:", err);
    posts = [];
  }

  return {
    props: { posts },
  };
}

export default function Blogs({ posts }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() =>
    posts.filter(post => activeCategory === "All" || post.category === activeCategory),
    [posts, activeCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = filteredPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  const goToPage = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

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
                    onClick={() => { setActiveCategory(cat.name); setCurrentPage(1); }}
                  >
                    {cat.icon && <span className="cat-icon">{cat.icon}</span>}
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="blogs-grid-new">
            <AnimatePresence mode="popLayout">
              {visiblePosts.map((post) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link href={`/blogs/${post.slug}`} className="blog-card-link-new">
                    <div className="blog-card-new">
                      <div className="blog-card-image-new">
                        <img src={getBlogImage(post)} alt={post.title} loading="lazy" />
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
          </div>

          {totalPages > 1 && (
            <div className="blog-pagination">
              <button
                className="blog-pagination-btn"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
                <span>Prev</span>
              </button>

              <div className="blog-pagination-pages">
                {getPageNumbers().map((page, i) =>
                  page === '...' ? (
                    <span key={`dots-${i}`} className="blog-pagination-dots">...</span>
                  ) : (
                    <button
                      key={page}
                      className={`blog-pagination-page ${page === currentPage ? 'active' : ''}`}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                className="blog-pagination-btn"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <span>Next</span>
                <ChevronRight size={18} />
              </button>
            </div>
          )}
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
