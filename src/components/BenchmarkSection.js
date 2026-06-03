import { motion } from "framer-motion";
import BenchmarkTable from "@/components/BenchmarkTable";
import { HIGHLIGHTS, getRow } from "@/data/benchmarks";

export default function BenchmarkSection() {
  const cards = HIGHLIGHTS.map((h) => {
    const row = getRow(h.group, h.row);
    return row ? { label: h.row, value: row.v.k26 } : null;
  }).filter(Boolean);

  return (
    <section className="common-section" id="benchmarks">
      <style suppressHydrationWarning>{`
        .bm-highlights { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; max-width: 1000px; margin: 34px auto 40px; }
        @media (max-width: 768px) { .bm-highlights { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 460px) { .bm-highlights { grid-template-columns: 1fr; } }
        .bm-hcard { background: rgba(3,247,181,0.05); border: 1px solid rgba(3,247,181,0.2); border-radius: 14px; padding: 20px 18px; text-align: center; }
        .bm-hval { font-family: 'Unbounded', sans-serif; font-size: 30px; font-weight: 800; color: #03F7B5; line-height: 1; }
        .bm-hlabel { font-size: 12px; color: #9CA3AF; margin-top: 10px; line-height: 1.4; }
        .bm-hbest { font-size: 9px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #03F7B5; margin-top: 10px; }
      `}</style>
      <div className="container">
        <div className="text-center">
          <motion.div className="section-badge" viewport={{ once: true }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.7 }} initial={{ opacity: 0, y: 30, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}>
            <span>Benchmarks</span>
          </motion.div>
          <h2 className="section-heading">Frontier performance, served on Oxlo.ai</h2>
          <motion.p
            className="section-desc"
            viewport={{ once: true }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.8, delay: 0.2 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Kimi K2.6, available on Oxlo.ai, goes head to head with the frontier labs. Here is how it compares with GPT-5.4, Claude Opus 4.6, and Gemini 3.1 Pro.
          </motion.p>
        </div>

        <motion.div
          className="bm-highlights"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.8, delay: 0.2 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {cards.map((c) => (
            <div key={c.label} className="bm-hcard">
              <div className="bm-hval">{c.value.toFixed(1)}</div>
              <div className="bm-hlabel">{c.label}</div>
              <div className="bm-hbest">Best in class</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.9, delay: 0.2 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <BenchmarkTable />
        </motion.div>
      </div>
    </section>
  );
}
