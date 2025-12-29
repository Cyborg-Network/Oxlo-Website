import Head from "next/head";
import Image from "next/image";
import Button from "@/components/Button";
import rocket from "../../public/images/rocket.svg";
import hero from "../../public/images/hero-animation.gif";
import shock  from "../../public/images/shock.svg";
import dollar from "../../public/images/dollar.svg";
import shield from "../../public/images/shield.svg";
import scale from "../../public/images/scale.svg";
import light from "../../public/images/light.svg";
import bulb from "../../public/images/idea.svg";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import sixOne from '../../public/images/six/one.svg'
import sixTwo from '../../public/images/six/two.svg'
import sixThree from '../../public/images/six/three.svg'
import sixFour from '../../public/images/six/four.svg'
import sixFive from '../../public/images/six/five.svg'
import sixSix from '../../public/images/six/six.svg'
import oxlo from '../../public/images/logo-dark.svg'
import firework from '../../public/images/firework.svg'
import openrouter from '../../public/images/openrouter.svg'
import together from '../../public/images/together.svg'

export default function Home() {

  const pricingFeatures = [
    { name: "Request-based pricing (not tokens)", oxlo: true, others: false },
    { name: "Subscription plans with fixed monthly usage", oxlo: true, others: false },
    { name: "Free tier without credit card", oxlo: true, others: false },
    { name: "Pricing independent of prompt length", oxlo: true, others: false },
    { name: "No model-specific pricing math", oxlo: true, others: false },
    { name: "Usage limits visible upfront", oxlo: true, others: false },
  ];

  const capabilityFeatures = [
    { name: "High-performance AI APIs", oxlo: true, others: true },
    { name: "Production-ready infrastructure", oxlo: true, others: true },
    { name: "Open-source model support", oxlo: true, others: true },
    { name: "Enterprise-grade reliability", oxlo: true, others: true },
  ];

  const aiUseCases = [
    { icon: sixOne, title: "Chatbots & AI Assistants", description: "Build chatbots and assistants for support, internal tools, and workflows.", models: "LLaMA-3.1-8B, Mistral-7B-Instruct-v0.2", delay: 0 },
    { icon: sixTwo, title: "Document Q&A and RAG", description: "Query documents, PDFs, and knowledge bases using retrieval-augmented generation.", models: "BGE-Large-v1.5, E5-Large-v2, LLaMA-3.1-8B", delay: 0.1 },
    { icon: sixThree, title: "Text Generation & Summarization", description: "Generate, rewrite, or summarize text for apps and internal systems.", models: "Mixtral-8x7B-Instruct, Mistral-7B-Instruct-v0.2", delay: 0.2 },
    { icon: sixFour, title: "Image Understanding", description: "Analyze images for classification, detection, or visual understanding.", models: "YOLOv8, CLIP-ViT-L/14", delay: 0.3 },
    { icon: sixFive, title: "Speech-to-Text", description: "Convert audio into text for transcription and analysis workflows.", models: "Whisper-Large-v3, Whisper-Medium", delay: 0.4 },
    { icon: sixSix, title: "Batch AI Processing", description: "Process large volumes of AI requests efficiently using async or batch workflows.", models: "LLaMA-3.1-8B, Mixtral-8x7B, BGE-Large-v1.5", delay: 0.5 },
  ];

  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="A developer-first AI Inference platform with radically lower compute costs."
        />
      </Head>

      <section className="miner-soon-section soon-section flow-hidden">
        <div className="container">
          <div className="home-wrap d-flex a-center">
            <motion.div
              className="d-left"
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.25, duration: 2 }}
              initial={{ opacity: 0, translateX: -200 }}
              whileInView={{ opacity: 1, translateX: 0 }}
            >
              <div className="hw-left">
                <h1 className="hero-heading">
                  <span className="break">Build AI</span>
                  <span className="break">Pay LESS</span>
                  <span className="break">Ship FASTER</span>
                </h1>
                <p className="home-desc">
                  A developer-first AI Inference platform with radically lower compute costs.
                </p>
                <Button
                  title="Get started for free"
                  link=""
                  size="btn-md"
                  icon={rocket}
                />
              </div>
            </motion.div>

            <motion.div
              className="d-right"
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.25, duration: 2 }}
              initial={{ opacity: 0, translateX: 200 }}
              whileInView={{ opacity: 1, translateX: 0 }}
            >
              <div className="hw-right">
                <div className="animated-emblem">
                  <svg width="108" height="96" viewBox="0 0 108 96" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M54 11C79.002 11 97 28.7477 97 48C97 67.2523 79.002 85 54 85C28.998 85 11 67.2523 11 48C11 28.7477 28.998 11 54 11Z" stroke="#1F272C" strokeWidth="22" /><path d="M54 11C79.002 11 97 28.7477 97 48C97 67.2523 79.002 85 54 85C28.998 85 11 67.2523 11 48C11 28.7477 28.998 11 54 11Z" stroke="#03F7B5" strokeWidth="22" className="progress" fill="none" /><path d="M46.9873 47.4873L9.5 10L18 4.5L53.9182 40.6441L88.5 6.5L95.5 13L60.7549 47.5238L97.5 84.5L90.5 91L53.8674 54.3674L17 91L9.5 84.5L46.9873 47.4873Z" fill="#04080E" /></svg>
                </div>
                <Image src={hero} alt="home-cover-image" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="common-section fiveg-section">
        <div className="container">
          <div className="fiveg-wrap flow-hidden">
            <div className="d-flex">
              <div className="d-left">
                <motion.h1
                  className="hero-heading"
                  viewport={{ once: true }}
                  transition={{ ease: "easeInOut", duration: 1 }}
                  initial={{ opacity: 0, translateX: -75 }}
                  whileInView={{ opacity: 1, translateX: 0 }}
                >
                  Ready to build? Create a free account and start running AI without worrying about tokens or surprise bills.
                </motion.h1>
                <motion.div
                  viewport={{ once: true }}
                  transition={{ ease: "easeInOut", duration: 1.25 }}
                  initial={{ opacity: 0, translateY: 25 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                >
                  <div className="pill-wrap">
                    <ul>
                      <li><Image src={dollar} alt="dollar" />Affordable</li>
                      <li><Image src={shield} alt="shield" />Reliable</li>
                      <li><Image src={scale} alt="scale" />Scalable</li>
                      <li><Image src={light} alt="light" />Fast</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
              <div className="d-right">
                <motion.p
                  className="hero-desc"
                  viewport={{ once: true }}
                  transition={{ ease: "easeInOut", duration: 1 }}
                  initial={{ opacity: 0, translateX: 75 }}
                  whileInView={{ opacity: 1, translateX: 0 }}
                >
                  Oxlo.ai is built for developers and teams that care about cost clarity. Pricing is designed to be significantly more affordable, with simple request-based plans instead of token-based billing.
                </motion.p>
                <motion.div
                  viewport={{ once: true }}
                  transition={{ ease: "easeInOut", duration: 1.25 }}
                  initial={{ opacity: 0, translateY: 25 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                >
                <Button
                  title="Start running AI in seconds"
                  link=""
                  size="btn-md"
                  icon={shock}
                />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='common-section nine-section bottom-blur'>
          <div className='container'>
          <div className='text-center'>
            <motion.h2 className="section-heading"  viewport={{ once: true }} transition={{ ease: "easeInOut", duration: 0.5 }} initial={{ opacity: 0, translateY: 100 }} whileInView={{ opacity: 1, translateY: 0 }}>Applications</motion.h2>
          </div>
          <div className='box-wrap'>
            <div className='box-border'></div>
            {aiUseCases.map((item, index) => (
              <motion.div
                key={index}
                className="box-content"
                viewport={{ once: true }}
                transition={{ ease: "easeInOut", duration: 0.5, delay: item.delay }}
                initial={{ opacity: 0, translateY: 50 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                <div className="box-items">
                  <div className="box-icon">
                    <Image src={item.icon} alt={item.title} />
                  </div>

                  <div className="box-text">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span>{item.models}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          </div>
      </section>

      <section className='common-section pill-section'>
        <div className='container'>
          <div className='text-center'>
          <motion.div className='section-badge' viewport={{ once: true }} transition={{ ease: "easeInOut", duration: 0.5 }} initial={{ opacity: 0, translateY: 50 }} whileInView={{ opacity: 1, translateY: 0 }}>
            <Image src={bulb} alt='bulb-icon' />
            <span>Rethinking AI Pricing</span>
          </motion.div>
          <motion.h2 className="section-heading"  viewport={{ once: true }} transition={{ ease: "easeInOut", duration: 0.5, delay: 0.25 }} initial={{ opacity: 0, translateY: 50 }} whileInView={{ opacity: 1, translateY: 0 }}>How <span class="text-gradient">Oxlo.ai</span> Stands Out</motion.h2>  
          <motion.p
            className="section-desc"
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }}
            initial={{ opacity: 0, translateY: 50 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            A practical comparison across pricing models, developer experience, and ease of deployment.
          </motion.p>
          </div>
          <div className="comparison-container">
            <div className="table-row header-row">
              <div className="cell">Features</div>
              <div className="cell"><Image src={oxlo} alt="Oxlo.ai" /></div>
              <div className="cell"><Image src={firework} alt="Fireworks AI" /></div>
              <div className="cell"><Image src={openrouter} alt="OpenRouter" /></div>
              <div className="cell"><Image src={together} alt="Together AI" /></div>
            </div>

            <div className="table-row section-title-row">
              <div className="cell section-title">Pricing</div>
              <div className="cell"></div><div className="cell"></div><div className="cell"></div><div className="cell"></div>
            </div>

            {pricingFeatures.map((f, i) => (
              <div key={i} className="table-row">
                <div className="cell">{f.name}</div>
                <div className="cell">
                  <div className="icon-circle icon-check-green">
                    <div className="check-mark"></div>
                  </div>
                </div>
                {[1, 2, 3].map(n => (
                  <div key={n} className="cell">
                    <div className="icon-circle icon-cross-gray">
                      <div className="cross-mark"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div className="table-row section-title-row">
              <div className="cell section-title">Platform Capabilities</div>
              <div className="cell"></div><div className="cell"></div><div className="cell"></div><div className="cell"></div>
            </div>

            {capabilityFeatures.map((f, i) => (
              <div key={i} className="table-row">
                <div className="cell">{f.name}</div>
                <div className="cell">
                  <div className="icon-circle icon-check-green">
                    <div className="check-mark"></div>
                  </div>
                </div>
                {[1, 2, 3].map(n => (
                  <div key={n} className="cell">
                    <div className="icon-circle icon-check-gray">
                      <div className="check-mark check-mark-light"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <motion.div
                className="text-center"
                viewport={{ once: true }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.5 }}
                initial={{ opacity: 0, translateY: 75 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                <Button
                  title="Get started with Oxlo.ai"
                  link=""
                  size="btn-md"
                  icon={rocket}
                />
              </motion.div>
        </div>
      </section> 

      <section className="common-section newsletter-section">
        <div className="container">
          <div className="ns-wrap">
            <div className="ns-content">
              <motion.h2
                className="section-heading"
                viewport={{ once: true }}
                transition={{ ease: "easeInOut", duration: 0.75 }}
                initial={{ opacity: 0, translateY: 75 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                Ready to build?
              </motion.h2>
              <motion.p
                className="section-desc"
                viewport={{ once: true }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.25 }}
                initial={{ opacity: 0, translateY: 75 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                Run AI models without worrying about usage calculations.
              </motion.p>
              <motion.div
                viewport={{ once: true }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.5 }}
                initial={{ opacity: 0, translateY: 75 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                <Button
                  title="Deploy Now"
                  link=""
                  size="btn-md"
                  icon={rocket}
                  theme="light"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
