import { db } from "@/db";
import { MatchTeam, Phase } from "@/lib/definitions";
import { MatchCard } from "../cards";

interface MatchCardProps {
  category_id: string;
}

export async function DisplayMatchesGroups({ category_id }: MatchCardProps) {
  const category_name = await db.query.categoryTable.findFirst({
    columns: { name: true },
    where: (category, { eq }) => eq(category.id, category_id),
  });

  const matches = (await db.query.matchTable.findMany({
    columns: { home_team: false, away_team: false },
    where: (match, { eq }) => eq(match.category_id, category_id),
    with: { home_team: true, away_team: true },
  })) as unknown as MatchTeam[];

  if (!matches || matches.length === 0 || !category_name) return null;

  // Separate matches by day
  const matchesByDay = matches.reduce((acc, match) => {
    if (!acc[match.day]) acc[match.day] = [match];
    else acc[match.day].push(match);
    return acc;
  }, {} as { [day: number]: MatchTeam[] });

  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        {category_name.name}
      </h1>

      <div className="space-y-4">
        {
          // Display the matches by day
          Object.entries(matchesByDay).map(([day, matches]) => (
            <div key={day} className="space-y-4">
              <h2 className="text-xl text-white font-semibold text-center py-2 bg-secondary-400 rounded-lg">
                Jornada {day}
              </h2>

              <div className="space-y-4">
                {matches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

const getPhaseName = (phase: Phase) => {
  switch (phase) {
    case "final":
      return "Final";
    case "semifinal":
      return "Semifinales";
    case "quarterfinals":
      return "Cuartos de Final";
    case "round_16":
      return "Octavos de Final";
    case "groups":
      return "Grupos";
  }
};

const phases = ["groups", "round_16", "quarterfinals", "semifinal", "final"];

export async function DisplayMatchesPlayoffs({ category_id }: MatchCardProps) {
  const category_name = await db.query.categoryTable.findFirst({
    columns: { name: true },
    where: (category, { eq }) => eq(category.id, category_id),
  });

  const matches = (await db.query.matchTable.findMany({
    columns: { home_team: false, away_team: false },
    where: (match, { eq }) => eq(match.category_id, category_id),
    with: { home_team: true, away_team: true },
  })) as unknown as MatchTeam[];

  if (!matches || matches.length === 0 || !category_name) return null;

  // Separate matches by phase
  const matchesByPhase = matches.reduce((acc, match) => {
    if (!match.phase) return acc;
    if (!acc[match.phase]) acc[match.phase] = [match];
    else acc[match.phase].push(match);
    return acc;
  }, {} as { [phase: string]: MatchTeam[] });

  // Sort matches by phase (Starting from the first phase that exists up to the last phase)
  const sortedMatchesByPhase = phases.reduce((acc, phase) => {
    if (matchesByPhase[phase]) acc[phase] = matchesByPhase[phase];
    return acc;
  }, {} as { [phase: string]: MatchTeam[] });

  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        {category_name.name}
      </h1>

      <div className="space-y-4">
        {
          // Display the matches by phase
          Object.entries(sortedMatchesByPhase).map(([phase, matches]) => (
            <div key={phase} className="space-y-4">
              <h2 className="text-xl text-white font-semibold text-center py-2 bg-secondary-400 rounded-lg">
                {getPhaseName(phase as Phase)}
              </h2>

              <div className="space-y-4">
                {matches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export async function DisplayCompleteFixture({ category_id }: MatchCardProps) {
  const category_name = await db.query.categoryTable.findFirst({
    columns: { name: true },
    where: (category, { eq }) => eq(category.id, category_id),
  });

  const matches = (await db.query.matchTable.findMany({
    columns: { home_team: false, away_team: false },
    where: (match, { eq }) => eq(match.category_id, category_id),
    with: { home_team: true, away_team: true },
  })) as unknown as MatchTeam[];

  if (!matches || matches.length === 0 || !category_name) return null;

  // Matches in groups phase
  const matchesInGroups = matches.filter((match) => match.phase === "groups");
  // Matches in playoffs phase
  const matchesInPlayoffs = matches.filter((match) => match.phase !== "groups");

  // Separate group matches by day
  const groupMatchesByDay = matchesInGroups.reduce((acc, match) => {
    if (!acc[match.day]) acc[match.day] = [match];
    else acc[match.day].push(match);
    return acc;
  }, {} as { [day: number]: MatchTeam[] });

  // Separate playoff matches by phase
  const playoffMatchesByPhase = matchesInPlayoffs.reduce((acc, match) => {
    if (!match.phase) return acc;
    if (!acc[match.phase]) acc[match.phase] = [match];
    else acc[match.phase].push(match);
    return acc;
  }, {} as { [phase: string]: MatchTeam[] });

  // Sort matches by phase (Starting from the first phase that exists up to the last phase)
  const sortedPlayoffMatchesByPhase = phases.reduce((acc, phase) => {
    if (playoffMatchesByPhase[phase]) acc[phase] = playoffMatchesByPhase[phase];
    return acc;
  }, {} as { [phase: string]: MatchTeam[] });

  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        {category_name.name}
      </h1>

      <div className="space-y-4">
        {/* Display group matches by day */}
        {Object.entries(groupMatchesByDay).map(([day, matches]) => (
          <div key={day} className="space-y-4">
            <h2 className="text-xl text-white font-semibold text-center py-2 bg-secondary-400 rounded-lg">
              Jornada {day}
            </h2>
            <div className="space-y-4">
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))}

        {/* Display playoff matches by phase */}
        {Object.entries(sortedPlayoffMatchesByPhase).map(([phase, matches]) => (
          <div key={phase} className="space-y-4">
            <h2 className="text-xl text-white font-semibold text-center py-2 bg-secondary-400 rounded-lg">
              {getPhaseName(phase as Phase)}
            </h2>
            <div className="space-y-4">
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
