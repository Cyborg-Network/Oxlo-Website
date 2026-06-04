import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import shield from "../../public/images/shield.svg";

export default function PrivacyHighlight() {
  return (
    <section className="common-section">
      <style suppressHydrationWarning>{`
        .pv-band { max-width: 1000px; margin: 0 auto; display: flex; align-items: center; gap: 24px; padding: 32px 36px; background: rgba(3,247,181,0.05); border: 1px solid rgba(3,247,181,0.2); border-radius: 20px; }
        .pv-icon { flex-shrink: 0; width: 56px; height: 56px; border-radius: 14px; background: rgba(3,247,181,0.1); border: 1px solid rgba(3,247,181,0.25); display: flex; align-items: center; justify-content: center; }
        .pv-icon img { width: 26px; height: 26px; }
        .pv-title { font-family: 'Unbounded', sans-serif; font-size: 20px; font-weight: 800; color: #fff; margin: 0 0 6px 0; line-height: 1.25; }
        .pv-desc { font-size: 14px; color: #9CA3AF; margin: 0; line-height: 1.6; }
        .pv-desc a { color: #03F7B5; text-decoration: none; font-weight: 700; }
        .pv-desc a:hover { text-decoration: underline; }
        @media (max-width: 600px) { .pv-band { flex-direction: column; text-align: center; padding: 28px 22px; } }
      `}</style>
      <div className="container">
        <motion.div
          className="pv-band"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.8 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="pv-icon">
            <Image src={shield} alt="privacy shield" />
          </div>
          <div className="pv-text">
            <h2 className="pv-title">We never sell your data and never train on your prompts</h2>
            <p className="pv-desc">
              Your prompts and outputs stay yours. We do not sell your data, and we never use your inputs to train models. <Link href="/privacy-policy">Read our privacy policy</Link>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
