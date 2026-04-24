import re

path = r'd:\Internships\Cyborg network\Serverless Deployment\Oxlo-Website\src\styles\globals.css'

with open(path, 'r', encoding='utf-8') as f:
    css = f.read()

# Replace #6c5ce7 (Runpod purple) with var(--text-green) (#03F7B5) and correct contrast colors
css = css.replace('border-bottom: 2px solid #6c5ce7;', 'border-bottom: 2px solid var(--text-green);')
css = css.replace('border-left: 4px solid #6c5ce7;', 'border-left: 4px solid var(--text-green);')

# Update btn-get-started-sidebar
css = re.sub(
    r'\.btn-get-started-sidebar \{.*?\n\}',
    r'''.btn-get-started-sidebar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-btn);
  color: var(--bg-btn-dark);
  padding: 12px 24px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 14px;
  font-family: var(--Unbounded);
  margin-top: 16px;
  transition: all 0.2s ease;
  width: fit-content;
  text-decoration: none !important;
}''', css, flags=re.DOTALL)

css = re.sub(
    r'\.btn-get-started-sidebar:hover \{.*?\n\}',
    r'''.btn-get-started-sidebar:hover {
  background: var(--bg-btn-hover);
  transform: translateY(-2px);
}''', css, flags=re.DOTALL)

# Update btn-bottom-cta
css = re.sub(
    r'\.btn-bottom-cta \{.*?\n\}',
    r'''.btn-bottom-cta {
  display: inline-flex;
  align-items: center;
  background: var(--bg-btn);
  color: var(--bg-btn-dark);
  padding: 16px 32px;
  border-radius: 100px;
  font-size: 18px;
  font-family: var(--Unbounded);
  font-weight: 600;
  transition: all 0.2s ease;
  text-decoration: none !important;
}''', css, flags=re.DOTALL)

css = re.sub(
    r'\.btn-bottom-cta:hover \{.*?\n\}',
    r'''.btn-bottom-cta:hover {
  background: var(--bg-btn-hover);
  transform: translateY(-2px);
}''', css, flags=re.DOTALL)

# Update bottom-cta-section gradient
css = re.sub(
    r'\.bottom-cta-section \{[\s\S]*?\}',
    r'''.bottom-cta-section {
  padding: 120px 0;
  background: linear-gradient(180deg, rgba(3, 247, 181, 0.05) 0%, rgba(3, 247, 181, 0.1) 100%);
  border-top: 1px solid rgba(3, 247, 181, 0.2);
}''', css)

# Update hero image height limitation
css = re.sub(
    r'\.blog-hero-image-new img \{[\s\S]*?\}',
    r'''.blog-hero-image-new img {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  display: block;
}''', css)

# Center blog categories
css = re.sub(
    r'\.blog-categories \{[\s\S]*?\}',
    r'''.blog-categories {
  display: flex;
  justify-content: center;
  gap: 32px;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: auto;
}''', css)

# Fix heading and metadata styles for the new layout
new_styles = """
/* New Header Styles */
.blog-post-header-new {
  margin-bottom: 40px;
  text-align: left;
}

.blog-meta-tags-new {
  margin-bottom: 16px;
}

.category-tag-new {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 100px;
  border: 1px solid rgba(3, 247, 181, 0.3);
  color: var(--text-green);
  font-size: 13px;
  font-family: var(--Inter);
  font-weight: 500;
  background: rgba(3, 247, 181, 0.05);
}

.blog-subtitle-new {
  font-size: 20px;
  color: var(--text-light-68);
  line-height: 1.6;
  font-family: var(--Inter);
  max-width: 800px;
  margin-top: 20px;
}
"""

if '.blog-post-header-new' not in css:
    css += '\n' + new_styles + '\n'

with open(path, 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS updated successfully")
