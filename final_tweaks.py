import re

path = r'd:\Internships\Cyborg network\Serverless Deployment\Oxlo-Website\src\styles\globals.css'

with open(path, 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Increase the bottom padding of the CTA section slightly to visually balance the gap
css = re.sub(
    r'\.bottom-cta-section \{[\s\S]*?align-items: center;\n  text-align: center;\n\}',
    r'''.bottom-cta-section {
  padding: 120px 0 160px;
  background: linear-gradient(180deg, var(--bg-body) 0%, rgba(3, 247, 181, 0.08) 50%, var(--bg-body) 100%);
  border: none;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}''', css)

# 2. Reduce the size of the get started button
css = re.sub(
    r'\.btn-bottom-cta \{[\s\S]*?\}',
    r'''.btn-bottom-cta {
  display: inline-flex;
  align-items: center;
  background: var(--bg-btn);
  color: var(--bg-btn-dark);
  padding: 12px 28px;
  border-radius: 100px;
  font-size: 16px;
  font-family: var(--Unbounded);
  font-weight: 600;
  transition: all 0.2s ease;
  text-decoration: none !important;
}''', css)

with open(path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Final tweaks applied successfully")
