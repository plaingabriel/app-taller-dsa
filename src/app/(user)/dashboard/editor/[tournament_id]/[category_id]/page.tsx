import { ReturnButton } from "@/components/atomic-components/return-button";
import {
  DisplayCompleteFixture,
  DisplayMatchesGroups,
  DisplayMatchesPlayoffs,
} from "@/components/block-components/display-match";
import { db } from "@/db";
import { redirect } from "next/navigation";

export default async function MatchesPage({
  params,
}: {
  params: Promise<{ tournament_id: string; category_id: string }>;
}) {
  const { tournament_id, category_id } = await params;
  const fixture = await db.query.categoryTable.findFirst({
    columns: { fixture_type: true },
    where: (category, { eq }) => eq(category.id, category_id),
  });

  if (!fixture) {
    redirect(`/dashboard/editor/${tournament_id}`);
  }

  const { fixture_type } = fixture;

  return (
    <div className="pb-8">
      <div className="mx-auto px-4 md:px-8 max-w-2xl py-2">
        <ReturnButton href={`/dashboard/editor/${tournament_id}`} />
        {fixture_type === "groups" && (
          <DisplayMatchesGroups category_id={category_id} />
        )}

        {fixture_type === "playoffs" && (
          <DisplayMatchesPlayoffs category_id={category_id} />
        )}

        {fixture_type === "groups+playoffs" && (
          <DisplayCompleteFixture category_id={category_id} />
        )}
      </div>
    </div>
  );
}
