import { categoryHasMatches } from "@/db/methods/category";
import { getTeamsByCategory } from "@/db/methods/team";
import { CategoryFixture } from "@/shared/types";
import ButtonLink from "../atomic-components/button-link";
import FixtureBadge from "../badges/FixtureBadge";
import { Badge } from "../shadcn-ui/badge";
import { Card, CardContent } from "../shadcn-ui/card";

type CategoryTournamentCardProps = {
  category: CategoryFixture;
  tournament_id: number;
};

export default async function CategoryTournamentCard({
  category,
  tournament_id,
}: CategoryTournamentCardProps) {
  const teams = await getTeamsByCategory(category.id);
  const text =
    teams.length === 0
      ? "Sin equipos"
      : teams.length < category.fixture.team_count
      ? `Parcial (${teams.length}/${category.fixture.team_count})`
      : "Completa";
  const hasMatches = await categoryHasMatches(category.id);

  return (
    <Card key={category.id} className="border-neutral-600">
      <CardContent className="flex justify-between items-center">
        <div>
          <div className="flex gap-x-2 items-center">
            <h4 className="font-medium">{category.name}</h4>
            <FixtureBadge fixtureType={category.fixture.fixture_type} />
            <Badge variant={"outline"}>{text}</Badge>
          </div>

          <div className="flex flex-col text-neutral-700">
            <span>
              Edad: {category.min_age} - {category.max_age}
            </span>
            <span>Equipos: {category.fixture.team_count}</span>
            {category.fixture.fixture_type === "groups+playoffs" && (
              <span>
                Grupos: {category.fixture.group_count} grupos de{" "}
                {category.fixture.teams_per_group} equipos, avanzan{" "}
                {category.fixture.teams_qualified} por grupo
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-x-2">
          <ButtonLink
            href={`/dashboard/admin/tournaments/${tournament_id}/${category.id}`}
          >
            {hasMatches ? "Ver" : "Gestionar"} Equipos
          </ButtonLink>

          {hasMatches && (
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
}
