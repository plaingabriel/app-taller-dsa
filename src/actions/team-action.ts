"use server";

import { deleteTeamById, postTeam } from "@/db/methods/team";
import { getStartedPhaseByFixtureType } from "@/lib/utils";
import { CategoryFixture, NewTeam, NewTeamExcel } from "@/shared/types";
import { revalidatePath } from "next/cache";

export async function createEquiposFromExcel(
  category: CategoryFixture,
  data: NewTeamExcel[]
) {
  const startedPhase = getStartedPhaseByFixtureType({
    ...category.fixture,
    category_id: category.id,
  });

  const newTeams = data.map((row) => {
    const newEquipo: NewTeam = {
      category_id: category.id,
      name: row.name,
      players_count: row.number_players,
      logo: row.logo || undefined,
      phase_id: startedPhase.id,
    };

    return newEquipo;
  });

  Promise.all(newTeams.map((team) => postTeam(team)));

  revalidatePath("/");
}

export async function deleteTeam(team_id: number) {
  await deleteTeamById(team_id);

  revalidatePath("/");
}
