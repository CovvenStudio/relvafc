import { useState } from "react";
import { Play, Lock } from "lucide-react";
import type { PlayerVideo } from "@/mocks/data";

const TAGS: PlayerVideo["tag"][] = ["Golo", "Assistência", "Defesa", "Drible", "Livre"];

export function HighlightsGrid({ videos }: { videos: PlayerVideo[] }) {
  const [filter, setFilter] = useState<PlayerVideo["tag"] | "Todos">("Todos");
  const list = filter === "Todos" ? videos : videos.filter((v) => v.tag === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="text-display text-2xl">Highlights</h2>
        <div className="flex gap-1.5 flex-wrap">
          {(["Todos", ...TAGS] as const).map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1 rounded-full text-xs font-semibold border ${filter === t ? "bg-gold-gradient text-background border-gold" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((v, i) => (
          <div key={i} className="group relative aspect-video overflow-hidden rounded-xl border border-white/10">
            <img src={v.thumb} alt={v.title} className="h-full w-full object-cover transition group-hover:scale-105" />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-background/80 text-[10px] uppercase tracking-wider text-gold">{v.tag}</div>
            {v.duration && <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 text-[10px]">{v.duration}</div>}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-gold-gradient flex items-center justify-center text-background glow-gold">
                {v.premium ? <Lock className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5 fill-current" />}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background to-transparent text-left">
              <div className="font-semibold text-sm">{v.title}</div>
              <div className="text-[11px] text-muted-foreground">{v.match} · {v.date}</div>
            </div>
            {v.premium && (
              <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] flex items-center justify-center">
                <div className="rounded-lg bg-gold-soft border border-gold/30 px-3 py-1.5 text-xs text-gold font-bold inline-flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> Premium
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
