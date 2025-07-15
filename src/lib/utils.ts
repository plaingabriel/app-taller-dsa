import {
  Config,
  Fixture,
  FixtureType,
  NewMatch,
  NewPlayoffMatch,
  Phase,
  Team,
} from "@/shared/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function isPair(number: number): boolean {
  return number % 2 === 0;
}

export function allEqual(arr: string[]): boolean {
  return arr.every((item, _, array) => item === array[0]);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Función para mezclar array aleatoriamente (Fisher-Yates shuffle)
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getStartedPhaseByFixtureType(fixture: Fixture): Phase {
  switch (fixture.fixture_type) {
    case "playoffs":
      if (fixture.team_count === 4) {
        return {
          id: 4,
          name: "semifinals",
        };
      }

      if (fixture.team_count === 8) {
        return {
          id: 3,
          name: "quarterfinals",
        };
      }

      if (fixture.team_count === 16) {
        return {
          id: 2,
          name: "round_16",
        };
      }

    default:
      return {
        id: 1,
        name: "groups",
      };
  }
}

export function getTextByFixtureType(fixtureType: FixtureType): string {
  switch (fixtureType) {
    case "playoffs":
      return "ELIMINATORIA";
    case "groups+playoffs":
      return "GRUPOS+ELIMINATORIA";
    default:
      return "GRUPOS";
  }
}

export function getValidEquiposCounts(format: FixtureType): number[] {
  switch (format) {
    case "playoffs":
      return [4, 8, 16];
    case "groups+playoffs":
      return [4, 6, 8, 10, 12, 14, 16];
    default:
      return [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  }
}

function createConfiguration(id: string, label: string, config: Config) {
  return { id, label, config };
}

export function getAvailableConfigurations(
  quantity: number
): Array<{ id: string; label: string; config: Config }> {
  switch (quantity) {
    case 6:
      return [
        createConfiguration("option-1", "1 grupo de 6 equipos, avanzan 4", {
          group_count: 1,
          teams_per_group: 6,
          teams_qualified: 4,
        }),
        createConfiguration(
          "option-2",
          "2 grupos de 3 equipos, avanzan 2 por grupo",
          {
            group_count: 2,
            teams_per_group: 3,
            teams_qualified: 2,
          }
        ),
      ];

    case 10:
      return [
        createConfiguration(
          "option-1",
          "2 grupos de 5 equipos, avanzan 2 por grupo",
          {
            group_count: 2,
            teams_per_group: 5,
            teams_qualified: 2,
          }
        ),
        createConfiguration(
          "option-2",
          "2 grupos de 5 equipos, avanzan 4 por grupo",
          {
            group_count: 2,
            teams_per_group: 5,
            teams_qualified: 4,
          }
        ),
      ];

    case 12:
      return [
        createConfiguration(
          "option-1",
          "4 grupos de 3 equipos, avanza 1 por grupo",
          {
            group_count: 4,
            teams_per_group: 3,
            teams_qualified: 1,
          }
        ),
        createConfiguration(
          "option-2",
          "2 grupos de 6 equipos, avanzan 4 por grupo",
          {
            group_count: 2,
            teams_per_group: 6,
            teams_qualified: 4,
          }
        ),
      ];

    case 14:
      return [
        createConfiguration(
          "option-1",
          "2 grupos de 7 equipos, avanzan 4 por grupo",
          {
            group_count: 2,
            teams_per_group: 7,
            teams_qualified: 4,
          }
        ),
      ];

    case 16:
      return [
        createConfiguration(
          "option-1",
          "2 grupos de 8 equipos, avanzan 4 por grupo",
          {
            group_count: 2,
            teams_per_group: 8,
            teams_qualified: 4,
          }
        ),
        createConfiguration(
          "option-2",
          "4 grupos de 4 equipos, avanzan 2 por grupo",
          {
            group_count: 4,
            teams_per_group: 4,
            teams_qualified: 2,
          }
        ),
      ];

    default:
      return [];
  }
}

export function getInfoConfig(
  fixtureType: FixtureType,
  team_count: number,
  groups_config: string
): string {
  let text = "";

  switch (fixtureType) {
    case "playoffs":
      text =
        "Formato eliminatoria: Los equipos se enfrentan en partidos de eliminación directa hasta determinar un campeón. Solo se permiten 4, 8 o 16 equipos para garantizar un bracket balanceado.";

      return text;
    case "groups+playoffs":
      const configurations = getAvailableConfigurations(team_count);

      if (configurations.length > 0) {
        text = "Luego la fase eliminatoria con los equipos clasificados.";

        if (configurations.length > 1) {
          const selectedConfig = configurations.find(
            (config) => config.id === groups_config
          );

          return `${selectedConfig?.label}. ${text}`;
        }

        return `${configurations[0].label}. ${text}`;
      }

      const info = calculateGruposInfo(team_count, groups_config);

      text = `${info.group_count} grupos de ${info.teams_per_group} equipos, avanzan ${info.teams_qualified} por grupo. Luego fase eliminatoria`;

      return text;
    default:
      text = "Formato liga: Todos los equipos juegan entre sí una vez.";

      if (!isPair(team_count)) {
        return text.concat(" ", "Un equipo descansa por jornada.");
      }

      return text;
  }
}

export function calculateGruposInfo(
  cantidadEquipos: number,
  configuration: string
): Config {
  switch (cantidadEquipos) {
    case 4:
      return { group_count: 1, teams_per_group: 4, teams_qualified: 2 };

    case 6:
      if (configuration === "option-2") {
        return { group_count: 2, teams_per_group: 3, teams_qualified: 2 };
      }
      return { group_count: 1, teams_per_group: 6, teams_qualified: 4 };

    case 8:
      return { group_count: 2, teams_per_group: 4, teams_qualified: 2 };

    case 10:
      if (configuration === "option-2") {
        return { group_count: 2, teams_per_group: 5, teams_qualified: 4 };
      }
      return { group_count: 2, teams_per_group: 5, teams_qualified: 2 };

    case 12:
      if (configuration === "option-1") {
        return { group_count: 4, teams_per_group: 3, teams_qualified: 1 };
      }
      return { group_count: 2, teams_per_group: 6, teams_qualified: 4 };

    case 14:
      return { group_count: 2, teams_per_group: 7, teams_qualified: 4 };

    case 16:
      if (configuration === "option-2") {
        // Cambiado a ID consistente
        return { group_count: 4, teams_per_group: 4, teams_qualified: 2 };
      }
      return { group_count: 2, teams_per_group: 8, teams_qualified: 4 };

    default:
      // Para otros casos, usar lógica por defecto
      if (cantidadEquipos <= 5) {
        return {
          group_count: 1,
          teams_per_group: cantidadEquipos,
          teams_qualified: Math.min(2, cantidadEquipos),
        };
      }
      return {
        group_count: 2,
        teams_per_group: Math.ceil(cantidadEquipos / 2),
        teams_qualified: 2,
      };
  }
}

export function generatePlayoffMatches(teams: Team[], fixtureId: number) {
  // 1. Validar cantidad de equipos
  const validSizes = [4, 8, 16];

  if (!validSizes.includes(teams.length)) {
    throw new Error(
      `Cantidad inválida de equipos para playoffs: ${teams.length}. Debe ser 4, 8 o 16.`
    );
  }

  // 2. Mezclar equipos aleatoriamente
  const shuffledTeams = shuffleArray(teams);

  // 3. Determinar fase inicial según cantidad de equipos
  const initialPhase: Phase["id"] =
    teams.length === 4
      ? 4 // semifinals
      : teams.length === 8
      ? 3 // quarterfinals
      : 2; // round_16

  // 4. Generar partidos
  let day = 1;
  const matches: NewPlayoffMatch[] = [];

  for (let i = 0; i < shuffledTeams.length; i += 2) {
    const newMatch: NewPlayoffMatch = {
      home_team: shuffledTeams[i].id,
      away_team: shuffledTeams[i + 1].id,
      phase_id: initialPhase,
      fixture_id: fixtureId,
      date: "",
      location: "",
      day: day,
    };

    matches.push(newMatch);
  }

  return matches;
}

export function generateFullPlayoffBracket(teams: Team[], fixtureId: number) {
  // 1. Generar primera ronda
  const firstRoundMatches = generatePlayoffMatches(teams, fixtureId);
  const allMatches: NewPlayoffMatch[] = [...firstRoundMatches];

  // 2. Determinar fases siguientes
  const phases: Record<number, Phase["id"]> = {
    4: 5, // semifinals → final
    8: 4, // quarterfinals → semifinals
    16: 3, // round_16 → quarterfinals
  };

  // 3. Calcular partidos para rondas posteriores
  let currentMatches = firstRoundMatches.length;
  let currentPhase = phases[teams.length];
  let matchDay = 2;

  while (currentMatches > 1) {
    const roundMatches: NewMatch[] = [];

    for (let i = 0; i < currentMatches; i += 2) {
      roundMatches.push({
        home_team: 0, // Se actualizará con los ganadores
        away_team: 0,
        phase_id: currentPhase,
        fixture_id: fixtureId,
        home_score: 0,
        away_score: 0,
        date: "",
        location: "",
        day: matchDay,
      });
    }

    allMatches.push(...roundMatches);
    currentMatches = roundMatches.length;
    currentPhase =
      currentPhase === 3
        ? 4 // quarterfinals → semifinals
        : currentPhase === 4
        ? 5 // semifinals → final
        : 5; // final (no debería ocurrir)
    matchDay++;
  }

  return allMatches;
}

export function generateGroupStageMatches(fixture: Fixture, teams: number[]) {
  const phaseId = 1; // Fase de grupos (phase_id = 1)
  const allMatches: NewMatch[] = [];

  const groupMatches = generateMatchesForGroup(teams, fixture.id, phaseId);

  allMatches.push(...groupMatches);

  return allMatches;
}

function generateMatchesForGroup(
  teams: number[],
  fixtureId: number,
  phaseId: Phase["id"]
) {
  const n = teams.length;
  const totalRounds = n % 2 === 0 ? n - 1 : n;
  const matchesPerRound = Math.floor(n / 2);

  // Si es impar, agregar equipo ficticio (descanso)
  let rotatingTeams = [...teams];

  if (n % 2 !== 0) {
    rotatingTeams.push(-1); // -1 = equipo ficticio
  }

  const matches: NewMatch[] = [];
  let day = 1;

  for (let round = 0; round < totalRounds; round++) {
    // Generar partidos de esta jornada
    for (let j = 0, i = 0; i < matchesPerRound; i++) {
      const home = rotatingTeams[j];
      const away = rotatingTeams[rotatingTeams.length - 1 - j];

      // Saltar si hay equipo ficticio
      if (home === -1 || away === -1) continue;

      matches.push({
        home_team: home,
        away_team: away,
        home_score: undefined,
        away_score: undefined,
        date: "", // Asignar posteriormente
        location: "", // Asignar posteriormente
        day: day, // Jornada dentro del grupo
        phase_id: phaseId,
        fixture_id: fixtureId,
        match_type: "group",
      });
    }

    // Rotar equipos (excepto el primero)
    const fixed = rotatingTeams[0];
    const rest = rotatingTeams.slice(1);
    const last = rest.pop()!;
    rotatingTeams = [fixed, last, ...rest];

    day++;
  }

  return matches;
}

export function generateGroupsPlayoffsFixture(
  fixture: Omit<Fixture, "category_id">,
  teams: Team[]
): { groups: { name: string; teamIds: number[] }[]; matches: NewMatch[] } {
  // Validar cantidad de equipos
  if (teams.length !== fixture.team_count) {
    throw new Error(
      `Number of teams (${teams.length}) does not match fixture configuration (${fixture.team_count})`
    );
  }

  // 1. Mezclar equipos aleatoriamente
  const shuffledTeams = shuffleArray(teams);

  // 2. Crear grupos
  const groups: { name: string; teamIds: number[] }[] = [];
  const teamsPerGroup = fixture.teams_per_group;
  const groupCount = fixture.group_count;

  for (let i = 0; i < groupCount; i++) {
    groups.push({
      name: `Grupo ${String.fromCharCode(65 + i)}`, // Grupo A, B, C, etc.
      teamIds: [],
    });
  }

  // 3. Distribuir equipos en grupos
  let teamIndex = 0;
  for (let i = 0; i < teamsPerGroup; i++) {
    for (let j = 0; j < groupCount; j++) {
      if (teamIndex < shuffledTeams.length) {
        groups[j].teamIds.push(shuffledTeams[teamIndex].id);
        teamIndex++;
      }
    }
  }

  // 4. Generar partidos de fase de grupos
  const groupMatches: NewMatch[] = [];

  groups.forEach((group) => {
    const groupMatchesForGroup = generateMatchesForGroup(
      group.teamIds,
      fixture.id,
      1 // phase_id = 1 (fase de grupos)
    );
    groupMatches.push(...groupMatchesForGroup);
  });

  return { groups, matches: groupMatches };
}

export function generateDraftTeamsForPlayoffBracket(
  numberOfTeams: number,
  category_id: number
) {
  const teams: Team[] = [];

  // Set phase id by the number of teams
  const phases: Record<number, Phase["id"]> = {
    2: 5, // finals
    4: 4, // semifinals
    8: 3, // quarterfinals
    16: 2, // round_16
  };
  const phaseId = phases[numberOfTeams];

  for (let i = 1; i <= numberOfTeams; i++) {
    teams.push({
      id: 0,
      name: "",
      logo: "",
      category_id: category_id,
      phase_id: phaseId,
      draws: 0,
      wins: 0,
      losses: 0,
      matches_played: 0,
      players_count: 0,
    });
  }

  return teams;
}
