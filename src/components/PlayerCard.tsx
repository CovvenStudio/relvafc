import { Link } from "@tanstack/react-router";
import type { Player } from "@/mocks/data";
import { AvailabilityDot, AvailabilityBadge } from "./AvailabilityBadge";
import { UserX } from "lucide-react";

export function PlayerCard({ player, variant = "grid" }: { player: Player; variant?: "grid" | "list" | "mini" }) {
  if (variant === "list") {
    return (
      <Link to="/jogador/$id" params={{ id: player.slug }} className="group flex items-center gap-4 rounded-xl border border-white/10 bg-card-blur p-3 hover:border-gold/40 transition">
        <img src={player.photo} alt={player.name} className="h-14 w-14 rounded-lg object-cover" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white truncate">{player.name}</span>
            <AvailabilityDot value={player.availability} />
          </div>
          <div className="text-xs text-muted-foreground truncate">{player.position} · {player.club} · {player.age} anos</div>
        </div>
        <div className="hidden sm:flex gap-4 text-sm">
          <div className="text-right"><div className="text-gold text-display text-lg leading-none">{player.goals}</div><div className="text-[10px] text-muted-foreground uppercase">Golos</div></div>
          <div className="text-right"><div className="text-white text-display text-lg leading-none">{player.assists}</div><div className="text-[10px] text-muted-foreground uppercase">Assist.</div></div>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/jogador/$id" params={{ id: player.slug }} className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card-blur hover:border-gold/40 transition glow-gold-hover">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={player.photo} alt={player.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="rounded-md bg-background/80 backdrop-blur px-2 py-0.5 text-[11px] font-bold text-gold border border-gold/30">{player.positionShort}</span>
          {player.noAgent && (
            <span className="inline-flex items-center gap-1 rounded-md bg-background/80 backdrop-blur px-2 py-0.5 text-[10px] font-medium text-white/80 border border-white/10">
              <UserX className="h-3 w-3" /> Sem agente
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3"><AvailabilityDot value={player.availability} /></div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-display text-2xl text-white leading-none">{player.name}</div>
          <div className="mt-1 text-xs text-white/70">{player.club} · {player.age} anos</div>
        </div>
      </div>
      <div className="grid grid-cols-3 divide-x divide-white/5 border-t border-white/5">
        <Stat label="Jog" value={player.matches} />
        <Stat label="Golos" value={player.goals} accent />
        <Stat label="Assist" value={player.assists} />
      </div>
    </Link>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="px-2 py-2 text-center">
      <div className={`text-display text-xl leading-none ${accent ? "text-gold" : "text-white"}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

export { AvailabilityBadge };
