import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { ArrowLeft, Clock, Calendar, User, Facebook, Linkedin, ArrowRight } from "lucide-react";
import { getBlogImage } from "@/lib/blogUtils";

// X (formerly Twitter) official SVG logo
const XLogo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

export async function getStaticPaths() {
  try {
    const { getPublishedPosts } = await import("@/lib/blogStore");
    const posts = await getPublishedPosts({ listingOnly: true });
    const paths = posts.slice(0, 50).map(p => ({ params: { slug: p.slug } }));
    return { paths, fallback: "blocking" };
  } catch (err) {
    console.error("blogs/[slug] getStaticPaths error:", err);
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  try {
    const { getPostBySlug, getPublishedPosts } = await import("@/lib/blogStore");

    const post = await getPostBySlug(params.slug);
    if (!post) {
      return { notFound: true };
    }

    let relatedPosts = [];
    try {
      relatedPosts = (await getPublishedPosts({ listingOnly: true }))
        .filter(p => p.slug !== params.slug)
        .slice(0, 6)
        .map(({ slug, title, category, date, author, image, excerpt, readTime }) => ({
          slug, title, category, date, author, image: image || "", excerpt, readTime
        }));
    } catch (_) {}

    return {
      props: { post, relatedPosts },
      revalidate: 300,
    };
  } catch (err) {
    console.error("blogs/[slug] getStaticProps error:", err);
    return { notFound: true, revalidate: 60 };
  }
}

export default function BlogPost({ post, relatedPosts }) {
  if (!post) {
    return (
      <div className="container" style={{ paddingTop: "150px", minHeight: "60vh", textAlign: "center" }}>
        <h2>Post not found</h2>
        <Link href="/blogs"><Button title="Back to Blogs" /></Link>
      </div>
    );
  }

  const postUrl = typeof window !== 'undefined' ? window.location.href : `https://oxlo.ai/blogs/${post.slug}`;
  const blogImage = getBlogImage(post);

  return (
    <>
      <Head>
        <title>{post.title} | Oxlo.ai Blog</title>
        <meta name="description" content={post.excerpt} />
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={blogImage} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={blogImage} />
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
              {post.source === "pendium" && (
                <span className="category-tag-new source-tag-pendium unbounded-font">AI Generated</span>
              )}
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
                <img src={blogImage} alt={post.title} />
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
                        <img src={getBlogImage(rPost)} alt={rPost.title} loading="lazy" />
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
