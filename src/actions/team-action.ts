"use server";

import { db } from "@/db";
import { teamTable } from "@/db/schemas";
import { Category, NewTeamExcel, Team } from "@/lib/definitions";
import { generateID, getStartedPhaseByFixtureType } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createEquiposFromExcel(
  category: Category & { teams: Team[] },
  newTeams: NewTeamExcel[]
) {
  const startedPhase = getStartedPhaseByFixtureType(category);

  await db.insert(teamTable).values(
    newTeams.map((team) => ({
      category_id: category.id,
      id: generateID("team"),
      name: team.name,
      phase: startedPhase,
      players_count: team.players_count,
      logo: team.logo,
    }))
  );
}

export async function deleteTeam(team_id: number) {
  // await deleteTeamById(team_id);

  revalidatePath("/");
}
