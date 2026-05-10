import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Trophy, Users, Search, Sparkles } from "lucide-react";
import { players, clubs } from "@/mocks/data";
import { PlayerCard } from "@/components/PlayerCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProFootPlay — Uma relva. Milhares de histórias." },
      { name: "description", content: "Descobre jogadores, clubes e talento do futebol português em todas as divisões." },
    ],
  }),
  component: Index,
});

function useCount(target: number, duration = 1500) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
}

function Index() {
  const a = useCount(148000);
  const b = useCount(500);
  const c = useCount(22);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grass-gradient" />
        <div className="absolute inset-0 pitch-lines opacity-50" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[60rem] rounded-full bg-gold/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-3 py-1 text-xs text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Agora em beta — A maior plataforma de talento PT
          </div>
          <h1 className="mt-6 text-display text-5xl sm:text-7xl md:text-8xl leading-[0.9] max-w-4xl">
            Uma relva.<br />
            <span className="bg-gradient-to-r from-gold to-yellow-500 bg-clip-text text-transparent">Milhares de histórias.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Do Campeonato Nacional aos distritais. ProFootPlay liga jogadores, clubes, scouts e agentes em todas as divisões do futebol português.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/dashboard/jogador" className="inline-flex items-center gap-2 rounded-lg bg-gold-gradient text-background px-5 py-3 text-sm font-bold hover:opacity-90 glow-gold">
              Criar Perfil de Jogador <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/dashboard/scout" className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 backdrop-blur px-5 py-3 text-sm font-bold hover:bg-white/10">
              Sou Scout / Agente
            </Link>
          </div>

          {/* counters */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-3xl">
            <Counter big={a.toLocaleString("pt-PT")} label="Jogadores federados" />
            <Counter big={`${b}+`} label="Clubes" />
            <Counter big={`${c}`} label="Distritos cobertos" />
          </div>
        </div>
      </section>

      {/* VALUE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-display text-gold text-sm tracking-widest">PARA TODOS NA RELVA</div>
          <h2 className="text-display text-4xl md:text-5xl mt-2">Três caminhos. Um mesmo jogo.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <ValueCard icon={<Trophy />} title="Jogadores" desc="Cria o teu perfil em minutos. Stats, vídeos e disponibilidade. URL pública para partilhar com clubes." cta="Criar perfil" to="/dashboard/jogador" />
          <ValueCard icon={<Users />} title="Clubes" desc="Reclama a tua página. Gere o plantel, mostra a tua época e conecta-te com talento por descobrir." cta="Reclamar clube" to="/precos" />
          <ValueCard icon={<Search />} title="Scouts & Agentes" desc="Filtros avançados, alertas e pesquisas guardadas. Acede a todas as divisões num só sítio." cta="Ver Pro" to="/precos" highlight />
        </div>
      </section>

      {/* FEATURED PLAYERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-display text-gold text-sm tracking-widest">EM DESTAQUE</div>
            <h2 className="text-display text-3xl md:text-4xl mt-1">Jogadores a acompanhar</h2>
          </div>
          <Link to="/descobrir" className="text-sm text-gold hover:underline inline-flex items-center gap-1">Ver todos <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x scrollbar-thin">
          {players.map((p) => (
            <div key={p.id} className="min-w-[260px] max-w-[260px] snap-start">
              <PlayerCard player={p} />
            </div>
          ))}
        </div>
      </section>

      {/* CLUBS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-display text-gold text-sm tracking-widest">CLUBES</div>
        <h2 className="text-display text-3xl md:text-4xl mt-1 mb-6">Da Liga 3 ao distrital</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {clubs.slice(0, 8).map((c) => (
            <Link to="/clube/$id" params={{ id: c.slug }} key={c.id} className="group rounded-xl border border-white/10 bg-card-blur p-4 hover:border-gold/40 transition flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-surface-elevated to-surface border border-white/10 flex items-center justify-center text-2xl">{c.badge}</div>
              <div className="min-w-0">
                <div className="font-semibold truncate">{c.name}</div>
                <div className="text-xs text-muted-foreground truncate">{c.city} · {c.division}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-gold/20 p-10 md:p-16 bg-gradient-to-br from-grass-deep via-surface to-background">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-display text-4xl md:text-6xl">A tua história começa aqui.</h2>
            <p className="mt-4 text-white/70">148.000 jogadores federados em Portugal. Cada um com uma história. Vamos contar a tua.</p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <Link to="/dashboard/jogador" className="rounded-lg bg-gold-gradient text-background px-5 py-3 text-sm font-bold glow-gold">Criar perfil grátis</Link>
              <Link to="/descobrir" className="rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold hover:bg-white/10">Explorar talento</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Counter({ big, label }: { big: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card-blur p-5">
      <div className="text-display text-3xl md:text-5xl text-gold leading-none">{big}</div>
      <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function ValueCard({ icon, title, desc, cta, to, highlight }: { icon: React.ReactNode; title: string; desc: string; cta: string; to: string; highlight?: boolean }) {
  return (
    <div className={`group relative rounded-2xl border p-6 transition ${highlight ? "border-gold/40 bg-gradient-to-br from-gold-soft to-transparent glow-gold" : "border-white/10 bg-card-blur hover:border-gold/30"}`}>
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${highlight ? "bg-gold-gradient text-background" : "bg-white/5 text-gold"}`}>{icon}</div>
      <h3 className="text-display text-2xl mt-4">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
      <Link to={to} className={`mt-5 inline-flex items-center gap-1 text-sm font-bold ${highlight ? "text-gold" : "text-white"}`}>
        {cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
