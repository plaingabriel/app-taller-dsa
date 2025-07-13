"use server";

import { deleteTournament, postTournament } from "@/db/methods/tournament";
import { TournamentClient } from "@/shared/types";
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

export async function createTournament(tournament: TournamentClient) {
  const validation = createTournamentSchema.safeParse(tournament);

  if (!validation.success) {
    console.log(validation.error.flatten().fieldErrors);

    return {
      success: false,
      errors: "Por favor rellene todos los campos correctamente",
    };
  }

  await postTournament(tournament);

  redirect("/dashboard/admin/tournaments");
}

export async function deleteTournamentById(id: number) {
  await deleteTournament(id);

  redirect("/dashboard/admin/tournaments");
}
