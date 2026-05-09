export function StatGrid({ stats }: { stats: { label: string; value: string | number; accent?: boolean }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-white/10 bg-card-blur p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
          <div className={`mt-1 text-3xl text-display ${s.accent ? "text-gold" : "text-white"}`}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}
