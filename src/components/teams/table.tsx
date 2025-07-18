"use client";

import { deleteTeam } from "@/actions/team-action";
import { CategoryTeamsPlayers } from "@/lib/definitions";
import { Users } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { use } from "react";
import { ButtonLink } from "../atomic-components/button-link";
import { RemoveSubmitAndReload } from "../atomic-components/remove-submit";
import { Badge } from "../shadcn-ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn-ui/card";

export default function TeamTable({
  category,
}: {
  category: Promise<CategoryTeamsPlayers | undefined>;
}) {
  const categoryData = use(category);
  if (!categoryData) return null;

  const teams = categoryData.teams;
  if (teams.length === 0) return null;

  const pathname = usePathname();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipos Registrados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teams.map((team) => {
            const { players } = team;
            const deleteTeamWithID = deleteTeam.bind(null, team.id);

            return (
              <Card key={team.id} className="border-neutral-600">
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
                          onError={(e) => (e.currentTarget.src = "")}
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
                      {players.length === team.players_count && (
                        <Badge>Completo</Badge>
                      )}

                      {players.length < team.players_count && (
                        <Badge variant="outline">Incompleto</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-x-4">
                    <ButtonLink href={`${pathname}/${team.id}`}>
                      {team.has_validated_players
                        ? "Ver jugadores"
                        : "Gestionar jugadores"}
                    </ButtonLink>

                    {!team.has_validated_players && (
                      <RemoveSubmitAndReload deleteAction={deleteTeamWithID} />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
