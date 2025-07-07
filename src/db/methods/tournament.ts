import { Tournament } from "@/shared/types";
import { db } from "..";
import { tournamentTable } from "../schemas";

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
