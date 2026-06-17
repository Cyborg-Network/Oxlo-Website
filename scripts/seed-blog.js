/**
 * Seed the new Neon DB with the 2 original blog posts from blogPosts.json.
 *
 * Usage: BLOG_DATABASE_URL="postgresql://..." node scripts/seed-blog.js
 */
const { neon } = require("@neondatabase/serverless");
const posts = require("../src/data/blogPosts.json");

const DB_URL = process.env.BLOG_DATABASE_URL;
if (!DB_URL) {
  console.error("Set BLOG_DATABASE_URL env var first");
  process.exit(1);
}

async function main() {
  const sql = neon(DB_URL);

  console.log("Creating table if not exists...");
  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      slug        TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      category    TEXT NOT NULL,
      date        TEXT NOT NULL,
      author      TEXT,
      role        TEXT,
      image       TEXT,
      read_time   TEXT,
      excerpt     TEXT,
      status      TEXT NOT NULL DEFAULT 'published',
      source      TEXT,
      content     TEXT,
      toc         JSONB NOT NULL DEFAULT '[]'::jsonb,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  console.log(`Inserting ${posts.length} posts...`);
  for (const p of posts) {
    try {
      await sql`
        INSERT INTO blog_posts (slug, title, category, date, author, role, image, read_time, excerpt, status, source, content, toc)
        VALUES (${p.slug}, ${p.title}, ${p.category}, ${p.date}, ${p.author}, ${p.role}, ${p.image}, ${p.readTime}, ${p.excerpt}, ${p.status || "published"}, ${p.source || "manual"}, ${p.content}, ${JSON.stringify(p.toc || [])}::jsonb)
        ON CONFLICT (slug) DO NOTHING
      `;
      console.log(`  + ${p.slug}`);
    } catch (e) {
      console.error(`  FAIL ${p.slug}: ${e.message}`);
    }
  }

  console.log("Done! Blog posts seeded.");
}

main().catch(e => { console.error(e); process.exit(1); });
