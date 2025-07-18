import { Category, Team } from "@/lib/definitions";
import { getTextByFixtureType } from "@/lib/utils";

export async function TeamDetails({
  category,
}: {
  category: Promise<Category & { teams: Team[] }>;
}) {
  const categoryData = await category;

  return (
    <div className="grid grid-cols-3 gap-x-4 -mt-4">
      <div>
        <h4 className="font-medium">Equipos Permitidos</h4>
        <span>{categoryData.team_count}</span>
      </div>

      <div>
        <h4 className="font-medium">Equipos Registrados</h4>
        <span>{categoryData.teams.length}</span>
      </div>

      <div>
        <h4 className="font-medium">Formato</h4>
        <span>{getTextByFixtureType(categoryData.fixture_type)}</span>
      </div>
    </div>
  );
}
