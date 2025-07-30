"use server";

import { db } from "@/db";
import {
  categoryTable,
  groupTable,
  matchTable,
  playerTable,
  teamTable,
  tournamentTable,
} from "@/db/schemas";
import { fetchMatch } from "@/lib/data";
import {
  CategoryTeamsPlayers,
  MatchData,
  MatchTeam,
  MatchTeamsPlayers,
  Phase,
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

async function updateGroups(
  match: MatchTeamsPlayers,
  teamWinner: TeamData,
  teamLoser: TeamData,
  draw: boolean
) {
  // If match has been played, update points and goals correctly
  if (match.status === "finished") {
    const prevMatch = await fetchMatch(match.id);

    if (!prevMatch) return;

    // @ts-ignore
    const home_team: TeamData = {
      id: prevMatch.home_team as string,
      points: prevMatch.home_score as number,
      players_scored: [],
    };

    // @ts-ignore
    const away_team: TeamData = {
      id: prevMatch.away_team as string,
      points: prevMatch.away_score as number,
      players_scored: [],
    };

    const [prevWinner, prevLoser, prevDraw] = getWinner(home_team, away_team);

    if (prevDraw) {
      await db
        .update(teamTable)
        .set({
          draws: sql`${teamTable.draws} - 1`,
          points: sql`${teamTable.points} - 1`,
          goals_count: sql`${teamTable.goals_count} - ${prevWinner.points}`,
          goals_against: sql`${teamTable.goals_against} - ${prevLoser.points}`,
        })
        .where(eq(teamTable.id, prevWinner.id));

      await db
        .update(teamTable)
        .set({
          draws: sql`${teamTable.draws} - 1`,
          points: sql`${teamTable.points} - 1`,
          goals_count: sql`${teamTable.goals_count} - ${prevLoser.points}`,
          goals_against: sql`${teamTable.goals_against} - ${prevWinner.points}`,
        })
        .where(eq(teamTable.id, prevLoser.id));
    } else {
      await db
        .update(teamTable)
        .set({
          wins: sql`${teamTable.wins} - 1`,
          points: sql`${teamTable.points} - 3`,
          goals_count: sql`${teamTable.goals_count} - ${prevWinner.points}`,
          goals_against: sql`${teamTable.goals_against} - ${prevLoser.points}`,
        })
        .where(eq(teamTable.id, prevWinner.id));

      await db
        .update(teamTable)
        .set({
          losses: sql`${teamTable.losses} - 1`,
          goals_count: sql`${teamTable.goals_count} - ${prevLoser.points}`,
          goals_against: sql`${teamTable.goals_against} - ${prevWinner.points}`,
        })
        .where(eq(teamTable.id, prevLoser.id));
    }
  }

  if (draw) {
    await db
      .update(teamTable)
      .set({
        draws: sql`${teamTable.draws} + 1`,
        points: sql`${teamTable.points} + 1`,
        goals_count: sql`${teamTable.goals_count} + ${teamWinner.points}`,
        goals_against: sql`${teamTable.goals_against} + ${teamLoser.points}`,
      })
      .where(eq(teamTable.id, teamWinner.id));

    await db
      .update(teamTable)
      .set({
        draws: sql`${teamTable.draws} + 1`,
        points: sql`${teamTable.points} + 1`,
        goals_count: sql`${teamTable.goals_count} + ${teamLoser.points}`,
        goals_against: sql`${teamTable.goals_against} + ${teamWinner.points}`,
      })
      .where(eq(teamTable.id, teamLoser.id));
  } else {
    await db
      .update(teamTable)
      .set({
        wins: sql`${teamTable.wins} + 1`,
        points: sql`${teamTable.points} + 3`,
        goals_count: sql`${teamTable.goals_count} + ${teamWinner.points}`,
        goals_against: sql`${teamTable.goals_against} + ${teamLoser.points}`,
      })
      .where(eq(teamTable.id, teamWinner.id));

    await db
      .update(teamTable)
      .set({
        losses: sql`${teamTable.losses} + 1`,
        goals_count: sql`${teamTable.goals_count} + ${teamLoser.points}`,
        goals_against: sql`${teamTable.goals_against} + ${teamWinner.points}`,
      })
      .where(eq(teamTable.id, teamLoser.id));
  }
}

async function updateWinPlayoff(
  teamWinner: TeamData,
  teamLoser: TeamData,
  match: MatchTeamsPlayers
) {
  const nextMatch = await fetchMatch(match.next_match as string);

  if (match.phase === "final") {
    await db
      .update(categoryTable)
      .set({ champion: teamWinner.name })
      .where(eq(categoryTable.id, match.category_id));
    return;
  }

  if (!nextMatch) return;

  // Update the next match with the winner
  // Find if will play as home or away
  if (!nextMatch.home_team) {
    await db
      .update(matchTable)
      .set({ home_team: teamWinner.id })
      .where(eq(matchTable.id, match.next_match as string));
  } else if (!nextMatch.away_team) {
    await db
      .update(matchTable)
      .set({ away_team: teamWinner.id })
      .where(eq(matchTable.id, match.next_match as string));
  } else {
    // Update the next match if now the loser team now plays the next match
    if (nextMatch.home_team === teamLoser.id) {
      await db
        .update(matchTable)
        .set({ home_team: teamWinner.id, penalty_win: "none" })
        .where(eq(matchTable.id, match.next_match as string));
    } else if (nextMatch.away_team === teamLoser.id) {
      await db
        .update(matchTable)
        .set({ away_team: teamWinner.id, penalty_win: "none" })
        .where(eq(matchTable.id, match.next_match as string));
    }
  }
}

function getLowestPlayoffPhase(team_count: number): Phase {
  if (team_count === 16) return "round_16";
  if (team_count === 8) return "quarterfinals";
  if (team_count === 4) return "semifinal";

  return "final";
}

async function getMatchesInPhaseAvailable(category_id: string, phase: Phase) {
  const matchesInPhase = await db.query.matchTable.findMany({
    where: (match, { eq }) =>
      eq(match.category_id, category_id) && eq(match.phase, phase),
  });

  // Filter only the matches with no home_team or away_team
  return matchesInPhase.filter((match) => !match.home_team && !match.away_team);
}

async function createPlayoffWithTeamsQualifiedPerGroup(category_id: string) {
  const category = await db.query.categoryTable.findFirst({
    columns: { teams_qualified: true, group_count: true, fixture_type: true },
    where: (category, { eq }) => eq(category.id, category_id),
  });

  if (!category) return;

  if (category.fixture_type === "groups") {
    // Get the teams table sorted by points or goals
    const teams = await db.query.teamTable.findMany({
      where: (team, { eq }) => eq(team.category_id, category_id),
      with: { players: true },
    });

    teams.sort((a, b) => {
      const pointsDiff = (b.points || 0) - (a.points || 0);
      if (pointsDiff !== 0) return pointsDiff;

      const diffA = (a.goals_count || 0) - (a.goals_against || 0);
      const diffB = (b.goals_count || 0) - (b.goals_against || 0);
      return diffB - diffA;
    });

    // The first team is the champion
    const teamChampion = teams[0];

    await db
      .update(categoryTable)
      .set({ champion: teamChampion.name })
      .where(eq(categoryTable.id, category_id));

    return;
  }

  const { teams_qualified, group_count } = category;

  const groups = await db.query.groupTable.findMany({
    with: { teams: true },
    where: (group, { eq }) => eq(group.category_id, category_id),
  });

  const filterGroups = groups.filter(
    (group) => group.name !== "Fase Eliminatorias"
  );

  // Sort by points or goals
  for (const group of filterGroups) {
    group.teams.sort((a, b) => {
      const pointsDiff = (b.points || 0) - (a.points || 0);
      if (pointsDiff !== 0) return pointsDiff;

      const diffA = (a.goals_count || 0) - (a.goals_against || 0);
      const diffB = (b.goals_count || 0) - (b.goals_against || 0);
      return diffB - diffA;
    });
  }

  if (group_count === 1) {
    const groupTeams = filterGroups[0].teams;

    // For single group with 2 teams: create final match
    if (teams_qualified === 2) {
      await db
        .update(matchTable)
        .set({ home_team: groupTeams[0].id, away_team: groupTeams[1].id })
        .where(eq(matchTable.phase, "final"));
    }
    // For single group with 4 teams: create semifinals
    else if (teams_qualified === 4) {
      // Get all semifinals matches in the category
      const semifinals = await getMatchesInPhaseAvailable(
        category_id,
        "semifinal"
      );

      let i = 0;

      for (const semifinal of semifinals) {
        // With index 0 and 2, we get 1st vs 3rd of the group
        // With index 1 and 3, we get 2nd vs 4th of the group
        await db
          .update(matchTable)
          .set({ home_team: groupTeams[i].id, away_team: groupTeams[i + 2].id })
          .where(eq(matchTable.id, semifinal.id));

        i++;
      }
    }
  }

  const phase = getLowestPlayoffPhase(teams_qualified * group_count);

  // Handle 2 or 4 groups
  if (group_count === 2 || group_count === 4) {
    // Create group pairs: for 2 groups -> 1 pair, for 4 groups -> 2 pairs
    const groupPairs: string[][] = [];
    if (group_count === 2) {
      groupPairs.push([filterGroups[0].name, filterGroups[1].name]);
    } else {
      groupPairs.push([filterGroups[0].name, filterGroups[2].name]);
      groupPairs.push([filterGroups[1].name, filterGroups[3].name]);
    }

    // Generate matches for each pair of groups
    for (const [groupA, groupB] of groupPairs) {
      const teamsA = filterGroups.find((g) => g.name === groupA)?.teams || [];
      const teamsB = filterGroups.find((g) => g.name === groupB)?.teams || [];

      const matchesInPhaseAvailable = await getMatchesInPhaseAvailable(
        category_id,
        phase
      );

      // Generate matches based on qualification count
      if (teams_qualified === 1) {
        await db
          .update(matchTable)
          .set({
            home_team: teamsA[0].id,
            away_team: teamsB[0].id,
            penalty_win: "none",
          })
          .where(eq(matchTable.id, matchesInPhaseAvailable[0].id));
      } else if (teams_qualified === 2) {
        // 1st of group A vs 2nd of group B
        await db
          .update(matchTable)
          .set({
            home_team: teamsA[0].id,
            away_team: teamsB[1].id,
            penalty_win: "none",
          })
          .where(eq(matchTable.id, matchesInPhaseAvailable[0].id));

        // 2nd of group A vs 1st of group B
        await db
          .update(matchTable)
          .set({
            home_team: teamsA[1].id,
            away_team: teamsB[0].id,
            penalty_win: "none",
          })
          .where(eq(matchTable.id, matchesInPhaseAvailable[1].id));
      } else if (teams_qualified === 4) {
        // 1st of group A vs 2nd of group B
        await db
          .update(matchTable)
          .set({
            home_team: teamsA[0].id,
            away_team: teamsB[1].id,
            penalty_win: "none",
          })
          .where(eq(matchTable.id, matchesInPhaseAvailable[0].id));

        // 2nd of group A vs 1st of group B
        await db
          .update(matchTable)
          .set({
            home_team: teamsA[1].id,
            away_team: teamsB[0].id,
            penalty_win: "none",
          })
          .where(eq(matchTable.id, matchesInPhaseAvailable[1].id));

        // 3rd of group A vs 4th of group B
        await db
          .update(matchTable)
          .set({
            home_team: teamsA[2].id,
            away_team: teamsB[3].id,
            penalty_win: "none",
          })
          .where(eq(matchTable.id, matchesInPhaseAvailable[2].id));

        // 4th of group A vs 3rd of group B
        await db
          .update(matchTable)
          .set({
            home_team: teamsA[3].id,
            away_team: teamsB[2].id,
            penalty_win: "none",
          })
          .where(eq(matchTable.id, matchesInPhaseAvailable[3].id));
      }
    }
  }
}

export async function updateResults(
  match: MatchTeamsPlayers,
  matchData: MatchData
) {
  const { home_team, away_team, draw_winner } = matchData;
  const home_players = home_team.players_scored;
  const away_players = away_team.players_scored;

  // Make one array
  const players_scored = [...home_players, ...away_players];

  // Update players goals
  await db.transaction(async (tx) => {
    for (const player of players_scored) {
      await tx
        .update(playerTable)
        .set({
          goals_scored: sql`${playerTable.goals_scored} + ${player.goals}`,
        })
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
  if (match.phase !== "groups") {
    if (draw_winner) {
      const penaltyWin =
        draw_winner.id === home_team.id
          ? "home"
          : draw_winner.id === away_team.id
          ? "away"
          : "none";

      if (penaltyWin === "none") return;

      await db
        .update(matchTable)
        .set({ penalty_win: penaltyWin })
        .where(eq(matchTable.id, match.id));

      await updateWinPlayoff(team_winner, team_loser, match);
    } else {
      await db
        .update(matchTable)
        .set({ penalty_win: "none" })
        .where(eq(matchTable.id, match.id));
      await updateWinPlayoff(team_winner, team_loser, match);
    }

    // Update match results
    await db
      .update(matchTable)
      .set({
        home_score: home_team.points,
        away_score: away_team.points,
        status: "finished",
      })
      .where(eq(matchTable.id, match.id));
  } else {
    await updateGroups(match, team_winner, team_loser, draw);

    // Update match results
    await db
      .update(matchTable)
      .set({
        home_score: home_team.points,
        away_score: away_team.points,
        status: "finished",
      })
      .where(eq(matchTable.id, match.id));

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
