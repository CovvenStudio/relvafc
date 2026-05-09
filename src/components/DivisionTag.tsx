export function DivisionTag({ division }: { division: string }) {
  const tier =
    /Liga 3/i.test(division) ? "tier1" :
    /Campeonato de Portugal/i.test(division) ? "tier2" :
    "tier3";
  const styles: Record<string, string> = {
    tier1: "bg-gold/15 text-gold border-gold/30",
    tier2: "bg-grass/15 text-green-300 border-green-500/30",
    tier3: "bg-white/5 text-white/70 border-white/10",
  };
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${styles[tier]}`}>
      {division}
    </span>
  );
}
