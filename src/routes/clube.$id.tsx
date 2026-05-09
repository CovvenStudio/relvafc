import { createFileRoute, notFound } from "@tanstack/react-router";
import { clubs, players } from "@/mocks/data";
import { DivisionTag } from "@/components/DivisionTag";
import { PlayerCard } from "@/components/PlayerCard";
import { CheckCircle2, AlertCircle, MapPin, Trophy } from "lucide-react";

export const Route = createFileRoute("/clube/$id")({
  loader: ({ params }) => {
    const club = clubs.find((c) => c.slug === params.id || c.id === params.id);
    if (!club) throw notFound();
    return { club };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.club.name} — RelvaFC` },
      { name: "description", content: `Plantel, jogadores e divisão de ${loaderData.club.name}, ${loaderData.club.city}.` },
      { property: "og:title", content: loaderData.club.name },
      { property: "og:description", content: `${loaderData.club.division} · ${loaderData.club.city}` },
    ] : [],
  }),
  component: ClubPage,
  notFoundComponent: () => <div className="p-20 text-center text-muted-foreground">Clube não encontrado.</div>,
  errorComponent: ({ error }) => <div className="p-20 text-center">{error.message}</div>,
});

function ClubPage() {
  const { club } = Route.useLoaderData();
  const squad = players.filter((p) => club.squad.includes(p.id));
  const totalGoals = squad.reduce((s, p) => s + p.goals, 0);

  return (
    <div>
      <section className="relative">
        <div className="absolute inset-0 bg-grass-gradient" />
        <div className="absolute inset-0 pitch-lines opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-10">
          <div className="flex flex-wrap items-center gap-6">
            <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-surface-elevated to-surface border border-white/10 flex items-center justify-center text-6xl">{club.badge}</div>
            <div className="flex-1 min-w-0">
              <DivisionTag division={club.division} />
              <h1 className="text-display text-5xl md:text-6xl mt-2">{club.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {club.city}</span>
                <span>Fundado em {club.founded}</span>
                <span>{club.stadium}</span>
              </div>
            </div>
            <div>
              {club.claimed ? (
                <div className="inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-gold-soft px-3 py-2 text-sm text-gold">
                  <CheckCircle2 className="h-4 w-4" /> Página verificada
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
                  <AlertCircle className="h-4 w-4" /> Página não reclamada
                </div>
              )}
            </div>
          </div>

          {!club.claimed && (
            <div className="mt-6 rounded-xl border border-gold/20 bg-gold-soft p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-gold">És deste clube?</div>
                <div className="text-sm text-white/70">Reclama esta página para gerir o plantel e mostrar a tua época.</div>
              </div>
              <button className="rounded-lg bg-gold-gradient text-background px-4 py-2 text-sm font-bold">Reclamar esta página</button>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h2 className="text-display text-2xl mb-4">Resumo da época</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Plantel" value={squad.length} />
          <Stat label="Golos" value={totalGoals} accent />
          <Stat label="Jogos" value={squad.reduce((s, p) => s + p.matches, 0)} />
          <Stat label="Disponíveis" value={squad.filter((p) => p.availability === "disponivel").length} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-gold" />
          <h2 className="text-display text-2xl">Plantel</h2>
        </div>
        {squad.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {squad.map((p) => <PlayerCard key={p.id} player={p} />)}
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-card-blur p-10 text-center text-muted-foreground">
            Plantel não confirmado. Reclama esta página para adicionar jogadores.
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card-blur p-4">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 text-3xl text-display ${accent ? "text-gold" : "text-white"}`}>{value}</div>
    </div>
  );
}
