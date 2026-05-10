import type { FullStats } from "@/mocks/data";

function Row({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-white/70">{label}</span>
      <span className={`text-display text-lg ${accent ? "text-gold" : "text-white"}`}>{value}</span>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card-blur p-5">
      <div className="text-display text-gold text-xs tracking-widest mb-2">{title}</div>
      <div>{children}</div>
    </div>
  );
}

export function FullStatsPanel({ stats, isGK, gpg, apg }: { stats: FullStats; isGK: boolean; gpg: number; apg: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Group title="Universal">
        <Row label="Jogos" value={stats.matches} />
        <Row label="Como titular" value={stats.matchesStarted} />
        <Row label="Minutos" value={stats.minutes.toLocaleString("pt-PT")} />
        <Row label="Golos" value={stats.goals} accent />
        <Row label="Golos / jogo" value={gpg.toFixed(2)} />
        <Row label="Assistências" value={stats.assists} />
        <Row label="Assist. / jogo" value={apg.toFixed(2)} />
        <Row label="Amarelos" value={stats.yellow} />
        <Row label="Vermelhos" value={stats.red} />
      </Group>

      <Group title="Ataque">
        <Row label="Remates / jogo" value={stats.shotsPerGame} />
        <Row label="À baliza" value={stats.shotsOnTarget} />
        <Row label="Fora" value={stats.shotsOffTarget} />
        <Row label="Precisão" value={`${stats.shotAccuracy}%`} />
        <Row label="Big chances falhadas" value={stats.bigChancesMissed} />
        <Row label="xG (esperados)" value={stats.xG} accent />
        <Row label="Dribles / jogo" value={stats.dribblesPerGame} />
      </Group>

      <Group title="Passe & Criatividade">
        <Row label="Passes / jogo" value={stats.passesPerGame} />
        <Row label="Precisão de passe" value={`${stats.passAccuracy}%`} />
        <Row label="Passes-chave / jogo" value={stats.keyPassesPerGame} />
        <Row label="Big chances criadas" value={stats.bigChancesCreated} />
        <Row label="Bolas longas / jogo" value={stats.longBallsPerGame} />
        <Row label="Cruzamentos / jogo" value={stats.crossesPerGame} />
      </Group>

      <Group title="Defesa">
        <Row label="Desarmes / jogo" value={stats.tacklesPerGame} />
        <Row label="Interceções / jogo" value={stats.interceptionsPerGame} />
        <Row label="Cortes / jogo" value={stats.clearancesPerGame} />
        <Row label="Duelos ganhos" value={`${stats.duelsWonPct}%`} />
        <Row label="Duelos aéreos" value={`${stats.aerialDuelsWonPct}%`} />
      </Group>

      <Group title="Físico">
        <Row label="Distância / jogo" value={`${stats.distancePerGame} km`} />
        <Row label="Sprints / jogo" value={stats.sprintsPerGame} />
        <Row label="Velocidade máx." value={`${stats.topSpeed} km/h`} accent />
      </Group>

      {isGK && stats.cleanSheets !== undefined && (
        <Group title="Guarda-redes">
          <Row label="Clean sheets" value={stats.cleanSheets} accent />
          <Row label="Defesas / jogo" value={stats.savesPerGame ?? 0} />
          <Row label="% defesas" value={`${stats.savePct}%`} />
          <Row label="Golos sofridos / jogo" value={stats.goalsConcededPerGame ?? 0} />
          <Row label="Erros que levaram a golo" value={stats.errorsLeadingToGoals ?? 0} />
        </Group>
      )}
    </div>
  );
}
