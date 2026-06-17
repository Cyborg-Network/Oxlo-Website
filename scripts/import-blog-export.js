/**
 * Bulk-import blog posts exported from the visibility agent's Postgres
 * into the new Neon DB.
 *
 * Usage: BLOG_DATABASE_URL="postgresql://..." node scripts/import-blog-export.js
 */
const { neon } = require("@neondatabase/serverless");
const posts = require("./blog_export.json");

const DB_URL = process.env.BLOG_DATABASE_URL;
if (!DB_URL) { console.error("Set BLOG_DATABASE_URL"); process.exit(1); }

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

function estimateReadTime(html) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return `${Math.max(1, Math.ceil(text.split(" ").length / 200))} min read`;
}

function extractTOC(html) {
  const toc = [];
  const re = /<h2\s+id="([^"]+)"[^>]*>([^<]+)<\/h2>/gi;
  let m;
  while ((m = re.exec(html)) !== null) toc.push({ id: m[1], title: m[2].trim() });
  return toc;
}

function formatDate(isoStr) {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = new Date(isoStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

async function main() {
  const sql = neon(DB_URL);

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

  let inserted = 0, skipped = 0, failed = 0;

  for (const p of posts) {
    const slug = generateSlug(p.title);
    const date = formatDate(p.created_at);
    const readTime = estimateReadTime(p.content || "");
    const toc = extractTOC(p.content || "");
    const excerpt = p.excerpt || "";

    try {
      await sql`
        INSERT INTO blog_posts (slug, title, category, date, author, role, image, read_time, excerpt, status, source, content, toc, created_at)
        VALUES (${slug}, ${p.title}, ${p.category}, ${date}, 'Team Oxlo.ai', ${p.category}, '', ${readTime}, ${excerpt}, 'published', 'team', ${p.content}, ${JSON.stringify(toc)}::jsonb, ${p.created_at}::timestamptz)
        ON CONFLICT (slug) DO NOTHING
      `;
      inserted++;
      if (inserted % 25 === 0) console.log(`  ... ${inserted} inserted`);
    } catch (e) {
      if (e.message && e.message.includes("duplicate")) { skipped++; }
      else { failed++; console.error(`  FAIL "${p.title.slice(0,50)}": ${e.message}`); }
    }
  }

  console.log(`\nDone! ${inserted} inserted, ${skipped} skipped (duplicate), ${failed} failed.`);
}

main().catch(e => { console.error(e); process.exit(1); });
