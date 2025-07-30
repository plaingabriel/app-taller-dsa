import { MatchTeams } from "@/lib/definitions";

export function CardPlayoff({ match }: { match: MatchTeams }) {
  return (
    <div className="rounded-xl bg-tomato-100 border-2 p-6 border-tomato-200">
      <div className="flex flex-col items-center">
        <span className="font-semibold">
          {match.penalty_win === "home" && (
            <span className="text-tomato-600">P</span>
          )}{" "}
          {match.home_team_complete.name}
        </span>
        <span className="text-neutral-500">
          {match.home_score} - {match.away_score}
        </span>
        <span className="font-semibold">
          {match.away_team_complete.name}{" "}
          {match.penalty_win === "away" && (
            <span className="text-tomato-600">P</span>
          )}
        </span>
      </div>
    </div>
  );
}
