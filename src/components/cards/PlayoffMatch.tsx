import { getTeamById } from "@/db/methods/team";
import { PlayoffMatch as match } from "@/shared/types";
import { Card, CardContent } from "../shadcn-ui/card";

export default async function PlayoffMatch({ match }: { match: match }) {
  const { home_team, away_team } = match;

  const homeTeam =
    home_team !== undefined ? await getTeamById(home_team) : null;
  const awayTeam =
    away_team !== undefined ? await getTeamById(away_team) : null;

  return (
    <Card key={match.id}>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          {/* Equipo Local */}
          <div className="text-right flex-1">
            <p className={`font-semibold`}>
              {!homeTeam ? "Próximamente" : homeTeam?.name}
            </p>
          </div>

          {/* Points*/}
          <div className="mx-6 text-center">
            <div className="text-lg text-muted-foreground">vs</div>
          </div>

          {/* Equipo Visitante */}
          <div className="text-left flex-1">
            <p className={`font-semibold`}>
              {!awayTeam ? "Próximamente" : awayTeam?.name}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
