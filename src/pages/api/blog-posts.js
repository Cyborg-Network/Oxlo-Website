/**
 * Blog Posts API — Public READ + Protected WRITE (backed by Neon Postgres)
 *
 * GET  /api/blog-posts              → All published posts
 * GET  /api/blog-posts?slug=xxx     → Single post
 * POST /api/blog-posts              → Create new post (requires API key)
 *
 * For POST, send:
 *   Header: x-api-key: <your-secret-key>
 *   Body: { title, category, content, author?, excerpt?, image?, status?, source? }
 *
 * Posts are stored in the `blog_posts` table in Neon (see src/lib/blogStore.js),
 * so writes persist on Vercel's read-only/ephemeral filesystem.
 */
import {
  getPublishedPosts,
  getPostBySlug,
  slugExists,
  addPost,
} from "@/lib/blogStore";

// API key for write operations — set this in env as BLOG_API_KEY
const BLOG_API_KEY = process.env.BLOG_API_KEY || "oxlo_blog_secret_key_change_me";

const CATEGORY_DEFAULTS = {
  "Engineering": "/images/blogs/default-engineering.png",
  "Product": "/images/blogs/default-product.png",
  "AI Infrastructure": "/images/blogs/default-ai-infra.png",
  "Learn AI": "/images/blogs/default-learn-ai.png",
  "Hardware & Trends": "/images/blogs/default-hardware.png",
  "Cost Optimization": "/images/blogs/default-cost.png",
};

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function estimateReadTime(htmlContent) {
  const text = htmlContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = text.split(" ").length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

function extractTOC(htmlContent) {
  const toc = [];
  const h2Regex = /<h2\s+id="([^"]+)"[^>]*>([^<]+)<\/h2>/gi;
  let match;
  while ((match = h2Regex.exec(htmlContent)) !== null) {
    toc.push({ id: match[1], title: match[2].trim() });
  }
  return toc;
}

function formatDate() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const now = new Date();
  return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

export default async function handler(req, res) {
  // CORS headers for external access
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // ========== GET: Public read ==========
    if (req.method === "GET") {
      const { slug, category } = req.query;

      if (slug) {
        const post = await getPostBySlug(slug);
        if (!post) return res.status(404).json({ error: "Post not found" });
        return res.status(200).json({ success: true, post });
      }

      let published = await getPublishedPosts({ listingOnly: !slug });
      if (category && category !== "All") {
        published = published.filter((p) => p.category === category);
      }
      const listing = published.map(({ content, toc, ...rest }) => rest);

      return res.status(200).json({ success: true, count: listing.length, posts: listing });
    }

    // ========== POST: Create new blog post (protected) ==========
    if (req.method === "POST") {
      const apiKey = req.headers["x-api-key"];
      if (!apiKey || apiKey !== BLOG_API_KEY) {
        return res.status(401).json({
          error: "Unauthorized. Include header: x-api-key: <your-key>",
          hint: "Set BLOG_API_KEY in env",
        });
      }

      const { title, category, content, author, excerpt, image, status, source } = req.body;

      if (!title || !title.trim()) {
        return res.status(400).json({ error: "Missing required field: title" });
      }
      if (!category || !category.trim()) {
        return res.status(400).json({ error: "Missing required field: category" });
      }
      if (!content || !content.trim()) {
        return res.status(400).json({ error: "Missing required field: content" });
      }

      const slug = generateSlug(title);

      if (await slugExists(slug)) {
        return res.status(409).json({ error: `Post with slug "${slug}" already exists` });
      }

      // Auto-generate excerpt from first paragraph if none provided
      let finalExcerpt = excerpt || "";
      if (!finalExcerpt) {
        const firstP = content.match(/<p>([^<]+)<\/p>/);
        if (firstP) {
          finalExcerpt = firstP[1].substring(0, 200);
          if (firstP[1].length > 200) finalExcerpt += "...";
        }
      }

      const newPost = {
        slug,
        title: title.trim(),
        category: category.trim(),
        date: formatDate(),
        author: author || "Team Oxlo.ai",
        role: category.trim(),
        image: image || CATEGORY_DEFAULTS[category] || "/images/blogs/default-blog.png",
        readTime: estimateReadTime(content),
        excerpt: finalExcerpt,
        status: status || "published",
        source: source || "team",
        content: content.trim(),
        toc: extractTOC(content),
      };

      await addPost(newPost);

      return res.status(201).json({
        success: true,
        message: `Blog post "${title}" created successfully!`,
        post: {
          slug: newPost.slug,
          title: newPost.title,
          category: newPost.category,
          status: newPost.status,
          readTime: newPost.readTime,
          url: `/blogs/${newPost.slug}`,
        },
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("blog-posts API error:", err);
    return res.status(500).json({ error: "Internal error", detail: String(err?.message || err) });
  }
}
