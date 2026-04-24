import os

path = r"d:\Internships\Cyborg network\Serverless Deployment\Oxlo-Website\src\pages\blogs\[slug].js"

with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# Replace escaped backticks and dollar signs
c = c.replace(r'{\`/blogs/\${rPost.slug}\`}', '{`/blogs/${rPost.slug}`}')
c = c.replace(r'\`https://oxlo.ai/blogs/\${slug}\`', '`https://oxlo.ai/blogs/${slug}`')
c = c.replace(r'{\`#\${item.id}\`}', '{`#${item.id}`}')
c = c.replace(r'{\`https://www.facebook.com/sharer/sharer.php?u=\${encodeURIComponent(postUrl)}\`}', '{`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}')
c = c.replace(r'{\`https://twitter.com/intent/tweet?text=\${encodeURIComponent(post.title)}&url=\${encodeURIComponent(postUrl)}\`}', '{`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}')
c = c.replace(r'{\`https://www.linkedin.com/sharing/share-offsite/?url=\${encodeURIComponent(postUrl)}\`}', '{`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}')

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("Fixed [slug].js syntax errors")
