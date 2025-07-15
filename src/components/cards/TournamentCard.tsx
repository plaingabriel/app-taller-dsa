"use client";

import { deleteTournamentById } from "@/actions/tournament-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allEqual, getTextByFixtureType } from "@/lib/utils";
import { FixtureType, TournamentFixture } from "@/shared/types";
import { Settings } from "lucide-react";
import FixtureBadge from "../badges/FixtureBadge";
import InfoBadge from "../badges/InfoBadge";
import RemoveButton from "../buttons/RemoveButton";
import ButtonLink from "../ui/button-link";

type TournamentType = FixtureType | "mix";

export default function TournamentCard({
  tournament,
}: {
  tournament: TournamentFixture;
}) {
  let status: string;
  let tournamentType: TournamentType;

  const categoriesFixtureTypes = tournament.categories.map(
    (category) => category.fixture.fixture_type
  );

  if (!allEqual(categoriesFixtureTypes)) {
    tournamentType = "mix";
  } else {
    tournamentType = categoriesFixtureTypes[0];
  }

  switch (tournament.status) {
    case "created":
      status = "Creado";
      break;
    case "finished":
      status = "Finalizado";
      break;
    default:
      status = "Iniciado";
      break;
  }

  const handleRemoveTournament = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button = e.currentTarget;
    button.disabled = true;

    const confirmed = confirm(
      "¿Estás seguro de que quieres eliminar este torneo?"
    );

    if (confirmed) {
      await deleteTournamentById(tournament.id);
      return;
    }

    button.disabled = false;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <CardTitle>{tournament.name}</CardTitle>
          <span className="text-sm text-gray-400">{status}</span>
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
          <RemoveButton handleRemove={handleRemoveTournament} />
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
              {new Date(tournament.creationDate).toLocaleDateString("es-ES")}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {tournament.categories.map((category) => (
            <InfoBadge key={category.id}>
              <span>{category.name}</span>
              <span>({category.fixture.team_count} equipos,</span>
              <span>
                {getTextByFixtureType(category.fixture.fixture_type)})
              </span>
            </InfoBadge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
