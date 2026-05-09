import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { players } from "@/mocks/data";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { StatGrid } from "@/components/StatGrid";
import { DivisionTag } from "@/components/DivisionTag";
import { PremiumLock } from "@/components/PremiumLock";
import { Lock, Play, Share2, MapPin, UserX, Calendar } from "lucide-react";

export const Route = createFileRoute("/jogador/$id")({
  loader: ({ params }) => {
    const player = players.find((p) => p.slug === params.id || p.id === params.id);
    if (!player) throw notFound();
    return { player };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.player.name} — RelvaFC` },
      { name: "description", content: `${loaderData.player.position} no ${loaderData.player.club}. ${loaderData.player.goals} golos esta época.` },
      { property: "og:title", content: `${loaderData.player.name} — ${loaderData.player.position}` },
      { property: "og:description", content: `${loaderData.player.club} · ${loaderData.player.division}` },
      { property: "og:image", content: loaderData.player.photo },
    ] : [],
  }),
  component: PlayerPage,
  notFoundComponent: () => <div className="p-20 text-center text-muted-foreground">Jogador não encontrado.</div>,
  errorComponent: ({ error }) => <div className="p-20 text-center">{error.message}</div>,
});

function PlayerPage() {
  const { player } = Route.useLoaderData();

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
              <div className="flex flex-wrap items-center gap-2">
                <AvailabilityBadge value={player.availability} size="md" />
                {player.noAgent && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                    <UserX className="h-3.5 w-3.5" /> Sem agente
                  </span>
                )}
              </div>
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
                <button className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm">
                  <Share2 className="h-4 w-4" /> Partilhar
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span>relvafc.pt/jogador/</span><span className="text-gold font-semibold">{player.slug}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h2 className="text-display text-2xl mb-4">Estatísticas da época</h2>
        <StatGrid stats={[
          { label: "Jogos", value: player.matches },
          { label: "Golos", value: player.goals, accent: true },
          { label: "Assistências", value: player.assists },
          { label: "Minutos", value: player.minutes.toLocaleString("pt-PT") },
        ]} />
      </section>

      {/* HISTORY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h2 className="text-display text-2xl mb-4">Linha do tempo</h2>
        <div className="relative pl-6 border-l-2 border-gold/30 space-y-5">
          {player.history.map((h, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-gold-gradient border-2 border-background" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="h-3.5 w-3.5" />{h.years}</div>
              <div className="text-display text-lg">{h.club}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEOS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h2 className="text-display text-2xl mb-4">Vídeos highlights</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {player.videos.map((v, i) => (
            <button key={i} className="group relative aspect-video overflow-hidden rounded-xl border border-white/10">
              <img src={v.thumb} alt={v.title} className="h-full w-full object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition flex items-center justify-center">
                <div className="h-14 w-14 rounded-full bg-gold-gradient flex items-center justify-center text-background glow-gold">
                  <Play className="h-6 w-6 ml-0.5 fill-current" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background to-transparent text-left">
                <div className="font-semibold">{v.title}</div>
              </div>
            </button>
          ))}
          <div className="relative aspect-video rounded-xl border border-gold/20 overflow-hidden">
            <div className="absolute inset-0 bg-card-blur" />
            <PremiumLock label="Mais vídeos" sub="Premium · vídeos ilimitados" />
          </div>
        </div>
      </section>
    </div>
  );
}
