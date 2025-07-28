"use server";

import { db } from "@/db";
import {
  categoryTable,
  groupTable,
  matchTable,
  playerTable,
  teamTable,
} from "@/db/schemas";
import { fetchMatch } from "@/lib/data";
import {
  CategoryTeamsPlayers,
  MatchData,
  MatchTeam,
  TeamData,
  TeamPlayers,
} from "@/lib/definitions";
import {
  generateCompleteFixture,
  generateLeagueFixture,
  generatePlayoffFixture,
  PlayoffMatch,
} from "@/lib/fixture";
import { generateID } from "@/lib/utils";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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

        await tx
          .update(teamTable)
          .set({ group: group_id })
          .where(eq(teamTable.id, team1.id));
        await tx
          .update(teamTable)
          .set({ group: group_id })
          .where(eq(teamTable.id, team2.id));
      }
    }
  });
}

export async function updateDates(match_id: string, date: string) {
  await db.update(matchTable).set({ date }).where(eq(matchTable.id, match_id));
}

function getWinner(
  home_team: TeamData,
  away_team: TeamData,
  draw_winner?: TeamData
): [TeamData, TeamData, boolean] {
  // Draw in playoff match
  if (draw_winner) {
    const [team_winner, team_loser] =
      draw_winner.id === home_team.id
        ? [home_team, away_team]
        : [away_team, home_team];

    return [team_winner, team_loser, true];
  }

  // Draw in group match
  return home_team.points > away_team.points
    ? [home_team, away_team, false]
    : home_team.points < away_team.points
    ? [away_team, home_team, false]
    : [home_team, away_team, true];
}

async function updateDrawGroups(team: TeamData) {
  await db
    .update(teamTable)
    .set({
      draws: sql`${teamTable.draws} + 1`,
      points: sql`${teamTable.points} + 1`,
      goals_count: sql`${teamTable.goals_count} + ${team.points}`,
      goals_against: sql`${teamTable.goals_against} + ${team.points}`,
    })
    .where(eq(teamTable.id, team.id));
}

async function updateWinGroups(team: TeamData, win: boolean) {
  const points = win ? 3 : 0;

  await db
    .update(teamTable)
    .set({
      wins: sql`${teamTable.wins} + ${win ? 1 : 0}`,
      losses: sql`${teamTable.losses} + ${win ? 0 : 1}`,
      points: sql`${teamTable.points} + ${points}`,
      goals_count: sql`${teamTable.goals_count} + ${team.points}`,
      goals_against: sql`${teamTable.goals_against} + ${team.points}`,
    })
    .where(eq(teamTable.id, team.id));
}

async function updateGoals(
  team: TeamData,
  goals_scored: number,
  goals_against: number
) {
  await db
    .update(teamTable)
    .set({
      goals_count: sql`${teamTable.goals_count} + ${goals_scored}`,
      goals_against: sql`${teamTable.goals_against} + ${goals_against}`,
    })
    .where(eq(teamTable.id, team.id));
}

async function updateWinPlayoff(
  teamWinner: TeamData,
  teamLoser: TeamData,
  match: MatchTeam
) {
  const nextMatch = await fetchMatch(match.next_match as string);

  if (!nextMatch) return;

  // Update the next match with the winner
  // Find if will play as home or away
  if (!nextMatch.home_team) {
    await db
      .update(matchTable)
      .set({ home_team: teamWinner.id })
      .where(eq(matchTable.id, match.next_match as string));
  } else {
    await db
      .update(matchTable)
      .set({ away_team: teamWinner.id })
      .where(eq(matchTable.id, match.next_match as string));
  }

  await updateGoals(teamWinner, teamWinner.points, teamLoser.points);
  await updateGoals(teamLoser, teamLoser.points, teamWinner.points);
}

async function createPlayoffWithTeamsQualifiedPerGroup(category_id: string) {
  const category = db.query.categoryTable.findFirst({
    columns: { teams_qualified: true },
    where: (category, { eq }) => eq(category.id, category_id),
  });
}

export async function updateResults(match: MatchTeam, matchData: MatchData) {
  const { home_team, away_team, draw_winner } = matchData;
  const home_players = home_team.players_scored;
  const away_players = away_team.players_scored;

  // Make one array
  const players_scored = [...home_players, ...away_players];

  // Update match results
  await db
    .update(matchTable)
    .set({
      home_score: home_team.points,
      away_score: away_team.points,
      status: "finished",
    })
    .where(eq(matchTable.id, match.id));

  // Update players goals
  await db.transaction(async (tx) => {
    for (const player of players_scored) {
      await tx
        .update(playerTable)
        .set({ goals_scored: player.goals })
        .where(eq(playerTable.ci, player.ci));
    }
  });

  // Get the winner, the loser or draw
  const [team_winner, team_loser, draw] = getWinner(
    home_team,
    away_team,
    draw_winner
  );

  // Update wins, losses and draws
  if (draw && match.phase === "groups") {
    await Promise.all([
      updateDrawGroups(team_winner),
      updateDrawGroups(team_loser),
    ]);
  } else {
    if (match.phase !== "groups") {
      await updateWinPlayoff(team_winner, team_loser, match);
    } else {
      await Promise.all([
        updateWinGroups(team_winner, true),
        updateWinGroups(team_loser, false),
      ]);

      // Get all matches in groups phase
      const category_id = match.category_id;
      const matchesInGroups = await db.query.matchTable.findMany({
        where: (match, { eq, and }) =>
          and(eq(match.category_id, category_id), eq(match.phase, "groups")),
      });
      const allMatchesInGroupsFinished = matchesInGroups.every((match) => {
        return match.status === "finished";
      });

      // With every group match finished, create table of qualification per group
      if (allMatchesInGroupsFinished) {
        await createPlayoffWithTeamsQualifiedPerGroup(category_id);
      }
    }
  }
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
