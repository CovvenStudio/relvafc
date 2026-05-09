import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import { positions, divisions, districts } from "@/mocks/data";

export interface Filters {
  position?: string;
  division?: string;
  district?: string;
  ageMax?: number;
  availability?: string;
  noAgent?: boolean;
}

export function FilterSidebar({ filters, onChange }: { filters: Filters; onChange: (f: Filters) => void }) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });
  return (
    <aside className="rounded-2xl border border-white/10 bg-card-blur p-5 space-y-5 sticky top-20">
      <div className="flex items-center gap-2 text-display text-lg"><Filter className="h-4 w-4 text-gold" /> Filtros</div>

      <Section title="Posição">
        <Select value={filters.position ?? ""} onChange={(v) => set({ position: v || undefined })} options={["Todas", ...positions]} />
      </Section>
      <Section title="Divisão">
        <Select value={filters.division ?? ""} onChange={(v) => set({ division: v || undefined })} options={["Todas", ...divisions]} />
      </Section>
      <Section title="Distrito">
        <Select value={filters.district ?? ""} onChange={(v) => set({ district: v || undefined })} options={["Todos", ...districts]} />
      </Section>
      <Section title={`Idade máxima: ${filters.ageMax ?? 35}`}>
        <input type="range" min={16} max={40} value={filters.ageMax ?? 35} onChange={(e) => set({ ageMax: Number(e.target.value) })} className="w-full accent-[var(--gold)]" />
      </Section>
      <Section title="Disponibilidade">
        <div className="flex flex-wrap gap-2">
          {[
            { v: "disponivel", label: "Disponível" },
            { v: "aberto", label: "Aberto" },
            { v: "indisponivel", label: "Indisponível" },
          ].map((o) => (
            <button key={o.v} onClick={() => set({ availability: filters.availability === o.v ? undefined : o.v })} className={`rounded-full border px-3 py-1 text-xs ${filters.availability === o.v ? "bg-gold text-background border-gold" : "border-white/10 text-white/70 hover:border-gold/40"}`}>{o.label}</button>
          ))}
        </div>
      </Section>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={!!filters.noAgent} onChange={(e) => set({ noAgent: e.target.checked || undefined })} className="accent-[var(--gold)] h-4 w-4" />
        <span className="text-sm">Apenas sem agente</span>
      </label>
      <button onClick={() => onChange({})} className="w-full rounded-md border border-white/10 py-2 text-sm hover:bg-white/5">Limpar filtros</button>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {title} <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value === options[0] ? "" : e.target.value)} className="w-full rounded-md border border-white/10 bg-background/50 px-3 py-2 text-sm focus:border-gold/50 outline-none">
      {options.map((o) => <option key={o} value={o === options[0] ? "" : o} className="bg-background">{o}</option>)}
    </select>
  );
}
