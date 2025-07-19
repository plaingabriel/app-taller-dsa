"use server";

import { db } from "@/db";
import {
  categoryTable,
  groupTable,
  matchTable,
  playerTable,
  teamTable,
  tournamentTable,
} from "@/db/schemas";
import { NewCategory, Tournament } from "@/lib/definitions";
import { generateID } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

const createTournamentSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  categories: z.array(
    z.object({
      name: z.string().min(1, { message: "El nombre es requerido" }),
      min_age: z.number().min(6, { message: "La edad mínima es requerida" }),
      max_age: z.number().max(99, { message: "La edad máxima es requerida" }),
      team_count: z
        .number()
        .min(4, { message: "La cantidad de equipos es requerida" }),
      fixture_type: z.enum(["groups", "playoffs", "groups+playoffs"]),
      group_count: z
        .number()
        .min(1, { message: "La cantidad de grupos es requerida" }),
      teams_per_group: z
        .number()
        .min(1, { message: "La cantidad de equipos por grupo es requerida" }),
      teams_qualified: z
        .number()
        .min(0, { message: "La cantidad de equipos que avanzan es requerida" }),
    })
  ),
});

export async function createTournament(tournament: {
  name: Tournament["name"];
  categories: NewCategory[];
}) {
  const parsedTournament = createTournamentSchema.safeParse(tournament);

  if (!parsedTournament.success) {
    return parsedTournament.error;
  }

  const { name: tournamentName } = parsedTournament.data;
  const categories = parsedTournament.data.categories;

  const tournament_id = generateID("tournament");

  await db.insert(tournamentTable).values({
    id: tournament_id,
    name: tournamentName,
    creation_date: new Date().toISOString(),
  });

  await db.insert(categoryTable).values(
    categories.map((category) => ({
      ...category,
      tournament_id,
      id: generateID("category"),
    }))
  );

  redirect("/dashboard/admin/tournaments");
}

export async function deleteTournament(id: string) {
  // Eliminar el torneo junto a todas sus relaciones

  // Obtener categorías dentro del torneo
  const categories = await db.query.categoryTable.findMany({
    where: (category, { eq }) => eq(category.tournament_id, id),
  });

  // Eliminar todos los partidos de cada categoría
  for (const category of categories) {
    await db.delete(matchTable).where(eq(matchTable.category_id, category.id));
  }

  // Eliminar todos los grupos de cada categoría
  for (const category of categories) {
    await db.delete(groupTable).where(eq(groupTable.category_id, category.id));
  }

  // Para eliminar los equipos de cada categoría, eliminando sus jugadores
  for (const category of categories) {
    // Obtener equipos de la categoría
    const teams = await db.query.teamTable.findMany({
      where: (team, { eq }) => eq(team.category_id, category.id),
    });

    // Eliminar los jugadores de cada equipo
    for (const team of teams) {
      await db.delete(playerTable).where(eq(playerTable.team_id, team.id));
    }

    // Eliminar equipos
    for (const team of teams) {
      await db.delete(teamTable).where(eq(teamTable.id, team.id));
    }
  }

  // Eliminar categorías
  for (const category of categories) {
    await db.delete(categoryTable).where(eq(categoryTable.id, category.id));
  }

  // Eliminar torneo
  await db.delete(tournamentTable).where(eq(tournamentTable.id, id));

  redirect("/dashboard/admin/tournaments");
}
