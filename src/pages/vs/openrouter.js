import VsPageTemplate from "@/components/VsPageTemplate"

export default function OpenRouterPage() {
  const tldr = "OpenRouter essentially aggregates APIs from multiple providers, operating as an inference router. They charge per-token, passing along provider costs plus their margin. Oxlo.ai is fundamentally different - we host the inference hardware ourselves (like A100s and L40s) and offer a Request-Based API. This means Oxlo can offer flat-rate pricing ($350/mo for 5000 requests per day) that simply does not exist on aggregator platforms."

  const cost_table = [
    { workload: "1,000 requests (3,000 tokens/req on Llama 3 70B)", competitor: "$2.70", oxlo: "$0.00 (Flat Daily Rate)", savings: "~$81/mo" },
    { workload: "10,000 requests (8,000 tokens/req on Llama 3 70B)", competitor: "$72.00", oxlo: "$0.00 (Flat Daily Rate)", savings: "~$2,100/mo" },
    { workload: "50,000 requests (15,000 tokens/req on DeepSeek V3)", competitor: "$675.00", oxlo: "$0.00 (Flat Daily Rate)", savings: "~$20,000/mo" },
  ]

  const faqs = [
    {
      question: "Is Oxlo.ai an OpenRouter alternative?",
      answer: "Yes, Oxlo.ai is a drop-in replacement alternative for users looking to switch from token-based aggregators to a fixed-price inference endpoint."
    },
    {
      question: "Why should I switch from OpenRouter?",
      answer: "Aggregators inherently carry variable billing. As your AI product scales, token bills compound dramatically - especially for heavy context (RAG) prompts. By switching to Oxlo's request-based pricing, your costs become completely fixed and predictable."
    },
    {
      question: "Can I use OpenAI SDK to migrate?",
      answer: "Absolutely. Oxlo.ai supports 100% standard OpenAI API structures. Update the base API URL and your integration will continue seamlessly."
    }
  ]

  const faq_schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <VsPageTemplate
      competitorName="OpenRouter"
      slug="openrouter"
      tldr={tldr}
      author_name="Oxlo.ai Engineering team"
      meta_title="OpenRouter Alternative: Oxlo.ai vs OpenRouter Comparison"
      meta_description="Evaluate the best OpenRouter alternative for LLM inference. Compare token aggregation pipelines versus Oxlo's flat-rate request pricing."
      cost_table={cost_table}
      faq_schema={faq_schema}
      faqs={faqs}
      timestamp="March 2026"
    />
  )
}
