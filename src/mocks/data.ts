export type Availability = "disponivel" | "aberto" | "indisponivel";

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
  photo: string;
  bio: string;
  history: { club: string; years: string }[];
  videos: { title: string; thumb: string }[];
}

export interface Club {
  id: string;
  slug: string;
  name: string;
  city: string;
  division: string;
  claimed: boolean;
  badge: string;
  squad: string[]; // player ids
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

const photo = (seed: string) =>
  `https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=70&seed=${seed}`;

export const players: Player[] = [
  {
    id: "p1", slug: "joao-silva", name: "João Silva", age: 22,
    position: "Avançado", positionShort: "AV",
    club: "SC Farense B", clubId: "c1", division: "Liga 3", district: "Faro",
    availability: "disponivel", goals: 14, assists: 5, matches: 24, minutes: 1980,
    noAgent: true,
    photo: "https://images.unsplash.com/photo-1546608235-3310a2494cdf?auto=format&fit=crop&w=800&q=70",
    bio: "Avançado rápido com excelente remate de pé direito. Formado no Farense.",
    history: [
      { club: "SC Farense Sub-23", years: "2021–2023" },
      { club: "Louletano DC", years: "2019–2021" },
    ],
    videos: [
      { title: "Highlights 2024/25", thumb: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=70" },
      { title: "Golos da época", thumb: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=600&q=70" },
    ],
  },
  {
    id: "p2", slug: "rui-costa", name: "Rui Costa", age: 19,
    position: "Médio Ofensivo", positionShort: "MO",
    club: "Oriental Lisboa", clubId: "c3", division: "AF Lisboa Distrital", district: "Lisboa",
    availability: "aberto", goals: 8, assists: 11, matches: 22, minutes: 1750,
    noAgent: true,
    photo: "https://images.unsplash.com/photo-1552847661-dddc2fc3700d?auto=format&fit=crop&w=800&q=70",
    bio: "Médio criativo, visão de jogo acima da média. Pé esquerdo.",
    history: [{ club: "Oriental Lisboa Sub-19", years: "2020–2024" }],
    videos: [{ title: "Assistências 2024/25", thumb: "https://images.unsplash.com/photo-1517747614396-d21a78b850e8?auto=format&fit=crop&w=600&q=70" }],
  },
  {
    id: "p3", slug: "pedro-alves", name: "Pedro Alves", age: 24,
    position: "Defesa Central", positionShort: "DC",
    club: "AD Oliveirense", clubId: "c5", division: "Campeonato de Portugal Série D", district: "Aveiro",
    availability: "indisponivel", goals: 1, assists: 0, matches: 26, minutes: 2310,
    noAgent: false,
    photo: "https://images.unsplash.com/photo-1528111029373-08e08e652ed8?auto=format&fit=crop&w=800&q=70",
    bio: "Central forte no jogo aéreo, líder defensivo.",
    history: [
      { club: "AD Oliveirense", years: "2022–presente" },
      { club: "Anadia FC", years: "2019–2022" },
    ],
    videos: [{ title: "Defesas 2024/25", thumb: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=600&q=70" }],
  },
  {
    id: "p4", slug: "tiago-ferreira", name: "Tiago Ferreira", age: 21,
    position: "Extremo Direito", positionShort: "ED",
    club: "Pinhalnovense", clubId: "c4", division: "AF Setúbal", district: "Setúbal",
    availability: "disponivel", goals: 9, assists: 7, matches: 23, minutes: 1820,
    noAgent: true,
    photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=70",
    bio: "Extremo veloz, finalização precisa. Procura subida de divisão.",
    history: [{ club: "Pinhalnovense", years: "2021–presente" }],
    videos: [{ title: "Skills & Golos", thumb: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=70" }],
  },
  {
    id: "p5", slug: "miguel-santos", name: "Miguel Santos", age: 23,
    position: "Guarda-redes", positionShort: "GR",
    club: "CD Mafra B", clubId: "c6", division: "Liga 3", district: "Lisboa",
    availability: "aberto", goals: 0, assists: 0, matches: 25, minutes: 2250,
    noAgent: false,
    photo: "https://images.unsplash.com/photo-1564415900645-bc5d99ff79d3?auto=format&fit=crop&w=800&q=70",
    bio: "GR alto, excelente reflexo, bom jogo de pés.",
    history: [{ club: "CD Mafra B", years: "2022–presente" }],
    videos: [{ title: "Defesas da época", thumb: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?auto=format&fit=crop&w=600&q=70" }],
  },
  {
    id: "p6", slug: "diogo-marques", name: "Diogo Marques", age: 20,
    position: "Lateral Esquerdo", positionShort: "LE",
    club: "GD Estoril Praia B", clubId: "c3b", division: "Distritais Lisboa", district: "Lisboa",
    availability: "disponivel", goals: 2, assists: 6, matches: 21, minutes: 1700,
    noAgent: true,
    photo: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=70",
    bio: "Lateral ofensivo, cruzamentos precisos.",
    history: [{ club: "GD Estoril Praia Sub-19", years: "2020–2024" }],
    videos: [{ title: "Cruzamentos & Assistências", thumb: "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=600&q=70" }],
  },
];

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
