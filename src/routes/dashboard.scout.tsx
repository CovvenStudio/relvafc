import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type DragEvent } from "react";
import { players, pipelineSeed, pipelineLabels, savedSearches, type PipelineColumn } from "@/mocks/data";
import { AvailabilityDot } from "@/components/AvailabilityBadge";
import { Bell, Bookmark, Search, FileDown, StickyNote, Plus, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard/scout")({
  head: () => ({ meta: [{ title: "Dashboard Scout — ProFootPlay" }, { name: "description", content: "Pipeline, alertas e shortlists." }] }),
  component: ScoutDashboard,
});

const COLUMNS: PipelineColumn[] = ["watching", "shortlisted", "assessed", "contacted"];

function ScoutDashboard() {
  const [pipeline, setPipeline] = useState<Record<PipelineColumn, string[]>>(pipelineSeed);
  const [dragId, setDragId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({ p1: "Excelente movimento sem bola. Pedir vídeo do último jogo." });
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const onDragStart = (id: string) => (e: DragEvent) => { setDragId(id); e.dataTransfer.effectAllowed = "move"; };
  const onDrop = (col: PipelineColumn) => (e: DragEvent) => {
    e.preventDefault();
    if (!dragId) return;
    setPipeline((prev) => {
      const next: Record<PipelineColumn, string[]> = { watching: [], shortlisted: [], assessed: [], contacted: [] };
      for (const c of COLUMNS) next[c] = prev[c].filter((id) => id !== dragId);
      next[col] = [...next[col], dragId];
      return next;
    });
    setDragId(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-display text-gold text-sm tracking-widest">SCOUT · SPORTING CP</div>
          <h1 className="text-display text-4xl mt-1">Olá, Carlos.</h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-gold-gradient text-background px-4 py-2 text-sm font-bold glow-gold">
          <FileDown className="h-4 w-4" /> Exportar shortlist (PDF)
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <Stat icon={<Bookmark />} label="Jogadores guardados" value="47" />
        <Stat icon={<Bell />} label="Alertas ativos" value="12" accent />
        <Stat icon={<Search />} label="Pesquisas guardadas" value={String(savedSearches.length)} />
      </div>

      {/* Pipeline */}
      <div className="mb-10">
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-display text-2xl">Pipeline</h2>
          <span className="text-xs text-muted-foreground hidden md:block">Arrasta os jogadores entre colunas</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {COLUMNS.map((col) => (
            <div key={col} onDragOver={(e) => e.preventDefault()} onDrop={onDrop(col)} className="rounded-2xl border border-white/10 bg-card-blur p-3 min-h-[280px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="text-display text-sm tracking-widest text-gold">{pipelineLabels[col].toUpperCase()}</div>
                <div className="text-xs text-muted-foreground">{pipeline[col].length}</div>
              </div>
              <div className="space-y-2">
                {pipeline[col].map((pid) => {
                  const p = players.find((pl) => pl.id === pid);
                  if (!p) return null;
                  return (
                    <div key={pid} draggable onDragStart={onDragStart(pid)} className="rounded-xl border border-white/10 bg-background/60 p-3 cursor-grab active:cursor-grabbing hover:border-gold/40 transition">
                      <div className="flex items-center gap-2">
                        <img src={p.photo} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">{p.name}</div>
                          <div className="text-[11px] text-muted-foreground truncate">{p.positionShort} · {p.club}</div>
                        </div>
                        <AvailabilityDot value={p.availability} />
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gold font-bold">ProScore {p.proScore.toFixed(1)}</span>
                        <button onClick={() => setActiveNote(activeNote === pid ? null : pid)} className="text-muted-foreground hover:text-gold">
                          <StickyNote className="h-4 w-4" />
                        </button>
                      </div>
                      {activeNote === pid && (
                        <textarea
                          value={notes[pid] ?? ""}
                          onChange={(e) => setNotes({ ...notes, [pid]: e.target.value })}
                          placeholder="Nota privada..."
                          className="mt-2 w-full rounded-md border border-white/10 bg-background px-2 py-1.5 text-xs"
                          rows={2}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Saved searches */}
        <div>
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-display text-2xl">Pesquisas guardadas</h2>
            <button className="inline-flex items-center gap-1 text-sm text-gold"><Plus className="h-4 w-4" /> Nova</button>
          </div>
          <div className="space-y-2">
            {savedSearches.map((s) => (
              <Link key={s.name} to="/descobrir" className="block rounded-xl border border-white/10 bg-card-blur hover:border-gold/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-gold text-sm font-bold">{s.count}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">jogadores correspondentes</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div>
          <h2 className="text-display text-2xl mb-3">Alertas</h2>
          <div className="space-y-2">
            <Alert text="João Silva mudou para Disponível" time="há 2h" />
            <Alert text="3 novos avançados Sub-23 em Lisboa" time="há 5h" />
            <Alert text="Tiago Ferreira atualizou os seus highlights" time="ontem" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${accent ? "border-gold/30 bg-gold-soft" : "border-white/10 bg-card-blur"}`}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <span className={accent ? "text-gold" : "text-white/60"}>{icon}</span>{label}
      </div>
      <div className={`mt-2 text-3xl text-display ${accent ? "text-gold" : ""}`}>{value}</div>
    </div>
  );
}

function Alert({ text, time }: { text: string; time: string }) {
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
