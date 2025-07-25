import { ReturnButton } from "@/components/atomic-components/return-button";
import { InstructionTeamCard } from "@/components/cards";
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
import { CreateTeamsForm } from "@/components/teams/create-form";
import { TeamDetails } from "@/components/teams/details";
import { TeamPageHeading } from "@/components/teams/heading";
import TeamTable from "@/components/teams/table";
import { fetchCategory } from "@/lib/data";
import { Users } from "lucide-react";
import { Suspense } from "react";

export default async function TeamsPage({
  params,
}: {
  params: Promise<{ category_id: string; tournament_id: string }>;
}) {
  const { tournament_id, category_id } = await params;
  const category = fetchCategory(category_id);

  return (
    <div className="pb-8">
      <div className="mx-auto px-4 md:px-8 max-w-7xl py-2 space-y-4">
        <ReturnButton href={`/dashboard/admin/tournaments/${tournament_id}`} />

        <Suspense fallback={<HeadingSkeleton />}>
          <TeamPageHeading category={category} tournament_id={tournament_id} />
        </Suspense>

        {/* Category Details */}
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
              <TeamDetails category={category} />
            </CardContent>
          </Card>
        </Suspense>

        {/* Upload Teams */}
        <Suspense fallback={<FormSkeleton />}>
          <CreateTeamsForm category={category} />
        </Suspense>

        {/* Teams List */}
        <Suspense fallback={<TableSkeleton />}>
          <TeamTable category={category} />
        </Suspense>

        {/* Instructions */}
        <InstructionTeamCard />
      </div>
    </div>
  );
}
