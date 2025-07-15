import { getGroupsByFixture, getMatchesByGroup } from "@/db/methods/match";
import { CategoryFixture, Match } from "@/shared/types";
import MatchCard from "../cards/MatchCard";
import PlayOffsMatches from "./PlayOffsMatches";

export default async function GroupPlayoffsMatches({
  category,
}: {
  category: CategoryFixture;
}) {
  const groups = await getGroupsByFixture(category.fixture.id);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center">Fase de Grupos</h2>

      <div className="w-full p-6 space-y-6">
        {groups.map(async (group) => {
          const matches = (await getMatchesByGroup(group.id)) as Match[];

          return (
            <div key={group.id} className="space-y-6">
              <h2 className="text-xl text-white font-semibold text-center py-2 bg-secondary-400 rounded-lg">
                {group.name}
              </h2>

              <div className="space-y-4">
                {matches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <PlayOffsMatches category={category} title="Eliminatorias" />
    </div>
  );
}
