/**
 * Blog Posts API — Public READ + Protected WRITE
 * 
 * GET  /api/blog-posts              → All published posts
 * GET  /api/blog-posts?slug=xxx     → Single post
 * POST /api/blog-posts              → Create new post (requires API key)
 * 
 * For POST, send:
 *   Header: x-api-key: <your-secret-key>
 *   Body: { title, category, content, author?, excerpt?, image?, status? }
 * 
 * The post is saved to blogPosts.json and immediately available.
 */

import fs from "fs";
import path from "path";

const BLOG_DATA_PATH = path.join(process.cwd(), "src", "data", "blogPosts.json");

// API key for write operations — set this in .env.local as BLOG_API_KEY
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
    "July", "August", "September", "October", "November", "December"
  ];
  const now = new Date();
  return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

function readPosts() {
  try {
    const raw = fs.readFileSync(BLOG_DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writePosts(posts) {
  fs.writeFileSync(BLOG_DATA_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

export default function handler(req, res) {
  // CORS headers for external access
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ========== GET: Public read ==========
  if (req.method === "GET") {
    const posts = readPosts();
    const { slug, category } = req.query;

    if (slug) {
      const post = posts.find(p => p.slug === slug && p.status === "published");
      if (!post) return res.status(404).json({ error: "Post not found" });
      return res.status(200).json({ success: true, post });
    }

    let filtered = posts.filter(p => p.status === "published");
    if (category && category !== "All") {
      filtered = filtered.filter(p => p.category === category);
    }
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    const listing = filtered.map(({ content, toc, ...rest }) => rest);

    return res.status(200).json({ success: true, count: listing.length, posts: listing });
  }

  // ========== POST: Create new blog post (protected) ==========
  if (req.method === "POST") {
    // Auth check
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== BLOG_API_KEY) {
      return res.status(401).json({ 
        error: "Unauthorized. Include header: x-api-key: <your-key>",
        hint: "Set BLOG_API_KEY in .env.local"
      });
    }

    const { title, category, content, author, excerpt, image, status, source } = req.body;

    // Validation
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
    const posts = readPosts();

    // Check for duplicate
    if (posts.some(p => p.slug === slug)) {
      return res.status(409).json({ error: `Post with slug "${slug}" already exists` });
    }

    // Auto-generate excerpt from first paragraph
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
      status: status || "published",  // Default to published for API posts
      source: source || "pendium",
      content: content.trim(),
      toc: extractTOC(content)
    };

    posts.push(newPost);
    writePosts(posts);

    return res.status(201).json({
      success: true,
      message: `Blog post "${title}" created successfully!`,
      post: {
        slug: newPost.slug,
        title: newPost.title,
        category: newPost.category,
        status: newPost.status,
        readTime: newPost.readTime,
        url: `/blogs/${newPost.slug}`
      }
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
