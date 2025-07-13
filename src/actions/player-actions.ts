"use server";

import {
  deletePlayerById,
  getPlayersByTeam,
  postPlayer,
} from "@/db/methods/player";
import { NewPlayerExcel } from "@/shared/types";
import { revalidatePath } from "next/cache";

export async function getPlayersByTeamAction(team_id: number) {
  const players = await getPlayersByTeam(team_id);
  return players;
}

export async function createPlayerAction(
  team_id: number,
  players: NewPlayerExcel[]
) {
  const newPlayers = players.map((player) => ({
    ...player,
    team_id,
  }));

  Promise.all(newPlayers.map((player) => postPlayer(player)));
  revalidatePath("/");
}

export async function deletePlayerAction(player_id: number) {
  await deletePlayerById(player_id);
}
