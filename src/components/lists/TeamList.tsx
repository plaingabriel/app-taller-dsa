import { Team } from "@/shared/types";
import TeamItem from "../items/TeamItem";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function TeamList({ teams }: { teams: Team[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipos Registrados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teams.map((equipo) => {
            return <TeamItem key={equipo.id} team={equipo} />;
          })}
        </div>
      </CardContent>
    </Card>
  );
}
