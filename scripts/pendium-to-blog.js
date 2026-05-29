#!/usr/bin/env node

/**
 * Pendium-to-Blog Converter
 * 
 * This script takes content from Pendium (via MCP, API, or manual paste) and
 * formats it into the Oxlo blog JSON structure, then appends it to blogPosts.json.
 * 
 * Usage:
 *   node scripts/pendium-to-blog.js --title "My Blog Title" --category "Engineering" --content-file ./draft.html
 *   node scripts/pendium-to-blog.js --title "My Blog Title" --category "Product" --content "HTML content here"
 *   node scripts/pendium-to-blog.js --interactive (prompts for all fields)
 * 
 * The post is added with status: "draft" by default.
 * Change status to "published" in blogPosts.json when ready to go live.
 */

const fs = require("fs");
const path = require("path");

const BLOG_DATA_PATH = path.join(__dirname, "..", "src", "data", "blogPosts.json");

// Default images per category
const CATEGORY_DEFAULTS = {
  "Engineering": "/images/blogs/default-engineering.png",
  "Product": "/images/blogs/default-product.png",
  "AI Infrastructure": "/images/blogs/default-ai-infra.png",
  "Learn AI": "/images/blogs/default-learn-ai.png",
  "Hardware & Trends": "/images/blogs/default-hardware.png",
  "Cost Optimization": "/images/blogs/default-cost.png",
};

const VALID_CATEGORIES = Object.keys(CATEGORY_DEFAULTS);

/**
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Estimate read time from HTML content
 */
function estimateReadTime(htmlContent) {
  // Strip HTML tags and count words
  const text = htmlContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = text.split(" ").length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200)); // ~200 words per minute
  return `${minutes} min read`;
}

/**
 * Extract table of contents from HTML h2 headings
 */
function extractTOC(htmlContent) {
  const toc = [];
  const h2Regex = /<h2\s+id="([^"]+)"[^>]*>([^<]+)<\/h2>/gi;
  let match;

  while ((match = h2Regex.exec(htmlContent)) !== null) {
    toc.push({
      id: match[1],
      title: match[2].trim()
    });
  }

  return toc;
}

/**
 * Format the current date as "DD Month YYYY"
 */
function formatDate() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const now = new Date();
  return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

/**
 * Create a new blog post entry
 */
function createBlogPost({
  title,
  category,
  content,
  author = "Team Oxlo.ai",
  role = "",
  image = "",
  excerpt = "",
  status = "draft",
  source = "pendium"
}) {
  const slug = generateSlug(title);
  const readTime = estimateReadTime(content);
  const toc = extractTOC(content);

  // Auto-generate excerpt from first paragraph if not provided
  if (!excerpt) {
    const firstP = content.match(/<p>([^<]+)<\/p>/);
    if (firstP) {
      excerpt = firstP[1].substring(0, 200);
      if (firstP[1].length > 200) excerpt += "...";
    }
  }

  // Use category default image if none provided
  if (!image) {
    image = CATEGORY_DEFAULTS[category] || "/images/blogs/default-blog.png";
  }

  // Auto-assign role from category if not provided
  if (!role) {
    role = category;
  }

  return {
    slug,
    title,
    category,
    date: formatDate(),
    author,
    role,
    image,
    readTime,
    excerpt,
    status,
    source,
    content,
    toc
  };
}

/**
 * Add a new post to blogPosts.json
 */
function addPostToJSON(post) {
  let posts = [];

  try {
    const raw = fs.readFileSync(BLOG_DATA_PATH, "utf-8");
    posts = JSON.parse(raw);
  } catch (err) {
    console.error("Error reading blogPosts.json:", err.message);
    process.exit(1);
  }

  // Check for duplicate slugs
  if (posts.some(p => p.slug === post.slug)) {
    console.error(`\n❌ Error: A post with slug "${post.slug}" already exists.`);
    console.error("   Please use a different title or edit the existing post.\n");
    process.exit(1);
  }

  posts.push(post);

  try {
    fs.writeFileSync(BLOG_DATA_PATH, JSON.stringify(posts, null, 2), "utf-8");
    console.log(`\n✅ Blog post added successfully!`);
    console.log(`   Title:    ${post.title}`);
    console.log(`   Slug:     ${post.slug}`);
    console.log(`   Category: ${post.category}`);
    console.log(`   Status:   ${post.status}`);
    console.log(`   Source:   ${post.source}`);
    console.log(`   ReadTime: ${post.readTime}`);
    console.log(`   TOC:      ${post.toc.length} headings`);
    console.log(`\n📝 Post added as "${post.status}". Edit blogPosts.json to change status to "published" when ready.\n`);
  } catch (err) {
    console.error("Error writing to blogPosts.json:", err.message);
    process.exit(1);
  }
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--title" && args[i + 1]) {
      parsed.title = args[++i];
    } else if (args[i] === "--category" && args[i + 1]) {
      parsed.category = args[++i];
    } else if (args[i] === "--content" && args[i + 1]) {
      parsed.content = args[++i];
    } else if (args[i] === "--content-file" && args[i + 1]) {
      const filePath = args[++i];
      try {
        parsed.content = fs.readFileSync(filePath, "utf-8");
      } catch (err) {
        console.error(`Error reading content file: ${err.message}`);
        process.exit(1);
      }
    } else if (args[i] === "--author" && args[i + 1]) {
      parsed.author = args[++i];
    } else if (args[i] === "--excerpt" && args[i + 1]) {
      parsed.excerpt = args[++i];
    } else if (args[i] === "--image" && args[i + 1]) {
      parsed.image = args[++i];
    } else if (args[i] === "--published") {
      parsed.status = "published";
    } else if (args[i] === "--source" && args[i + 1]) {
      parsed.source = args[++i];
    } else if (args[i] === "--help") {
      console.log(`
Pendium-to-Blog Converter — Add blog posts to Oxlo's blogPosts.json

Usage:
  node scripts/pendium-to-blog.js --title "Title" --category "Category" --content "<p>HTML</p>"
  node scripts/pendium-to-blog.js --title "Title" --category "Category" --content-file ./draft.html

Options:
  --title         (required) Blog post title
  --category      (required) One of: ${VALID_CATEGORIES.join(", ")}
  --content       HTML content as a string
  --content-file  Path to an HTML file with the content
  --author        Author name (default: "Team Oxlo.ai")
  --excerpt       Custom excerpt (auto-generated from first paragraph if omitted)
  --image         Custom image path (category default used if omitted)
  --published     Set status to "published" instead of "draft"
  --source        Content source (default: "pendium")
  --help          Show this help message
      `);
      process.exit(0);
    }
  }

  return parsed;
}

// Main execution
const args = parseArgs();

if (!args.title) {
  console.error("❌ Missing required argument: --title");
  console.error("   Run with --help for usage information.");
  process.exit(1);
}

if (!args.category || !VALID_CATEGORIES.includes(args.category)) {
  console.error(`❌ Invalid or missing category. Must be one of: ${VALID_CATEGORIES.join(", ")}`);
  process.exit(1);
}

if (!args.content) {
  console.error("❌ Missing content. Use --content or --content-file.");
  process.exit(1);
}

const post = createBlogPost(args);
addPostToJSON(post);
