import { Link } from "@tanstack/react-router";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/descobrir", label: "Descobrir" },
  { to: "/precos", label: "Preços" },
  { to: "/dashboard/jogador", label: "Sou Jogador" },
  { to: "/dashboard/scout", label: "Scout / Agente" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <div className="h-8 w-8 rounded-md bg-gold-gradient flex items-center justify-center text-background font-black text-lg">R</div>
          <span className="text-display text-xl tracking-tight"><span className="text-white">Relva</span><span className="text-gold">FC</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {NAV.map((l) => (
            <Link key={l.to} to={l.to} activeProps={{ className: "text-gold bg-gold-soft" }} inactiveProps={{ className: "text-white/70" }} className="px-3 py-1.5 rounded-md hover:text-white hover:bg-white/5 transition font-medium">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/descobrir" className="hidden sm:inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-sm text-white/70">
            <Search className="h-4 w-4" /> Pesquisar
          </Link>
          <Link to="/dashboard/jogador" className="hidden md:inline-flex rounded-md bg-gold-gradient text-background px-4 py-1.5 text-sm font-bold hover:opacity-90 transition">Entrar</Link>
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="md:hidden h-9 w-9 rounded-md border border-white/10 bg-white/5 flex items-center justify-center">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {NAV.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} activeProps={{ className: "text-gold bg-gold-soft" }} inactiveProps={{ className: "text-white/80" }} className="px-3 py-3 rounded-md hover:bg-white/5 font-semibold text-sm">
                {l.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link to="/dashboard/jogador" onClick={() => setOpen(false)} className="rounded-md bg-gold-gradient text-background px-3 py-2.5 text-center text-sm font-bold">
                Entrar como Jogador
              </Link>
              <Link to="/dashboard/scout" onClick={() => setOpen(false)} className="rounded-md border border-gold/30 bg-gold-soft text-gold px-3 py-2.5 text-center text-sm font-bold">
                Entrar como Scout
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-background/80 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gold-gradient flex items-center justify-center text-background font-black text-lg">R</div>
            <span className="text-display text-xl"><span className="text-white">Relva</span><span className="text-gold">FC</span></span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">A relva é a mesma. As histórias são únicas. Plataforma portuguesa de descoberta de talento futebolístico em todas as divisões.</p>
        </div>
        <div>
          <div className="text-display text-gold text-sm mb-3">Plataforma</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/descobrir" className="hover:text-gold">Descobrir</Link></li>
            <li><Link to="/precos" className="hover:text-gold">Preços</Link></li>
            <li><Link to="/dashboard/jogador" className="hover:text-gold">Para Jogadores</Link></li>
            <li><Link to="/dashboard/scout" className="hover:text-gold">Para Scouts</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-display text-gold text-sm mb-3">RelvaFC</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Sobre</li><li>Contacto</li><li>Termos</li><li>Privacidade</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} RelvaFC — Lisboa, Portugal</span>
          <span className="text-display tracking-wider text-white/50">A RELVA É A MESMA. AS HISTÓRIAS SÃO ÚNICAS.</span>
        </div>
      </div>
    </footer>
  );
}
