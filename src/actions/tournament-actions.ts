"use server";

import { db } from "@/db";
import { categoryTable, tournamentTable } from "@/db/schemas";
import { NewCategory, Tournament } from "@/lib/definitions";
import { generateID } from "@/lib/utils";
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
  // TODO: Implementar la lógica para eliminar un torneo
  // await deleteTournament(id);
  // redirect("/dashboard/admin/tournaments");
}
