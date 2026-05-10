import { createFileRoute } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/precos")({
  head: () => ({
    meta: [
      { title: "Preços — ProFootPlay" },
      { name: "description", content: "Planos para jogadores, scouts, agentes e clubes." },
      { property: "og:title", content: "Preços ProFootPlay" },
    ],
  }),
  component: Pricing,
});

const plans = [
  { name: "Jogador Free", price: "€0", period: "/sempre", desc: "Começa grátis.", features: ["Perfil básico", "1 vídeo", "URL pública partilhável", "Estatísticas da época"], cta: "Criar perfil grátis", highlight: false },
  { name: "Jogador Premium", price: "€4", period: "/mês", desc: "Sê visto pelos scouts certos.", features: ["Tudo do Free", "Vídeos ilimitados", "Ver visitantes do perfil", "Destaque na descoberta"], cta: "Tornar Premium", highlight: false },
  { name: "Scout / Agente Pro", price: "€75", period: "/mês", desc: "Acesso total à base nacional.", features: ["Pesquisa avançada e filtros", "Alertas em tempo real", "Notas e listas privadas", "Contacto direto a jogadores", "Pesquisas guardadas ilimitadas"], cta: "Começar Pro", highlight: true },
  { name: "Clube", price: "€15", period: "/mês", desc: "Gere o teu plantel oficialmente.", features: ["Página oficial reclamada", "Confirmação de plantel", "Gestão completa do clube", "Página verificada com selo"], cta: "Reclamar clube", highlight: false },
];

function Pricing() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-grass-gradient -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-display text-gold text-sm tracking-widest">PREÇOS</div>
          <h1 className="text-display text-5xl md:text-6xl mt-2">Planos para todos na relva</h1>
          <p className="mt-4 text-white/70">Começa grátis. Faz upgrade quando estiveres pronto. Cancela quando quiseres.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((p) => (
            <div key={p.name} className={`relative rounded-2xl border p-6 flex flex-col ${p.highlight ? "border-gold/40 bg-gradient-to-br from-gold-soft via-card to-background glow-gold" : "border-white/10 bg-card-blur"}`}>
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gold-gradient text-background px-3 py-1 text-xs font-bold">
                  <Sparkles className="h-3 w-3" /> Recomendado
                </div>
              )}
              <div className="text-display text-xl">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className={`text-display text-5xl ${p.highlight ? "text-gold" : "text-white"}`}>{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.period}</span>
              </div>
              <p className="mt-2 text-sm text-white/70">{p.desc}</p>
              <ul className="mt-5 space-y-2 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${p.highlight ? "text-gold" : "text-green-400"}`} />
                    <span className="text-white/80">{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-6 rounded-lg px-4 py-2.5 text-sm font-bold transition ${p.highlight ? "bg-gold-gradient text-background glow-gold" : "border border-white/15 bg-white/5 hover:bg-white/10"}`}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-muted-foreground">
          Todos os preços em EUR. Sem fidelização. Cancela a qualquer momento.
        </div>
      </div>
    </div>
  );
}
