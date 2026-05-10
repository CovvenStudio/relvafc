export type Availability = "disponivel" | "aberto" | "indisponivel";

export interface VideoTag {
  tag: "Golo" | "Assistência" | "Defesa" | "Drible" | "Livre";
}

export interface PlayerVideo {
  title: string;
  thumb: string;
  match?: string;
  date?: string;
  duration?: string;
  tag: VideoTag["tag"];
  premium?: boolean;
}

export interface CareerEntry {
  club: string;
  badge: string;
  years: string;
  division?: string;
  appearances?: number;
  goals?: number;
  assists?: number;
}

export interface FullStats {
  // universal
  matches: number;
  matchesStarted: number;
  minutes: number;
  goals: number;
  assists: number;
  yellow: number;
  red: number;
  // attacking
  shotsPerGame: number;
  shotsOnTarget: number;
  shotsOffTarget: number;
  shotAccuracy: number;
  bigChancesMissed: number;
  xG: number;
  dribblesPerGame: number;
  // passing
  passesPerGame: number;
  passAccuracy: number;
  keyPassesPerGame: number;
  bigChancesCreated: number;
  longBallsPerGame: number;
  crossesPerGame: number;
  // defensive
  tacklesPerGame: number;
  interceptionsPerGame: number;
  clearancesPerGame: number;
  duelsWonPct: number;
  aerialDuelsWonPct: number;
  // physical
  distancePerGame: number; // km
  sprintsPerGame: number;
  topSpeed: number; // km/h
  // GK only
  cleanSheets?: number;
  savesPerGame?: number;
  savePct?: number;
  goalsConcededPerGame?: number;
  errorsLeadingToGoals?: number;
}

export interface MatchEntry {
  id: string;
  opponent: string;
  score: string;
  proScore: number;
  date: string;
}

export interface Player {
  id: string;
  slug: string;
  name: string;
  age: number;
  position: string;
  positionShort: string;
  club: string;
  clubId: string;
  division: string;
  district: string;
  availability: Availability;
  goals: number;
  assists: number;
  matches: number;
  minutes: number;
  noAgent: boolean;
  willingToRelocate: boolean;
  contractEnds: string;
  photo: string;
  bio: string;
  history: { club: string; years: string }[];
  career: CareerEntry[];
  videos: PlayerVideo[];
  proScore: number;
  proScoreCareer: number;
  recentProScores: number[]; // last 5
  matchHistory: MatchEntry[]; // last 10
  stats: FullStats;
  heatmap: number[]; // 6x10 = 60 cells, 0..1
  shotmap?: { x: number; y: number; type: "goal" | "ontarget" | "off" }[];
}

export interface Club {
  id: string;
  slug: string;
  name: string;
  city: string;
  division: string;
  claimed: boolean;
  badge: string;
  squad: string[];
  founded: number;
  stadium: string;
}

export interface Scout {
  id: string;
  name: string;
  role: string;
  org: string;
  saved: number;
  region: string;
}

// ----- helpers -----
function rng(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function makeHeatmap(position: string, seed: number): number[] {
  const r = rng(seed);
  // 6 rows (own goal -> opponent goal), 10 cols
  const arr: number[] = [];
  const isGK = position.includes("Guarda");
  const isDef = position.includes("Defesa") || position.includes("Lateral");
  const isMid = position.includes("Médio");
  const isFwd = position.includes("Avançado") || position.includes("Extremo");
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 10; col++) {
      let weight = 0.1;
      if (isGK) weight = row === 0 ? 0.9 : row === 1 ? 0.4 : 0.05;
      else if (isDef) weight = row <= 1 ? 0.85 : row === 2 ? 0.5 : 0.15;
      else if (isMid) weight = row >= 1 && row <= 4 ? 0.75 : 0.25;
      else if (isFwd) {
        const wide = position.includes("Extremo") && (col < 2 || col > 7);
        weight = row >= 4 ? 0.85 : row >= 3 ? 0.5 : 0.2;
        if (wide) weight = Math.min(1, weight + 0.2);
      }
      arr.push(Math.min(1, weight + r() * 0.25 - 0.1));
    }
  }
  return arr;
}

