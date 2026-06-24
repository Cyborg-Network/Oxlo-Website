"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Head from "next/head"
import Button from "@/components/Button"
import { ChevronDown, ArrowRightLeft } from "lucide-react"

export default function VsPageTemplate({
  competitorName,
  slug,
  tldr,
  author_name,
  meta_title,
  meta_description,
  cost_table,
  faq_schema,
  faqs,
  timestamp
}) {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFaq = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <>
      <Head>
        <title>{meta_title}</title>
        <meta name="description" content={meta_description} />
        <link rel="canonical" href={`https://oxlo.ai/vs/${slug}`} />
        <meta property="og:title" content={meta_title} />
        <meta property="og:description" content={meta_description} />
        <meta property="og:url" content={`https://oxlo.ai/vs/${slug}`} />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq_schema) }}
        />
      </Head>

      <section className="common-section home-hero-section flow-hidden">
        <div className="container">
          <div className="text-center" style={{ maxWidth: "800px", margin: "0 auto 3rem auto" }}>
            <motion.h1 
              className="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Oxlo.ai vs <span className="text-gradient">{competitorName}</span>
            </motion.h1>
            <motion.div
              style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", margin: "1rem 0 2rem 0", color: "var(--text-light-48)", fontSize: "14px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span>By {author_name}</span> | <span>Last updated: {timestamp}</span>
            </motion.div>
            
            <motion.div 
              className="hero-desc"
              style={{ textAlign: "left", background: "var(--bg-overlay)", padding: "2rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 style={{ marginTop: 0, color: "var(--text-green)", fontSize: "20px", marginBottom: "1rem" }}>Overview</h3>
              <p style={{ margin: 0, lineHeight: "1.6" }}>{tldr}</p>
            </motion.div>
          </div>

          <div style={{ maxWidth: "1000px", margin: "4rem auto" }}>
            <motion.h2 
              className="section-heading text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Cost Comparison: Request vs Token Pricing
            </motion.h2>
            
            <div className="table-responsive" style={{ marginTop: "2rem" }}>
              <table className="w-100" style={{ borderCollapse: "collapse", background: "var(--bg-overlay)", borderRadius: "12px", overflow: "hidden" }}>
                <thead>
                  <tr style={{ background: "rgba(0,0,0,0.5)", textAlign: "left" }}>
                    <th style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "var(--text-light)" }}>Workload (1,000 API Calls)</th>
                    <th style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "var(--text-light)" }}>{competitorName} (Tokens)</th>
                    <th style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "var(--text-light)" }}>Oxlo.ai (Requests)</th>
                    <th style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "var(--text-green)" }}>Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {cost_table.map((row, i) => (
                    <tr key={i}>
                      <td style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "var(--text-light-87)" }}>{row.workload}</td>
                      <td style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "var(--text-light-87)" }}>{row.competitor}</td>
                      <td style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "var(--text-light-87)" }}>{row.oxlo}</td>
                      <td style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "var(--text-green)" }}>{row.savings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: "1rem", fontSize: "14px", color: "var(--text-light-48)", textAlign: "center" }}>
              * Estimates based on Premium tier ($350/mo for 5,000 requests/day). Token rates based on publicly available {competitorName} pricing as of 2026.
            </p>
          </div>

          <div style={{ maxWidth: "800px", margin: "5rem auto" }}>
            <motion.h2 
              className="section-heading text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Switch in <span className="text-gradient">5 Minutes</span>
            </motion.h2>
            <p className="text-center" style={{ color: "var(--text-light-74)", marginBottom: "2rem" }}>
              Oxlo.ai is fully compatible with the OpenAI SDK. Simply swap the base URL and API key.
            </p>
            
            <div style={{ background: "var(--bg-overlay)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
              <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ margin: 0, fontSize: "14px", color: "var(--text-light-48)" }}>Before ({competitorName})</p>
                <pre style={{ margin: "0.5rem 0 0 0", color: "#F2F4F3", fontSize: "15px", whiteSpace: "pre-wrap" }}>
                  <code>
client = OpenAI(<br/>
&nbsp;&nbsp;base_url="https://api.{slug}.com/v1",<br/>
&nbsp;&nbsp;api_key="your_api_key"<br/>
)
                  </code>
                </pre>
              </div>
              <div style={{ textAlign: "center", width: "40px", height: "40px", background: "var(--bg-body)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "-20px auto", position: "relative", zIndex: 1, border: "1px solid rgba(255,255,255,0.1)" }}>
                <ArrowRightLeft size={16} color="var(--text-green)"/>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <p style={{ margin: 0, fontSize: "14px", color: "var(--text-light-48)" }}>After (Oxlo.ai)</p>
                <pre style={{ margin: "0.5rem 0 0 0", color: "var(--text-green)", fontSize: "15px", whiteSpace: "pre-wrap" }}>
                  <code>
client = OpenAI(<br/>
&nbsp;&nbsp;base_url="https://api.oxlo.ai/v1",<br/>
&nbsp;&nbsp;api_key="oxlo_api_key"<br/>
)
                  </code>
                </pre>
              </div>
            </div>
            
            <div className="text-center" style={{ marginTop: "3rem" }}>
              <Button title="Get Started" link="/pricing" size="btn-md" theme="btn-primary" />
            </div>
          </div>
        </div>
      </section>

      <section className="common-section faq-section" id="faq">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="text-center">
            <h2 className="section-heading">Frequently Asked Questions</h2>
          </div>
          <motion.div
            className="faq-container"
            style={{ marginTop: "3rem" }}
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.3 }}
            initial={{ opacity: 0, translateY: 40 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            {faqs.map((faq, index) => (
              <div
                className={`faq-item ${openIndex === index ? "open" : ""}`}
                key={index}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`faq-chevron ${openIndex === index ? "rotated" : ""}`}
                  />
                </button>
                <div className={`faq-answer ${openIndex === index ? "expanded" : ""}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
