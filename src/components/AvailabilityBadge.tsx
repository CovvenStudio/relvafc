import type { Availability } from "@/mocks/data";

const map: Record<Availability, { label: string; dot: string; bg: string; text: string }> = {
  disponivel: { label: "Disponível", dot: "bg-green-400", bg: "bg-green-500/15 border-green-500/30", text: "text-green-300" },
  aberto: { label: "Aberto a propostas", dot: "bg-yellow-400", bg: "bg-yellow-500/15 border-yellow-500/30", text: "text-yellow-300" },
  indisponivel: { label: "Indisponível", dot: "bg-zinc-500", bg: "bg-zinc-500/15 border-zinc-500/30", text: "text-zinc-300" },
};

export function AvailabilityBadge({ value, size = "sm" }: { value: Availability; size?: "sm" | "md" }) {
  const s = map[value];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${s.bg} ${s.text} ${size === "md" ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs"} font-medium`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot} animate-pulse`} />
      {s.label}
    </span>
  );
}

export function AvailabilityDot({ value }: { value: Availability }) {
  const s = map[value];
  return <span className={`h-2 w-2 rounded-full ${s.dot}`} />;
}
