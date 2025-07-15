import { getTeamById } from "@/db/methods/team";
import { Match } from "@/shared/types";
import { Card, CardContent } from "../ui/card";

interface MatchCardProps {
  match: Match;
}

export default async function MatchCard({ match }: MatchCardProps) {
  const homeTeam = await getTeamById(match.home_team);
  const awayTeam = await getTeamById(match.away_team);

  return (
    <Card key={match.id}>
      <CardContent className="space-y-6">
        <h4 className="text-center text-xl font-bold text-tomato-500">
          Jornada {match.day}
        </h4>

        <div className="flex items-center justify-between">
          {/* Equipo Local */}
          <div className="text-right flex-1">
            <p className={`font-semibold`}>{homeTeam.name}</p>
          </div>

          {/* Points*/}
          <div className="mx-6 text-center">
            <div className="text-lg text-muted-foreground">vs</div>
          </div>

          {/* Equipo Visitante */}
          <div className="text-left flex-1">
            <p className={`font-semibold`}>{awayTeam.name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
