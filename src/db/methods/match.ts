import { NewMatch, NewPlayoffMatch } from "@/shared/types";
import { db } from "..";
import { matchTable, playoffMatchTable } from "../schemas";

export async function postMatch(match: NewMatch) {
  try {
    return await db.insert(matchTable).values(match);
  } catch (error) {
    console.error("Error al insertar el partido:", error);
    throw error;
  }
}

export async function postPlayoffMatches(matches: NewPlayoffMatch[]) {
  try {
    // First, divide the matches by phase_id
    const matchesByPhase: { [phaseId: number]: NewPlayoffMatch[] } = {};

    matches.forEach((match) => {
      if (!matchesByPhase[match.phase_id]) {
        matchesByPhase[match.phase_id] = [];
      }
      matchesByPhase[match.phase_id].push(match);
    });

    // Order phases by id from max to min
    const orderedPhases = Object.keys(matchesByPhase);
    orderedPhases.sort((a, b) => parseInt(b) - parseInt(a));

    const nextMatchesIds: { [phaseId: number]: number[] } = {};

    for (const phaseId of orderedPhases) {
      if (phaseId === "5") {
        // Post the final match and get the id
        const finalMatch = matchesByPhase[phaseId][0];
        const insertedMatch = await db
          .insert(playoffMatchTable)
          .values(finalMatch)
          .returning({ final_id: playoffMatchTable.id });
        nextMatchesIds[phaseId] = [insertedMatch[0].final_id];
        continue;
      }

      if (phaseId === "4") {
        // Post the semifinal matches and get the ids
        // In semifinals, there are two matches, so we need to post them both
        // First, add the id of the final match to the semifinal matches
        const semifinalMatches = matchesByPhase[phaseId];
        const finalMatchId = nextMatchesIds["5"];
        semifinalMatches.forEach((match) => {
          match.next_match = finalMatchId[0];
        });

        const insertedMatches = await db
          .insert(playoffMatchTable)
          .values(semifinalMatches)
          .returning({ id: playoffMatchTable.id });

        // Get the ids of the inserted semifinal matches
        nextMatchesIds[phaseId] = insertedMatches.map((match) => match.id);
        continue;
      }

      if (phaseId === "3") {
        // In quarterfinals, there are four matches, so we need to post them all
        // First, add the id of the semifinal matches to the quarterfinal matches
        // Every two matches has the same next_match
        const quarterfinalMatches = matchesByPhase[phaseId];
        const semifinalMatchIds = nextMatchesIds["4"];

        quarterfinalMatches.forEach((match, index) => {
          match.next_match = semifinalMatchIds[Math.floor(index / 2)];
        });

        const insertedMatches = await db
          .insert(playoffMatchTable)
          .values(quarterfinalMatches)
          .returning({ id: playoffMatchTable.id });

        // Get the ids of the inserted quarterfinal matches
        nextMatchesIds[phaseId] = insertedMatches.map((match) => match.id);
        continue;
      }
      if (phaseId === "2") {
        // In round_16, there are eight matches, so we need to post them all
        // First, add the id of the quarterfinal matches to the round_16 matches
        // Every four matches has the same next_match
        const round16Matches = matchesByPhase[phaseId];
        const quarterfinalMatchIds = nextMatchesIds["3"];

        round16Matches.forEach((match, index) => {
          match.next_match = quarterfinalMatchIds[Math.floor(index / 4)];
        });

        // Post the round_16 matches
        await db.insert(playoffMatchTable).values(round16Matches);
        // There is no need to get the ids of the inserted round_16 matches, so the code ends here
      }
    }
  } catch (error) {
    console.error("Error al insertar el partido:", error);
    throw error;
  }
}
