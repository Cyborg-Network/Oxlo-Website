import { Fragment } from "react";
import { BENCHMARK_GROUPS, BENCHMARK_MODELS, BENCHMARK_SOURCE, bestKeys } from "@/data/benchmarks";

function fmt(val) {
  return val == null ? "n/a" : val.toFixed(1);
}

export default function BenchmarkTable() {
  return (
    <div className="bm-tablewrap">
      <style suppressHydrationWarning>{`
        .bm-tablewrap { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; background: rgba(10,15,22,0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .bm-table { width: 100%; border-collapse: collapse; min-width: 780px; color: #D1D5DB; font-size: 13px; }
        .bm-table th, .bm-table td { padding: 12px 14px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.04); white-space: nowrap; }
        .bm-table thead th { vertical-align: bottom; }
        .bm-table th:first-child, .bm-table td:first-child { text-align: left; position: sticky; left: 0; background: rgba(10,15,22,0.96); z-index: 2; }
        .bm-modelname { font-family: 'Unbounded', sans-serif; font-weight: 700; font-size: 13px; color: #fff; display: block; }
        .bm-modelnote { display: block; font-size: 10px; color: #6B7280; font-weight: 500; margin-top: 2px; }
        .bm-col-primary { background: rgba(3,247,181,0.06); }
        .bm-badge { display: inline-block; font-size: 9px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #03F7B5; background: rgba(3,247,181,0.12); border: 1px solid rgba(3,247,181,0.3); border-radius: 6px; padding: 3px 8px; margin-bottom: 8px; }
        .bm-group td { background: rgba(255,255,255,0.025); font-family: 'Unbounded', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #03F7B5; text-align: left; }
        .bm-rowlabel { color: #9CA3AF; font-weight: 600; }
        .bm-val { font-family: monospace; font-size: 13px; color: #D1D5DB; }
        .bm-best { color: #03F7B5; font-weight: 800; }
        .bm-best-cell { background: rgba(3,247,181,0.08); }
        .bm-star { color: #6B7280; font-size: 10px; vertical-align: super; margin-left: 1px; }
        .bm-foot { padding: 16px; font-size: 11px; color: #6B7280; line-height: 1.7; }
        .bm-foot a { color: #03F7B5; text-decoration: none; }
        .bm-foot a:hover { text-decoration: underline; }
      `}</style>
      <table className="bm-table">
        <thead>
          <tr>
            <th>Benchmark</th>
            {BENCHMARK_MODELS.map((m) => (
              <th key={m.key} className={m.primary ? "bm-col-primary" : ""}>
                {m.primary && <span className="bm-badge">Available on Oxlo.ai</span>}
                <span className="bm-modelname">{m.name}</span>
                {m.note && <span className="bm-modelnote">{m.note}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BENCHMARK_GROUPS.map((group) => (
            <Fragment key={group.name}>
              <tr className="bm-group">
                <td colSpan={BENCHMARK_MODELS.length + 1}>{group.name}</td>
              </tr>
              {group.rows.map((row) => {
                const winners = bestKeys(row.v);
                return (
                  <tr key={row.name}>
                    <td className="bm-rowlabel">{row.name}</td>
                    {BENCHMARK_MODELS.map((m) => {
                      const val = row.v[m.key];
                      const isBest = winners.includes(m.key);
                      const isRepro = row.repro && row.repro.includes(m.key);
                      return (
                        <td key={m.key} className={`${m.primary ? "bm-col-primary" : ""} ${isBest ? "bm-best-cell" : ""}`}>
                          <span className={`bm-val ${isBest ? "bm-best" : ""}`}>
                            {fmt(val)}
                            {isRepro && <span className="bm-star">*</span>}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </Fragment>
          ))}
        </tbody>
      </table>
      <div className="bm-foot">
        Scores are percentages, higher is better. The best result in each row is highlighted.
        <span className="bm-star">*</span> reproduced by the source. n/a means not reported.
        Source: <a href={BENCHMARK_SOURCE.url} target="_blank" rel="noopener noreferrer">{BENCHMARK_SOURCE.label}</a>.
      </div>
    </div>
  );
}
