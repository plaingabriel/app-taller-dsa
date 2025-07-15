import ReturnButton from "@/components/buttons/ReturnButton";
import DisplayGroupMatches from "@/components/display-matches/DisplayGroupMatches";
import GroupPlayoffsMatches from "@/components/display-matches/GroupPlayoffsMatches";
import PlayOffsMatches from "@/components/display-matches/PlayOffsMatches";
import { getCategoryById } from "@/db/methods/category";

export default async function MatchesPage({
  params,
}: {
  params: Promise<{ tournament_id: string; category_id: string }>;
}) {
  const { tournament_id, category_id } = await params;
  const category = await getCategoryById(parseInt(category_id));

  return (
    <div className="pb-8">
      <div className="mx-auto px-4 md:px-8 max-w-2xl py-2">
        <ReturnButton href={`/dashboard/admin/tournaments/${tournament_id}`} />
        {category.fixture.fixture_type === "groups" && (
          <DisplayGroupMatches category={category} />
        )}

        {category.fixture.fixture_type === "playoffs" && (
          <PlayOffsMatches category={category} />
        )}

        {category.fixture.fixture_type === "groups+playoffs" && (
          <GroupPlayoffsMatches category={category} />
        )}
      </div>
    </div>
  );
}