function makeShotmap(position: string, seed: number) {
  if (!(position.includes("Avançado") || position.includes("Extremo") || position.includes("Ofensivo"))) return undefined;
  const r = rng(seed);
  const n = 15 + Math.floor(r() * 10);
  const out: { x: number; y: number; type: "goal" | "ontarget" | "off" }[] = [];
  for (let i = 0; i < n; i++) {
    const x = 0.15 + r() * 0.7;
    const y = 0.45 + r() * 0.5;
    const v = r();
    out.push({ x, y, type: v < 0.25 ? "goal" : v < 0.55 ? "ontarget" : "off" });
  }
  return out;
}

function makeStats(seed: number, position: string, base: { goals: number; assists: number; matches: number; minutes: number }): FullStats {
  const r = rng(seed);
  const isGK = position.includes("Guarda");
  const isDef = position.includes("Defesa") || position.includes("Lateral");
  const isFwd = position.includes("Avançado") || position.includes("Extremo");
  const stats: FullStats = {
    matches: base.matches,
    matchesStarted: Math.max(0, base.matches - Math.floor(r() * 4)),
    minutes: base.minutes,
    goals: base.goals,
    assists: base.assists,
    yellow: Math.floor(r() * 6),
    red: r() < 0.15 ? 1 : 0,
    shotsPerGame: +(isFwd ? 2.5 + r() : 1 + r()).toFixed(1),
    shotsOnTarget: Math.floor(base.goals * 1.6 + r() * 8),
    shotsOffTarget: Math.floor(r() * 20 + 5),
    shotAccuracy: Math.round(35 + r() * 30),
    bigChancesMissed: Math.floor(r() * 8),
    xG: +(base.goals * (0.7 + r() * 0.4)).toFixed(1),
    dribblesPerGame: +(isFwd ? 2 + r() * 2 : 0.5 + r()).toFixed(1),
    passesPerGame: Math.round(isDef ? 45 + r() * 20 : 30 + r() * 25),
    passAccuracy: Math.round(72 + r() * 18),
    keyPassesPerGame: +(0.5 + r() * 2).toFixed(1),
    bigChancesCreated: Math.floor(base.assists * 1.5 + r() * 4),
    longBallsPerGame: +(isDef ? 4 + r() * 4 : 1 + r() * 2).toFixed(1),
    crossesPerGame: +(position.includes("Lateral") || position.includes("Extremo") ? 2 + r() * 3 : 0.3 + r()).toFixed(1),
    tacklesPerGame: +(isDef ? 2.5 + r() * 1.5 : 1 + r()).toFixed(1),
    interceptionsPerGame: +(isDef ? 2 + r() * 1.5 : 0.7 + r()).toFixed(1),
    clearancesPerGame: +(isDef ? 3 + r() * 2 : 0.5 + r()).toFixed(1),
    duelsWonPct: Math.round(50 + r() * 25),
    aerialDuelsWonPct: Math.round(45 + r() * 30),
    distancePerGame: +(9.5 + r() * 2).toFixed(1),
    sprintsPerGame: Math.round(15 + r() * 15),
    topSpeed: +(30 + r() * 6).toFixed(1),
  };
  if (isGK) {
    stats.cleanSheets = Math.floor(base.matches * (0.25 + r() * 0.2));
    stats.savesPerGame = +(2.5 + r() * 2).toFixed(1);
    stats.savePct = Math.round(65 + r() * 20);
    stats.goalsConcededPerGame = +(0.8 + r() * 0.8).toFixed(2);
    stats.errorsLeadingToGoals = Math.floor(r() * 3);
  }
  return stats;
}

function makeRecentScores(seed: number, base: number): number[] {
  const r = rng(seed);
  return Array.from({ length: 5 }, () => +Math.max(5, Math.min(9.5, base + (r() - 0.5) * 1.5)).toFixed(1));
}

function makeMatchHistory(seed: number, base: number): MatchEntry[] {
  const r = rng(seed);
  const opps = ["Sporting B", "Benfica B", "Porto B", "Braga B", "Vitória SC", "Estoril", "Mafra", "Tondela", "Académica", "Leixões"];
  return Array.from({ length: 10 }, (_, i) => ({
    id: `m${i}`,
    opponent: opps[i % opps.length],
    score: `${Math.floor(r() * 4)}-${Math.floor(r() * 3)}`,
    proScore: +Math.max(5, Math.min(9.5, base + (r() - 0.5) * 1.6)).toFixed(1),
    date: `2024-${String(9 + Math.floor(i / 4)).padStart(2, "0")}-${String(5 + i * 2).padStart(2, "0")}`,
  }));
}

