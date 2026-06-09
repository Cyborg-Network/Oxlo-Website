"use client"

import { useState, useMemo } from "react"
import { CircleCheckBig, Info, ChevronDown } from "lucide-react"
import Head from "next/head";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import TextReveal from "@/components/TextReveal";

// Pricing page Product schema
const pricingProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Oxlo.ai API",
  "description": "AI inference API with request-based pricing. Run 40+ open-source models via OpenAI-compatible API. Pay per request, not per token.",
  "brand": { "@type": "Brand", "name": "Oxlo.ai" },
  "category": "AI API Service",
  "offers": [
    { "@type": "Offer", "name": "Free Plan", "price": "0", "priceCurrency": "USD", "description": "60 requests/day, 16+ free models, community support, no credit card required", "eligibleQuantity": { "@type": "QuantitativeValue", "value": 60, "unitText": "requests per day" } },
    { "@type": "Offer", "name": "Pro Plan", "price": "80.00", "priceCurrency": "USD", "description": "1000 requests/day, all production-ready models, high priority queue, 24hr free trial", "eligibleQuantity": { "@type": "QuantitativeValue", "value": 1000, "unitText": "requests per day" } },
    { "@type": "Offer", "name": "Premium Plan", "price": "350.00", "priceCurrency": "USD", "description": "5000 requests/day, all models, priority access + beta models, 24hr free trial", "eligibleQuantity": { "@type": "QuantitativeValue", "value": 5000, "unitText": "requests per day" } },
    { "@type": "Offer", "name": "Enterprise Plan", "description": "Custom limits, dedicated GPU routing, SLA, priority support" }
  ]
};

const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does request-based pricing work?",
      "acceptedAnswer": { "@type": "Answer", "text": "With Oxlo.ai's request-based pricing, you pay a flat monthly subscription that includes a set number of API requests per day. Each request costs the same regardless of how many tokens are in your prompt or response. A 100-token prompt costs the same as a 50,000-token prompt. This is fundamentally different from token-based pricing used by OpenAI, Together AI, Fireworks AI, OpenRouter, and Replicate." }
    },
    {
      "@type": "Question",
      "name": "Is Oxlo.ai cheaper than Together AI, Fireworks AI, and OpenRouter?",
      "acceptedAnswer": { "@type": "Answer", "text": "For teams running high volumes of long-context or reasoning workloads, yes. Together AI, Fireworks AI, and OpenRouter all charge per token, so costs scale with both prompt length and request volume. With Oxlo.ai Premium, 5,000 requests per day cost a flat $350/month no matter how long each prompt is. As prompt length grows beyond 10,000 tokens and volume scales, per-token bills climb fast while Oxlo.ai stays flat, so it can be 10-100x cheaper for those workloads." }
    },
    {
      "@type": "Question",
      "name": "Does Oxlo.ai offer a free trial?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Pro and Premium plans include a 24-hour free trial. The Free tier (60 requests/day, 16+ models) is available permanently with no credit card required." }
    },
    {
      "@type": "Question",
      "name": "What happens if I exceed my daily request limit?",
      "acceptedAnswer": { "@type": "Answer", "text": "When you reach your daily request limit, additional requests are queued until the next day or you can upgrade your plan for higher limits. There are no overage charges - your costs are always predictable and fixed. This is unlike token-based providers where a single runaway prompt can spike your bill." }
    },
    {
      "@type": "Question",
      "name": "Can I switch plans at any time?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to the higher plan's limits. All plans are billed monthly with no long-term contracts required." }
    },
    {
      "@type": "Question",
      "name": "Does Oxlo.ai offer guaranteed savings for enterprise teams?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Teams currently spending up to $20,000 per month on AI inference with providers like Together AI, Fireworks AI or OpenRouter are eligible for our Enterprise plan which guarantees a minimum 15 percent reduction on their current monthly bill. Contact us at hello@oxlo.ai to discuss your current usage." }
    }
  ]
};

