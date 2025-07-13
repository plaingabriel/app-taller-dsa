import ReturnButton from "@/components/buttons/ReturnButton";
import InstructionCard from "@/components/cards/InstructionCard";
import UploadCard from "@/components/cards/UploadCard";
import TeamList from "@/components/lists/TeamList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryById } from "@/db/methods/category";
import { getTeamsByCategory } from "@/db/methods/team";
import { getTextByFixtureType } from "@/lib/utils";
import { Users } from "lucide-react";

export default async function TeamsPage({
  params,
}: {
  params: Promise<{ tournament_id: string; category_id: string }>;
}) {
  const { tournament_id, category_id } = await params;
  const category = await getCategoryById(parseInt(category_id));
  const teams = await getTeamsByCategory(parseInt(category_id));

  return (
    <div className="pb-8">
      <div className="mx-auto px-4 md:px-8 max-w-7xl py-2 space-y-4">
        <ReturnButton href={`/dashboard/admin/tournaments/${tournament_id}`} />

        <div>
          <h1 className="text-2xl font-bold">
            Gestionar Equipos de la Categoría {category.name}
          </h1>
          <p className="text-neutral-800">
            {teams.length}/{category.fixture.team_count} equipos registrados
          </p>
        </div>

        {/* Category Details */}
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
            <div className="grid grid-cols-3 gap-x-4 -mt-4">
              <div>
                <h4 className="font-medium">Equipos Permitidos</h4>
                <span>{category.fixture.team_count}</span>
              </div>

              <div>
                <h4 className="font-medium">Equipos Registrados</h4>
                <span>{teams.length}</span>
              </div>

              <div>
                <h4 className="font-medium">Formato</h4>
                <span>
                  {getTextByFixtureType(category.fixture.fixture_type)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Teams */}
        <UploadCard category={category} />

        {/* Teams List */}
        {teams.length > 0 && <TeamList teams={teams} />}

        {/* Instructions */}
        <InstructionCard />
      </div>
    </div>
  );
}
