import { NewPlayerExcel, Player } from "@/shared/types";
import { eq } from "drizzle-orm";
import { db } from "..";
import { playerTable } from "../schemas";

export async function getPlayersByTeam(team_id: number) {
  try {
    const players = (await db
      .select()
      .from(playerTable)
      .where(eq(playerTable.team_id, team_id))
      .all()) as Player[];

    return players;
  } catch (error) {
    console.error(error);

    throw new Error("Error al obtener los jugadores del equipo");
  }
}

export async function postPlayer(
  newPlayer: NewPlayerExcel & { team_id: number }
) {
  try {
    await db.insert(playerTable).values(newPlayer).run();
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear el jugador");
  }
}

export async function deletePlayerById(id: number) {
  try {
    await db.delete(playerTable).where(eq(playerTable.id, id)).run();
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar el jugador");
  }
}
