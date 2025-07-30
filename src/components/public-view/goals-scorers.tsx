import { TeamPlayers } from "@/lib/definitions";
import { GoalScorersTable } from "./tables";

export function GoalsScorers({ teams }: { teams: TeamPlayers[] }) {
  // In every team, sort the players by goals scored and filter out players with 0 goals scored
  const goalScorers = teams.map((team) => ({
    ...team,
    players: team.players
      .filter((player) => player.goals_scored > 0)
      .sort((a, b) => b.goals_scored - a.goals_scored),
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-xl text-center font-bold">Tabla de Goleadores</h3>
      <GoalScorersTable teams={goalScorers} />
    </div>
  );
}
