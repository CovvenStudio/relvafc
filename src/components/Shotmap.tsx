type Shot = { x: number; y: number; type: "goal" | "ontarget" | "off" };

const colors = {
  goal: "#22C55E",
  ontarget: "#EAB308",
  off: "#6B7280",
};

export function Shotmap({ shots }: { shots: Shot[] }) {
  const goals = shots.filter((s) => s.type === "goal").length;
  const ot = shots.filter((s) => s.type === "ontarget").length;
  const off = shots.filter((s) => s.type === "off").length;

  return (
    <div className="rounded-2xl border border-white/10 bg-card-blur p-5">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="text-display text-xl">Mapa de remates</div>
        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full" style={{ background: colors.goal }} /> Golo ({goals})</span>
          <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full" style={{ background: colors.ontarget }} /> Na baliza ({ot})</span>
          <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full" style={{ background: colors.off }} /> Fora ({off})</span>
        </div>
      </div>
      <div className="relative w-full max-w-2xl mx-auto aspect-[3/4] rounded-xl overflow-hidden bg-grass-gradient">
        <svg viewBox="0 0 100 130" className="absolute inset-0 w-full h-full">
          <rect x="1" y="1" width="98" height="128" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="0.3" />
          <rect x="20" y="1" width="60" height="20" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="0.3" />
          <rect x="35" y="1" width="30" height="8" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="0.3" />
          <line x1="1" y1="129" x2="99" y2="129" stroke="white" strokeOpacity="0.25" strokeWidth="0.3" />
          <circle cx="50" cy="22" r="0.8" fill="white" fillOpacity="0.4" />
          {shots.map((s, i) => (
            <circle key={i} cx={s.x * 100} cy={s.y * 130} r={s.type === "goal" ? 2.4 : 1.8} fill={colors[s.type]} stroke="white" strokeOpacity="0.4" strokeWidth="0.3" />
          ))}
        </svg>
      </div>
    </div>
  );
}
