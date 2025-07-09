import AddButtonLink from "@/components/buttons/AddButtonLink";
import ReturnButton from "@/components/buttons/ReturnButton";
import { Card } from "@/components/ui/card";
import { getTournaments } from "@/db/methods/tournament";

export default async function TournamentPage() {
  const tournaments = await getTournaments();
  console.log(tournaments);

  return (
    <div>
      <div className="mx-auto px-4 md:px-8 max-w-7xl py-2 ">
        <ReturnButton href="/dashboard/admin" />
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Gestión de Torneos
          </h1>
          <AddButtonLink href="/dashboard/admin/tournaments/new">
            Nuevo Torneo
          </AddButtonLink>
        </div>

        {/* Tournaments State */}
        <Card className="border-2 border-dashed border-neutral-300 bg-neutral-50">
          <div className="flex flex-col items-center justify-center py-16 px-8">
            <p className="text-gray-500 text-lg mb-6">No hay torneos creados</p>
            <AddButtonLink href="/dashboard/admin/tournaments/new">
              Crear Primer Torneo
            </AddButtonLink>
          </div>
        </Card>
      </div>
    </div>
  );
}
