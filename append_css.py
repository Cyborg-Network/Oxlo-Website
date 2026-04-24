import os

css = """
/* ── Runpod-Inspired Blog Layout Updates ────────────────── */
.blogs-hero-section {
  padding: 180px 0 60px;
  background: var(--bg-body);
  position: relative;
}

.blog-tagline {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 14px;
  color: var(--text-light-75);
  margin-bottom: 24px;
  font-family: var(--Inter);
}

.blogs-directory-section {
  padding-bottom: 120px;
}

.blog-categories-wrapper {
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 16px;
}

.blog-categories {
  display: flex;
  gap: 32px;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: auto;
}

.blog-categories li a {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-light-68);
  text-decoration: none;
  font-family: var(--Inter);
  white-space: nowrap;
  padding-bottom: 16px;
  margin-bottom: -17px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.blog-categories li:hover a {
  color: var(--text-light);
}

.blog-categories li.active a {
  color: var(--text-light);
  border-bottom: 2px solid #6c5ce7;
}

/* Blog Grid New */
.blogs-grid-new {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.blog-card-link-new {
  text-decoration: none;
  color: inherit;
  display: block;
}

.blog-card-new {
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.2s ease;
}

.blog-card-new:hover {
  transform: translateY(-4px);
}

.blog-card-image-new {
  width: 100%;
  aspect-ratio: 16/10;
  border-radius: 12px;
  overflow: hidden;
  background: #111;
}

.blog-card-image-new img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card-new:hover .blog-card-image-new img {
  transform: scale(1.05);
}

.blog-card-content-new {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.blog-meta-new {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-light-68);
  font-family: var(--Inter);
}

.blog-title-new {
  font-size: 20px;
  font-family: var(--Inter);
  font-weight: 600;
  color: var(--text-light);
  line-height: 1.4;
  margin: 0;
}

.blog-excerpt-new {
  font-size: 14px;
  color: var(--text-light-68);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Two Column Blog Layout */
.blog-post-wrapper {
  padding-top: 140px;
  background: var(--bg-body);
}

.blog-back-nav {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-light-68);
  font-size: 14px;
  margin-bottom: 40px;
  transition: color 0.2s;
}

.blog-back-nav:hover {
  color: var(--text-light);
}

.blog-two-column-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 60px;
  align-items: start;
}

/* Sticky Sidebar */
.blog-sidebar {
  position: sticky;
  top: 100px;
}

.sticky-wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-label {
  font-size: 13px;
  color: var(--text-light-48);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sidebar-value {
  font-size: 15px;
  color: var(--text-light);
}

.flex-align {
  display: flex;
  align-items: center;
}

.mr-2 { margin-right: 8px; }
.ml-2 { margin-left: 8px; }

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toc-list li a {
  font-size: 14px;
  color: var(--text-light-68);
  transition: color 0.2s;
}

.toc-list li a:hover {
  color: var(--text-light);
}

.social-icons {
  display: flex;
  gap: 16px;
  margin-top: 4px;
}

.social-icons a {
  color: var(--text-light-68);
  transition: color 0.2s;
}

.social-icons a:hover {
  color: var(--text-light);
}

.btn-get-started-sidebar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #6c5ce7;
  color: white;
  padding: 12px 24px;
  border-radius: 100px;
  font-weight: 500;
  font-size: 14px;
  margin-top: 16px;
  transition: background 0.2s;
  width: fit-content;
  text-decoration: none !important;
}

.btn-get-started-sidebar:hover {
  background: #5b4cc4;
}

/* Main Content */
.blog-main-title {
  font-size: 48px;
  line-height: 1.2;
  font-family: var(--Inter);
  font-weight: 700;
  margin-bottom: 40px;
  margin-top: 0;
}

.blog-hero-image-new {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 60px;
}

.blog-hero-image-new img {
  width: 100%;
  height: auto;
  display: block;
}

.blog-rich-text {
  font-size: 18px;
  line-height: 1.8;
  color: var(--text-light-87);
}

.blog-rich-text h2 {
  font-size: 28px;
  margin: 48px 0 24px;
  font-family: var(--Inter);
  font-weight: 600;
  color: var(--text-light);
}

.blog-rich-text p {
  margin-bottom: 24px;
}

.blog-rich-text ul {
  margin-bottom: 24px;
  padding-left: 24px;
}

.blog-rich-text li {
  margin-bottom: 12px;
}

.blog-rich-text blockquote {
  border-left: 4px solid #6c5ce7;
  padding-left: 24px;
  margin: 40px 0;
  font-size: 22px;
  font-style: italic;
  color: var(--text-light);
}

.blog-rich-text .code-block {
  background: #111;
  padding: 24px;
  border-radius: 8px;
  margin: 32px 0;
  font-family: monospace;
  font-size: 14px;
  overflow-x: auto;
  border: 1px solid rgba(255,255,255,0.1);
}

/* Related Articles */
.related-articles-section {
  padding: 100px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 100px;
}

.related-articles-section h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 40px;
}

/* Bottom CTA */
.bottom-cta-section {
  padding: 120px 0;
  background: linear-gradient(180deg, rgba(108, 92, 231, 0.05) 0%, rgba(108, 92, 231, 0.1) 100%);
  border-top: 1px solid rgba(108, 92, 231, 0.2);
}

.bottom-cta-section h2 {
  font-size: 40px;
  font-family: var(--Inter);
  font-weight: 700;
  margin-bottom: 16px;
}

.bottom-cta-section p {
  font-size: 18px;
  color: var(--text-light-68);
  margin-bottom: 40px;
}

.btn-bottom-cta {
  display: inline-flex;
  align-items: center;
  background: #6c5ce7;
  color: white;
  padding: 16px 32px;
  border-radius: 100px;
  font-size: 18px;
  font-weight: 500;
  transition: background 0.2s;
  text-decoration: none !important;
}

.btn-bottom-cta:hover {
  background: #5b4cc4;
}

/* Responsive Layout */
@media (max-width: 992px) {
  .blog-two-column-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .blog-sidebar {
    position: static;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 40px;
    margin-bottom: 20px;
  }

  .sticky-wrapper {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 40px;
  }

  .blogs-grid-new {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .blogs-grid-new {
    grid-template-columns: 1fr;
  }
  
  .blog-main-title {
    font-size: 36px;
  }
}
"""

with open(r'd:\Internships\Cyborg network\Serverless Deployment\Oxlo-Website\src\styles\globals.css', 'a', encoding='utf-8') as f:
    f.write('\n' + css + '\n')
