import { getPlayersByTeam } from "@/db/methods/player";
import { NewPlayerExcel, NewTeamExcel, Player, Team } from "@/shared/types";

// Funciones de validación de datos
export function validateEquiposData(data: NewTeamExcel[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  data.forEach((row, index) => {
    const rowNum = index + 1;

    if (!row.name || typeof row.name !== "string") {
      errors.push(`Fila ${rowNum}: Nombre del equipo es requerido`);
    }

    if (!row.number_players || typeof row.number_players !== "number") {
      errors.push(`Fila ${rowNum}: Cantidad de jugadores debe ser un número`);
    } else if (row.number_players < 5 || row.number_players > 12) {
      errors.push(
        `Fila ${rowNum}: Cantidad de jugadores debe estar entre 5 y 12`
      );
    }
  });

  return { valid: errors.length === 0, errors };
}

export function validateJugadoresData(data: NewPlayerExcel[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const numeros = new Set<number>();

  data.forEach((row, index) => {
    const rowNum = index + 1;

    // Validar nombre
    if (!row.name || typeof row.name !== "string") {
      errors.push(`Fila ${rowNum}: Nombre del jugador es requerido`);
    }

    // Validar posición
    const posicionesValidas = [
      "PORTERO",
      "DEFENSA",
      "MEDIOCAMPISTA",
      "DELANTERO",
    ];
    if (
      !row.position ||
      !posicionesValidas.includes(row.position.toUpperCase())
    ) {
      errors.push(
        `Fila ${rowNum}: Posición debe ser una de: ${posicionesValidas.join(
          ", "
        )}`
      );
    }

    // Validar número de camiseta
    if (!row.number || typeof row.number !== "number") {
      errors.push(`Fila ${rowNum}: Número de camiseta debe ser un número`);
    } else if (row.number < 0 || row.number > 99) {
      errors.push(`Fila ${rowNum}: Número de camiseta debe estar entre 0 y 99`);
    } else if (numeros.has(row.number)) {
      errors.push(
        `Fila ${rowNum}: Número de camiseta ${row.number} está duplicado`
      );
    } else {
      numeros.add(row.number);
    }
  });

  return { valid: errors.length === 0, errors };
}

export function validateTeam(players: Player[]) {
  const jerseyNumbers = new Set<number>();
  let hasGoalkeeper = false;
  let fieldPlayersCount = 0;

  for (const player of players) {
    // Validate unique jersey number
    if (jerseyNumbers.has(player.number))
      return {
        valid: false,
        errors: ["Número de camiseta duplicado"],
      };
    jerseyNumbers.add(player.number);

    // Normalize position
    const normalizedPosition = player.position.trim().toUpperCase();

    // Validate positions
    if (normalizedPosition === "PORTERO") {
      hasGoalkeeper = true;
    } else if (
      normalizedPosition === "DEFENSA" ||
      normalizedPosition === "MEDIOCAMPISTA" ||
      normalizedPosition === "DELANTERO"
    ) {
      fieldPlayersCount++;
    }
  }

  // Error messages
  const errorMessages = [];

  if (!hasGoalkeeper) {
    errorMessages.push("El equipo debe tener un portero.");
  }

  if (fieldPlayersCount < 4) {
    errorMessages.push(
      "El equipo debe tener al menos 4 jugadores en el campo."
    );
  }

  if (errorMessages.length > 0) {
    return {
      valid: false,
      errors: errorMessages,
    };
  }

  return {
    valid: true,
  };
}

export async function allTeamsCompleted(teams: Team[]) {
  for (const team of teams) {
    const players = await getPlayersByTeam(team.id);

    if (players.length !== team.players_count) {
      return false;
    }
  }

  return true;
}
