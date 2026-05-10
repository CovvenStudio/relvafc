import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { players } from "@/mocks/data";
import { DivisionTag } from "@/components/DivisionTag";
import { ProScoreBadge } from "@/components/ProScoreBadge";
import { Heatmap } from "@/components/Heatmap";
import { Shotmap } from "@/components/Shotmap";
import { PerformanceChart } from "@/components/PerformanceChart";
import { FullStatsPanel } from "@/components/FullStatsPanel";
import { CareerTimeline } from "@/components/CareerTimeline";
import { HighlightsGrid } from "@/components/HighlightsGrid";
import { AvailabilityPanel } from "@/components/AvailabilityPanel";
import { Lock, Share2, MapPin, GitCompareArrows } from "lucide-react";

export const Route = createFileRoute("/jogador/$id")({
  loader: ({ params }) => {
    const player = players.find((p) => p.slug === params.id || p.id === params.id);
    if (!player) throw notFound();
    return { player };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.player.name} — ProFootPlay` },
      { name: "description", content: `${loaderData.player.position} no ${loaderData.player.club}. ${loaderData.player.goals} golos esta época. ProScore ${loaderData.player.proScore.toFixed(1)}.` },
      { property: "og:title", content: `${loaderData.player.name} — ${loaderData.player.position}` },
      { property: "og:description", content: `${loaderData.player.club} · ${loaderData.player.division} · ProScore ${loaderData.player.proScore.toFixed(1)}` },
      { property: "og:image", content: loaderData.player.photo },
    ] : [],
  }),
  component: PlayerPage,
  notFoundComponent: () => <div className="p-20 text-center text-muted-foreground">Jogador não encontrado.</div>,
  errorComponent: ({ error }) => <div className="p-20 text-center">{error.message}</div>,
});

function PlayerPage() {
  const { player } = Route.useLoaderData();
  const isGK = player.position.includes("Guarda");
  const gpg = player.stats.matches ? player.stats.goals / player.stats.matches : 0;
  const apg = player.stats.matches ? player.stats.assists / player.stats.matches : 0;

  return (
    <div>
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 bg-grass-gradient" />
        <div className="absolute inset-0 pitch-lines opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-12">
          <div className="grid md:grid-cols-[280px_1fr] gap-8 items-end">
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-gold/30 glow-gold">
                <img src={player.photo} alt={player.name} className="h-full w-full object-cover" />
              </div>
              <div className="absolute -top-3 -left-3 rounded-lg bg-gold-gradient text-background px-3 py-1.5 text-display text-sm shadow-lg">{player.positionShort}</div>
            </div>
            <div>
              <h1 className="text-display text-5xl md:text-7xl mt-3 leading-[0.95]">{player.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/70">
                <span>{player.position}</span><span>·</span>
                <span>{player.age} anos</span><span>·</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{player.district}</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link to="/clube/$id" params={{ id: player.clubId }} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-2 text-sm">
                  <span className="text-lg">⚽</span><span className="font-semibold">{player.club}</span><DivisionTag division={player.division} />
                </Link>
              </div>
              <p className="mt-5 max-w-2xl text-white/70">{player.bio}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg bg-gold-gradient text-background px-5 py-2.5 text-sm font-bold glow-gold">
                  <Lock className="h-4 w-4" /> Entrar em Contacto
                </button>
                <Link to="/comparar" search={{ a: player.slug }} className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm">
                  <GitCompareArrows className="h-4 w-4" /> Comparar com outro jogador
                </Link>
                <button className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm">
                  <Share2 className="h-4 w-4" /> Partilhar
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span>profootplay.pt/jogador/</span><span className="text-gold font-semibold">{player.slug}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROSCORE + AVAILABILITY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid lg:grid-cols-2 gap-5">
        <ProScoreBadge score={player.proScore} recent={player.recentProScores} career={player.proScoreCareer} />
        <AvailabilityPanel player={player} />
      </section>

      {/* PERFORMANCE CHART */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
        <PerformanceChart matches={player.matchHistory} />
      </section>

      {/* HEATMAP + SHOTMAP */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid lg:grid-cols-2 gap-5">
        <Heatmap data={player.heatmap} />
        {player.shotmap ? <Shotmap shots={player.shotmap} /> : (
          <div className="rounded-2xl border border-white/10 bg-card-blur p-5 flex items-center justify-center text-muted-foreground text-sm">
            Mapa de remates apenas para jogadores ofensivos.
          </div>
        )}
      </section>

      {/* FULL STATS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <h2 className="text-display text-2xl mb-4">Estatísticas completas</h2>
        <FullStatsPanel stats={player.stats} isGK={isGK} gpg={gpg} apg={apg} />
      </section>

      {/* CAREER TIMELINE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <h2 className="text-display text-2xl mb-4">Historial de carreira</h2>
        <CareerTimeline career={player.career} />
      </section>

      {/* HIGHLIGHTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 pb-16">
        <HighlightsGrid videos={player.videos} />
      </section>
    </div>
  );
}
