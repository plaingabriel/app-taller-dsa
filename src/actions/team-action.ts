"use server";

import { db } from "@/db";
import { playerTable, teamTable } from "@/db/schemas";
import { CategoryTeamsPlayers, NewTeamExcel } from "@/lib/definitions";
import { generateID, getStartedPhaseByFixtureType } from "@/lib/utils";
import { eq } from "drizzle-orm";

export async function createEquiposFromExcel(
  category: CategoryTeamsPlayers,
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

export async function updateTeamValidation(team_id: string) {
  await db
    .update(teamTable)
    .set({ has_validated_players: true })
    .where(eq(teamTable.id, team_id));
}

export async function deleteTeam(team_id: string) {
  // Delete players of the team
  await db.delete(playerTable).where(eq(playerTable.team_id, team_id));

  // Then delete the team
  await db.delete(teamTable).where(eq(teamTable.id, team_id));
}
