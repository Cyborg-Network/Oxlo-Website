/**
 * Blog storage backed by Neon Postgres (serverless driver).
 *
 * Why this exists: the blog used to read/write src/data/blogPosts.json with `fs`.
 * That works locally but not on Vercel (read-only, ephemeral filesystem), so
 * API-posted blogs did not persist. This module stores posts in a dedicated
 * `blog_posts` table in Neon, which both the API route and the SSR pages use.
 *
 * Requires env var BLOG_DATABASE_URL (a Neon connection string).
 * The Neon HTTP driver is serverless-friendly (no connection-pool exhaustion).
 */
import { neon } from "@neondatabase/serverless";

// Lazily create the client so importing this module never throws at build time
// (the connection string is only required when a query actually runs).
let _sql = null;
function db() {
  if (!_sql) {
    if (!process.env.BLOG_DATABASE_URL) {
      throw new Error("BLOG_DATABASE_URL is not set");
    }
    _sql = neon(process.env.BLOG_DATABASE_URL);
  }
  return _sql;
}

let _schemaReady = false;

async function ensureSchema() {
  if (_schemaReady) return;
  const sql = db();
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
  _schemaReady = true;
}

// DB row (snake_case) -> the shape the rest of the app already expects (camelCase).
function mapRow(r) {
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    date: r.date,
    author: r.author,
    role: r.role,
    image: r.image,
    readTime: r.read_time,
    excerpt: r.excerpt,
    status: r.status,
    source: r.source,
    content: r.content,
    toc: r.toc || [],
  };
}

/** All posts (any status), newest first. Used by the API for duplicate checks. */
export async function getAllPosts() {
  await ensureSchema();
  const sql = db();
  const rows = await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`;
  return rows.map(mapRow);
}

/** Published posts, newest first. */
export async function getPublishedPosts() {
  await ensureSchema();
  const sql = db();
  const rows = await sql`
    SELECT * FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC
  `;
  return rows.map(mapRow);
}

/** A single published post by slug, or null. */
export async function getPostBySlug(slug) {
  await ensureSchema();
  const sql = db();
  const rows = await sql`
    SELECT * FROM blog_posts WHERE slug = ${slug} AND status = 'published' LIMIT 1
  `;
  return rows.length ? mapRow(rows[0]) : null;
}

/** True if a post with this slug already exists (any status). */
export async function slugExists(slug) {
  await ensureSchema();
  const sql = db();
  const rows = await sql`SELECT 1 FROM blog_posts WHERE slug = ${slug} LIMIT 1`;
  return rows.length > 0;
}

/** Insert a post. Caller must build the full post object. Returns the stored row. */
export async function addPost(post) {
  await ensureSchema();
  const sql = db();
  const rows = await sql`
    INSERT INTO blog_posts
      (slug, title, category, date, author, role, image, read_time,
       excerpt, status, source, content, toc)
    VALUES
      (${post.slug}, ${post.title}, ${post.category}, ${post.date}, ${post.author},
       ${post.role}, ${post.image}, ${post.readTime}, ${post.excerpt}, ${post.status},
       ${post.source}, ${post.content}, ${JSON.stringify(post.toc || [])}::jsonb)
    RETURNING *
  `;
  return mapRow(rows[0]);
}
