import { DataTable } from "@/components/block-components/data-table";
import { GoalScorers, TeamPlayers, TeamsPositions } from "@/lib/definitions";
import { goalScorersColumns, teamsPositionsColumns } from "./columns";

export function GoalScorersTable({ teams }: { teams: TeamPlayers[] }) {
  // Create array of goal scorers
  const goalScorers: GoalScorers[] = [];

  for (const team of teams) {
    for (const player of team.players) {
      goalScorers.push({
        position: 0,
        player: player.name,
        team: team.name,
        goals: player.goals_scored,
      });
    }
  }

  // Sort players by goals scored
  goalScorers.sort((a, b) => b.goals - a.goals);

  // Set the position
  for (let i = 0; i < goalScorers.length; i++) {
    goalScorers[i].position = i + 1;
  }

  return <DataTable columns={goalScorersColumns} data={goalScorers} />;
}

export function TeamsPositionsTable({ teams }: { teams: TeamPlayers[] }) {
  const teamsPositions: TeamsPositions[] = teams.map((team, index) => ({
    position: index + 1,
    team: team.name,
    wins: team.wins || 0,
    losses: team.losses || 0,
    draws: team.draws || 0,
    points: team.points || 0,
    goals_for: team.goals_count || 0,
    goals_against: team.goals_against || 0,
    goal_difference: (team.goals_count || 0) - (team.goals_against || 0),
  }));

  return <DataTable columns={teamsPositionsColumns} data={teamsPositions} />;
}
