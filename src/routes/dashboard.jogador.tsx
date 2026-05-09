import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Video, Activity, Sparkles, ChevronRight } from "lucide-react";
import { PremiumLock } from "@/components/PremiumLock";
import { players } from "@/mocks/data";

export const Route = createFileRoute("/dashboard/jogador")({
  head: () => ({ meta: [{ title: "Dashboard Jogador — RelvaFC" }, { name: "description", content: "Gere o teu perfil, vídeos e disponibilidade." }] }),
  component: PlayerDashboard,
});

function PlayerDashboard() {
  const me = players[0];
  const progress = 72;

  // fake last 30 days visits
  const visits = Array.from({ length: 30 }, (_, i) => Math.round(8 + Math.sin(i * 0.6) * 5 + Math.random() * 6));
  const max = Math.max(...visits);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-display text-gold text-sm tracking-widest">JOGADOR</div>
          <h1 className="text-display text-4xl mt-1">Olá, {me.name.split(" ")[0]}.</h1>
          <p className="text-sm text-muted-foreground mt-1">relvafc.pt/jogador/<span className="text-gold">{me.slug}</span></p>
        </div>
        <Link to="/jogador/$id" params={{ id: me.slug }} className="rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-bold">Ver perfil público</Link>
      </div>

      {/* Progress */}
      <div className="rounded-2xl border border-gold/20 bg-card-blur p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-display text-lg">Perfil completo</div>
          <div className="text-display text-2xl text-gold">{progress}%</div>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full bg-gold-gradient" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 text-xs text-muted-foreground">Adiciona mais 2 vídeos e clube anterior para chegar a 100%.</div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Visitors (premium) */}
        <div className="relative lg:col-span-2 rounded-2xl border border-white/10 bg-card-blur p-5 min-h-[260px]">
          <div className="flex items-center gap-2 mb-3"><Eye className="h-4 w-4 text-gold" /><h2 className="text-display text-xl">Quem visitou o teu perfil esta semana</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 blur-sm pointer-events-none select-none">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="rounded-xl border border-white/10 p-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10" />
                <div><div className="font-semibold">Scout #{i}</div><div className="text-xs text-muted-foreground">Sporting CP</div></div>
              </div>
            ))}
          </div>
          <PremiumLock label="Sabe quem te está a ver" sub="Premium · €4/mês" />
        </div>

        {/* Visits chart */}
        <div className="rounded-2xl border border-white/10 bg-card-blur p-5">
          <div className="flex items-center gap-2 mb-3"><Activity className="h-4 w-4 text-gold" /><h2 className="text-display text-xl">Visitas (30 dias)</h2></div>
          <div className="flex items-end gap-1 h-32">
            {visits.map((v, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-gold/40 to-gold" style={{ height: `${(v / max) * 100}%` }} />
            ))}
          </div>
          <div className="mt-3 text-3xl text-display text-gold">{visits.reduce((a, b) => a + b, 0)}</div>
          <div className="text-xs text-muted-foreground">visitas totais</div>
        </div>
      </div>

      {/* Quick edit */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <QuickEdit title="Estatísticas" desc="14 golos · 5 assist · 24 jogos" />
        <QuickEdit title="Vídeos" desc={`${me.videos.length} vídeos · adiciona mais`} icon={<Video className="h-4 w-4" />} />
        <QuickEdit title="Disponibilidade" desc="Disponível para propostas" />
      </div>

      {/* Premium upgrade */}
      <div className="mt-8 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold-soft via-card to-background p-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/30 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1 text-xs text-gold"><Sparkles className="h-3.5 w-3.5" /> PREMIUM</div>
            <h3 className="text-display text-3xl mt-1">Sabe quem te está a ver.</h3>
            <p className="mt-2 text-white/70 text-sm">Vídeos ilimitados, destaque na descoberta, ver scouts que visitaram o teu perfil.</p>
          </div>
          <Link to="/precos" className="inline-flex items-center gap-2 rounded-lg bg-gold-gradient text-background px-5 py-3 text-sm font-bold glow-gold">
            Upgrade — €4/mês <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function QuickEdit({ title, desc, icon }: { title: string; desc: string; icon?: React.ReactNode }) {
  return (
    <button className="text-left rounded-2xl border border-white/10 bg-card-blur p-5 hover:border-gold/30 transition group">
      <div className="flex items-center justify-between">
        <div className="text-display text-lg">{title}</div>
        <div className="text-gold opacity-60 group-hover:opacity-100">{icon ?? <ChevronRight className="h-4 w-4" />}</div>
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
      <div className="mt-3 text-xs text-gold">Editar →</div>
    </button>
  );
}