function makeCareer(history: { club: string; years: string }[], badges: string[]): CareerEntry[] {
  return history.map((h, i) => ({
    club: h.club,
    years: h.years,
    badge: badges[i % badges.length],
    division: i === 0 ? "Liga 3" : "Distrital",
    appearances: 18 + Math.floor(Math.random() * 12),
    goals: Math.floor(Math.random() * 12),
    assists: Math.floor(Math.random() * 8),
  }));
}

const tags: VideoTag["tag"][] = ["Golo", "Assistência", "Drible", "Defesa", "Livre"];

function makeVideos(base: { title: string; thumb: string; tag: VideoTag["tag"] }[], seed: number): PlayerVideo[] {
  const r = rng(seed);
  return base.map((v, i) => ({
    ...v,
    match: ["vs Sporting B", "vs Porto B", "vs Mafra", "vs Estoril"][i % 4],
    date: "2025-03-12",
    duration: `${1 + Math.floor(r() * 3)}:${String(10 + Math.floor(r() * 49)).padStart(2, "0")}`,
    tag: tags[Math.floor(r() * tags.length)],
    premium: i >= 1,
  }));
}

// ----- raw players -----
type RawPlayer = Omit<Player, "stats" | "heatmap" | "shotmap" | "proScore" | "proScoreCareer" | "recentProScores" | "matchHistory" | "career" | "willingToRelocate" | "contractEnds"> & {
  proScore?: number;
  willingToRelocate?: boolean;
  contractEnds?: string;
};

