import { ReturnButton } from "@/components/atomic-components/return-button";
import { StatusBadge } from "@/components/badges";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { db } from "@/db";
import { Users } from "lucide-react";
import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ tournament_id: string }>;
}) {
  const { tournament_id } = await params;
  const tournament = await db.query.tournamentTable.findFirst({
    where: (tournament, { eq }) => eq(tournament.id, tournament_id),
    with: { categories: true },
  });

  if (!tournament) {
    redirect("/");
  }

  return (
    <div>
      <ReturnButton href="/" />

      <div className="flex items-center my-6 gap-x-6">
        <h1 className="text-3xl font-bold">{tournament.name}</h1>
        <StatusBadge status={tournament.status} />
      </div>

      <div>
        {/* Category Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6" />
              <CardTitle>Categorías</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4"></CardContent>
        </Card>
      </div>
    </div>
  );
}
