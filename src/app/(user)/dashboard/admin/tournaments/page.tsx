import { ButtonLink } from "@/components/atomic-components/button-link";
import { ReturnButton } from "@/components/atomic-components/return-button";
import { TableSkeleton } from "@/components/skeletons";
import { AddButton } from "@/components/tournaments/add-button";
import { TournamentTable } from "@/components/tournaments/table";
import { fetchTournaments } from "@/lib/data";
import { Plus } from "lucide-react";
import { Suspense } from "react";

export default async function TournamentPage() {
  const tournaments = fetchTournaments();

  return (
    <div className="pb-8">
      <div className="mx-auto px-4 md:px-8 max-w-7xl py-2">
        <ReturnButton href="/dashboard/admin" />
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-4">
          <h1 className="text-2xl font-semibold">Gestión de Torneos</h1>
          <AddButton array={tournaments} />
        </div>

        {/* Table */}
        <Suspense fallback={<TableSkeleton />}>
          <TournamentTable tournaments={tournaments} />
        </Suspense>
      </div>
    </div>
  );
}
