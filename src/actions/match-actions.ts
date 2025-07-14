"use server";

import { postMatch } from "@/db/methods/match";
import { generateGroupStageMatches, shuffleArray } from "@/lib/utils";
import { CategoryFixture, Fixture, Team } from "@/shared/types";

export async function createMatchesAction(
  category: CategoryFixture,
  teams: Team[]
) {
  if (category.fixture.fixture_type === "groups") {
    const matches = generateGroupStageMatches(category.fixture as Fixture, [
      ...teams.map((team) => team.id),
    ]);

    for (const match of matches) {
      await postMatch(match);
    }
  }
}