const PRICING_FAQ_ITEMS = [
  { question: "How does request-based pricing work?", answer: "With Oxlo.ai's request-based pricing, you pay a flat monthly subscription that includes a set number of API requests per day. Each request costs the same regardless of how many tokens are in your prompt or response. A 100-token prompt costs the same as a 50,000-token prompt. This is fundamentally different from token-based pricing used by OpenAI, Together AI, Fireworks AI, OpenRouter, and Replicate." },
  { question: "Is Oxlo.ai cheaper than Together AI, Fireworks AI, and OpenRouter?", answer: "For teams running long-context or reasoning model workloads, yes. Together AI, Fireworks AI, and OpenRouter all charge per token, so costs scale linearly with prompt length. Running 500 API calls per day with 3,000-token prompts costs approximately $40-60/month on these providers vs $350/month on Oxlo.ai Premium with 5,000 requests/day. But as prompt length increases beyond 10,000 tokens, Oxlo.ai can be 10-100x cheaper since every request costs the same flat rate." },
  { question: "Does Oxlo.ai offer a free trial?", answer: "Yes. Pro and Premium plans include a 24-hour free trial. The Free tier (60 requests/day, 16+ models) is available permanently with no credit card required." },
  { question: "What happens if I exceed my daily request limit?", answer: "When you reach your daily request limit, additional requests are queued until the next day or you can upgrade your plan for higher limits. There are no overage charges - your costs are always predictable and fixed. This is unlike token-based providers where a single runaway prompt can spike your bill." },
  { question: "Can I switch plans at any time?", answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to the higher plan's limits. All plans are billed monthly with no long-term contracts required." },
  { question: "Does Oxlo.ai offer guaranteed savings for enterprise teams?", answer: "Yes. Teams currently spending up to $20,000 per month on AI inference with providers like Together AI, Fireworks AI or OpenRouter are eligible for our Enterprise plan which guarantees a minimum 15 percent reduction on their current monthly bill. Contact us at hello@oxlo.ai to discuss your current usage." },
];

export default function Pricing() {

  return (
    <>
      <Head>
        <title>Pricing - Request-Based AI API Pricing | Oxlo.ai</title>
        <meta
          name="description"
          content="Oxlo.ai pricing: pay per API request, not per token. Free tier ($0, 60 req/day), Pro ($80/mo, 1,000 req/day), Premium ($350/mo, 5,000 req/day). 40+ AI models, OpenAI SDK compatible. 24hr free trial."
        />
        <meta
          name="keywords"
          content="AI API pricing, request-based pricing, LLM pricing comparison, Together AI pricing, cheapest AI API, AI inference cost, token vs request pricing"
        />
        <link rel="canonical" href="https://oxlo.ai/pricing" />
        <meta property="og:title" content="Oxlo.ai Pricing | Flat Monthly Plans for AI Inference." />
        <meta property="og:description" content="Request-based AI API pricing starting at $0. No token counting. No surprise bills." />
        <meta property="og:url" content="https://oxlo.ai/pricing" />
        <meta name="robots" content="index, follow" />

        {/* Page-specific JSON-LD: Product and FAQ schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingProductSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqSchema) }}
        />
      </Head>

      <section className="common-section home-hero-section flow-hidden">
        <div className="container">
          <div className="home-wrap d-flex hero-wrap">
            <motion.div
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.25, duration: 1.5 }}
              initial={{ opacity: 0, translateY: 100 }}
              whileInView={{ opacity: 1, translateY: 0 }}
            >
              <TextReveal text="Flat monthly pricing for AI inference" className="hero-heading" tag="h1" />
              <motion.div
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  bounce: 0.25,
                  duration: 1.5,
                  delay: 0.25,
                }}
                initial={{ opacity: 0, translateY: 50 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                <p className="home-desc">
                  One fixed monthly price. No billing surprises. No&nbsp;usage calculations.<br/>Start free and scale when you&apos;re ready.
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              transition={{
                type: "spring",
                bounce: 0.25,
                duration: 1.5,
                delay: 0.5,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
            >

            </motion.div>
          </div>
          <div className="pricing-container">
            <div className="pricing-header">
              <div className="toggle-group">
                <button className="toggle-btn active">OxAPIs</button>
                <button className="toggle-btn">
                  OxCompute <span>(Coming Soon)</span>
                </button>
              </div>
            </div>

            <div className="pricing-cards">
              <div className="card">
                <div className="card-up">
                  <h3>Free</h3>
                  <p className="subtitle">For developers getting started with Oxlo.ai.</p>
                </div>
                <div className="price">
                  $0<span>/month</span>
                </div>
                <div className="limit-title">Limit:</div>
                <ul>
                  <li>
                    <span className="bullet"></span> 60 requests / day
                  </li>
                  <li>
                    <span className="bullet"></span> Requests may be queued behind paid plans
                  </li>
                </ul>
                <Button
                  title="Get started for free"
                  link="https://portal.oxlo.ai/"
                  size="btn-md"
                  theme="dark"
                />
                <p className="payment-info"></p>
                <div className="limit-title">
                  What you get:
                </div>
                <ul>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Access to 12 plus open source models
                  </li>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Clear usage limits
                  </li>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> No credit card required
                  </li>
                </ul>
              </div>

              <div className="card">
                <div className="badge hot">Hot</div>
                <div className="card-up">
                  <h3>Pro</h3>
                  <p className="offer">
                    {/* (Early bull discount) */}
                  </p>
                  <p className="subtitle">For developers building and shipping AI-powered products.</p>
                </div>
                <div className="price">
                  $80<span>/month</span>
                </div>
                <div className="limit-title">Limit:</div>
                <ul>
                  <li>
                    <span className="bullet"></span> 1,000 requests / day
                  </li>
                  <li>
                    <span className="bullet"></span> All production-ready models
                  </li>
                </ul>
                <Button
                  title="Subscribe now"
                  link="https://portal.oxlo.ai/pricing?plan=pro&auto_checkout=true"
                  size="btn-md"
                  theme="dark"
                />
                <p className="payment-info">24hr free trial</p>
                <div className="limit-title">
                  Everything in Free, plus
                </div>
                <ul>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Faster request handling
                  </li>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Access to optimised models for development and prototyping
                  </li>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Higher throughput for development workloads
                  </li>
                </ul>
              </div>

              <div className="card pro">
                <div className="badge recommended">Recommended</div>
                <div className="card-up">
                  <h3>Premium</h3>
                  <p className="subtitle">For teams running production workloads.</p>
                </div>
                <div className="price">
                  $350<span>/month</span>
                </div>
                <div className="limit-title">Limit:</div>
                <ul>
                  <li>
                    <span className="bullet"></span> 5,000 requests / day
                  </li>
                  <li>
                    <span className="bullet"></span> Priority access + beta models
                  </li>
                </ul>
                <Button
                  title="Subscribe now"
                  link="https://portal.oxlo.ai/pricing?plan=premium&auto_checkout=true"
                  size="btn-md"
                />
                <p className="payment-info">
                  24hr free trial.
                </p>
                <div className="limit-title">
                  Everything in Pro, plus
                </div>
                <ul>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Priority execution
                  </li>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Higher and consistent throughput
                  </li>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> All large reasoning models including DeepSeek R1 and Kimi K2
                  </li>
                </ul>
              </div>

              <div className="card enterprise">
                <div className="card-up">
                  <p className="enterprise-for-label">FOR HIGH-VOLUME TEAMS</p>
                  <h3>Enterprise</h3>
                  <p className="subtitle">For teams ready to cut their AI infrastructure costs significantly.</p>
                </div>
                <div className="enterprise-commitment-box">
                  <p className="commitment-label">OUR COMMITMENT</p>
                  <p className="commitment-heading">15% off your current AI&nbsp;bill.</p>
                  <p className="commitment-subtext"><strong>Guaranteed.</strong> For teams spending up to $20,000 per month on AI inference with any provider.</p>
                </div>
                <Button
                  title="Book a Call →"
                  link="https://calendly.com/oxlo_ai/enterprise"
                  size="btn-md"
                />
                <p className="payment-info">No commitment. 30 minute conversation.</p>
                <div className="limit-title">
                  Everything in Premium, plus
                </div>
                <ul>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Custom usage limits
                  </li>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Dedicated support
                  </li>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Tailored deployment options
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="common-section compare-section">
        <div className="container">
          <div className='text-center'>
            <TextReveal text="Compare the plans" highlights={["plans"]} className="section-heading" tag="h2" delay={0.25} />
            <motion.p
              className="section-desc"
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }}
              initial={{ opacity: 0, translateY: 50 }}
              whileInView={{ opacity: 1, translateY: 0 }}
            >
              All plans use request-based pricing. No token calculations.
            </motion.p>
          </div>
          <div className="pricing-header">
            <div className="toggle-group">
              <button className="toggle-btn active">OxAPIs</button>
              <button className="toggle-btn">
                OxCompute <span>(Coming Soon)</span>
              </button>
            </div>
          </div>
          <div className="table-wrapper">
            <table className="compare-table">
              <thead>
                <tr className="sticky-header">
                  <th className="feature-name"></th>
                  <th className="plan-col">
                    <div className="plan-header-card">
                      <h4>Free</h4>
                      <div className="price">
                        $0<span>/month</span>
                      </div>
                      <Button
                        title="Get started for free"
                        link="https://portal.oxlo.ai/"
                        size="btn-md"
                        theme="dark"
                      />
                    </div>
                  </th>
                  <th className="plan-col">
                    <div className="plan-header-card">
                      <h4>Pro</h4>
                      <div className="price">
                        $80<span>/month</span>
                      </div>
                      <Button
                        title="24hr free trial"
                        link="https://portal.oxlo.ai/pricing?plan=pro&auto_checkout=true"
                        size="btn-md"
                        theme="dark"
                      />
                    </div>
                  </th>
                  <th className="plan-col">
                    <div className="plan-header-card pro">
                      <h4>Premium</h4>
                      <div className="price">
                        $350<span>/month</span>
                      </div>
                      <Button
                        title="24hr free trial"
                        link="https://portal.oxlo.ai/pricing?plan=premium&auto_checkout=true"
                        size="btn-md"
                      />
                    </div>
                  </th>
                  <th className="plan-col">
                    <div className="plan-header-card">
                      <h4>Enterprise</h4>
                      <div className="price">Custom pricing</div>
                      <Button
                        title="Book a Call"
                        link="https://calendly.com/oxlo_ai/enterprise"
                        size="btn-md"
                        theme="dark"
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Usage & Limits */}
                <tr className="heading-tr">
                  <th className="table-heading">
                    Usage & Limits
                  </th>
                </tr>
                <tr>
                  <td className="feature-name">Requests included</td>
                  <td className="plan-col value">60 / day</td>
                  <td className="plan-col value">1,000 / day</td>
                  <td className="plan-col value">5,000 / day</td>
                  <td className="plan-col value">Custom</td>
                </tr>
                <tr>
                  <td className="feature-name">Burst rate limit</td>
                  <td className="plan-col value">5 / minute</td>
                  <td className="plan-col value">30 / min</td>
                  <td className="plan-col value">120 / min (tunable)</td>
                  <td className="plan-col value">Custom</td>
                </tr>
                <tr>
                  <td className="feature-name">Monthly request cap</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">None</td>
                  <td className="plan-col value">Custom</td>
                </tr>
                <tr>
                  <td className="feature-name">Request priority level</td>
                  <td className="plan-col value">Lowest</td>
                  <td className="plan-col value">Standard</td>
                  <td className="plan-col value">High</td>
                  <td className="plan-col value">Dedicated</td>
                </tr>

                {/* Models & Performance */}
                <tr className="heading-tr">
                  <th className="table-heading">
                    Models & Performance
                  </th>
                </tr>
                <tr>
                  <td className="feature-name">Optimized models over 8B</td>
                  <td className="plan-col value">No</td>
                  <td className="plan-col value">Limited</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                </tr>
                <tr>
                  <td className="feature-name">Production-grade inference</td>
                  <td className="plan-col value">No</td>
                  <td className="plan-col value">No</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                </tr>
                <tr>
                  <td className="feature-name">Priority execution</td>
                  <td className="plan-col value">Lowest</td>
                  <td className="plan-col value">Medium</td>
                  <td className="plan-col value">Highest</td>
                  <td className="plan-col value">Optional</td>
                </tr>
                <tr>
                  <td className="feature-name">Average Response Latency</td>
                  <td className="plan-col value">≤ 7 seconds</td>
                  <td className="plan-col value">≤ 1 second</td>
                  <td className="plan-col value">≤ 100 ms</td>
                  <td className="plan-col value">- tunable</td>
                </tr>

                {/* Request & Context Limits */}
                <tr className="heading-tr">
                  <th className="table-heading">
                    Request & Context Limits
                    <p>(Caps are for safety and performance, not billing)</p>
                  </th>
                </tr>
                <tr>
                  <td className="feature-name">Input tokens / request</td>
                  <td className="plan-col value">Up to 8K</td>
                  <td className="plan-col value">Up to 16K</td>
                  <td className="plan-col value">Up to 32K</td>
                  <td className="plan-col value">Custom (up to 128K)</td>
                </tr>
                <tr>
                  <td className="feature-name">Output tokens / request</td>
                  <td className="plan-col value">Up to 2K</td>
                  <td className="plan-col value">Up to 4K</td>
                  <td className="plan-col value">Up to 8K</td>
                  <td className="plan-col value">Custom (up to 128K)</td>
                </tr>

                {/* Pricing & Billing */}
                <tr className="heading-tr">
                  <th className="table-heading">
                    Pricing & Billing
                  </th>
                </tr>
                <tr>
                  <td className="feature-name">Request-based pricing</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                </tr>
                <tr>
                  <td className="feature-name">Token-based billing</td>
                  <td className="plan-col value">No</td>
                  <td className="plan-col value">No</td>
                  <td className="plan-col value">No</td>
                  <td className="plan-col value">No</td>
                </tr>
                <tr>
                  <td className="feature-name">Fixed monthly limits</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Custom</td>
                </tr>
                <tr>
                  <td className="feature-name">Usage limits visible upfront</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                </tr>

                {/* Developer Experience */}
                <tr className="heading-tr">
                  <th className="table-heading">
                    Developer Experience
                  </th>
                </tr>
                <tr>
                  <td className="feature-name">Open-source models</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                </tr>
                <tr>
                  <td className="feature-name">Simple API integration</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                </tr>
                <tr>
                  <td className="feature-name">Model-agnostic pricing</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                </tr>
                <tr>
                  <td className="feature-name">Support level</td>
                  <td className="plan-col value">Community</td>
                  <td className="plan-col value">Community</td>
                  <td className="plan-col value">Priority</td>
                  <td className="plan-col value">Dedicated</td>
                </tr>

                {/* Infrastructure & Technical Differentiation */}
                <tr className="heading-tr">
                  <th className="table-heading">
                    Infrastructure & Technical Differentiation
                  </th>
                </tr>
                <tr>
                  <td className="feature-name">Gateway-level request metering</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                </tr>
                <tr>
                  <td className="feature-name">Pricing independent of prompt length</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                </tr>
                <tr>
                  <td className="feature-name">Traffic prioritization by plan</td>
                  <td className="plan-col value">No</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                </tr>
                <tr>
                  <td className="feature-name">Async and batch-friendly workloads</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="disclaimer">
            <Info size={16} />
            Based on current platform design and publicly available competitor offerings. Features may evolve over time.
          </div>
        </div>
      </section>

      {/* Pricing FAQ Section */}
      <PricingFaqSection />



    </>
  );
}

// Pricing-specific FAQ accordion
function PricingFaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFaq = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="common-section pricing-faq-section" id="pricing-faq">
      <div className="container">
        <div className="text-center">
          <TextReveal text="Pricing FAQ" highlights={["FAQ"]} className="section-heading" tag="h2" />
        </div>
        <motion.div
          className="faq-container"
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 0.5, delay: 0.2 }}
          initial={{ opacity: 0, translateY: 40 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          {PRICING_FAQ_ITEMS.map((item, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`}>
              <button className="faq-question" onClick={() => toggleFaq(index)} aria-expanded={openIndex === index}>
                <span>{item.question}</span>
                <ChevronDown size={20} className={`faq-chevron ${openIndex === index ? "rotated" : ""}`} />
              </button>
              <div className={`faq-answer ${openIndex === index ? "expanded" : ""}`}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
