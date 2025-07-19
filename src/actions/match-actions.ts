"use server";

import { db } from "@/db";
import { categoryTable, groupTable, matchTable } from "@/db/schemas";
import { CategoryTeamsPlayers, TeamPlayers } from "@/lib/definitions";
import {
  generateCompleteFixture,
  generateLeagueFixture,
  generatePlayoffFixture,
  PlayoffMatch,
} from "@/lib/fixture";
import { generateID } from "@/lib/utils";
import { eq } from "drizzle-orm";

async function generatePlayOffs(
  group_id: string,
  matches: PlayoffMatch<TeamPlayers | null>[][],
  category: CategoryTeamsPlayers
) {
  type PlayOffPhases = "final" | "semifinal" | "quarterfinals" | "round_16";

  const matchesIdByPhases: Record<PlayOffPhases, string[]> = {
    final: [],
    semifinal: [],
    quarterfinals: [],
    round_16: [],
  };

  await db.transaction(async (tx) => {
    // Loop the phases starting from the end
    for (let phase = matches.length - 1; phase >= 0; phase--) {
      const matchesPhase = matches[phase];

      // Finals
      if (matchesPhase.length === 1) {
        const finalID = generateID("match");
        matchesIdByPhases["final"].push(finalID);
        const finalMatch = matchesPhase[0];

        // If the teams are null, then the match is pending for teams
        if (finalMatch.home === null || finalMatch.away === null) {
          await tx.insert(matchTable).values({
            category_id: category.id,
            home_score: 0,
            away_score: 0,
            status: "pending",
            day: 1,
            id: finalID,
            group: group_id,
            date: "",
            phase: "final",
          });

          continue;
        }

        await tx.insert(matchTable).values({
          category_id: category.id,
          home_team: finalMatch.home.id,
          away_team: finalMatch.away.id,
          home_score: 0,
          away_score: 0,
          status: "pending",
          day: 1,
          id: finalID,
          group: group_id,
          date: "",
          phase: "final",
        });

        continue;
      }

      // Semifinals
      if (matchesPhase.length === 2) {
        const semifinal1ID = generateID("match");
        const semifinal2ID = generateID("match");

        matchesIdByPhases["semifinal"].push(semifinal1ID);
        matchesIdByPhases["semifinal"].push(semifinal2ID);

        for (let i = 0; i < matchesPhase.length; i++) {
          // Validate is teams are null
          const match = matchesPhase[i];

          if (match.home === null || match.away === null) {
            await tx.insert(matchTable).values({
              category_id: category.id,
              home_score: 0,
              away_score: 0,
              status: "pending",
              day: 1,
              id: matchesIdByPhases["semifinal"][i],
              group: group_id,
              date: "",
              phase: "semifinal",
              next_match: matchesIdByPhases["final"][0],
            });

            continue;
          }

          await tx.insert(matchTable).values({
            category_id: category.id,
            home_team: match.home.id,
            away_team: match.away.id,
            home_score: 0,
            away_score: 0,
            status: "pending",
            day: 1,
            id: matchesIdByPhases["semifinal"][i],
            group: group_id,
            date: "",
            phase: "semifinal",
            next_match: matchesIdByPhases["final"][0],
          });
        }

        continue;
      }

      // Quarterfinals
      if (matchesPhase.length === 4) {
        const quarterfinal1ID = generateID("match");
        const quarterfinal2ID = generateID("match");
        const quarterfinal3ID = generateID("match");
        const quarterfinal4ID = generateID("match");

        matchesIdByPhases["quarterfinals"].push(quarterfinal1ID);
        matchesIdByPhases["quarterfinals"].push(quarterfinal2ID);
        matchesIdByPhases["quarterfinals"].push(quarterfinal3ID);
        matchesIdByPhases["quarterfinals"].push(quarterfinal4ID);

        for (let i = 0; i < matchesPhase.length; i++) {
          // Validate is teams are null
          const match = matchesPhase[i];

          if (match.home === null || match.away === null) {
            await tx.insert(matchTable).values({
              category_id: category.id,
              home_score: 0,
              away_score: 0,
              status: "pending",
              day: 1,
              id: matchesIdByPhases["quarterfinals"][i],
              group: group_id,
              date: "",
              phase: "quarterfinals",
              next_match: matchesIdByPhases["semifinal"][0],
            });

            continue;
          }

          await tx.insert(matchTable).values({
            category_id: category.id,
            home_team: match.home.id,
            away_team: match.away.id,
            home_score: 0,
            away_score: 0,
            status: "pending",
            day: 1,
            id: matchesIdByPhases["quarterfinals"][i],
            group: group_id,
            date: "",
            phase: "quarterfinals",
            next_match: matchesIdByPhases["semifinal"][0],
          });
        }

        continue;
      }

      // Round 16
      if (matchesPhase.length === 8) {
        const round16_1ID = generateID("match");
        const round16_2ID = generateID("match");
        const round16_3ID = generateID("match");
        const round16_4ID = generateID("match");
        const round16_5ID = generateID("match");
        const round16_6ID = generateID("match");
        const round16_7ID = generateID("match");
        const round16_8ID = generateID("match");

        matchesIdByPhases["round_16"].push(round16_1ID);
        matchesIdByPhases["round_16"].push(round16_2ID);
        matchesIdByPhases["round_16"].push(round16_3ID);
        matchesIdByPhases["round_16"].push(round16_4ID);
        matchesIdByPhases["round_16"].push(round16_5ID);
        matchesIdByPhases["round_16"].push(round16_6ID);
        matchesIdByPhases["round_16"].push(round16_7ID);
        matchesIdByPhases["round_16"].push(round16_8ID);

        for (let i = 0; i < matchesPhase.length; i++) {
          // Validate is teams are null
          const match = matchesPhase[i];

          if (match.home === null || match.away === null) {
            await tx.insert(matchTable).values({
              category_id: category.id,
              home_score: 0,
              away_score: 0,
              status: "pending",
              day: 1,
              id: matchesIdByPhases["round_16"][i],
              group: group_id,
              date: "",
              phase: "round_16",
              next_match: matchesIdByPhases["quarterfinals"][0],
            });

            continue;
          }

          await tx.insert(matchTable).values({
            category_id: category.id,
            home_team: match.home.id,
            away_team: match.away.id,
            home_score: 0,
            away_score: 0,
            status: "pending",
            day: 1,
            id: matchesIdByPhases["round_16"][i],
            group: group_id,
            date: "",
            phase: "round_16",
            next_match: matchesIdByPhases["quarterfinals"][0],
          });
        }

        continue;
      }
    }
  });
}

