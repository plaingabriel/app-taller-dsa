"use server";

import { db } from "@/db";
import { categoryTable, groupTable, matchTable } from "@/db/schemas";
import { CategoryTeamsPlayers } from "@/lib/definitions";
import { generateLeagueFixture, generatePlayoffFixture } from "@/lib/fixture";
import { generateID } from "@/lib/utils";
import { eq } from "drizzle-orm";

export async function createMatches(category: CategoryTeamsPlayers) {
  switch (category.fixture_type) {
    case "groups": {
      const { teams } = category;
      const matches = generateLeagueFixture(teams);
      const group_id = generateID("group");

      // Create group
      await db.insert(groupTable).values({
        id: group_id,
        name: "Solo grupos",
        category_id: category.id,
      });

      await db.transaction(async (tx) => {
        // Loop the match days
        for (let day = 0; day < matches.length; day++) {
          const matchDay = day + 1;

          // Loop the matches in the day
          for (const match of matches[day]) {
            const team1 = match[0];
            const team2 = match[1];

            await tx.insert(matchTable).values({
              category_id: category.id,
              home_team: team1.id,
              away_team: team2.id,
              home_score: 0,
              away_score: 0,
              status: "pending",
              day: matchDay,
              id: generateID("match"),
              group: group_id,
              date: "",
              phase: "groups",
            });
          }
        }
      });

      await db
        .update(categoryTable)
        .set({ has_fixture: true })
        .where(eq(categoryTable.id, category.id));

      break;
    }
    case "playoffs": {
      const { teams } = category;
      const matches = generatePlayoffFixture(teams);
      const group_id = generateID("group");

      // Create group
      await db.insert(groupTable).values({
        id: group_id,
        name: "Solo eliminatorias",
        category_id: category.id,
      });

      const matchesIdByPhases: { [key: string]: string[] } = {
        finals: [],
        semifinals: [],
        quarterfinals: [],
        round_16: [],
      };

      await db.transaction(async (tx) => {
        // Loop the phases starting from the end
        for (let phase = matches.length - 1; phase >= 0; phase--) {
          if (matches[phase].length === 1) {
            const finalID = generateID("match");
            matchesIdByPhases["finals"].push(finalID);
          }
        }
      });

      break;
    }
    default:
      break;
  }
}
