import { ReturnButton } from "@/components/atomic-components/return-button";
import { CreatePlayersForm } from "@/components/players/create-form";
import { PlayersDetails } from "@/components/players/details";
import { PlayersPageHeading } from "@/components/players/heading";
import { PlayersTable } from "@/components/players/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import {
  DetailSkeleton,
  FormSkeleton,
  HeadingSkeleton,
  TableSkeleton,
} from "@/components/skeletons";
import { db } from "@/db";
import { fetchTeam } from "@/lib/data";
import { Users } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function PlayersPage({
  params,
}: {
  params: Promise<{
    tournament_id: string;
    category_id: string;
    team_id: string;
  }>;
}) {
  const { tournament_id, category_id, team_id } = await params;
  const team = fetchTeam(team_id);
  const ages = db.query.categoryTable.findFirst({
    columns: { min_age: true, max_age: true },
    where: (category, { eq }) => eq(category.id, category_id),
  });

  if (!team) {
    redirect(`/dashboard/admin/tournaments/${tournament_id}/${category_id}`);
  }

  return (
    <div className="pb-8">
      <div className="mx-auto px-4 md:px-8 max-w-7xl py-2 space-y-4">
        <ReturnButton
          href={`/dashboard/admin/tournaments/${tournament_id}/${category_id}`}
        />

        <Suspense fallback={<HeadingSkeleton />}>
          <PlayersPageHeading team={team} />
        </Suspense>

        {/* Team Details */}
        <Suspense fallback={<DetailSkeleton />}>
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
              <PlayersDetails team={team} ages={ages} />
            </CardContent>
          </Card>
        </Suspense>

        {/* Upload Players */}
        <Suspense fallback={<FormSkeleton />}>
          <CreatePlayersForm team={team} ages={ages} />
        </Suspense>

        {/* Players Table */}
        <Suspense fallback={<TableSkeleton />}>
          <PlayersTable team={team} />
        </Suspense>
      </div>
    </div>
  );
}
