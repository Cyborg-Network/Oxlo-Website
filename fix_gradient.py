import re

path = r'd:\Internships\Cyborg network\Serverless Deployment\Oxlo-Website\src\styles\globals.css'

with open(path, 'r', encoding='utf-8') as f:
    css = f.read()

# Update .bottom-cta-section gradient to fade back to the background color at the bottom
css = re.sub(
    r'\.bottom-cta-section \{[\s\S]*?\}',
    r'''.bottom-cta-section {
  padding: 180px 0 160px;
  background: linear-gradient(180deg, var(--bg-body) 0%, rgba(3, 247, 181, 0.08) 50%, var(--bg-body) 100%);
  border: none;
  margin-top: 60px;
}''', css)

with open(path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Gradient updated successfully")
