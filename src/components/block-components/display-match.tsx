import { db } from "@/db";
import { MatchTeam, MatchTeamsPlayers, Phase, User } from "@/lib/definitions";
import { MatchCard } from "../cards";

interface MatchCardProps {
  category_id: string;
  isUploadingCalendar?: boolean;
  isUploadingResults?: boolean;
  isEditorCorrection?: boolean;
}

export async function DisplayMatchesGroups({
  category_id,
  isUploadingCalendar = false,
  isUploadingResults = false,
  isEditorCorrection = false,
}: MatchCardProps) {
  const category_name = await db.query.categoryTable.findFirst({
    columns: { name: true },
    where: (category, { eq }) => eq(category.id, category_id),
  });

  const matches = (await db.query.matchTable.findMany({
    columns: { home_team: false, away_team: false },
    where: (match, { eq }) => eq(match.category_id, category_id),
    with: {
      home_team_complete: {
        with: { players: true },
      },
      away_team_complete: {
        with: { players: true },
      },
    },
  })) as MatchTeamsPlayers[];

  console.log(matches);

  if (!matches || matches.length === 0 || !category_name) return null;

  // Separate matches by day
  const matchesByDay = matches.reduce((acc, match) => {
    if (!acc[match.day]) acc[match.day] = [match];
    else acc[match.day].push(match);
    return acc;
  }, {} as { [day: number]: MatchTeamsPlayers[] });

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
                  <MatchCard
                    key={match.id}
                    match={match}
                    isEditorCorrection={isEditorCorrection}
                    isUploadingCalendar={isUploadingCalendar}
                    isUploadingResults={isUploadingResults}
                  />
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

export async function DisplayMatchesPlayoffs({
  category_id,
  isUploadingCalendar = false,
  isUploadingResults = false,
  isEditorCorrection = false,
}: MatchCardProps) {
  const category_name = await db.query.categoryTable.findFirst({
    columns: { name: true },
    where: (category, { eq }) => eq(category.id, category_id),
  });

  const matches = (await db.query.matchTable.findMany({
    columns: { home_team: false, away_team: false },
    where: (match, { eq }) => eq(match.category_id, category_id),
    with: {
      home_team_complete: {
        with: { players: true },
      },
      away_team_complete: {
        with: { players: true },
      },
    },
  })) as MatchTeamsPlayers[];

  if (!matches || matches.length === 0 || !category_name) return null;

  // Separate matches by phase
  const matchesByPhase = matches.reduce((acc, match) => {
    if (!match.phase) return acc;
    if (!acc[match.phase]) acc[match.phase] = [match];
    else acc[match.phase].push(match);
    return acc;
  }, {} as { [phase: string]: MatchTeamsPlayers[] });

  // Sort matches by phase (Starting from the first phase that exists up to the last phase)
  const sortedMatchesByPhase = phases.reduce((acc, phase) => {
    if (matchesByPhase[phase]) acc[phase] = matchesByPhase[phase];
    return acc;
  }, {} as { [phase: string]: MatchTeamsPlayers[] });

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
                  <MatchCard
                    key={match.id}
                    match={match}
                    isEditorCorrection={isEditorCorrection}
                    isUploadingCalendar={isUploadingCalendar}
                    isUploadingResults={isUploadingResults}
                  />
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export async function DisplayCompleteFixture({
  category_id,
  isUploadingCalendar = false,
  isUploadingResults = false,
  isEditorCorrection = false,
}: MatchCardProps) {
  const category_name = await db.query.categoryTable.findFirst({
    columns: { name: true },
    where: (category, { eq }) => eq(category.id, category_id),
  });

  const matches = (await db.query.matchTable.findMany({
    columns: { home_team: false, away_team: false },
    where: (match, { eq }) => eq(match.category_id, category_id),
    with: {
      home_team_complete: {
        with: { players: true },
      },
      away_team_complete: {
        with: { players: true },
      },
    },
  })) as MatchTeamsPlayers[];

  if (!matches || matches.length === 0 || !category_name) return null;

  // Matches in groups phase
  const matchesInGroups = matches.filter((match) => match.phase === "groups");
  // Matches in playoffs phase
  const matchesInPlayoffs = matches.filter((match) => match.phase !== "groups");

  // Separate playoff matches by phase
  const playoffMatchesByPhase = matchesInPlayoffs.reduce((acc, match) => {
    if (!match.phase) return acc;
    if (!acc[match.phase]) acc[match.phase] = [match];
    else acc[match.phase].push(match);
    return acc;
  }, {} as { [phase: string]: MatchTeamsPlayers[] });

  // Sort matches by phase (Starting from the first phase that exists up to the last phase)
  const sortedPlayoffMatchesByPhase = phases.reduce((acc, phase) => {
    if (playoffMatchesByPhase[phase]) acc[phase] = playoffMatchesByPhase[phase];
    return acc;
  }, {} as { [phase: string]: MatchTeamsPlayers[] });

  // Get groups
  const groups = await db.query.groupTable.findMany({
    where: (group, { eq }) => eq(group.category_id, category_id),
  });

  // Sort matches in groups by day
  const matchesByDay = matchesInGroups.reduce((acc, match) => {
    if (!acc[match.day]) acc[match.day] = [match];
    else acc[match.day].push(match);
    return acc;
  }, {} as { [day: number]: MatchTeamsPlayers[] });

  // Sort matches in every day by group
  const sortedMatchesByDay = Object.entries(matchesByDay).reduce(
    (acc, [day, matches]) => {
      const sortedMatches = groups.reduce((acc, group) => {
        const matchesInGroup = matches.filter(
          (match) => match.group === group.id
        );
        if (matchesInGroup.length > 0) acc[group.name] = matchesInGroup;
        return acc;
      }, {} as { [group: string]: MatchTeamsPlayers[] });
      acc[+day] = sortedMatches;
      return acc;
    },
    {} as { [day: number]: { [group: string]: MatchTeamsPlayers[] } }
  );

  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        {category_name.name}
      </h1>

      <div className="space-y-4">
        {/* Display matches by day */}
        {Object.entries(sortedMatchesByDay).map(([day, matchesByGroup]) => (
          <div key={day} className="space-y-4">
            <h2 className="text-xl text-white font-semibold text-center py-2 bg-secondary-400 rounded-lg">
              Jornada {day}
            </h2>
            <div className="space-y-4">
              {Object.entries(matchesByGroup).map(([group, matches]) => (
                <div key={group} className="space-y-4">
                  <h3 className="text-lg text-secondary-800 font-semibold text-center py-2 bg-secondary-100 border border-secondary-800 rounded-lg">
                    {group}
                  </h3>
                  <div className="space-y-4">
                    {matches.map((match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                        isEditorCorrection={isEditorCorrection}
                        isUploadingCalendar={isUploadingCalendar}
                        isUploadingResults={isUploadingResults}
                      />
                    ))}
                  </div>
                </div>
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
                <MatchCard
                  key={match.id}
                  match={match}
                  isUploadingResults={isUploadingResults}
                  isUploadingCalendar={isUploadingCalendar}
                  isEditorCorrection={isEditorCorrection}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
