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

const CACHE_TTL = 5 * 60 * 1000;
const cache = new Map();

function cacheGet(key) {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (Date.now() - entry.ts > CACHE_TTL) {
    cache.delete(key);
    return undefined;
  }
  return entry.data;
}

function cacheSet(key, data) {
  cache.set(key, { data, ts: Date.now() });
}

function cacheInvalidate() {
  cache.clear();
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

export async function getAllPosts() {
  const cached = cacheGet("all");
  if (cached) return cached;
  const sql = db();
  const rows = await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`;
  const result = rows.map(mapRow);
  cacheSet("all", result);
  return result;
}

export async function getPublishedPosts({ listingOnly = false } = {}) {
  const key = listingOnly ? "published_listing" : "published_full";
  const cached = cacheGet(key);
  if (cached) return cached;
  const sql = db();
  const rows = listingOnly
    ? await sql`
        SELECT slug, title, category, date, author, role, image, read_time, excerpt, status, source
        FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC
      `
    : await sql`
        SELECT * FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC
      `;
  const result = rows.map(mapRow);
  cacheSet(key, result);
  return result;
}

export async function getPostBySlug(slug) {
  const key = `slug:${slug}`;
  const cached = cacheGet(key);
  if (cached) return cached;
  const sql = db();
  const rows = await sql`
    SELECT * FROM blog_posts WHERE slug = ${slug} AND status = 'published' LIMIT 1
  `;
  const result = rows.length ? mapRow(rows[0]) : null;
  if (result) cacheSet(key, result);
  return result;
}

export async function slugExists(slug) {
  const sql = db();
  const rows = await sql`SELECT 1 FROM blog_posts WHERE slug = ${slug} LIMIT 1`;
  return rows.length > 0;
}

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
  cacheInvalidate();
  return mapRow(rows[0]);
}
