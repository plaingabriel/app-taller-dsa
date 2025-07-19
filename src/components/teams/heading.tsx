import { CategoryTeamsPlayers, Team } from "@/lib/definitions";
import { redirect } from "next/navigation";

export async function TeamPageHeading({
  category,
  tournament_id,
}: {
  category: Promise<CategoryTeamsPlayers | undefined>;
  tournament_id: string;
}) {
  const categoryData = await category;

  if (!categoryData) {
    redirect(`/dashboard/admin/tournaments/${tournament_id}`);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Gestionar Equipos de la Categoría {categoryData.name}
      </h1>
      <p className="text-neutral-800">
        {categoryData.teams.length}/{categoryData.team_count} equipos
        registrados
      </p>
    </div>
  );
}