async function generateGroupMatches(
  category_id: string,
  group_id: string,
  matches: [TeamPlayers, TeamPlayers][][]
) {
  await db.transaction(async (tx) => {
    // Loop the match days
    for (let day = 0; day < matches.length; day++) {
      const matchDay = day + 1;

      // Loop the matches in the day
      for (const match of matches[day]) {
        const team1 = match[0];
        const team2 = match[1];

        await tx.insert(matchTable).values({
          category_id: category_id,
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
}

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

      await generateGroupMatches(category.id, group_id, matches);

      // Update category
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

      await generatePlayOffs(group_id, matches, category);

      // Update category
      await db
        .update(categoryTable)
        .set({ has_fixture: true })
        .where(eq(categoryTable.id, category.id));

      break;
    }

    default: {
      const { groupStage, playoffStage } = generateCompleteFixture(
        category.teams,
        category.teams_per_group,
        category.group_count,
        category.teams_qualified
      );

      let i = 0;

      for (const group of groupStage) {
        const group_id = generateID("group");
        const group_name = `Grupo ${String.fromCharCode(65 + i)}`;

        await db.insert(groupTable).values({
          id: group_id,
          name: group_name,
          category_id: category.id,
        });

        await generateGroupMatches(category.id, group_id, group);

        i++;
      }

      const group_id = generateID("group");
      await db.insert(groupTable).values({
        id: group_id,
        name: "Fase Eliminatorias",
        category_id: category.id,
      });

      await generatePlayOffs(group_id, playoffStage, category);

      // Update category
      await db
        .update(categoryTable)
        .set({ has_fixture: true })
        .where(eq(categoryTable.id, category.id));

      break;
    }
  }
}
