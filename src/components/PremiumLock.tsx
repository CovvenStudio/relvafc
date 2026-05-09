import { Lock } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function PremiumLock({ label = "Conteúdo Premium", sub = "Disponível em planos pagos" }: { label?: string; sub?: string }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-background/60 backdrop-blur-md border border-gold/20">
      <div className="h-10 w-10 rounded-full bg-gold-gradient flex items-center justify-center text-background">
        <Lock className="h-5 w-5" />
      </div>
      <div className="text-center">
        <div className="text-display text-gold text-lg">{label}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <Link to="/precos" className="mt-1 rounded-md bg-gold-gradient text-background px-3 py-1.5 text-sm font-bold hover:opacity-90 transition">
        Ver planos
      </Link>
    </div>
  );
}
