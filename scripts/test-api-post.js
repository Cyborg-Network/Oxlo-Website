// Test script: create a blog post via the API
const data = {
  title: "Oxlo vs Together AI: A Complete Cost Comparison for 2026",
  category: "Cost Optimization",
  content: `<p>If you are evaluating LLM inference providers, the pricing model matters more than you think. In this comparison, we break down the real costs of running production workloads on Together AI versus Oxlo.ai.</p>
<h2 id="pricing-models">Two Fundamentally Different Pricing Models</h2>
<p>Together AI charges per token — both input and output. This means your costs scale with prompt length and response size. Oxlo.ai charges per request, regardless of token count. For long-context workloads like RAG pipelines, document analysis, or agentic loops, this difference is massive.</p>
<h2 id="cost-example">Real Cost Example</h2>
<p>Running 1,000 API calls with a 3,000-token prompt on Llama 3.3 70B:</p>
<ul>
<li><strong>Together AI:</strong> Approximately USD 4.20 (at USD 0.88 per million input tokens)</li>
<li><strong>Oxlo.ai:</strong> Approximately USD 1.50 (flat per-request pricing)</li>
</ul>
<p>That is a 64% cost reduction on this workload alone. For teams running millions of requests monthly, the savings compound significantly.</p>
<h2 id="migration">Switch in 60 Seconds</h2>
<p>Oxlo.ai is fully OpenAI SDK compatible. Migration is a one-line change. Just swap the base URL and start saving.</p>`,
  source: "pendium",
  status: "published"
};

fetch("http://localhost:3000/api/blog-posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "oxlo_blog_2026_secret_key"
  },
  body: JSON.stringify(data)
})
  .then(r => r.json())
  .then(d => console.log(JSON.stringify(d, null, 2)))
  .catch(e => console.error("Error:", e.message));
