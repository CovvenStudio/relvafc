import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { players } from "@/mocks/data";
import { PlayerCard } from "@/components/PlayerCard";
import { Search, Bookmark, Bell, MessageSquare, User, TrendingUp, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/scout")({
  head: () => ({ meta: [{ title: "Dashboard Scout — RelvaFC" }, { name: "description", content: "Gere os teus jogadores guardados, alertas e pesquisas." }] }),
  component: ScoutDashboard,
});

const tabs = [
  { id: "search", label: "Pesquisa", icon: Search },
  { id: "saved", label: "Guardados", icon: Bookmark },
  { id: "alerts", label: "Alertas", icon: Bell },
  { id: "messages", label: "Mensagens", icon: MessageSquare },
  { id: "account", label: "Conta", icon: User },
];

function ScoutDashboard() {
  const [tab, setTab] = useState("saved");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="mb-6">
        <div className="text-display text-gold text-sm tracking-widest">SCOUT · SPORTING CP</div>
        <h1 className="text-display text-4xl mt-1">Olá, Carlos.</h1>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 mb-8">
        <QuickStat label="Jogadores guardados" value="47" icon={<Bookmark />} />
        <QuickStat label="Alertas ativos" value="12" icon={<Bell />} accent />
        <QuickStat label="Pesquisas guardadas" value="8" icon={<Search />} />
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <aside className="rounded-2xl border border-white/10 bg-card-blur p-3 h-max">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm mb-1 transition ${tab === t.id ? "bg-gold-soft text-gold" : "hover:bg-white/5 text-white/70"}`}>
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </aside>

        <div className="space-y-8">
          {/* Saved lists */}
          <div>
            <div className="flex items-end justify-between mb-3">
              <h2 className="text-display text-2xl">Listas guardadas</h2>
              <button className="inline-flex items-center gap-1 text-sm text-gold"><Plus className="h-4 w-4" /> Nova lista</button>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { name: "Interesse", count: 23, color: "from-gold/30 to-gold/0" },
                { name: "Favoritos", count: 12, color: "from-green-500/30 to-green-500/0" },
                { name: "Contactado", count: 7, color: "from-white/20 to-transparent" },
              ].map((l) => (
                <div key={l.name} className={`rounded-xl border border-white/10 bg-gradient-to-br ${l.color} p-5 hover:border-gold/30 transition cursor-pointer`}>
                  <div className="text-display text-xl">{l.name}</div>
                  <div className="mt-1 text-3xl text-display text-gold">{l.count}</div>
                  <div className="text-xs text-muted-foreground">jogadores</div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div>
            <h2 className="text-display text-2xl mb-3">Alertas</h2>
            <div className="space-y-3">
              <AlertCard text="3 novos jogadores disponíveis na tua pesquisa guardada 'Avançados Sub-23 · Liga 3'" time="há 2h" />
              <AlertCard text="João Silva atualizou o seu perfil — agora disponível" time="há 5h" />
              <AlertCard text="Novo jogador disponível em Lisboa: Rui Costa, MO, 19 anos" time="ontem" />
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <h2 className="text-display text-2xl mb-3">Recentemente guardados</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {players.slice(0, 4).map((p) => <PlayerCard key={p.id} player={p} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickStat({ label, value, icon, accent }: { label: string; value: string; icon: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${accent ? "border-gold/30 bg-gold-soft" : "border-white/10 bg-card-blur"}`}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <span className={accent ? "text-gold" : "text-white/60"}>{icon}</span>{label}
      </div>
      <div className={`mt-2 text-3xl text-display ${accent ? "text-gold" : ""}`}>{value}</div>
    </div>
  );
}

function AlertCard({ text, time }: { text: string; time: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card-blur p-4 flex items-start gap-3">
      <div className="h-9 w-9 rounded-lg bg-gold-soft text-gold flex items-center justify-center"><TrendingUp className="h-4 w-4" /></div>
      <div className="flex-1">
        <div className="text-sm">{text}</div>
        <div className="text-xs text-muted-foreground mt-1">{time}</div>
      </div>
    </div>
  );
}
