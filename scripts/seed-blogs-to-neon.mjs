/**
 * One-time migration: copy existing posts from src/data/blogPosts.json into Neon.
 * Idempotent (ON CONFLICT DO NOTHING), so it is safe to re-run.
 *
 * Usage (PowerShell):
 *   $env:BLOG_DATABASE_URL="postgresql://...neon..."; node scripts/seed-blogs-to-neon.mjs
 * Usage (bash):
 *   BLOG_DATABASE_URL="postgresql://...neon..." node scripts/seed-blogs-to-neon.mjs
 */
import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";

const url = process.env.BLOG_DATABASE_URL;
if (!url) {
  console.error("BLOG_DATABASE_URL is not set. Aborting.");
  process.exit(1);
}
const sql = neon(url);

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

const file = path.join(process.cwd(), "src", "data", "blogPosts.json");
const posts = JSON.parse(fs.readFileSync(file, "utf-8"));

let inserted = 0;
for (const p of posts) {
  const res = await sql`
    INSERT INTO blog_posts
      (slug, title, category, date, author, role, image, read_time,
       excerpt, status, source, content, toc)
    VALUES
      (${p.slug}, ${p.title}, ${p.category}, ${p.date}, ${p.author || "Team Oxlo.ai"},
       ${p.role || p.category}, ${p.image || ""}, ${p.readTime || ""}, ${p.excerpt || ""},
       ${p.status || "published"}, ${p.source || "team"}, ${p.content || ""},
       ${JSON.stringify(p.toc || [])}::jsonb)
    ON CONFLICT (slug) DO NOTHING
    RETURNING slug
  `;
  if (res.length) inserted++;
}

console.log(`Seeded ${inserted} new of ${posts.length} posts into Neon (existing slugs skipped).`);
