import { useState } from "react";

const COLS = 10;
const ROWS = 6;

function color(v: number) {
  // 0 -> green low, 0.5 -> yellow, 1 -> red
  if (v < 0.33) return `oklch(0.7 0.18 145 / ${0.15 + v})`;
  if (v < 0.66) return `oklch(0.85 0.17 90 / ${0.4 + v * 0.5})`;
  return `oklch(0.65 0.22 25 / ${0.5 + v * 0.5})`;
}

export function Heatmap({ data }: { data: number[] }) {
  const [zone, setZone] = useState<"ataque" | "meio" | "defesa">("ataque");
  // Filter rows by zone for emphasis
  const zoneRange = zone === "defesa" ? [0, 1] : zone === "meio" ? [2, 3] : [4, 5];
  const filtered = data.map((v, i) => {
    const row = Math.floor(i / COLS);
    return row >= zoneRange[0] && row <= zoneRange[1] ? v : v * 0.35;
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-card-blur p-5">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="text-display text-xl">Zonas de influência no campo</div>
        <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1 text-xs">
          {(["defesa", "meio", "ataque"] as const).map((z) => (
            <button key={z} onClick={() => setZone(z)} className={`px-3 py-1 rounded-md capitalize ${zone === z ? "bg-gold-gradient text-background font-bold" : "text-white/70"}`}>
              {z === "meio" ? "Meio-campo" : z}
            </button>
          ))}
        </div>
      </div>
      <div className="relative aspect-[16/10] w-full max-w-2xl mx-auto rounded-xl overflow-hidden bg-grass-gradient">
        {/* pitch lines */}
        <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <rect x="1" y="1" width="98" height="58" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="0.4" />
          <line x1="50" y1="1" x2="50" y2="59" stroke="white" strokeOpacity="0.3" strokeWidth="0.4" />
          <circle cx="50" cy="30" r="6" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="0.4" />
          <rect x="1" y="18" width="14" height="24" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="0.4" />
          <rect x="85" y="18" width="14" height="24" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="0.4" />
        </svg>
        {/* Heat cells */}
        <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${ROWS}, 1fr)`, gridTemplateRows: `repeat(${COLS}, 1fr)` }}>
          {/* render as ROWS x COLS where row=defense to attack -> goes left->right */}
        </div>
        <div className="absolute inset-0 grid" style={{ gridTemplateRows: `repeat(${COLS}, 1fr)`, gridTemplateColumns: `repeat(${ROWS}, 1fr)` }}>
          {Array.from({ length: COLS }).map((_, c) =>
            Array.from({ length: ROWS }).map((_, r) => {
              const idx = r * COLS + c;
              const v = filtered[idx] ?? 0;
              return (
                <div key={`${r}-${c}`} style={{ background: color(v), filter: "blur(8px)" }} />
              );
            })
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded" style={{ background: color(0.1) }} /> Baixa</span>
        <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded" style={{ background: color(0.5) }} /> Média</span>
        <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded" style={{ background: color(0.9) }} /> Alta</span>
      </div>
    </div>
  );
}
