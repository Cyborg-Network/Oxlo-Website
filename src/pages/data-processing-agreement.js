import Head from "next/head";

export default function DataProcessingAgreement() {
  return (
    <>
      <Head>
        <title>Data Processing Agreement - Oxlo.ai</title>
        <meta
          name="description"
          content="Oxlo.ai Data Processing Agreement. Read how we process data strictly based on Controller instructions."
        />
        <link rel="canonical" href="https://oxlo.ai/data-processing-agreement" />
        <meta property="og:title" content="Data Processing Agreement - Oxlo.ai" />
        <meta property="og:description" content="Oxlo.ai Data Processing Agreement details." />
        <meta property="og:url" content="https://oxlo.ai/data-processing-agreement" />
        <meta name="robots" content="index, follow" />
      </Head>
      <section className="common-section legal-hero-section">
        <div className="container">
          <h1 className="hero-heading center-hero-heading">Data Processing Agreement</h1>
          <p className="hero-desc">ResoluteX Technology Labs Ltd | DIFC, Dubai | hello@oxlo.ai</p>
          <p className="hero-desc" style={{ marginTop: '10px' }}>Last Updated: June 9, 2026</p>
          <div className="legal-content">
            <p>This Data Processing Agreement ("Agreement") forms part of the Terms of Service between the user ("Controller") and Oxlo.ai ("Processor").</p>

            <h2>1. Roles</h2>
            <h3>1.1 Data Controller</h3>
            <p>The user is the Data Controller of all data submitted for inference jobs.</p>
            <h3>1.2 Data Processor</h3>
            <p>Oxlo.ai acts as a Data Processor and processes data strictly based on Controller instructions.</p>

            <h2>2. Purpose & Scope</h2>
            <h3>2.1 Processing Purpose</h3>
            <p>Data is processed to provide model inference, benchmarking, latency evaluation, and API workload execution.</p>
            <h3>2.2 No Resale or Advertising</h3>
            <p>The Processor does not analyze or store data for resale or advertising purposes.</p>

            <h2>3. Data Collection Principles</h2>
            <h3>3.1 Sensitive Data Restriction</h3>
            <p>Do not send personal or highly sensitive data in inference prompts. The Controller is solely responsible for the content of data submitted through the Platform.</p>
            <h3>3.2 Data Minimization</h3>
            <p>The Processor enforces data minimization and may reject high-risk data patterns.</p>

            <h2>4. Datacenter Processing Disclosure</h2>
            <h3>4.1 Processing Location</h3>
            <p>GPU inventory used for early access may be hosted in United States-based datacenters.</p>
            <h3>4.2 Performance Variability</h3>
            <p>Performance may vary based on location, availability, or priority levels (batch to high priority).</p>
            <h3>4.3 Cluster Configuration</h3>
            <p>Cluster configuration, including interconnect, network fabric, or tenancy, is determined by the underlying provider and is not uniform across all nodes.</p>

            <h2>5. Security Measures</h2>
            <p>The Processor shall implement the following security measures:</p>
            <ul>
              <li>Encryption in transit where supported</li>
              <li>DNSSEC and registrar lock</li>
              <li>Secure API key issuance</li>
              <li>Restricted internal access</li>
              <li>Usage logs containing model used, timestamp, latency, request priority, and job status</li>
            </ul>

            <h2>6. Breach Notification</h2>
            <h3>6.1 Notification Timeline</h3>
            <p>The Processor shall notify the Controller within 72 hours if a data breach is detected.</p>
            <h3>6.2 Notification Contents</h3>
            <p>Notification will include the scope of the breach, its impact, and the mitigation steps being taken.</p>

            <h2>7. Data Retention & Deletion</h2>
            <h3>7.1 Controller Deletion Rights</h3>
            <p>The Controller may request deletion of their data at any time by contacting support.</p>
            <h3>7.2 Deletion Timeline</h3>
            <p>The Processor will delete inference job data within 30 days of account cancellation or a Controller deletion request.</p>

            <h2>8. Sub-processors</h2>
            <h3>8.1 Sub-processor Use</h3>
            <p>The Processor may route jobs through sub-processors including GPU datacenter partners or decentralized inference nodes.</p>
            <h3>8.2 Sub-processor Obligations</h3>
            <p>All sub-processors are bound by the same security and purpose limitations as the Processor under this Agreement.</p>

            <h2>9. Audits & Logs</h2>
            <h3>9.1 Usage Logs</h3>
            <p>The Processor provides request-level usage logs for attribution, including model used, timestamp, latency, and job status.</p>
            <h3>9.2 Audit Access</h3>
            <p>Logs may be audited by the Controller or their authorized engineer. Audit requests can be submitted via support.</p>

            <h2>10. Data Residency Changes</h2>
            <h3>10.1 Future Locations</h3>
            <p>Future infrastructure expansions may introduce new processing locations.</p>
            <h3>10.2 Controller Notification</h3>
            <p>The Controller will be notified of any material changes to data residency in advance.</p>
          </div>
        </div>
      </section>
    </>
  );
}
