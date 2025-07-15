import { getGroupMatchesByFixture } from "@/db/methods/match";
import { CategoryFixture, Match } from "@/shared/types";
import MatchCard from "../cards/MatchCard";

interface DisplayMatchesProps {
  category: CategoryFixture;
}

export default async function DisplayMatchesGroups({
  category,
}: DisplayMatchesProps) {
  const groupMatches = (await getGroupMatchesByFixture(
    category.fixture.id
  )) as Match[];

  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">{category.name}</h1>

      <div className="space-y-4">
        {groupMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
