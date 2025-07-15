import { getPlayoffMatchesByFixture } from "@/db/methods/match";
import { CategoryFixture, PlayoffMatch } from "@/shared/types";
import PlayoffMatchCard from "../cards/PlayoffMatch";

interface PlayOffsMatchesProps {
  category: CategoryFixture;
  title?: string;
}

export default async function PlayOffsMatches({
  category,
  title = "",
}: PlayOffsMatchesProps) {
  const playoffMatches = (await getPlayoffMatchesByFixture(
    category.fixture.id
  )) as PlayoffMatch[];

  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        {title ? title : category.name}
      </h1>

      {/* Display the matches by phases */}
      <div className="space-y-6 [&>.card-wrapper]:space-y-4">
        {/* Phase 2 - Round of 16 */}
        {playoffMatches.find((match) => match.phase_id === 2) && (
          <div className="card-wrapper">
            <h2 className="text-xl text-white font-semibold text-center py-2 bg-secondary-400 rounded-lg">
              Octavos de Final
            </h2>

            {playoffMatches
              .filter((match) => match.phase_id === 2)
              .map((match) => (
                <PlayoffMatchCard key={match.id} match={match} />
              ))}
          </div>
        )}

        {/* Phase 3 - Quarterfinals */}
        {playoffMatches.find((match) => match.phase_id === 3) && (
          <div className="card-wrapper">
            <h2 className="text-xl text-white font-semibold text-center py-2 bg-secondary-400 rounded-lg">
              Cuartos de Final
            </h2>

            {playoffMatches
              .filter((match) => match.phase_id === 3)
              .map((match) => (
                <PlayoffMatchCard key={match.id} match={match} />
              ))}
          </div>
        )}

        {/* Phase 4 - Semifinals */}
        {playoffMatches.find((match) => match.phase_id === 4) && (
          <div className="card-wrapper">
            <h2 className="text-xl text-white font-semibold text-center py-2 bg-secondary-400 rounded-lg">
              Semifinales
            </h2>
            {playoffMatches
              .filter((match) => match.phase_id === 4)
              .map((match) => (
                <PlayoffMatchCard key={match.id} match={match} />
              ))}
          </div>
        )}

        {/* Phase 5 - Final */}
        <div className="card-wrapper">
          <h2 className="text-xl text-white font-semibold text-center py-2 bg-secondary-400 rounded-lg">
            Final
          </h2>
          <PlayoffMatchCard
            match={
              playoffMatches.find(
                (match) => match.phase_id === 5
              ) as PlayoffMatch
            }
          />
        </div>
      </div>
    </div>
  );
}
