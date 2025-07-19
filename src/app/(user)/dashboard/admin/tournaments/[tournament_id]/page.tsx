import { ButtonLink } from "@/components/atomic-components/button-link";
import { ReturnButton } from "@/components/atomic-components/return-button";
import { FixtureBadge, StatusBadge } from "@/components/badges";
import { Badge } from "@/components/shadcn-ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { WorkflowCategory } from "@/components/workflows";
import { fetchTournament } from "@/lib/data";
import { Trophy, Users } from "lucide-react";
import { redirect } from "next/navigation";

export default async function TournamentProfilePage({
  params,
}: {
  params: Promise<{ tournament_id: string }>;
}) {
  const { tournament_id } = await params;
  const tournament = await fetchTournament(tournament_id);

  if (!tournament) {
    redirect("/dashboard/admin/tournaments");
  }

  return (
    <div className="pb-8">
      <div className="mx-auto px-4 md:px-8 max-w-7xl py-2 space-y-4">
        <ReturnButton href="/dashboard/admin/tournaments" />

        <div>
          <h1 className="text-2xl font-bold">{tournament.name}</h1>
          <p className="text-neutral-800">Gestión detallada del torneo</p>
        </div>

        {/* Tournament Details */}

        <Card>
          <CardHeader>
            <CardTitle className="flex gap-x-2 ">
              <span>
                <Trophy />
              </span>
              <span className="text-xl">Información del Torneo</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-3 gap-x-4 -mt-4">
              <div>
                <h4 className="font-medium">Estado</h4>
                <StatusBadge status={tournament.status} />
              </div>

              <div>
                <h4 className="font-medium">Categorías</h4>
                <span className="text-neutral-800">
                  {tournament.categories.length}
                </span>
              </div>

              <div>
                <h4 className="font-medium">Fecha de Creación</h4>
                <span className="text-neutral-800">
                  {new Date(tournament.creation_date).toLocaleDateString(
                    "es-ES"
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tournament Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-x-2 ">
              <span>
                <Users />
              </span>

              <span className="text-xl">Categorías del Torneo</span>
            </CardTitle>
          </CardHeader>

          {/* Category List */}
          <CardContent className="space-y-4">
            {tournament.categories.map((category) => {
              const { teams } = category;

              const text =
                teams.length === 0
                  ? "Sin equipos"
                  : teams.length < category.team_count
                  ? `Parcial (${teams.length}/${category.team_count})`
                  : "Completa";

              const { has_fixture } = category;
              return (
                <Card key={category.id} className="border-neutral-600">
                  <CardContent className="flex justify-between items-center">
                    <div>
                      <div className="flex gap-x-2 items-center">
                        <h4 className="font-medium">{category.name}</h4>
                        <FixtureBadge fixtureType={category.fixture_type} />
                        <Badge variant={"outline"}>{text}</Badge>
                      </div>

                      <div className="flex flex-col text-neutral-700">
                        <span>
                          Edad: {category.min_age} - {category.max_age}
                        </span>
                        <span>Equipos: {category.team_count}</span>
                        {category.fixture_type === "groups+playoffs" && (
                          <span>
                            Grupos: {category.group_count} grupos de{" "}
                            {category.teams_per_group} equipos, avanzan{" "}
                            {category.teams_qualified} por grupo
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-x-2">
                      <ButtonLink
                        href={`/dashboard/admin/tournaments/${tournament_id}/${category.id}`}
                      >
                        {has_fixture ? "Ver" : "Gestionar"} Equipos
                      </ButtonLink>

                      {has_fixture && (
                        <ButtonLink
                          href={`/dashboard/admin/tournaments/${tournament_id}/${category.id}/matches`}
                          variant={"secondary"}
                        >
                          Ver Partidos
                        </ButtonLink>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>

        {/* Workflow */}
        <WorkflowCategory />
      </div>
    </div>
  );
}
