import type { Player } from "@/mocks/data";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { MapPin, CalendarClock, UserX, UserCheck } from "lucide-react";

export function AvailabilityPanel({ player }: { player: Player }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card-blur p-5">
      <div className="text-display text-gold text-xs tracking-widest mb-3">DISPONIBILIDADE</div>
      <AvailabilityBadge value={player.availability} size="md" />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> Mudança de cidade</div>
          <div className="mt-1 text-display text-lg">{player.willingToRelocate ? "Sim" : "Não"}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><CalendarClock className="h-3.5 w-3.5" /> Contrato termina</div>
          <div className="mt-1 text-display text-lg">{player.contractEnds}</div>
        </div>
        <div className={`rounded-xl border p-3 ${player.noAgent ? "border-gold/40 bg-gold-soft" : "border-white/10 bg-white/5"}`}>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {player.noAgent ? <UserX className="h-3.5 w-3.5" /> : <UserCheck className="h-3.5 w-3.5" />} Agente
          </div>
          <div className={`mt-1 text-display text-lg ${player.noAgent ? "text-gold" : ""}`}>{player.noAgent ? "Sem agente" : "Tem agente"}</div>
        </div>
      </div>
    </div>
  );
}
