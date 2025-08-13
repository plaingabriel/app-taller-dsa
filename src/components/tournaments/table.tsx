"use client";

import { deleteTournament } from "@/actions/tournament-actions";
import { TournamentCategories } from "@/lib/definitions";
import { allEqual, getTextByFixtureType } from "@/lib/utils";
import { Plus, Settings, Trash } from "lucide-react";
import { use } from "react";
import { ButtonLink } from "../atomic-components/button-link";
import { FixtureBadge, InfoBadge } from "../badges";
import { Button } from "../shadcn-ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn-ui/card";

export function TournamentTable({
  tournaments,
}: {
  tournaments: Promise<TournamentCategories[]>;
}) {
  const allTournaments = use(tournaments);

  if (allTournaments.length === 0) {
    return (
      <Card className="border-2 border-dashed border-neutral-300 bg-neutral-50">
        <div className="flex flex-col items-center justify-center py-16 px-8">
          <p className="text-gray-500 text-lg mb-6">No hay torneos creados</p>
          <ButtonLink href="/dashboard/admin/tournaments/new">
            <Plus />
            <span>Crear Primer Torneo</span>
          </ButtonLink>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {allTournaments.map((tournament) => {
        const categoriesFixtureType = tournament.categories.map(
          (category) => category.fixture_type
        );

        const tournamentType = allEqual(categoriesFixtureType)
          ? categoriesFixtureType[0]
          : "mix";

        const tournamentStatus =
          tournament.status === "created"
            ? "Creado"
            : tournament.status === "finished"
            ? "Finalizado"
            : "Iniciado";

        const deleteTournamentWithID = deleteTournament.bind(
          null,
          tournament.id
        );

        return (
          <Card key={tournament.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-3">
                <CardTitle>{tournament.name}</CardTitle>
                <span className="text-sm text-gray-400">
                  {tournamentStatus}
                </span>
                <FixtureBadge fixtureType={tournamentType} />
              </div>

              <div className="flex items-center gap-2">
                <ButtonLink
                  size="icon"
                  className="bg-neutral-900 hover:bg-neutral-900/80"
                  href={`/dashboard/admin/tournaments/${tournament.id}`}
                >
                  <Settings />
                </ButtonLink>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={(e) => {
                    const button = e.target as HTMLButtonElement;
                    button.disabled = true;

                    const confirm = window.confirm(
                      "¿Estás seguro de eliminar TODO el torneo? Esta acción es IRREVERSIBLE."
                    );

                    if (confirm) {
                      deleteTournamentWithID();
                    }

                    button.disabled = false;
                  }}
                >
                  <Trash />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-8 text-sm">
                <div>
                  <h4 className="font-semibold">Categorías</h4>
                  <span className="text-neutral-600">
                    {tournament.categories.length}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold">Fecha de Creación</h4>
                  <span className="text-neutral-600">
                    {new Date(tournament.creation_date).toLocaleDateString(
                      "es-ES"
                    )}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {tournament.categories.map((category) => (
                  <InfoBadge key={category.id}>
                    <span>{category.name}</span>
                    <span>({category.team_count} equipos,</span>
                    <span>{getTextByFixtureType(category.fixture_type)})</span>
                  </InfoBadge>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
