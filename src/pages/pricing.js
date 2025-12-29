"use client"

import { useState, useMemo } from "react"
import { CircleCheckBig, Info } from "lucide-react"
import Head from "next/head";
import { motion } from "framer-motion";
import Button from "@/components/Button";

export default function Pricing() {

  return (
    <>
      <Head>
        <title>Pricing</title>
        <meta
          name="description"
          content="Choose an open-source model and deploy it in seconds."
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
              <h1 className="hero-heading">Simple,  predictable pricing</h1>
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
                  Request-based plans designed for developers and small teams. Start free, scale when you need to, and never worry about token calculations.
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
                  <p className="subtitle">For developers exploring Oxlo and testing ideas.</p>
                </div>
                <div className="price">
                  $0<span>/month</span>
                </div>
                <div className="limit-title">Limit:</div>
                <ul>
                  <li>
                    <span className="bullet"></span> 100 requests / day
                  </li>
                  <li>
                    <span className="bullet"></span> Requests may be queued behind paid plans
                  </li>
                </ul>
                <Button
                  title="Get started for free"
                  link=""
                  size="btn-md"
                  theme="dark"
                />
                <p className="payment-info"></p>
                <div className="limit-title">
                  What you get:
                </div>
                <ul>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Access to smaller OSS models
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
                  <h3>Starter</h3>
                  <p className="offer">
                    (Early bull discount)
                  </p>
                  <p className="subtitle">For builders running early apps and prototypes.</p>
                </div>
                <div className="price">
                  $9.9 <span className="original-price">$30</span>
                  <span>/month</span>
                </div>
                <div className="limit-title">Limit:</div>
                <ul>
                  <li>
                    <span className="bullet"></span> 500 requests / hour
                  </li>
                  <li>
                    <span className="bullet"></span> Optimized models under 8B parameters
                  </li>
                </ul>
                <Button
                  title="Start free for 15 days"
                  link=""
                  size="btn-md"
                  theme="dark"
                />
                <p className="payment-info">
                  Credit Card required. Billing starts after the trial period ends.
                </p>
                <div className="limit-title">
                  Everything in Free, plus
                </div>
                <ul>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Faster request handling
                  </li>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Access to optimized inference models
                  </li>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Higher throughput for development workloads
                  </li>
                </ul>
              </div>

              <div className="card pro">
                <div className="badge recommended">Recommended</div>
                <div className="card-up">
                  <h3>Pro</h3>
                  <p className="subtitle">For teams running production workloads.</p>
                </div>
                <div className="price">
                  $49.9 <span className="original-price">$80</span>
                  <span>/month</span>
                </div>
                <div className="limit-title">Limit:</div>
                <ul>
                  <li>
                    <span className="bullet"></span> 5,000 requests / hour
                  </li>
                  <li>
                    <span className="bullet"></span> Production-grade performance
                  </li>
                </ul>
                <Button
                  title="Get Pro free for 30 days"
                  link=""
                  size="btn-md"
                />
                <p className="payment-info">
                  No charges until day 31. Cancel anytime
                </p>
                <div className="limit-title">
                  Everything in Starter, plus
                </div>
                <ul>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Priority execution
                  </li>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Higher and consistent throughput
                  </li>
                  <li>
                    <CircleCheckBig size={16} strokeWidth={1.5} /> Designed for production environments
                  </li>
                </ul>
              </div>

              <div className="card">
                <div className="card-up">
                  <h3>Enterprise</h3>
                  <p className="subtitle">For high-volume or custom requirements.</p>
                </div>
                <div className="custom price">Custom pricing</div>
                <div className="limit-title">Limit:</div>
                <ul>
                  <li>
                    <span className="bullet"></span> Custom or unlimited request volumes
                  </li>
                  <li>
                    <span className="bullet"></span> Dedicated capacity options
                  </li>
                </ul>
                <Button
                  title="Email Us!"
                  link=""
                  size="btn-sm"
                  theme="dark"
                />
                <p className="payment-info"></p>
                <div className="limit-title">
                  Everything in Pro, plus
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
            <motion.h2 className="section-heading"  viewport={{ once: true }} transition={{ ease: "easeInOut", duration: 0.5, delay: 0.25 }} initial={{ opacity: 0, translateY: 50 }} whileInView={{ opacity: 1, translateY: 0 }}>Compare the <span class="text-gradient">plans</span></motion.h2>  
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
                        link=""
                        size="btn-md"
                        theme="dark"
                      />
                    </div>
                  </th>
                  <th className="plan-col">
                    <div className="plan-header-card">
                      <h4>Starter</h4>
                      <div className="price">
                        $9.9<span>/month</span>
                      </div>
                       <Button
                        title="Start free for 15 days"
                        link=""
                        size="btn-md"
                        theme="dark"
                      />
                    </div>
                  </th>
                  <th className="plan-col">
                    <div className="plan-header-card pro">
                      <h4>Pro</h4>
                      <div className="price">
                        $49.9<span>/month</span>
                      </div>
                      <Button
                        title="Get Pro free for 30 days"
                        link=""
                        size="btn-md"
                      />
                    </div>
                  </th>
                  <th className="plan-col">
                    <div className="plan-header-card">
                      <h4>Enterprise</h4>
                      <div className="price">Custom pricing</div>
                       <Button
                        title="Email Us!"
                        link=""
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
                  <th colSpan="5" className="table-heading">
                    Usage & Limits
                  </th>
                </tr>
                <tr>
                  <td className="feature-name">Requests included</td>
                  <td className="plan-col value">100 / day</td>
                  <td className="plan-col value">500 / hour</td>
                  <td className="plan-col value">High request limits</td>
                  <td className="plan-col value">Custom</td>
                </tr>
                <tr>
                  <td className="feature-name">Burst rate limit</td>
                  <td className="plan-col value">5 / minute</td>
                  <td className="plan-col value">60 / min</td>
                  <td className="plan-col value">120 / min (tunable)</td>
                  <td className="plan-col value">Custom</td>
                </tr>
                <tr>
                  <td className="feature-name">Monthly request cap</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">No small daily cap</td>
                  <td className="plan-col value">Custom</td>
                </tr>
                <tr>
                  <td className="feature-name">Queued behind paid traffic</td>
                  <td className="plan-col value">Yes</td>
                  <td className="plan-col value">Yes (Behind Pro)</td>
                  <td className="plan-col value">No</td>
                  <td className="plan-col value">No</td>
                </tr>

                {/* Models & Performance */}
                <tr className="heading-tr">
                  <th colSpan="5" className="table-heading">
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

                {/* Request & Context Limits */}
                <tr className="heading-tr">
                  <th colSpan="5" className="table-heading">
                    Request & Context Limits
                    <p>(Caps are for safety and performance, not billing)</p>
                  </th>
                </tr>
                <tr>
                  <td className="feature-name">Input tokens / request</td>
                  <td className="plan-col value">Up to 2k</td>
                  <td className="plan-col value">Up to 4k</td>
                  <td className="plan-col value">8k-16k</td>
                  <td className="plan-col value">Custom</td>
                </tr>
                <tr>
                  <td className="feature-name">Output tokens / request</td>
                  <td className="plan-col value">Up to 512</td>
                  <td className="plan-col value">Up to 1k</td>
                  <td className="plan-col value">Up to 4k</td>
                  <td className="plan-col value">Custom</td>
                </tr>

                {/* Pricing & Billing */}
                <tr className="heading-tr">
                  <th colSpan="5" className="table-heading">
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
                  <th colSpan="5" className="table-heading">
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
                  <th colSpan="5" className="table-heading">
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
    </>
  );
}
