import VsPageTemplate from "@/components/VsPageTemplate"
import { useGeoLocation } from "@/lib/useGeoLocation"

export default function TogetherAIPage() {
  const { pricing } = useGeoLocation();
  const tldr = "Oxlo.ai is a drop-in replacement for Together AI with a fundamentally different pricing model. While Together AI charges per token - causing costs to scale linearly with prompt length - Oxlo.ai charges a flat request-based rate. For engineering teams running RAG pipelines, agents, or long-context window tasks, Oxlo.ai is significantly cheaper and offers more predictable billing. Both providers are fully OpenAI SDK compatible."

  const cost_table = [
    { workload: "1,000 requests (3,000 tokens/req on Llama 3 70B)", competitor: "$2.70", oxlo: "$0.00 (Flat Daily Rate)", savings: "~$81/mo" },
    { workload: "10,000 requests (8,000 tokens/req on Llama 3 70B)", competitor: "$72.00", oxlo: "$0.00 (Flat Daily Rate)", savings: "~$2,100/mo" },
    { workload: "50,000 requests (15,000 tokens/req on Qwen 72B)", competitor: "$675.00", oxlo: "$0.00 (Flat Daily Rate)", savings: "~$20,000/mo" },
  ]

  const faqs = [
    {
      question: "How is Oxlo.ai different from Together AI?",
      answer: `The primary difference is the business model. Together AI counts every token processed and bills variably. Oxlo.ai uses a request-based SLA, meaning you purchase a fixed tier (e.g., ${pricing.premium.label}/mo for ${pricing.premium.requestsLabel} requests per day) and every request costs the same, whether it generates 100 tokens or 10,000 tokens.`
    },
    {
      question: "Is it difficult to switch from Together AI?",
      answer: "No. Both platforms emulate the OpenAI SDK API structure. To migrate, you only need to change your `base_url` to `https://api.oxlo.ai/v1` and swap your API key."
    },
    {
      question: "Does Oxlo.ai have the same models as Together AI?",
      answer: "Oxlo.ai supports 40+ leading open-source models including Llama 3.3 70B, Qwen 3 32B, DeepSeek R1, Mistral, and multimodal vision and audio models. Many are the exact same weights hosted on Together AI."
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
      competitorName="Together AI"
      slug="together"
      tldr={tldr}
      author_name="Oxlo.ai Engineering team"
      meta_title="Together AI Alternative: Oxlo.ai vs Together AI Comparison"
      meta_description="Looking for a Together AI alternative? Compare Together's token-based pricing vs Oxlo's request-based limits. Save 80% on long-context LLM inferencing."
      cost_table={cost_table}
      faq_schema={faq_schema}
      faqs={faqs}
      timestamp="March 2026"
    />
  )
}
