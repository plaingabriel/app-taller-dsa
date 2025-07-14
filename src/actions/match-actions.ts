"use server";

import { postMatch } from "@/db/methods/match";
import { getPlayersByTeam } from "@/db/methods/player";
import { validateTeam } from "@/lib/tournament-data";
import { generateGroupStageMatches } from "@/lib/utils";
import { CategoryFixture, Fixture, Team } from "@/shared/types";

async function validateTeams(teams: Team[]) {
  for (const team of teams) {
    const players = await getPlayersByTeam(team.id);
    const result = validateTeam(players);

    if (!result.valid) {
      return {
        ok: false,
        error: result.errors,
      };
    }
  }

  return {
    ok: true,
  };
}

export async function createMatchesAction(
  category: CategoryFixture,
  teams: Team[]
) {
  const result = await validateTeams(teams);

  if (result.ok === false) {
    throw new Error(`${result.error}`);
  }

  if (category.fixture.fixture_type === "groups") {
    const matches = generateGroupStageMatches(category.fixture as Fixture, [
      ...teams.map((team) => team.id),
    ]);

    for (const match of matches) {
      await postMatch(match);
    }
  }
}
