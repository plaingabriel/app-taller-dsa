import { deleteTeam } from "@/actions/team-action";
import { getPlayersByTeam } from "@/db/methods/player";
import { Team } from "@/shared/types";
import { Users } from "lucide-react";
import Image from "next/image";
import ManagePlayerButton from "../buttons/ManagePlayersButton";
import DeleteTeamForm from "../forms/DeleteTeamForm";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";

export default async function TeamItem({ team }: { team: Team }) {
  const players = await getPlayersByTeam(team.id);
  const deleteTeamAction = deleteTeam.bind(null, team.id);

  return (
    <Card className="border-neutral-600">
      <CardContent className="flex items-center justify-between">
        <div className="flex gap-x-4 items-center">
          <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center overflow-hidden">
            {team.logo && (
              <Image
                src={team.logo}
                alt={`${team.name} logo`}
                width={100}
                height={100}
                className="w-full h-full object-contain"
              />
            )}

            <Users
              className={`w-6 h-6 text-neutral-600 ${
                team.logo ? "hidden" : ""
              }`}
            />
          </div>

          <div>
            <CardTitle>{team.name}</CardTitle>
            <p className="text-sm text-neutral-600">
              Jugadores: {players.length}/{team.players_count}
            </p>
            {players.length === team.players_count && <Badge>Completo</Badge>}

            {players.length < team.players_count && (
              <Badge variant="outline">Incompleto</Badge>
            )}
          </div>
        </div>

        <div className="flex gap-x-4">
          <ManagePlayerButton team_id={team.id} />

          <DeleteTeamForm teamId={team.id} />
        </div>
      </CardContent>
    </Card>
  );
}