const raw: RawPlayer[] = [
  {
    id: "p1", slug: "joao-silva", name: "João Silva", age: 22,
    position: "Avançado", positionShort: "AV",
    club: "SC Farense B", clubId: "c1", division: "Liga 3", district: "Faro",
    availability: "disponivel", goals: 14, assists: 5, matches: 24, minutes: 1980,
    noAgent: true, proScore: 7.8,
    willingToRelocate: true, contractEnds: "06/2025",
    photo: "https://images.unsplash.com/photo-1546608235-3310a2494cdf?auto=format&fit=crop&w=800&q=70",
    bio: "Avançado rápido com excelente remate de pé direito. Formado no Farense.",
    history: [
      { club: "SC Farense Sub-23", years: "2021–2023" },
      { club: "Louletano DC", years: "2019–2021" },
    ],
    videos: makeVideos([
      { title: "Highlights 2024/25", thumb: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=70", tag: "Golo" },
      { title: "Golos da época", thumb: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=600&q=70", tag: "Golo" },
      { title: "Dribles", thumb: "https://images.unsplash.com/photo-1517747614396-d21a78b850e8?auto=format&fit=crop&w=600&q=70", tag: "Drible" },
    ], 11),
  },
  {
    id: "p2", slug: "rui-costa", name: "Rui Costa", age: 19,
    position: "Médio Ofensivo", positionShort: "MO",
    club: "Oriental Lisboa", clubId: "c3", division: "AF Lisboa Distrital", district: "Lisboa",
    availability: "aberto", goals: 8, assists: 11, matches: 22, minutes: 1750,
    noAgent: true, proScore: 7.4,
    willingToRelocate: false, contractEnds: "06/2026",
    photo: "https://images.unsplash.com/photo-1552847661-dddc2fc3700d?auto=format&fit=crop&w=800&q=70",
    bio: "Médio criativo, visão de jogo acima da média. Pé esquerdo.",
    history: [{ club: "Oriental Lisboa Sub-19", years: "2020–2024" }],
    videos: makeVideos([
      { title: "Assistências 2024/25", thumb: "https://images.unsplash.com/photo-1517747614396-d21a78b850e8?auto=format&fit=crop&w=600&q=70", tag: "Assistência" },
      { title: "Livres", thumb: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=70", tag: "Livre" },
    ], 22),
  },
  {
    id: "p3", slug: "pedro-alves", name: "Pedro Alves", age: 24,
    position: "Defesa Central", positionShort: "DC",
    club: "AD Oliveirense", clubId: "c5", division: "Campeonato de Portugal Série D", district: "Aveiro",
    availability: "indisponivel", goals: 1, assists: 0, matches: 26, minutes: 2310,
    noAgent: false, proScore: 7.1,
    willingToRelocate: true, contractEnds: "06/2025",
    photo: "https://images.unsplash.com/photo-1528111029373-08e08e652ed8?auto=format&fit=crop&w=800&q=70",
    bio: "Central forte no jogo aéreo, líder defensivo.",
    history: [
      { club: "AD Oliveirense", years: "2022–presente" },
      { club: "Anadia FC", years: "2019–2022" },
    ],
    videos: makeVideos([
      { title: "Defesas 2024/25", thumb: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=600&q=70", tag: "Defesa" },
    ], 33),
  },
  {
    id: "p4", slug: "tiago-ferreira", name: "Tiago Ferreira", age: 21,
    position: "Extremo Direito", positionShort: "ED",
    club: "Pinhalnovense", clubId: "c4", division: "AF Setúbal", district: "Setúbal",
    availability: "disponivel", goals: 9, assists: 7, matches: 23, minutes: 1820,
    noAgent: true, proScore: 7.6,
    willingToRelocate: true, contractEnds: "06/2025",
    photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=70",
    bio: "Extremo veloz, finalização precisa. Procura subida de divisão.",
    history: [{ club: "Pinhalnovense", years: "2021–presente" }],
    videos: makeVideos([
      { title: "Skills & Golos", thumb: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=70", tag: "Drible" },
      { title: "Assistências", thumb: "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=600&q=70", tag: "Assistência" },
    ], 44),
  },
  {
    id: "p5", slug: "miguel-santos", name: "Miguel Santos", age: 23,
    position: "Guarda-redes", positionShort: "GR",
    club: "CD Mafra B", clubId: "c6", division: "Liga 3", district: "Lisboa",
    availability: "aberto", goals: 0, assists: 0, matches: 25, minutes: 2250,
    noAgent: false, proScore: 7.3,
    willingToRelocate: false, contractEnds: "06/2027",
    photo: "https://images.unsplash.com/photo-1564415900645-bc5d99ff79d3?auto=format&fit=crop&w=800&q=70",
    bio: "GR alto, excelente reflexo, bom jogo de pés.",
    history: [{ club: "CD Mafra B", years: "2022–presente" }],
    videos: makeVideos([
      { title: "Defesas da época", thumb: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?auto=format&fit=crop&w=600&q=70", tag: "Defesa" },
    ], 55),
  },
  {
    id: "p6", slug: "diogo-marques", name: "Diogo Marques", age: 20,
    position: "Lateral Esquerdo", positionShort: "LE",
    club: "GD Estoril Praia B", clubId: "c3b", division: "Distritais Lisboa", district: "Lisboa",
    availability: "disponivel", goals: 2, assists: 6, matches: 21, minutes: 1700,
    noAgent: true, proScore: 6.9,
    willingToRelocate: true, contractEnds: "06/2025",
    photo: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=70",
    bio: "Lateral ofensivo, cruzamentos precisos.",
    history: [{ club: "GD Estoril Praia Sub-19", years: "2020–2024" }],
    videos: makeVideos([
      { title: "Cruzamentos & Assistências", thumb: "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=600&q=70", tag: "Assistência" },
    ], 66),
  },
];

export const players: Player[] = raw.map((p, idx) => {
  const seed = (idx + 1) * 17;
  const proScore = p.proScore ?? 7.0;
  return {
    ...p,
    willingToRelocate: p.willingToRelocate ?? false,
    contractEnds: p.contractEnds ?? "06/2025",
    proScore,
    proScoreCareer: +(proScore - 0.3).toFixed(1),
    recentProScores: makeRecentScores(seed, proScore),
    matchHistory: makeMatchHistory(seed + 1, proScore),
    stats: makeStats(seed + 2, p.position, { goals: p.goals, assists: p.assists, matches: p.matches, minutes: p.minutes }),
    heatmap: makeHeatmap(p.position, seed + 3),
    shotmap: makeShotmap(p.position, seed + 4),
    career: makeCareer(p.history, ["⚽", "🛡️", "🦁", "⭐"]),
  };
});

export const clubs: Club[] = [
  { id: "c1", slug: "sc-farense-b", name: "SC Farense B", city: "Faro", division: "Liga 3", claimed: true, badge: "🦁", squad: ["p1"], founded: 1910, stadium: "Estádio de São Luís" },
  { id: "c2", slug: "cf-estrela-amadora", name: "CF Estrela da Amadora", city: "Lisboa", division: "Campeonato de Portugal", claimed: false, badge: "⭐", squad: [], founded: 1932, stadium: "Estádio José Gomes" },
  { id: "c3", slug: "oriental-lisboa", name: "Oriental Lisboa", city: "Lisboa", division: "AF Lisboa Distrital", claimed: false, badge: "🟦", squad: ["p2"], founded: 1946, stadium: "Estádio Engº Carlos Salema" },
  { id: "c3b", slug: "gd-estoril-praia-b", name: "GD Estoril Praia B", city: "Cascais", division: "Distritais Lisboa", claimed: true, badge: "🟨", squad: ["p6"], founded: 1939, stadium: "Estádio António Coimbra da Mota" },
  { id: "c4", slug: "pinhalnovense", name: "GD Pinhalnovense", city: "Pinhal Novo", division: "AF Setúbal", claimed: false, badge: "🌲", squad: ["p4"], founded: 1929, stadium: "Estádio Municipal de Pinhal Novo" },
  { id: "c5", slug: "ad-oliveirense", name: "AD Oliveirense", city: "Oliveira de Azeméis", division: "Campeonato de Portugal", claimed: true, badge: "⚔️", squad: ["p3"], founded: 1922, stadium: "Estádio Carlos Osório" },
  { id: "c6", slug: "cd-mafra-b", name: "CD Mafra B", city: "Mafra", division: "Liga 3", claimed: true, badge: "🛡️", squad: ["p5"], founded: 1965, stadium: "Estádio Municipal de Mafra" },
  { id: "c7", slug: "sc-olhanense", name: "SC Olhanense", city: "Olhão", division: "Liga 3", claimed: false, badge: "🐟", squad: [], founded: 1912, stadium: "Estádio José Arcanjo" },
];

export const scouts: Scout[] = [
  { id: "s1", name: "Carlos Mendes", role: "Scout", org: "Sporting CP", saved: 47, region: "Nacional" },
  { id: "s2", name: "Ana Ferreira", role: "Agente independente", org: "Independente", saved: 12, region: "Sul" },
  { id: "s3", name: "Bruno Tavares", role: "Scout", org: "FC Porto B", saved: 31, region: "Norte" },
];

export const positions = ["Guarda-redes", "Defesa Central", "Lateral Esquerdo", "Lateral Direito", "Médio", "Médio Ofensivo", "Extremo Direito", "Extremo Esquerdo", "Avançado"];
export const divisions = ["Liga 3", "Campeonato de Portugal", "AF Lisboa Distrital", "AF Setúbal", "Distritais Lisboa"];
export const districts = ["Lisboa", "Porto", "Faro", "Setúbal", "Aveiro", "Braga"];

// ----- pipeline (scout dashboard) -----
export type PipelineColumn = "watching" | "shortlisted" | "assessed" | "contacted";
export const pipelineLabels: Record<PipelineColumn, string> = {
  watching: "Watching",
  shortlisted: "Shortlisted",
  assessed: "Assessed",
  contacted: "Contacted",
};
export const pipelineSeed: Record<PipelineColumn, string[]> = {
  watching: ["p1", "p4"],
  shortlisted: ["p2"],
  assessed: ["p6"],
  contacted: ["p3"],
};

export const savedSearches = [
  { name: "Avançados Sub-23 · Liga 3", count: 18 },
  { name: "Defesas centrais disponíveis", count: 9 },
  { name: "Sem agente · Lisboa", count: 24 },
];

export const profileViewers = [
  { name: "Carlos Mendes", org: "Sporting CP", role: "Scout sénior", date: "há 2 dias", region: "Nacional" },
  { name: "Ana Ferreira", org: "Independente", role: "Agente FIFA", date: "há 3 dias", region: "Sul" },
  { name: "Bruno Tavares", org: "FC Porto B", role: "Scout B-team", date: "há 5 dias", region: "Norte" },
];
