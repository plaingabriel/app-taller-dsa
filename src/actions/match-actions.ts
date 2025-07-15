"use server";

import {
  postGroupMatches,
  postMatch,
  postPlayoffMatches,
} from "@/db/methods/match";
import { getPlayersByTeam } from "@/db/methods/player";
import { validateTeam } from "@/lib/tournament-data";
import {
  generateDraftTeamsForPlayoffBracket,
  generateFullPlayoffBracket,
  generateGroupStageMatches,
  generateGroupsPlayoffsFixture,
} from "@/lib/utils";
import { CategoryFixture, Fixture, Team } from "@/shared/types";
import { revalidatePath } from "next/cache";

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

  if (category.fixture.fixture_type === "playoffs") {
    const matches = generateFullPlayoffBracket(teams, category.fixture.id);
    await postPlayoffMatches(matches);
  }

  if (category.fixture.fixture_type === "groups+playoffs") {
    const groupMatches = generateGroupsPlayoffsFixture(category.fixture, teams);
    const teamsToClassifyCount =
      category.fixture.teams_qualified * category.fixture.group_count;
    const teamsDrafted = generateDraftTeamsForPlayoffBracket(
      teamsToClassifyCount,
      category.id
    );
    const playoffMatches = generateFullPlayoffBracket(
      teamsDrafted,
      category.fixture.id
    );

    await postGroupMatches(groupMatches, category.fixture.id);
    await postPlayoffMatches(playoffMatches);
  }

  revalidatePath("/");
}
