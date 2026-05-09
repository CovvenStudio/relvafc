import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { players } from "@/mocks/data";
import { FilterSidebar, type Filters } from "@/components/FilterSidebar";
import { PlayerCard } from "@/components/PlayerCard";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/descobrir")({
  head: () => ({
    meta: [
      { title: "Descobrir Jogadores — RelvaFC" },
      { name: "description", content: "Filtra por posição, divisão, distrito e disponibilidade. Encontra talento em todas as ligas portuguesas." },
    ],
  }),
  component: DiscoverPage,
});

function DiscoverPage() {
  const [filters, setFilters] = useState<Filters>({});
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<"relevance" | "goals" | "age" | "recent">("relevance");
  const [openFilters, setOpenFilters] = useState(false);

  const filtered = useMemo(() => {
    let r = players.filter((p) =>
      (!filters.position || p.position === filters.position) &&
      (!filters.division || p.division === filters.division) &&
      (!filters.district || p.district === filters.district) &&
      (!filters.availability || p.availability === filters.availability) &&
      (!filters.noAgent || p.noAgent) &&
      (!filters.ageMax || p.age <= filters.ageMax)
    );
    if (sort === "goals") r = [...r].sort((a, b) => b.goals - a.goals);
    if (sort === "age") r = [...r].sort((a, b) => a.age - b.age);
    return r;
  }, [filters, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="text-display text-gold text-sm tracking-widest">DESCOBRIR</div>
        <h1 className="text-display text-4xl md:text-5xl mt-1">Talento por descobrir</h1>
        <p className="mt-2 text-white/60 max-w-2xl">{filtered.length} jogadores encontrados em todas as divisões.</p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <div className="lg:block hidden"><FilterSidebar filters={filters} onChange={setFilters} /></div>
        {openFilters && <div className="lg:hidden"><FilterSidebar filters={filters} onChange={setFilters} /></div>}

        <div>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <button onClick={() => setOpenFilters(!openFilters)} className="lg:hidden inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm">
              <SlidersHorizontal className="h-4 w-4" /> Filtros
            </button>
            <div className="ml-auto flex items-center gap-2">
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="rounded-md border border-white/10 bg-background/50 px-3 py-2 text-sm">
                <option value="relevance">Relevância</option>
                <option value="goals">Golos</option>
                <option value="age">Idade</option>
                <option value="recent">Recente</option>
              </select>
              <div className="flex rounded-md border border-white/10 overflow-hidden">
                <button onClick={() => setView("grid")} className={`p-2 ${view === "grid" ? "bg-gold text-background" : "hover:bg-white/5"}`}><LayoutGrid className="h-4 w-4" /></button>
                <button onClick={() => setView("list")} className={`p-2 ${view === "list" ? "bg-gold text-background" : "hover:bg-white/5"}`}><List className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {view === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => <PlayerCard key={p.id} player={p} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((p) => <PlayerCard key={p.id} player={p} variant="list" />)}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-card-blur p-10 text-center text-muted-foreground">
              Nenhum jogador encontrado. Tenta ajustar os filtros.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
