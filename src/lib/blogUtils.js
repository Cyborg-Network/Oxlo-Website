/**
 * Default category-based blog images
 * Used when a blog post doesn't have a custom image (e.g., Pendium-generated posts)
 */

const CATEGORY_DEFAULT_IMAGES = {
  "Engineering": "/images/blogs/default-engineering.png",
  "Product": "/images/blogs/default-product.png",
  "AI Infrastructure": "/images/blogs/default-ai-infra.png",
  "Learn AI": "/images/blogs/default-learn-ai.png",
  "Hardware & Trends": "/images/blogs/default-hardware.png",
  "Cost Optimization": "/images/blogs/default-cost.png",
};

// Fallback image if category doesn't match any known category
const FALLBACK_IMAGE = "/images/blogs/default-blog.png";

/**
 * Returns the blog image for a post.
 * If the post has a custom image, use it. Otherwise, use the category default.
 * @param {object} post - Blog post object with image and category fields
 * @returns {string} Image path
 */
export function getBlogImage(post) {
  if (post.image && post.image.trim() !== "") {
    return post.image;
  }
  return CATEGORY_DEFAULT_IMAGES[post.category] || FALLBACK_IMAGE;
}

/**
 * Returns only published posts from the blog data, sorted by date descending.
 * @param {Array} posts - All blog posts from JSON
 * @returns {Array} Published posts sorted newest first
 */
export function getPublishedPosts(posts) {
  return posts
    .filter(post => post.status === "published")
    .sort((a, b) => {
      // Parse dates like "15 April 2026" into comparable dates
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA; // newest first
    });
}

export { CATEGORY_DEFAULT_IMAGES, FALLBACK_IMAGE };
