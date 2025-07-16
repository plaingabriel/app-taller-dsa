import { teamHasMatches } from "@/db/methods/team";
import { Team } from "@/shared/types";
import TeamItem from "../items/TeamItem";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn-ui/card";

export default async function TeamList({ teams }: { teams: Team[] }) {
  // If the first team has matches, then all teams have matches
  const hasMatches = await teamHasMatches(teams[0].id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipos Registrados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teams.map((equipo) => {
            return (
              <TeamItem key={equipo.id} team={equipo} hasMatches={hasMatches} />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
