import ReturnButton from "@/components/buttons/ReturnButton";
import PlayersSection from "@/components/sections/PlayersSection";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { getPlayersByTeam } from "@/db/methods/player";
import { getTeamById, teamHasMatches } from "@/db/methods/team";
import { Users } from "lucide-react";

export default async function PlayersPage({
  params,
}: {
  params: Promise<{
    tournament_id: string;
    category_id: string;
    team_id: string;
  }>;
}) {
  const { tournament_id, category_id, team_id } = await params;
  const team = await getTeamById(parseInt(team_id));
  const players = await getPlayersByTeam(parseInt(team_id));
  const hasMatches = await teamHasMatches(parseInt(team_id));

  return (
    <div className="pb-8">
      <div className="mx-auto px-4 md:px-8 max-w-7xl py-2 space-y-4">
        <ReturnButton
          href={`/dashboard/admin/tournaments/${tournament_id}/${category_id}`}
        />

        <div>
          <h1 className="text-2xl font-bold">
            Gestionar Jugadores del {team.name}
          </h1>
          <p className="text-neutral-800">
            {players.length}/{team.players_count} jugadores registrados
          </p>
        </div>

        {/* Team Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-x-2 ">
              <span>
                <Users />
              </span>

              <span className="text-xl">Información de la Categoría</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-x-4 -mt-4">
              <div>
                <h4 className="font-medium">Jugadores Requeridos</h4>
                <span>{team.players_count}</span>
              </div>

              <div>
                <h4 className="font-medium">Jugadores Registrados</h4>
                <span>{players.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Players Section */}
        <PlayersSection team={team} players={players} hasMatches={hasMatches} />
      </div>
    </div>
  );
}
