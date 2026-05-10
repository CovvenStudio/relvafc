import type { CareerEntry } from "@/mocks/data";

export function CareerTimeline({ career }: { career: CareerEntry[] }) {
  return (
    <div className="relative pl-6 border-l-2 border-gold/30 space-y-5">
      {career.map((c, i) => (
        <div key={i} className="relative">
          <div className="absolute -left-[31px] top-2 h-4 w-4 rounded-full bg-gold-gradient border-2 border-background" />
          <div className="rounded-xl border border-white/10 bg-card-blur p-4 flex flex-wrap items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-2xl">{c.badge}</div>
            <div className="flex-1 min-w-[160px]">
              <div className="text-display text-lg">{c.club}</div>
              <div className="text-xs text-muted-foreground">{c.years} {c.division ? `· ${c.division}` : ""}</div>
            </div>
            <div className="flex gap-4 text-sm">
              <Stat label="Jogos" value={c.appearances ?? 0} />
              <Stat label="Golos" value={c.goals ?? 0} accent />
              <Stat label="Assist." value={c.assists ?? 0} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="text-center">
      <div className={`text-display text-xl ${accent ? "text-gold" : ""}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
