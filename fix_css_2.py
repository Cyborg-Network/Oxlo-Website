import re

path = r'd:\Internships\Cyborg network\Serverless Deployment\Oxlo-Website\src\styles\globals.css'

with open(path, 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update .bottom-cta-section to remove hard line, blend the background, and add padding
css = re.sub(
    r'\.bottom-cta-section \{[\s\S]*?\}',
    r'''.bottom-cta-section {
  padding: 180px 0 160px;
  background: linear-gradient(180deg, var(--bg-body) 0%, rgba(3, 247, 181, 0.05) 50%, rgba(3, 247, 181, 0.08) 100%);
  border: none;
  margin-top: 60px;
}''', css)

# 2. Add unbounded-font utility class if it doesn't exist, and button styles
new_css = """
/* Font and Buttons utility */
.unbounded-font {
  font-family: var(--Unbounded) !important;
}

.category-btn {
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-light-68);
  font-family: var(--Inter);
  white-space: nowrap;
  padding-bottom: 16px;
  margin-bottom: -17px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
}

.category-btn:hover {
  color: var(--text-light);
}

.active .category-btn {
  color: var(--text-light);
  border-bottom: 2px solid var(--text-green);
}

.no-posts-found {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px;
  color: var(--text-light-68);
  font-size: 18px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
}

.blog-rich-text h2 {
  font-family: var(--Unbounded) !important;
}
"""

if '.unbounded-font' not in css:
    css += '\n' + new_css + '\n'
else:
    # We already have it maybe? Let's just append it anyway to be safe, css will override
    css += '\n' + new_css + '\n'

# Ensure the categories are centered properly and wrapping
css = re.sub(
    r'\.blog-categories \{[\s\S]*?\}',
    r'''.blog-categories {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
  list-style: none;
  padding: 0 0 10px 0;
  margin: 0;
}''', css)

with open(path, 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS updated successfully")
