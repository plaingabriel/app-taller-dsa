import { Tournament, TournamentClient } from "@/shared/types";
import { db } from "..";
import { tournamentTable } from "../schemas";
import { postCategory } from "./category";

export async function getTournaments(): Promise<Tournament[]> {
  try {
    const tournaments = (await db
      .select()
      .from(tournamentTable)
      .all()) as Tournament[];

    return tournaments;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener torneos");
  }
}

export async function postTournament(tournament: TournamentClient) {
  try {
    const date = new Date().toISOString();
    const result = await db
      .insert(tournamentTable)
      .values({ name: tournament.name, creationDate: date })
      .returning({ insertedId: tournamentTable.id });

    const tournamentId = result[0].insertedId;

    for (const category of tournament.categories) {
      await postCategory(category, tournamentId);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear torneo");
  }
}
