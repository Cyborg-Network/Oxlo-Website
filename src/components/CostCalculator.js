import React, { useState, useMemo, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// COMPETITOR PRICING DATA (per 1M tokens)
//
// Sources:
//   Together AI:  together.ai/pricing (direct scrape Apr 2026)
//   Fireworks AI: fireworks.ai/pricing (web search + page)
//   OpenRouter:   openrouter.ai/models (aggregator)
//   Groq:         groq.com (web search, LPU inference)
//   Hugging Face: huggingface.co (gateway, pass-through pricing)
//
// Oxlo Plans:
//   Pro:     $80/mo,  1000 req/day
//   Premium: $350/mo, 5000 req/day
//   Enterprise: Custom, 15% guaranteed reduction
// ═══════════════════════════════════════════════════════════════════════════

const MODELS = [
  { id: 'dsr1', name: 'DeepSeek R1' },
  { id: 'dsv4f', name: 'DeepSeek V4 Flash' },
  { id: 'kimik26', name: 'Kimi K2.6' },
  { id: 'kimik25', name: 'Kimi K2.5' },
  { id: 'kimik2t', name: 'Kimi K2 Thinking' },
  { id: 'llama4m', name: 'Llama 4 Maverick' },
  { id: 'dsv3', name: 'DeepSeek V3 0324' },
  { id: 'dsv32', name: 'DeepSeek V3.2' },
  { id: 'gptoss', name: 'GPT-OSS 120B' },
  { id: 'llama33', name: 'Llama 3.3 70B' },
  { id: 'minimax', name: 'MiniMax M2.5' },
  { id: 'glm5', name: 'GLM-5' },
];

// Competitor pricing per 1M tokens { i: input, o: output }
const COMP = {
  dsr1: { fw: { i: 0.55, o: 2.19 }, tog: { i: 3.00, o: 7.00 }, hf: { i: 0.60, o: 2.50 }, groq: { i: 0.75, o: 0.99 }, or: { i: 0.55, o: 2.19 } },
  dsv4f: { fw: { i: 0.14, o: 0.28 }, tog: { i: 0.18, o: 0.35 }, hf: { i: 0.14, o: 0.28 }, groq: { i: 0.10, o: 0.20 }, or: { i: 0.14, o: 0.28 } },
  kimik26: { fw: { i: 0.95, o: 4.00 }, tog: { i: 0.80, o: 3.50 }, hf: { i: 0.70, o: 3.00 }, groq: { i: 0.65, o: 2.80 }, or: { i: 0.80, o: 3.50 } },
  kimik25: { fw: { i: 0.60, o: 3.00 }, tog: { i: 0.50, o: 2.80 }, hf: { i: 0.55, o: 2.80 }, groq: { i: 0.50, o: 2.50 }, or: { i: 0.55, o: 2.90 } },
  kimik2t: { fw: { i: 0.60, o: 3.00 }, tog: { i: 1.00, o: 3.00 }, hf: { i: 0.58, o: 2.90 }, groq: { i: 0.55, o: 2.80 }, or: { i: 0.60, o: 3.00 } },
  llama4m: { fw: { i: 0.40, o: 1.60 }, tog: { i: 0.60, o: 3.60 }, hf: { i: 0.35, o: 1.40 }, groq: { i: 0.20, o: 0.60 }, or: { i: 0.30, o: 1.30 } },
  dsv3: { fw: { i: 0.90, o: 0.90 }, tog: { i: 1.25, o: 1.25 }, hf: { i: 0.80, o: 0.85 }, groq: { i: 0.25, o: 0.65 }, or: { i: 0.90, o: 0.90 } },
  dsv32: { fw: { i: 0.56, o: 1.68 }, tog: { i: 0.60, o: 1.70 }, hf: { i: 0.50, o: 1.50 }, groq: { i: 0.30, o: 0.80 }, or: { i: 0.56, o: 1.68 } },
  gptoss: { fw: { i: 0.08, o: 0.30 }, tog: { i: 0.15, o: 0.60 }, hf: { i: 0.07, o: 0.28 }, groq: { i: 0.10, o: 0.25 }, or: { i: 0.10, o: 0.40 } },
  llama33: { fw: { i: 0.20, o: 0.20 }, tog: { i: 0.88, o: 0.88 }, hf: { i: 0.18, o: 0.18 }, groq: { i: 0.59, o: 0.79 }, or: { i: 0.18, o: 0.18 } },
  minimax: { fw: { i: 0.35, o: 1.40 }, tog: { i: 0.30, o: 1.20 }, hf: { i: 0.32, o: 1.30 }, groq: { i: 0.28, o: 1.10 }, or: { i: 0.30, o: 1.25 } },
  glm5: { fw: { i: 0.90, o: 3.00 }, tog: { i: 1.00, o: 3.20 }, hf: { i: 0.85, o: 2.90 }, groq: { i: 0.70, o: 2.50 }, or: { i: 0.85, o: 2.80 } },
};

const LOBE_CDN = 'https://unpkg.com/@lobehub/icons-static-svg@1.84.0/icons';

const PROVIDERS = [
  { key: 'fw', name: 'Fireworks AI', short: 'FW', color: '239, 68, 68', logo: <img src={`${LOBE_CDN}/fireworks-color.svg`} width={18} height={18} alt="FW" /> },
  { key: 'tog', name: 'Together AI', short: 'TG', color: '67, 56, 202', logo: <img src={`${LOBE_CDN}/together-color.svg`} width={18} height={18} alt="TG" /> },
  { key: 'hf', name: 'Hugging Face', short: 'HF', color: '252, 211, 77', logo: <img src={`${LOBE_CDN}/huggingface-color.svg`} width={18} height={18} alt="HF" /> },
  { key: 'groq', name: 'Groq', short: 'GQ', color: '249, 115, 22', logo: <img src={`${LOBE_CDN}/groq.svg`} width={18} height={18} alt="GQ" style={{ filter: 'invert(1)' }} /> },
  { key: 'or', name: 'OpenRouter', short: 'OR', color: '139, 92, 246', logo: <img src={`${LOBE_CDN}/openrouter.svg`} width={18} height={18} alt="OR" style={{ filter: 'invert(1)' }} /> },
];

// K/M/B unit multipliers
const TOKEN_UNITS = [
  { label: 'K', multi: 1e3 },
  { label: 'M', multi: 1e6 },
  { label: 'B', multi: 1e9 },
];

function fmtUSD(n) {
  if (n >= 1000) return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  if (n >= 1) return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return '$' + n.toFixed(2);
}

function formatTokens(num) {
  if (num >= 1e9) return (num / 1e9).toFixed(num % 1e9 !== 0 ? 1 : 0) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(num % 1e6 !== 0 ? 1 : 0) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(num % 1e3 !== 0 ? 1 : 0) + 'K';
  return num.toString();
}

// ─── Token Input with K/M/B Toggle ───
function TokenInput({ label, value, onChange, maxTokens }) {
  // Determine best initial unit
  const getUnit = (v) => {
    if (v >= 1e9) return 'B';
    if (v >= 1e6) return 'M';
    return 'K';
  };
  const [unit, setUnit] = useState(getUnit(value));
  const unitMulti = TOKEN_UNITS.find(u => u.label === unit)?.multi || 1e6;
  const displayVal = value / unitMulti;

  const handleNumChange = (e) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    if (raw === '' || raw === '.') { onChange(0); return; }
    const num = parseFloat(raw);
    if (!isNaN(num)) onChange(Math.max(0, Math.min(num * unitMulti, maxTokens)));
  };

  const handleUnitSwitch = (newUnit) => {
    setUnit(newUnit);
    // Value stays the same, just display changes
  };

  return (
    <div style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="oxc-tk-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600 }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          <div style={{ background: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: '6px 0 0 6px', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none' }}>
            <input
              type="text"
              className="oxc-num"
              value={displayVal % 1 === 0 ? displayVal.toFixed(0) : displayVal.toFixed(1)}
              onChange={handleNumChange}
              style={{ width: '70px' }}
            />
          </div>
          <div style={{ display: 'flex', borderRadius: '0 6px 6px 0', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            {TOKEN_UNITS.map(u => (
              <button
                key={u.label}
                onClick={() => handleUnitSwitch(u.label)}
                style={{
                  background: unit === u.label ? 'rgba(3,247,181,0.15)' : 'rgba(0,0,0,0.5)',
                  color: unit === u.label ? '#03F7B5' : '#6B7280',
                  border: 'none',
                  padding: '6px 10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  borderLeft: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {u.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <input type="range" className="oxc-range" min={100000} max={maxTokens} step={1000000} value={value} onChange={(e) => onChange(Number(e.target.value))}
        style={{ background: `linear-gradient(to right, #03F7B5 ${(value / maxTokens) * 100}%, rgba(255,255,255,0.05) ${(value / maxTokens) * 100}%)` }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
        <span style={{ fontSize: '10px', color: '#4B5563' }}>100K</span>
        <span style={{ fontSize: '10px', color: '#4B5563' }}>10B</span>
      </div>
    </div>
  );
}

// ─── Contact Form Modal ───
function QuoteFormModal({ isOpen, onClose, prefill }) {
  const [form, setForm] = useState({
    name: '', workEmail: '', jobTitle: '', companyName: '', country: '', phone: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!isOpen) return null;

  const handleChange = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    const selectedModelNames = prefill.models.map(id => MODELS.find(m => m.id === id)?.name || id).join(', ');

    // Auto-submit via FormSubmit.co — sends email to hello@cyborgnetwork.io automatically
    try {
      const res = await fetch('https://formsubmit.co/ajax/hello@cyborgnetwork.io', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'Enterprise Quote Request - Oxlo.ai Cost Calculator',
          _template: 'table',
          Name: form.name,
          'Work Email': form.workEmail,
          'Job Title': form.jobTitle,
          'Company Name': form.companyName || 'N/A',
          'Country / Region': form.country,
          Phone: form.phone || 'N/A',
          'Monthly Input Tokens': formatTokens(prefill.inputTokens),
          'Monthly Output Tokens': formatTokens(prefill.outputTokens),
          'Selected Models': selectedModelNames,
          'Estimated Competitor Cost': fmtUSD(prefill.competitorCost) + '/mo',
          'Estimated Oxlo Cost': fmtUSD(prefill.oxloCost) + '/mo',
          Message: form.message || 'N/A',
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); setForm({ name: '', workEmail: '', jobTitle: '', companyName: '', country: '', phone: '', message: '' }); onClose(); }, 3000);
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff',
    fontSize: '13px', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s',
  };

  const labelStyle = { fontSize: '11px', color: '#9CA3AF', fontWeight: 600, marginBottom: '4px', display: 'block' };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', animation: 'fadeIn 0.2s ease',
    }} onClick={onClose}>
      <div style={{
        background: 'rgba(15,20,30,0.97)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
        maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '32px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
      }} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0, fontFamily: "'Unbounded', sans-serif" }}>Get a Quote</h3>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0 0' }}>Your calculator selections are prefilled below</p>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
            width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#9CA3AF', fontSize: '16px',
          }}>✕</button>
        </div>

        {/* Prefilled Usage Summary */}
        <div style={{
          padding: '14px', background: 'rgba(3,247,181,0.05)', border: '1px solid rgba(3,247,181,0.15)',
          borderRadius: '10px', marginBottom: '20px',
        }}>
          <div style={{ fontSize: '10px', color: '#03F7B5', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            Your Usage Selection
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#D1D5DB' }}>
            <div><span style={{ color: '#6B7280' }}>Input: </span>{formatTokens(prefill.inputTokens)}</div>
            <div><span style={{ color: '#6B7280' }}>Output: </span>{formatTokens(prefill.outputTokens)}</div>
            <div style={{ gridColumn: '1/3' }}>
              <span style={{ color: '#6B7280' }}>Models: </span>
              {prefill.models.map(id => MODELS.find(m => m.id === id)?.name || id).join(', ')}
            </div>
          </div>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="rgba(3,247,181,0.12)" />
                <circle cx="24" cy="24" r="18" fill="rgba(3,247,181,0.2)" />
                <path d="M16 24l6 6 10-12" stroke="#03F7B5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#03F7B5', fontFamily: "'Unbounded', sans-serif" }}>
              Quote request sent!
            </div>
            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px' }}>
              Our team will get back to you shortly.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input style={inputStyle} required value={form.name} onChange={handleChange('name')} placeholder="John Doe" onFocus={(e) => e.target.style.borderColor = 'rgba(3,247,181,0.4)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              <div>
                <label style={labelStyle}>Work Email *</label>
                <input style={inputStyle} type="email" required value={form.workEmail} onChange={handleChange('workEmail')} placeholder="john@company.com" onFocus={(e) => e.target.style.borderColor = 'rgba(3,247,181,0.4)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              <div>
                <label style={labelStyle}>Job Title *</label>
                <input style={inputStyle} required value={form.jobTitle} onChange={handleChange('jobTitle')} placeholder="CTO" onFocus={(e) => e.target.style.borderColor = 'rgba(3,247,181,0.4)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              <div>
                <label style={labelStyle}>Company Name <span style={{ color: '#4B5563' }}>(Optional)</span></label>
                <input style={inputStyle} value={form.companyName} onChange={handleChange('companyName')} placeholder="Acme Inc" onFocus={(e) => e.target.style.borderColor = 'rgba(3,247,181,0.4)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              <div>
                <label style={labelStyle}>Country / Region *</label>
                <input style={inputStyle} required value={form.country} onChange={handleChange('country')} placeholder="United States" onFocus={(e) => e.target.style.borderColor = 'rgba(3,247,181,0.4)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              <div>
                <label style={labelStyle}>Phone <span style={{ color: '#4B5563' }}>(Optional)</span></label>
                <input style={inputStyle} value={form.phone} onChange={handleChange('phone')} placeholder="+1 234 567 890" onFocus={(e) => e.target.style.borderColor = 'rgba(3,247,181,0.4)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
            </div>

            <div style={{ marginTop: '14px' }}>
              <label style={labelStyle}>Message <span style={{ color: '#4B5563' }}>(Optional)</span></label>
              <textarea style={{ ...inputStyle, minHeight: '70px', resize: 'vertical' }} value={form.message} onChange={handleChange('message')} placeholder="Tell us about your use case..."
                onFocus={(e) => e.target.style.borderColor = 'rgba(3,247,181,0.4)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
            </div>

            {submitError && (
              <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', fontSize: '12px', color: '#EF4444' }}>
                {submitError}
              </div>
            )}
            <button type="submit" disabled={submitting} className="oxc-cta" style={{ background: submitting ? 'rgba(3,247,181,0.5)' : '#03F7B5', color: '#000', marginTop: '20px', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }}>
              {submitting ? (
                <>
                  <div style={{ width: '16px', height: '16px', border: '2px solid rgba(0,0,0,0.2)', borderTop: '2px solid #000', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                  Sending...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  Submit Quote Request
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}


export default function CostCalculator() {
  const [isVisible, setIsVisible] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const [selectedModels, setSelectedModels] = useState(['dsr1']);
  const [inputTokens, setInputTokens] = useState(20000000);   // 20M monthly input tokens
  const [outputTokens, setOutputTokens] = useState(10000000);  // 10M monthly output tokens

  const maxTokens = 10000000000; // 10 Billion

  const toggleModel = (id) => {
    setSelectedModels(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter(m => m !== id);
      }
      return [...prev, id];
    });
  };

  const handleInChange = (val) => setInputTokens(Math.max(0, Math.min(val, maxTokens)));
  const handleOutChange = (val) => setOutputTokens(Math.max(0, Math.min(val, maxTokens)));

  // Calculate each competitor's cost (blended across selected models)
  const providerCosts = useMemo(() => {
    const result = {};
    PROVIDERS.forEach(p => {
      let total = 0;
      selectedModels.forEach(mId => {
        const rates = COMP[mId]?.[p.key];
        if (!rates) return;
        total += (inputTokens / 1_000_000) * rates.i + (outputTokens / 1_000_000) * rates.o;
      });
      result[p.key] = total / selectedModels.length;
    });
    return result;
  }, [selectedModels, inputTokens, outputTokens]);

  const compCostValues = Object.values(providerCosts);
  const avgCompCost = compCostValues.reduce((a, b) => a + b, 0) / PROVIDERS.length;
  const minCompCost = Math.min(...compCostValues);
  const maxCompCost = Math.max(...compCostValues);

  // ─── OXLO PRICING (plan recommendation based on cheapest competitor) ───
  let tierKey = 'pro';
  if (minCompCost >= 500) tierKey = 'enterprise';
  else if (minCompCost >= 350) tierKey = 'premium';

  let oxloCost = 0;
  let tierLabel = '';
  if (tierKey === 'pro') {
    oxloCost = 80;
    tierLabel = 'Pro';
  } else if (tierKey === 'premium') {
    oxloCost = 350;
    tierLabel = 'Premium';
  } else {
    oxloCost = minCompCost * 0.85;
    tierLabel = 'Enterprise';
  }

  const savings = Math.max(minCompCost - oxloCost, 0);
  const savePct = minCompCost > 0 && savings > 0 ? Math.round((savings / minCompCost) * 100) : 0;
  const showSavings = savings > 0.5;

  const sortedProviders = [...PROVIDERS].sort((a, b) => providerCosts[b.key] - providerCosts[a.key]);

  // Talk to Sales link — placeholder until calendar link is provided
  const talkToSalesUrl = 'https://calendly.com/oxlo_ai/enterprise';

  return (
    <div ref={containerRef} className={`oxc-root ${isVisible ? 'visible' : ''}`}>
      <style suppressHydrationWarning>{`
        .oxc-root { position: relative; width: 100%; padding: 40px 0 80px 0; font-family: inherit; margin-bottom: 60px; overflow: hidden; }
        .oxc-grid {
          position: relative; z-index: 1; color: #fff; display: grid; grid-template-columns: 1fr 1fr;
          max-width: 1100px; margin: 0 auto; background: rgba(10, 15, 22, 0.7);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.06); border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        /* min-width:0 lets the monospace price column shrink instead of forcing
           horizontal overflow (which made the page jitter on phones). */
        .oxc-grid > .oxc-panel { min-width: 0; }
        @media (max-width: 768px) {
          .oxc-grid {
            grid-template-columns: 1fr;
            /* backdrop blur is a heavy mobile repaint; the animated background is
               already disabled on touch, so the panel just needs a solid fill. */
            background: rgba(10, 15, 22, 0.94);
            backdrop-filter: none; -webkit-backdrop-filter: none;
          }
        }
        .oxc-num[type=text] { background: transparent; border: none; color: #fff; outline: none; font-family: inherit; width: 110px; text-align: right; font-size: 15px; font-weight: 700; }
        .oxc-range { -webkit-appearance: none; width: 100%; height: 4px; background: rgba(255,255,255,0.08); border-radius: 4px; outline: none; cursor: pointer; }
        .oxc-range::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #03F7B5; cursor: pointer; }
        .oxc-panel { padding: 36px; }
        .oxc-panel-l { border-right: 1px solid rgba(255,255,255,0.04); opacity: 0; transform: translateX(-40px); transition: all 2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s; }
        .oxc-panel-r { opacity: 0; transform: translateX(40px); transition: all 2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s; }
        .oxc-root.visible .oxc-panel-l, .oxc-root.visible .oxc-panel-r { opacity: 1; transform: translateX(0); }
        @media (max-width: 768px) { .oxc-panel-l { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.04); } .oxc-panel { padding: 24px; } }
        .oxc-lbl { font-size: 11px; color: #6B7280; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; display: block; }
        .oxc-mbtn { background: rgba(255,255,255,0.03); color: #9CA3AF; border: 1px solid rgba(255,255,255,0.08); padding: 5px 10px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        .oxc-mbtn:hover { border-color: rgba(255,255,255,0.2); }
        .oxc-mbtn.sel { background: rgba(3,247,181,0.1); color: #03F7B5; border-color: rgba(3,247,181,0.5); }
        .oxc-cta { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; text-decoration: none; border: none; width: 100%; justify-content: center; font-family: 'Unbounded', sans-serif; }
        .oxc-cta:hover { transform: translateY(-1px); filter: brightness(1.1); }
        .oxc-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; margin-bottom: 8px; }
        .oxc-row:hover { background: rgba(255,255,255,0.04); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        /* The 90px blur glow is expensive to repaint on mobile GPUs; hide it on
           phones where it adds noticeable lag while the calculator updates. */
        @media (max-width: 768px) { .oxc-glow { display: none; } }
        /* Let the token-input header wrap so the K/M/B controls never overflow a
           narrow screen. */
        @media (max-width: 480px) { .oxc-tk-head { flex-wrap: wrap; gap: 8px; } }
      `}</style>

      <div className="oxc-glow" style={{ position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '10%', background: 'radial-gradient(ellipse at center, rgba(3,247,181,0.12) 0%, transparent 70%)', filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0 }}></div>

      <div className="oxc-grid">

        {/* ─── LEFT: Controls ─── */}
        <div className="oxc-panel oxc-panel-l">

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(3,247,181,0.08)', border: '1px solid rgba(3,247,181,0.25)', marginBottom: '20px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#03F7B5' }}></div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#03F7B5' }}>{tierLabel}</span>
            <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>
              {tierKey === 'enterprise' ? 'Custom' : tierKey === 'premium' ? '$350/mo' : '$80/mo'}
            </span>
          </div>

          {/* Updated title: "Cost Calculator" with no dash */}
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', color: '#03F7B5', letterSpacing: '0.15em', fontWeight: 700, textTransform: 'uppercase' }}>Cost Calculator</span>
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 6px 0', lineHeight: 1.1 }}>
            See how much you<br /><span style={{ color: '#03F7B5' }}>actually save</span>
          </h2>
          {/* Updated subtext */}
          <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 20px 0', lineHeight: 1.5 }}>
            Compare your current inference spend against Oxlo.ai&apos;s pricing
          </p>

          <div style={{ marginBottom: '20px' }}>
            <span className="oxc-lbl">Select Models (multi-select)</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {MODELS.map(m => (
                <button key={m.id} className={`oxc-mbtn ${selectedModels.includes(m.id) ? 'sel' : ''}`} onClick={() => toggleModel(m.id)}>
                  {selectedModels.includes(m.id) && <span style={{ marginRight: '4px' }}>&#10003;</span>}
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Token Inputs with K/M/B toggle */}
          <TokenInput label="Monthly Input Tokens" value={inputTokens} onChange={handleInChange} maxTokens={maxTokens} />
          <TokenInput label="Monthly Output Tokens" value={outputTokens} onChange={handleOutChange} maxTokens={maxTokens} />
        </div>

        {/* ─── RIGHT: Results ─── */}
        <div className="oxc-panel oxc-panel-r" style={{ background: 'rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' }}>

          <span className="oxc-lbl">Monthly Cost Comparison</span>

          {/* Competitor Rows */}
          {sortedProviders.map((p) => {
            const barPct = maxCompCost > 0 ? Math.min((providerCosts[p.key] / maxCompCost) * 100, 100) : 0;
            return (
              <div key={p.key} className="oxc-row" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${barPct}%`, background: `linear-gradient(90deg, rgba(${p.color}, 0.05) 0%, rgba(${p.color}, 0.15) 100%)`, borderRadius: '10px', transition: 'width 0.4s ease', pointerEvents: 'none' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `rgba(${p.color}, 0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: `1px solid rgba(${p.color}, 0.2)` }}>
                    {p.logo}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#D1D5DB', fontFamily: "'Unbounded', sans-serif" }}>{p.name}</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff', fontFamily: 'monospace', position: 'relative', zIndex: 1 }}>{fmtUSD(providerCosts[p.key])}</span>
              </div>
            );
          })}

          {/* Oxlo Row — fixed icon: use white icon on dark bg */}
          {(() => {
            const oxBarPct = maxCompCost > 0 ? Math.min((oxloCost / maxCompCost) * 100, 100) : 0;
            return (
              <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'rgba(3,247,181,0.06)', border: '1px solid rgba(3,247,181,0.25)', borderRadius: '10px', marginTop: '4px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${oxBarPct}%`, background: 'linear-gradient(90deg, rgba(3,247,181,0.1) 0%, rgba(3,247,181,0.3) 100%)', borderRadius: '10px', transition: 'width 0.4s ease', pointerEvents: 'none' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(10, 15, 22, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(3,247,181,0.3)' }}>
                    <img src="/images/oxlo-favicon.ico" alt="Oxlo" width="26" height="26" style={{ borderRadius: '4px' }} />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#03F7B5', fontFamily: "'Unbounded', sans-serif" }}>Oxlo.ai</span>
                  {savePct > 0 && (
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#03F7B5', background: 'rgba(3,247,181,0.15)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(3,247,181,0.3)' }}>
                      SAVE {savePct}%
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#03F7B5', fontFamily: 'monospace', position: 'relative', zIndex: 1 }}>
                  {tierKey === 'enterprise' ? '~' : ''}{fmtUSD(oxloCost)}
                </span>
              </div>
            );
          })()}

          {/* Savings Box */}
          <div style={{
            marginTop: '20px', padding: '20px', background: 'rgba(3,247,181,0.05)', border: '1px dashed rgba(3,247,181,0.3)', borderRadius: '12px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Unbounded', sans-serif"
          }}>
            {showSavings ? (
              <>
                <div>
                  <div style={{ fontSize: '11px', color: '#03F7B5', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>
                    You save with Oxlo.ai
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <div style={{ fontSize: '30px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{fmtUSD(savings)}</div>
                    <div style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 600 }}>/mo</div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>vs. cheapest competitor</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '30px', fontWeight: 800, color: '#03F7B5', lineHeight: 1 }}>{savePct}%</div>
                  <div style={{ fontSize: '10px', color: '#6B7280', marginTop: '3px', fontWeight: 700, textTransform: 'uppercase' }}>Cost Reduction</div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ fontSize: '11px', color: '#03F7B5', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>
                  Flat pricing, no surprises
                </div>
                <div style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.5 }}>
                  Increase token usage to see how flat pricing outperforms per-token billing at scale.
                </div>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div style={{ marginTop: '16px' }}>
            {tierKey === 'enterprise' ? (
              /* Enterprise: TWO buttons — Get a Quote + Talk to Sales */
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setShowQuoteForm(true)} className="oxc-cta" style={{ background: '#03F7B5', color: '#000', flex: 1 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  Get a Quote
                </button>
                <a href={talkToSalesUrl} target="_blank" rel="noopener noreferrer" className="oxc-cta" style={{ background: 'transparent', color: '#03F7B5', border: '1px solid rgba(3,247,181,0.4)', flex: 1 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  Talk to Sales
                </a>
              </div>
            ) : (
              <a href="/pricing" className="oxc-cta" style={{ background: '#03F7B5', color: '#000' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                View Pricing
              </a>
            )}
          </div>

          {/* Enterprise disclaimer */}
          {tierKey === 'enterprise' && (
            <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <p style={{ fontSize: '11px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
                * Estimated projection based on a guaranteed minimum 15% cost reduction.
                Actual pricing is custom-tailored per contract.{' '}
                <a href="mailto:hello@cyborgnetwork.io" style={{ color: '#03F7B5', textDecoration: 'none', fontWeight: 700 }}>Contact Us</a>
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Quote Form Modal — prefilled with calculator data */}
      <QuoteFormModal
        isOpen={showQuoteForm}
        onClose={() => setShowQuoteForm(false)}
        prefill={{
          inputTokens,
          outputTokens,
          models: selectedModels,
          competitorCost: minCompCost,
          oxloCost,
        }}
      />
    </div>
  );
}