import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { players } from "@/mocks/data";
import { Heatmap } from "@/components/Heatmap";
import { ProScoreBadge } from "@/components/ProScoreBadge";
import { ChevronDown } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  a: z.string().optional(),
  b: z.string().optional(),
});

export const Route = createFileRoute("/comparar")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({ meta: [{ title: "Comparar Jogadores — ProFootPlay" }, { name: "description", content: "Compara dois jogadores lado a lado." }] }),
  component: ComparePage,
});

function ComparePage() {
  const search = Route.useSearch();
  const [a, setA] = useState(search.a ?? players[0].slug);
  const [b, setB] = useState(search.b ?? players[3].slug);
  const pa = useMemo(() => players.find((p) => p.slug === a) ?? players[0], [a]);
  const pb = useMemo(() => players.find((p) => p.slug === b) ?? players[1], [b]);

  const rows: { label: string; va: number; vb: number; suffix?: string; higherBetter?: boolean }[] = [
    { label: "ProScore", va: pa.proScore, vb: pb.proScore },
    { label: "Golos", va: pa.goals, vb: pb.goals },
    { label: "Assistências", va: pa.assists, vb: pb.assists },
    { label: "Precisão de passe", va: pa.stats.passAccuracy, vb: pb.stats.passAccuracy, suffix: "%" },
    { label: "Duelos ganhos", va: pa.stats.duelsWonPct, vb: pb.stats.duelsWonPct, suffix: "%" },
    { label: "Minutos", va: pa.minutes, vb: pb.minutes },
    { label: "Dribles / jogo", va: pa.stats.dribblesPerGame, vb: pb.stats.dribblesPerGame },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="text-display text-gold text-sm tracking-widest">FERRAMENTA</div>
      <h1 className="text-display text-4xl md:text-5xl mt-1 mb-8">Comparar Jogadores</h1>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        <PlayerPicker value={a} onChange={setA} />
        <PlayerPicker value={b} onChange={setB} />
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        <PlayerHero p={pa} />
        <PlayerHero p={pb} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-card-blur overflow-hidden mb-8">
        {rows.map((r, i) => {
          const aWin = r.va > r.vb;
          const bWin = r.vb > r.va;
          return (
            <div key={i} className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-white/5 last:border-0">
              <div className={`p-4 text-right text-display text-2xl ${aWin ? "text-gold" : "text-white/80"}`}>
                {r.va}{r.suffix ?? ""}
              </div>
              <div className="px-3 text-xs uppercase tracking-wider text-muted-foreground text-center min-w-[140px]">{r.label}</div>
              <div className={`p-4 text-left text-display text-2xl ${bWin ? "text-gold" : "text-white/80"}`}>
                {r.vb}{r.suffix ?? ""}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        <div>
          <div className="text-display text-lg mb-2">{pa.name} — zonas</div>
          <Heatmap data={pa.heatmap} />
        </div>
        <div>
          <div className="text-display text-lg mb-2">{pb.name} — zonas</div>
          <Heatmap data={pb.heatmap} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <ProScoreBadge score={pa.proScore} recent={pa.recentProScores} career={pa.proScoreCareer} />
        <ProScoreBadge score={pb.proScore} recent={pb.recentProScores} career={pb.proScoreCareer} />
      </div>
    </div>
  );
}

function PlayerPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card-blur p-3">
      <label className="text-xs uppercase tracking-wider text-muted-foreground">Jogador</label>
      <div className="relative mt-1">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none rounded-lg border border-white/10 bg-background px-3 py-2.5 pr-9 text-sm font-semibold">
          {players.map((p) => (<option key={p.slug} value={p.slug}>{p.name} · {p.positionShort} · {p.club}</option>))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
      </div>
    </div>
  );
}

function PlayerHero({ p }: { p: typeof players[number] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card-blur p-4 flex gap-4">
      <img src={p.photo} alt={p.name} className="h-24 w-24 rounded-xl object-cover border border-gold/30" />
      <div className="flex-1 min-w-0">
        <div className="text-display text-2xl truncate">{p.name}</div>
        <div className="text-xs text-muted-foreground">{p.position} · {p.club}</div>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-3 py-1 text-xs text-gold font-bold">
          ProScore {p.proScore.toFixed(1)}
        </div>
      </div>
    </div>
  );
}
