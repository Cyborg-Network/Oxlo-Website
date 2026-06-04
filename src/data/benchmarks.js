// Kimi K2.6 benchmark data.
// Source: Moonshot AI, https://www.kimi.com/blog/kimi-k2-6
// null = not reported by the source ("—"). repro = keys the source marked reproduced ("*").
// models[0] is Kimi K2.6, which is served on Oxlo.ai.

export const BENCHMARK_SOURCE = {
  label: "Moonshot AI, Kimi K2.6 report",
  url: "https://www.kimi.com/blog/kimi-k2-6",
};

export const BENCHMARK_MODELS = [
  { key: "k26", name: "Kimi K2.6", note: "", primary: true },
  { key: "gpt", name: "GPT-5.4", note: "xhigh" },
  { key: "claude", name: "Claude Opus 4.6", note: "max effort" },
  { key: "gemini", name: "Gemini 3.1 Pro", note: "thinking high" },
  { key: "k25", name: "Kimi K2.5", note: "" },
];

export const BENCHMARK_GROUPS = [
  {
    name: "Agentic",
    rows: [
      { name: "HLE-Full w/ tools", v: { k26: 54.0, gpt: 52.1, claude: 53.0, gemini: 51.4, k25: 50.2 } },
      { name: "BrowseComp", v: { k26: 83.2, gpt: 82.7, claude: 83.7, gemini: 85.9, k25: 74.9 } },
      { name: "BrowseComp (agent swarm)", v: { k26: 86.3, gpt: null, claude: null, gemini: null, k25: 78.4 } },
      { name: "DeepSearchQA (f1-score)", v: { k26: 92.5, gpt: 78.6, claude: 91.3, gemini: 81.9, k25: 89.0 } },
      { name: "DeepSearchQA (accuracy)", v: { k26: 83.0, gpt: 63.7, claude: 80.6, gemini: 60.2, k25: 77.1 } },
      { name: "WideSearch (item-f1)", v: { k26: 80.8, gpt: null, claude: null, gemini: null, k25: 72.7 } },
      { name: "Toolathlon", v: { k26: 50.0, gpt: 54.6, claude: 47.2, gemini: 48.8, k25: 27.8 } },
      { name: "MCPMark", v: { k26: 55.9, gpt: 62.5, claude: 56.7, gemini: 55.9, k25: 29.5 }, repro: ["gpt", "claude", "gemini"] },
      { name: "Claw Eval (pass^3)", v: { k26: 62.3, gpt: 60.3, claude: 70.4, gemini: 57.8, k25: 52.3 } },
      { name: "Claw Eval (pass@3)", v: { k26: 80.9, gpt: 78.4, claude: 82.4, gemini: 82.9, k25: 75.4 } },
      { name: "APEX-Agents", v: { k26: 27.9, gpt: 33.3, claude: 33.0, gemini: 32.0, k25: 11.5 } },
      { name: "OSWorld-Verified", v: { k26: 73.1, gpt: 75.0, claude: 72.7, gemini: null, k25: 63.3 } },
    ],
  },
  {
    name: "Coding",
    rows: [
      { name: "Terminal-Bench 2.0 (Terminus-2)", v: { k26: 66.7, gpt: 65.4, claude: 65.4, gemini: 68.5, k25: 50.8 }, repro: ["gpt"] },
      { name: "SWE-Bench Pro", v: { k26: 58.6, gpt: 57.7, claude: 53.4, gemini: 54.2, k25: 50.7 } },
      { name: "SWE-Bench Multilingual", v: { k26: 76.7, gpt: null, claude: 77.8, gemini: 76.9, k25: 73.0 }, repro: ["gemini"] },
      { name: "SWE-Bench Verified", v: { k26: 80.2, gpt: null, claude: 80.8, gemini: 80.6, k25: 76.8 } },
      { name: "SciCode", v: { k26: 52.2, gpt: 56.6, claude: 51.9, gemini: 58.9, k25: 48.7 } },
      { name: "OJBench (python)", v: { k26: 60.6, gpt: null, claude: 60.3, gemini: 70.7, k25: 54.7 } },
      { name: "LiveCodeBench (v6)", v: { k26: 89.6, gpt: null, claude: 88.8, gemini: 91.7, k25: 85.0 } },
    ],
  },
  {
    name: "Reasoning & Knowledge",
    rows: [
      { name: "HLE-Full", v: { k26: 34.7, gpt: 39.8, claude: 40.0, gemini: 44.4, k25: 30.1 } },
      { name: "AIME 2026", v: { k26: 96.4, gpt: 99.2, claude: 96.7, gemini: 98.3, k25: 95.8 } },
      { name: "HMMT 2026 (Feb)", v: { k26: 92.7, gpt: 97.7, claude: 96.2, gemini: 94.7, k25: 87.1 } },
      { name: "IMO-AnswerBench", v: { k26: 86.0, gpt: 91.4, claude: 75.3, gemini: 91.0, k25: 81.8 }, repro: ["gemini"] },
      { name: "GPQA-Diamond", v: { k26: 90.5, gpt: 92.8, claude: 91.3, gemini: 94.3, k25: 87.6 } },
    ],
  },
  {
    name: "Vision",
    rows: [
      { name: "MMMU-Pro", v: { k26: 79.4, gpt: 81.2, claude: 73.9, gemini: 83.0, k25: 78.5 }, repro: ["gemini"] },
      { name: "MMMU-Pro w/ python", v: { k26: 80.1, gpt: 82.1, claude: 77.3, gemini: 85.3, k25: 77.7 }, repro: ["gemini"] },
      { name: "CharXiv (RQ)", v: { k26: 80.4, gpt: 82.8, claude: 69.1, gemini: 80.2, k25: 77.5 }, repro: ["gpt", "gemini"] },
      { name: "CharXiv (RQ) w/ python", v: { k26: 86.7, gpt: 90.0, claude: 84.7, gemini: 89.9, k25: 78.7 }, repro: ["gpt", "gemini"] },
      { name: "MathVision", v: { k26: 87.4, gpt: 92.0, claude: 71.2, gemini: 89.8, k25: 84.2 }, repro: ["gpt", "claude", "gemini"] },
      { name: "MathVision w/ python", v: { k26: 93.2, gpt: 96.1, claude: 84.6, gemini: 95.7, k25: 85.0 }, repro: ["gpt", "claude", "gemini"] },
      { name: "BabyVision", v: { k26: 39.8, gpt: 49.7, claude: 14.8, gemini: 51.6, k25: 36.5 } },
      { name: "BabyVision w/ python", v: { k26: 68.5, gpt: 80.2, claude: 38.4, gemini: 68.3, k25: 40.5 }, repro: ["gpt", "claude", "gemini"] },
      { name: "V* w/ python", v: { k26: 96.9, gpt: 98.4, claude: 86.4, gemini: 96.9, k25: 86.9 }, repro: ["gpt", "claude", "gemini"] },
    ],
  },
];

// Curated marquee benchmarks where Kimi K2.6 leads the reported field.
// (The "best" badge itself is computed from the data by bestKeys, so it cannot drift.)
export const HIGHLIGHTS = [
  { group: "Agentic", row: "DeepSearchQA (f1-score)" },
  { group: "Agentic", row: "DeepSearchQA (accuracy)" },
  { group: "Agentic", row: "HLE-Full w/ tools" },
  { group: "Agentic", row: "BrowseComp (agent swarm)" },
  { group: "Agentic", row: "WideSearch (item-f1)" },
  { group: "Coding", row: "SWE-Bench Pro" },
];

// Returns the model key(s) with the max reported (non-null) value in a row.
export function bestKeys(rowValues) {
  let max = -Infinity;
  for (const k of Object.keys(rowValues)) {
    const val = rowValues[k];
    if (val != null && val > max) max = val;
  }
  const winners = [];
  for (const k of Object.keys(rowValues)) {
    if (rowValues[k] != null && rowValues[k] === max) winners.push(k);
  }
  return winners;
}

export function getRow(groupName, rowName) {
  const g = BENCHMARK_GROUPS.find((x) => x.name === groupName);
  return g ? g.rows.find((r) => r.name === rowName) : null;
}
