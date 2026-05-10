export function ProScoreBadge({ score, recent, career }: { score: number; recent: number[]; career?: number }) {
  const max = Math.max(...recent, 10);
  const ang = (score / 10) * 360;
  return (
    <div className="rounded-2xl border border-gold/30 bg-card-blur p-5">
      <div className="text-display text-gold text-xs tracking-widest mb-3">PROSCORE — AVALIAÇÃO PROFOOTPLAY</div>
      <div className="flex items-center gap-5">
        <div
          className="relative h-28 w-28 rounded-full flex items-center justify-center glow-gold"
          style={{ background: `conic-gradient(var(--gold) ${ang}deg, oklch(1 0 0 / 8%) 0deg)` }}
        >
          <div className="h-[88%] w-[88%] rounded-full bg-background flex flex-col items-center justify-center">
            <div className="text-display text-4xl text-gold leading-none">{score.toFixed(1)}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">/ 10</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-xs text-muted-foreground">Última temporada</div>
          <div className="text-display text-2xl">{score.toFixed(1)} <span className="text-muted-foreground text-sm">· carreira {(career ?? score - 0.3).toFixed(1)}</span></div>
          <div className="mt-3 flex items-end gap-1.5 h-12">
            {recent.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t bg-gold-gradient" style={{ height: `${(v / max) * 100}%` }} />
                <span className="text-[9px] text-muted-foreground">{v.toFixed(1)}</span>
              </div>
            ))}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">últimos 5 jogos</div>
        </div>
      </div>
    </div>
  );
}
