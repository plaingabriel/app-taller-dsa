import { ReturnButton } from "@/components/atomic-components/return-button";
import { StatusBadge } from "@/components/badges";
import { CardTable } from "@/components/public-view/card-table";
import { Badge } from "@/components/shadcn-ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { db } from "@/db";
import { AllTournament } from "@/lib/definitions";
import { Calendar, Users } from "lucide-react";
import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ tournament_id: string }>;
}) {
  const { tournament_id } = await params;
  const tournament = (await db.query.tournamentTable.findFirst({
    where: (tournament, { eq }) => eq(tournament.id, tournament_id),
    with: {
      categories: {
        with: {
          teams: {
            with: { players: true },
          },
          matches: {
            with: {
              home_team_complete: true,
              away_team_complete: true,
            },
          },
          groups: {
            with: {
              teams: {
                with: { players: true },
              },
            },
          },
        },
      },
    },
  })) as AllTournament | undefined;

  if (!tournament) {
    redirect("/");
  }

  return (
    <div className="px-16 space-y-6">
      <ReturnButton href="/" />

      <div className="flex items-center gap-x-6">
        <h1 className="text-3xl font-bold">{tournament.name}</h1>
        <StatusBadge status={tournament.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
        {/* Category Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6" />
              <CardTitle>Categorías</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {tournament.categories.map((category) => (
              <div
                key={category.id}
                className="space-y-2 not-last:border-b pb-2"
              >
                <div className="flex items-center justify-between">
                  <p>{category.name}</p>
                  <Badge>{category.teams.length} equipos</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span>Campeón:</span>
                  <span className="font-semibold">
                    {category.champion || "Ninguno"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6" />
              <CardTitle>Información</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-neutral-700">Fecha de creación:</p>
              <span>
                {new Date(tournament.creation_date).toLocaleDateString("es-ES")}
              </span>
            </div>

            <div>
              <p className="text-sm text-neutral-700">Estado actual:</p>
              <span>
                {tournament.status === "created" ? "Creado" : "Finalizado"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6" />
              <CardTitle>Información</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-neutral-700">Total categorías:</p>
              <span>{tournament.categories.length}</span>
            </div>

            <div>
              <p className="text-sm text-neutral-700">Total equipos:</p>
              <span>
                {tournament.categories.reduce(
                  (total, category) => total + category.teams.length,
                  0
                )}
              </span>
            </div>

            <div>
              <p className="text-sm text-neutral-700">Total partidos:</p>
              <span>
                {tournament.categories.reduce(
                  (total, category) => total + category.matches.length,
                  0
                )}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <CardTable tournament={tournament} />
    </div>
  );
}
