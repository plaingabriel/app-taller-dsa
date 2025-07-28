import { ButtonLink } from "@/components/atomic-components/button-link";
import { ReturnButton } from "@/components/atomic-components/return-button";
import { FixtureBadge } from "@/components/badges";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { db } from "@/db";
import { Users } from "lucide-react";

export default async function TournamentEditorPage({
  params,
}: {
  params: Promise<{ tournament_id: string }>;
}) {
  const { tournament_id } = await params;

  const tournament_name = await db.query.tournamentTable.findFirst({
    columns: { name: true },
    where: (tournament, { eq }) => eq(tournament.id, tournament_id),
  });

  const categories = await db.query.categoryTable.findMany({
    where: (category, { eq }) => eq(category.tournament_id, tournament_id),
    with: {
      teams: true,
    },
  });

  return (
    <div>
      <div className="mx-auto max-w-5xl pt-6 px-6 md:px-0">
        <ReturnButton href="/dashboard" />

        <div className="text-center my-8 space-y-2">
          <h1 className="text-3xl font-bold">
            Gestión de Partidos - {tournament_name?.name}
          </h1>

          <p className="text-neutral-700">
            Seleccione una categoría para gestionar los partidos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="mb-4">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="flex gap-x-2 ">
                    {category.name}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm flex items-center">
                    <FixtureBadge fixtureType={category.fixture_type} />
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground text-sm flex items-center">
                  <Users className="mr-2 h-4 w-4" /> Equipos:{" "}
                  {category.teams.length}
                </p>

                <ButtonLink
                  href={`/dashboard/operator/${tournament_id}/${category.id}`}
                  className="w-full"
                >
                  Asignar Resultados
                </ButtonLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
