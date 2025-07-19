import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Category, Config, FixtureType, Phase } from "./definitions";

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

type TableNames =
  | "tournament"
  | "category"
  | "match"
  | "team"
  | "player"
  | "group"
  | "historical";
type TableValues = "trn" | "cat" | "mtc" | "tem" | "ply" | "grp" | "hst";

export function generateID(tableName: TableNames): string {
  const PREFIX_MAP: Record<TableNames, TableValues> = {
    tournament: "trn",
    category: "cat",
    match: "mtc",
    team: "tem",
    player: "ply",
    group: "grp",
    historical: "hst",
  };

  const CHAR_SET = "0123456789abcdefghijklmnopqrstuvwxyz";

  function toBase36(num: number, length: number): string {
    let result = "";
    while (num > 0 || result.length < length) {
      result = CHAR_SET[num % 36] + result;
      num = Math.floor(num / 36);
    }
    return result.slice(0, length);
  }

  function computeChecksum(data: string): string {
    let sum = 0;
    let weight = 1;

    for (let i = 0; i < data.length; i++) {
      const code = data.charCodeAt(i) * weight;
      sum = (sum + code) % 46656; // 36^3
      weight = (weight * 31) % 467; // Prime modulus
    }

    return toBase36(sum, 3);
  }

  const prefix = PREFIX_MAP[tableName];

  // 41-bit timestamp (milliseconds until ~2088)
  const timestamp = Date.now();
  const timestampPart = toBase36(timestamp, 7);

  // 17-bit random value (131k possibilities)
  const randomValue = Math.floor(Math.random() * 131072);
  const randomPart = toBase36(randomValue, 3);

  // Combine components
  const rawId = prefix + timestampPart + randomPart;
  const checksum = computeChecksum(rawId);

  return `${prefix}_${timestampPart}_${randomPart}_${checksum}`;
}

export function simulateDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getStartedPhaseByFixtureType(category: Category): Phase {
  switch (category.fixture_type) {
    case "playoffs":
      if (category.team_count === 4) {
        return "semifinal";
      }

      if (category.team_count === 8) {
        return "quarterfinals";
      }

      if (category.team_count === 16) {
        return "round_16";
      }

    default:
      return "groups";
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
