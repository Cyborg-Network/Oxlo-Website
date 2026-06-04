import { Html, Head, Main, NextScript } from 'next/document'

// JSON-LD Structured Data for AI SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Oxlo.ai",
  "alternateName": "Oxlo",
  "url": "https://oxlo.ai",
  "logo": "https://oxlo.ai/images/logo-dark.svg",
  "description": "Developer-first AI inference platform with request-based pricing. Provides API access to 40+ open-source AI models including Qwen 3 32B, Llama 3.3 70B, DeepSeek R1, Whisper, and SDXL with predictable, flat-rate billing per API request.",
  "email": "hello@oxlo.ai",
  "knowsAbout": [
    "AI inference", "LLM API", "request-based pricing",
    "open-source AI models", "machine learning deployment",
    "AI model serving", "GPU inference"
  ],
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "0",
    "highPrice": "350.00",
    "priceCurrency": "USD",
    "offerCount": "4",
    "offers": [
      { "@type": "Offer", "name": "Free Plan", "price": "0", "priceCurrency": "USD", "description": "60 requests/day, 16+ models, community support" },
      { "@type": "Offer", "name": "Pro Plan", "price": "80.00", "priceCurrency": "USD", "description": "1000 requests/day, all models, high priority queue" },
      { "@type": "Offer", "name": "Premium Plan", "price": "350.00", "priceCurrency": "USD", "description": "5000 requests/day, all models, highest priority, 32K output tokens" },
      { "@type": "Offer", "name": "Enterprise Plan", "description": "Custom limits, dedicated GPU routing, SLA, priority support" }
    ]
  }
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Oxlo.ai",
  "alternateName": "Oxlo AI Inference API",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web, API",
  "url": "https://oxlo.ai",
  "description": "AI inference API with request-based pricing. Run 40+ open-source models (Qwen 3 32B, Llama 3.3 70B, DeepSeek R1, Mistral, Whisper, SDXL) via a fully OpenAI SDK-compatible API. Pay per request, not per token.",
  "featureList": [
    "Request-based pricing - flat cost per API call regardless of token count",
    "40+ AI models across text, vision, code, image, audio, embeddings, and detection",
    "Fully OpenAI SDK compatible - change one line of code to switch",
    "No cold starts - models stay loaded in GPU memory",
    "5-day free trial with access to all models",
    "Streaming support for real-time responses",
    "Function calling and JSON mode support",
    "Vision model support for image understanding"
  ],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free tier available with 60 requests/day. Paid plans from $80/month."
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Oxlo.ai",
  "alternateName": "Oxlo",
  "url": "https://oxlo.ai",
  "description": "Developer-first AI inference platform with request-based pricing. 40+ models, OpenAI SDK compatible, no cold starts.",
  "inLanguage": "en"
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WXNQ6HHP');
            `,
          }}
        />

        {/* Site-wide JSON-LD Structured Data for AI SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </Head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WXNQ6HHP"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
