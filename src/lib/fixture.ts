import { Team } from "./definitions";

const teams: Team[] = [
  {
    id: "tem_md9iyjq_ipn_g7x",
    category_id: "cat_md7ug5i_lgd_ryz",
    name: "Equipo 1",
    players_count: 5,
    wins: 0,
    draws: 0,
    losses: 0,
    logo: "",
    has_validated_players: true,
    goals_count: 0,
    goals_against: 0,
    points: 0,
    phase: "quarterfinals",
  },
  {
    id: "tem_md9iyjq_10x_1or",
    category_id: "cat_md7ug5i_lgd_ryz",
    name: "Equipo 2",
    players_count: 5,
    wins: 0,
    draws: 0,
    losses: 0,
    logo: "",
    has_validated_players: true,
    goals_count: 0,
    goals_against: 0,
    points: 0,
    phase: "quarterfinals",
  },
  {
    id: "tem_md9iyjq_1e1_xfs",
    category_id: "cat_md7ug5i_lgd_ryz",
    name: "Equipo 3",
    players_count: 5,
    wins: 0,
    draws: 0,
    losses: 0,
    logo: "",
    has_validated_players: true,
    goals_count: 0,
    goals_against: 0,
    points: 0,
    phase: "quarterfinals",
  },
  {
    id: "tem_md9iyjq_1l0_xgr",
    category_id: "cat_md7ug5i_lgd_ryz",
    name: "Equipo 4",
    players_count: 5,
    wins: 0,
    draws: 0,
    losses: 0,
    logo: "",
    has_validated_players: true,
    goals_count: 0,
    goals_against: 0,
    points: 0,
    phase: "quarterfinals",
  },
  {
    id: "tem_md9iyjq_2qf_1kz",
    category_id: "cat_md7ug5i_lgd_ryz",
    name: "Equipo 5",
    players_count: 5,
    wins: 0,
    draws: 0,
    losses: 0,
    logo: "",
    has_validated_players: true,
    goals_count: 0,
    goals_against: 0,
    points: 0,
    phase: "quarterfinals",
  },
  {
    id: "tem_md9iyjq_1vd_197",
    category_id: "cat_md7ug5i_lgd_ryz",
    name: "Equipo 6",
    players_count: 5,
    wins: 0,
    draws: 0,
    losses: 0,
    logo: "",
    has_validated_players: true,
    goals_count: 0,
    goals_against: 0,
    points: 0,
    phase: "quarterfinals",
  },
  {
    id: "tem_md9iyjq_14d_0c7",
    category_id: "cat_md7ug5i_lgd_ryz",
    name: "Equipo 7",
    players_count: 5,
    wins: 0,
    draws: 0,
    losses: 0,
    logo: "",
    has_validated_players: true,
    goals_count: 0,
    goals_against: 0,
    points: 0,
    phase: "quarterfinals",
  },
  {
    id: "tem_md9iyjq_q2l_h9n",
    category_id: "cat_md7ug5i_lgd_ryz",
    name: "Equipo 8",
    players_count: 5,
    wins: 0,
    draws: 0,
    losses: 0,
    logo: "",
    has_validated_players: true,
    goals_count: 0,
    goals_against: 0,
    points: 0,
    phase: "quarterfinals",
  },
];

export function generateLeagueFixture<T>(teams: T[]): [T, T][][] {
  if (teams.length === 0) return [];

  // Clonamos los equipos y agregamos null si son impares
  let teamsCopy: (T | null)[] = [...teams];
  const isOdd = teamsCopy.length % 2 !== 0;
  if (isOdd) {
    teamsCopy.push(null);
  }

  const totalTeams = teamsCopy.length;
  const totalRounds = totalTeams - 1;
  const fixture: [T, T][][] = [];

  for (let round = 0; round < totalRounds; round++) {
    const matches: [T, T][] = [];

    // Generar partidos para esta jornada
    for (let i = 0; i < totalTeams / 2; i++) {
      const home = teamsCopy[i];
      const away = teamsCopy[totalTeams - 1 - i];

      // Saltar partidos con equipo null (descanso)
      if (home !== null && away !== null) {
        matches.push([home, away]);
      }
    }
    fixture.push(matches);

    // Rotar equipos (excepto el primero)
    teamsCopy = [
      teamsCopy[0],
      teamsCopy[totalTeams - 1],
      ...teamsCopy.slice(1, totalTeams - 1),
    ];
  }

  return fixture;
}

export interface PlayoffMatch<T> {
  home: T | null;
  away: T | null;
}

export function generatePlayoffFixture<T>(teams: T[]): PlayoffMatch<T>[][] {
  // Generar el fixture completo
  let currentRound: (T | null)[] = [...teams];
  const allRounds: PlayoffMatch<T>[][] = [];

  while (currentRound.length > 1) {
    const roundMatches: PlayoffMatch<T>[] = [];
    const nextRound: (T | null)[] = [];

    // Crear partidos para la ronda actual
    for (let i = 0; i < currentRound.length; i += 2) {
      const home = currentRound[i];
      const away = currentRound[i + 1];

      roundMatches.push({ home, away });
      nextRound.push(null); // Placeholder para el ganador
    }

    allRounds.push(roundMatches);
    currentRound = nextRound;
  }

  return allRounds;
}

export function testFixtureFunctions() {
  const matches = generatePlayoffFixture(teams);

  for (const round of matches) {
    console.log(round);
  }
}
