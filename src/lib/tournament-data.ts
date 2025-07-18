import { getPlayersByTeam } from "@/db/methods/player";
import { Player, Team } from "@/shared/types";

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
