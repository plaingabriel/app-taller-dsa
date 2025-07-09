import { Fixture, FixtureType } from "@/shared/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

type Config = Pick<
  Fixture,
  "group_count" | "teams_per_group" | "teams_qualified"
>;

export function getAvailableConfigurations(
  quantity: number
): Array<{ id: string; label: string; config: Config }> {
  function createConfiguration(id: string, label: string, config: Config) {
    return { id, label, config };
  }

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
