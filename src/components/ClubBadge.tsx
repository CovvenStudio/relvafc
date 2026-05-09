import { DivisionTag } from "./DivisionTag";

export function ClubBadge({ name, badge, division, size = "md" }: { name: string; badge: string; division?: string; size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "h-16 w-16 text-3xl" : size === "sm" ? "h-8 w-8 text-base" : "h-10 w-10 text-xl";
  return (
    <div className="flex items-center gap-3">
      <div className={`${dim} rounded-lg bg-gradient-to-br from-surface-elevated to-surface border border-white/10 flex items-center justify-center`}>
        <span>{badge}</span>
      </div>
      <div className="min-w-0">
        <div className="font-semibold text-white truncate">{name}</div>
        {division && <div className="mt-0.5"><DivisionTag division={division} /></div>}
      </div>
    </div>
  );
}
