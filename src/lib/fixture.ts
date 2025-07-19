import { Phase, Team } from "./definitions";

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

export function generateCompleteFixture<T>(
  teams: T[],
  teams_per_group: number,
  group_count: number,
  teams_qualified: number
) {
  // Crear grupos
  const groups: T[][] = [];
  for (let i = 0; i < group_count; i++) {
    const start = i * teams_per_group;
    const end = start + teams_per_group;
    groups.push(teams.slice(start, end));
  }

  // Generar partidos de fase de grupos
  const groupStage: [T, T][][][] = [];
  groups.forEach((group) => {
    const groupFixture = generateLeagueFixture(group);
    groupStage.push(groupFixture);
  });

  // Obtener equipos que clasificarán, dejarlos en null al inicio
  const qualifiedTeams: null[] = [];
  groups.forEach((group) => {
    // Simulamos que los primeros 'teams_qualified' equipos se clasifican
    for (let i = 0; i < teams_qualified; i++) {
      if (i < group.length) {
        qualifiedTeams.push(null);
      }
    }
  });

  // Determinar la etapa de la eliminatoria basada en el número de clasificados
  let stage: Phase;

  switch (qualifiedTeams.length) {
    case 16:
      stage = "round_16";
      break;
    case 8:
      stage = "quarterfinals";
      break;
    case 4:
      stage = "semifinal";
      break;
    case 2:
      stage = "final";
      break;
  }

  // Generar fase eliminatoria
  const playoffStage = generatePlayoffFixture(qualifiedTeams);

  return {
    groupStage,
    playoffStage,
  };
}
