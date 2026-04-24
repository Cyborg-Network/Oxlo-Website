import re

path = r'd:\Internships\Cyborg network\Serverless Deployment\Oxlo-Website\src\styles\globals.css'

with open(path, 'r', encoding='utf-8') as f:
    css = f.read()

# Strip any existing CTA rules to ensure a clean slate
css = re.sub(r'\.bottom-cta-section \{[\s\S]*?\}', '', css)
css = re.sub(r'\.bottom-cta-section h2 \{[\s\S]*?\}', '', css)
css = re.sub(r'\.bottom-cta-section p \{[\s\S]*?\}', '', css)

# Insert the perfectly balanced CSS
perfect_cta_css = """
.bottom-cta-section {
  padding: 120px 0;
  background: linear-gradient(180deg, var(--bg-body) 0%, rgba(3, 247, 181, 0.08) 50%, var(--bg-body) 100%);
  border: none;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.bottom-cta-section h2 {
  margin-top: 0 !important;
  margin-bottom: 24px !important;
}

.bottom-cta-section p {
  margin-top: 0 !important;
  margin-bottom: 32px !important;
}
"""

css += '\n' + perfect_cta_css + '\n'

with open(path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Balanced CTA CSS applied successfully")
