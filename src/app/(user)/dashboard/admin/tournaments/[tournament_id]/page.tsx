import StatusBadge from "@/components/badges/StatusBadge";
import ReturnButton from "@/components/buttons/ReturnButton";
import CategoryTournamentCard from "@/components/cards/CategoryTournamentCard";
import WorkflowCard from "@/components/cards/WorkFlowCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { getTournamentById } from "@/db/methods/tournament";
import { Trophy, Users } from "lucide-react";

export default async function TournamentProfilePage({
  params,
}: {
  params: Promise<{ tournament_id: string }>;
}) {
  const { tournament_id: id } = await params;
  const tournament = await getTournamentById(parseInt(id));

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
                  {new Date(tournament.creationDate).toLocaleDateString(
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

          {/* Category Cards */}
          <CardContent className="space-y-4">
            {tournament.categories.map((category) => (
              <CategoryTournamentCard
                key={category.id}
                category={category}
                tournament_id={tournament.id}
              />
            ))}
          </CardContent>
        </Card>

        {/* Workflow */}
        <WorkflowCard />
      </div>
    </div>
  );
}
