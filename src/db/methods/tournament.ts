import {
  Tournament,
  TournamentClient,
  TournamentFixture,
} from "@/shared/types";
import { eq } from "drizzle-orm";
import { db } from "..";
import { tournamentTable } from "../schemas";
import {
  deleteCategory,
  getCategoriesByTournament,
  postCategory,
} from "./category";
import { deleteFixtureByCategory } from "./fixture";

export async function getTournaments(): Promise<TournamentFixture[]> {
  try {
    const tournaments = (await db
      .select()
      .from(tournamentTable)
      .all()) as Tournament[];

    const tournamentsWithCategories = await Promise.all(
      tournaments.map(async (tournament) => {
        const categories = await getCategoriesByTournament(tournament.id);
        return { ...tournament, categories };
      })
    );

    return tournamentsWithCategories;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener torneos");
  }
}

export async function getTournamentById(
  id: number
): Promise<TournamentFixture> {
  try {
    const tournament = (await db
      .select()
      .from(tournamentTable)
      .where(eq(tournamentTable.id, id))
      .get()) as Tournament;

    const categories = await getCategoriesByTournament(tournament.id);

    return { ...tournament, categories };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener torneo");
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

export async function deleteTournament(id: number) {
  try {
    // Get categories with the tournament id
    const categories = await getCategoriesByTournament(id);

    // Delete fixtures
    Promise.all(
      categories.map(async (category) => {
        await deleteFixtureByCategory(category.id);
      })
    );

    // Delete categories
    Promise.all(
      categories.map(async (category) => {
        await deleteCategory(category.id);
      })
    );

    // Delete tournament
    await db.delete(tournamentTable).where(eq(tournamentTable.id, id));
  } catch (error) {
    console.log(error);
    throw new Error("Error al eliminar torneo");
  }
}
