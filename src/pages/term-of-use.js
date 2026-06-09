import Head from "next/head";

export default function TermOfUse() {
  return (
    <>
      <Head>
        <title>Terms of Service - Oxlo.ai</title>
        <meta
          name="description"
          content="Oxlo.ai terms of use. Read the terms and conditions governing the use of Oxlo.ai AI inference API platform and services."
        />
        <link rel="canonical" href="https://oxlo.ai/term-of-use" />
        <meta property="og:title" content="Terms of Service - Oxlo.ai" />
        <meta property="og:description" content="Terms and conditions for using the Oxlo.ai AI inference platform." />
        <meta property="og:url" content="https://oxlo.ai/term-of-use" />
        <meta name="robots" content="index, follow" />
      </Head>
      <section className="common-section legal-hero-section">
        <div className="container">
          <h1 className="hero-heading center-hero-heading">Terms of Service</h1>
          <p className="hero-desc">ResoluteX Technology Labs Ltd | DIFC, Dubai | hello@oxlo.ai</p>
          <p className="hero-desc" style={{ marginTop: '10px' }}>Last Updated: June 9, 2026</p>
          <div className="legal-content">
            <h2>1. Agreement Overview</h2>
            <p>These Terms of Service ("Terms") govern your access to and use of Oxlo.ai (the "Platform" or "Service"), including its APIs, model inference services, interactive playground, and related features.</p>
            <p>The Platform is operated by ResoluteX Technology Labs Ltd., including its subsidiaries and affiliates operating within the Dubai Free Zone ("Company", "we", "us", or "our").</p>
            <p>By accessing or using the Platform, you agree to be bound by these Terms.</p>

            <h2>2. Platform Access & Free Trial</h2>
            <h3>2.1 Free Trial Access</h3>
            <p>Newly registered users may receive up to five (5) days of complimentary access to available models. Request limits and usage caps apply during the free trial period. Free trial access does not apply to promotional codes, discounted plans, or offers redeemed through third-party partnerships.</p>
            <h3>2.2 Model Availability</h3>
            <p>We may modify, replace, or remove available models at any time based on demand, performance, or operational considerations.</p>
            <h3>2.3 Promotional Codes</h3>
            <p>Promotional codes are non-transferable unless explicitly enabled by the Platform.</p>
            <h3>2.4 Account Security</h3>
            <p>You are responsible for maintaining the security of your account credentials. We strongly recommend enabling two-factor authentication (2FA) on both your email provider and your Platform account.</p>

            <h2>3. Service Description</h2>
            <h3>3.1 Platform Functionality</h3>
            <p>The Platform provides access to open-source AI models and GPU-based inference infrastructure. Workloads may be processed across Company-operated cloud datacenters and third-party infrastructure providers, including distributed compute nodes.</p>
            <h3>3.2 Free Credits</h3>
            <p>Free credits or trial access may be granted at our sole discretion and may be revoked at any time.</p>
            <h3>3.3 Usage Controls</h3>
            <p>We may enforce rate limits, burst limits, concurrency caps, and request-based usage restrictions based on plan type.</p>
            <h3>3.4 No SLA for Free Tier</h3>
            <p>Free-tier access does not include service level agreements (SLA), uptime guarantees, or performance guarantees.</p>

            <h2>4. Acceptable Use & Restrictions</h2>
            <p>You agree not to use the Platform for:</p>
            <ul>
              <li>Illegal, abusive, or fraudulent activities</li>
              <li>Distribution of malware, spam, botnets, or DDoS attacks</li>
              <li>Child exploitation, hate speech, or violent extremism</li>
              <li>Generation of prohibited NSFW or harmful content</li>
              <li>Reverse engineering, resale, redistribution, or republishing of the Platform without authorization</li>
            </ul>
            <p>We reserve the right to suspend or terminate accounts engaging in prohibited activities.</p>

            <h2>5. API Keys & Authentication</h2>
            <h3>5.1 Confidentiality</h3>
            <p>API keys are confidential and must be stored securely. You are responsible for all activity conducted using your API keys.</p>
            <h3>5.2 Key Allocation</h3>
            <p>The Company may issue one or more API keys per account or per model at its discretion.</p>
            <h3>5.3 Misuse</h3>
            <p>Misuse, abuse, or unauthorized sharing of API keys may result in suspension or termination without refund.</p>

            <h2>6. Data Handling & Privacy</h2>
            <h3>6.1 Processing Locations</h3>
            <p>Inference jobs may be processed in United States-based datacenters or distributed compute nodes depending on capacity and availability.</p>
            <h3>6.2 Data Minimization</h3>
            <p>We implement privacy-focused routing and may use cryptographic or Zero-Knowledge techniques to reduce exposure of user data.</p>
            <h3>6.3 Sensitive Data</h3>
            <p>You must not submit sensitive personal data, protected health information, financial credentials, or other regulated data through inference jobs.</p>
            <h3>6.4 Data Processing Agreement</h3>
            <p>For additional details, please refer to our Data Processing Agreement (DPA).</p>

            <h2>7. Intellectual Property</h2>
            <h3>7.1 User Content</h3>
            <p>You retain ownership of prompts submitted and outputs generated through inference jobs, subject to applicable third-party model licenses.</p>
            <h3>7.2 Platform IP</h3>
            <p>We retain all rights, title, and interest in the Platform, including its APIs, infrastructure, orchestration systems, and software.</p>
            <h3>7.3 Branding</h3>
            <p>You may not use the Oxlo brand name, logo, or trademarks without prior written consent, except where branding is explicitly provided for integration purposes.</p>

            <h2>8. Billing & Subscription Terms</h2>
            <h3>8.1 Payment Processing</h3>
            <p>Paid plans are billed monthly via Stripe or other approved payment providers.</p>
            <h3>8.2 Usage Pricing</h3>
            <p>Charges are based on request-based usage, priority tiers, and infrastructure allocation, not token-based billing.</p>
            <h3>8.3 Cancellation</h3>
            <p>Subscriptions may be cancelled in accordance with the configuration of the selected plan.</p>
            <h3>8.4 Refunds</h3>
            <p>All payments are final and non-refundable upon payment. We do not offer refunds for unused time, unused requests, cancellations, or account suspensions due to violations of these Terms, except where required by applicable law. No refund will be issued once a payment has been processed, regardless of usage.</p>
            <h3>8.5 Pricing Changes</h3>
            <p>We reserve the right to modify pricing with prior notice to existing subscribers. Published pricing plans are valid for a minimum period of three (3) months unless otherwise specified.</p>
            <h3>8.6 Chargebacks & Payment Disputes</h3>
            <p>If you initiate a chargeback, payment dispute, or reversal through your bank or payment provider without first contacting us to resolve the issue, we reserve the right to:</p>
            <ul>
              <li>Immediately suspend or terminate your account</li>
              <li>Recover any disputed amounts</li>
              <li>Recover administrative and processing fees incurred due to the dispute</li>
              <li>Permanently restrict future access to the Platform</li>
            </ul>
            <p>You agree to contact us directly to resolve any billing disputes prior to initiating a chargeback.</p>
            <h3>8.7 Dispute Resolution & Arbitration</h3>
            <p>Any dispute, claim, or controversy arising out of or relating to these Terms or the use of the Platform shall first be resolved through good faith negotiations.</p>
            <p>If the dispute cannot be resolved informally within thirty (30) days, it shall be finally resolved by binding arbitration in the United Arab Emirates, in accordance with applicable arbitration rules.</p>
            <p>The arbitration shall be conducted in English. The decision of the arbitrator shall be final and binding.</p>
            <p>Nothing in this clause prevents the Company from seeking injunctive or equitable relief in a competent court for misuse of the Platform, intellectual property violations, or security breaches.</p>
            <h3>8.8 Minimum Commitment</h3>
            <p>Subscriptions are billed for the full billing cycle selected at the time of purchase (monthly or otherwise). Early cancellation does not entitle you to a refund for the remaining period of the billing cycle.</p>
            <p>Access will continue until the end of the current billing period unless terminated due to violation of these Terms.</p>
            <h3>8.9 Pricing Adjustments & Plan Changes</h3>
            <p>We reserve the right to modify subscription pricing, plan features, usage limits, or service tiers.</p>
            <p>For existing paid subscribers:</p>
            <ul>
              <li>Pricing changes will not take effect until the next billing cycle</li>
              <li>Reasonable advance notice will be provided</li>
              <li>Continued use of the Platform after pricing changes become effective constitutes acceptance of the updated pricing.</li>
            </ul>
            <h3>8.10 Service Availability & Infrastructure Variability</h3>
            <p>You acknowledge that AI inference services depend on third-party infrastructure, distributed compute nodes, and GPU availability.</p>
            <p>We do not guarantee uninterrupted availability, latency performance, or continuous access to specific models unless explicitly covered under a separate Service Level Agreement (SLA).</p>
            <h3>8.11 Indemnification</h3>
            <p>You agree to indemnify, defend, and hold harmless the Company, its affiliates, directors, employees, and partners from and against any claims, damages, liabilities, costs, and expenses (including legal fees) arising out of:</p>
            <ul>
              <li>Your use of the Platform</li>
              <li>Your violation of these Terms</li>
              <li>Content submitted or generated through your account</li>
              <li>Any third-party claims resulting from your use of the Service</li>
            </ul>
            <h3>8.12 Export & Sanctions Compliance</h3>
            <p>You represent and warrant that you are not located in, under the control of, or a national or resident of any country subject to trade sanctions or export restrictions imposed by the United Arab Emirates, the United States, or other applicable authorities.</p>
            <p>You agree not to use the Platform in violation of export control or sanctions laws.</p>

            <h2>9. Liability & Warranty Disclaimer</h2>
            <h3>9.1 No Warranty</h3>
            <p>The Platform is provided on an "as-is" and "as-available" basis.</p>
            <h3>9.2 Limitation of Liability</h3>
            <p>We shall not be liable for indirect, incidental, special, consequential, or punitive damages.</p>
            <h3>9.3 Liability Cap</h3>
            <p>Our total liability shall not exceed the amount paid by you to the Company in the thirty (30) days preceding the claim.</p>

            <h2>10. Suspension & Termination</h2>
            <h3>10.1 Suspension</h3>
            <p>We may suspend or terminate access to the Platform for violations of these Terms.</p>
            <h3>10.2 Data Deletion</h3>
            <p>You may request deletion of your account and associated Platform data by contacting support.</p>

            <h2>11. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates.</p>
          </div>
        </div>
      </section>
    </>
  );
}
