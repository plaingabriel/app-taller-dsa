"use server";

import { db } from "@/db";
import { playerTable } from "@/db/schemas";
import { NewPlayerExcel } from "@/lib/definitions";
import { eq } from "drizzle-orm";

export async function createPlayers(
  team_id: string,
  players: NewPlayerExcel[]
) {
  await db.insert(playerTable).values(
    players.map((player) => ({
      team_id,
      age: player.age,
      jersey_number: player.jersey_number,
      name: player.name,
      position: player.position,
      ci: player.ci,
    }))
  );
}

export async function deletePlayer(player_ci: number) {
  await db.delete(playerTable).where(eq(playerTable.ci, player_ci));
}
