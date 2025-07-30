import {
  CategoryTeamsMatchesGroups,
  GroupTeams,
  MatchTeams,
  Phase,
} from "@/lib/definitions";
import { getPhaseName } from "@/lib/utils";
import { CardPlayoff } from "./card-playoff";
import { TeamsPositionsTable } from "./tables";

export function TeamsPositions({
  category,
}: {
  category: CategoryTeamsMatchesGroups;
}) {
  const { groups } = category;
  return (
    <div>
      {category.fixture_type === "groups" && (
        <div className="space-y-6">
          <h3 className="text-xl text-center font-bold">Fase de Grupos</h3>
          <Groups groups={groups} />
        </div>
      )}

      {category.fixture_type === "playoffs" && (
        <div className="space-y-6">
          <h3 className="text-xl text-center font-bold">
            Diagrama Eliminatorio
          </h3>

          <PlayOffDiagram matches={category.matches} />
        </div>
      )}

      {category.fixture_type === "groups+playoffs" && (
        <div className="space-y-6">
          <div className="space-y-6">
            <h3 className="text-xl text-center font-bold">Fase de Grupos</h3>
            <Groups groups={groups} />
          </div>

          <div className="space-y-6">
            <h3 className="text-xl text-center font-bold">Fase Eliminatoria</h3>
            <PlayOffDiagram matches={category.matches} />
          </div>
        </div>
      )}
    </div>
  );
}

function Groups({ groups }: { groups: GroupTeams[] }) {
  const groupsNoPlayoff = groups.filter(
    (group) => group.name !== "Fase Eliminatorias"
  );

  return (
    <div>
      {groupsNoPlayoff.map((group) => (
        <div className="space-y-4" key={group.id}>
          <h3 className="text-xl text-center font-bold">{group.name}</h3>
          <TeamsPositionsTable teams={group.teams} />
        </div>
      ))}
    </div>
  );
}

function PlayOffDiagram({ matches }: { matches: MatchTeams[] }) {
  const matchesInPlayoffs = matches.filter((match) => match.phase !== "groups");

  const someTeamIsNull = matchesInPlayoffs.some((match) => !match.home_team);
  if (someTeamIsNull) return null;

  // Segment matches by phase
  const matchesByPhase = matchesInPlayoffs.reduce((acc, match) => {
    if (!match.phase) return acc;
    if (!acc[match.phase]) acc[match.phase] = [match];
    else acc[match.phase].push(match);
    return acc;
  }, {} as Record<Phase, MatchTeams[]>);

  return (
    <div className="space-y-6">
      {
        // Render a CardPlayoff component for each phase in the playoffs
        Object.keys(matchesByPhase).map((phase) => (
          // Map the match inside each phase
          <div key={phase} className="space-y-4">
            <h4 className="text-lg font-bold text-center text-tomato-500">
              {getPhaseName(phase as Phase)}
            </h4>

            <div className="flex justify-center gap-x-6">
              {matchesByPhase[phase as Phase].map((match) => {
                return <CardPlayoff match={match} key={match.id} />;
              })}
            </div>
          </div>
        ))
      }
    </div>
  );
}
