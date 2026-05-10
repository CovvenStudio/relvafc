import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { MatchEntry } from "@/mocks/data";

export function PerformanceChart({ matches }: { matches: MatchEntry[] }) {
  const data = matches.map((m, i) => ({
    name: `J${i + 1}`,
    proScore: m.proScore,
    opponent: m.opponent,
    score: m.score,
  }));

  return (
    <div className="rounded-2xl border border-white/10 bg-card-blur p-5">
      <div className="text-display text-xl mb-3">Evolução de desempenho</div>
      <div className="h-64 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="name" stroke="#6B7280" fontSize={11} />
            <YAxis domain={[0, 10]} stroke="#6B7280" fontSize={11} />
            <Tooltip
              contentStyle={{ background: "#132016", border: "1px solid rgba(234,179,8,0.3)", borderRadius: 8 }}
              labelStyle={{ color: "#EAB308" }}
              formatter={(_v, _n, p: any) => [`${p.payload.proScore} · vs ${p.payload.opponent} (${p.payload.score})`, "ProScore"]}
            />
            <Line type="monotone" dataKey="proScore" stroke="#EAB308" strokeWidth={2.5} dot={{ r: 4, fill: "#EAB308" }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
