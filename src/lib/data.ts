// File to store the fetching functions
import { db } from "@/db";
import { CategoryTeamsPlayers, TeamPlayers, User } from "./definitions";
import { getUserSession } from "./session";

// Uncomment for testing
// import { simulateDelay } from "./utils";

export async function fetchUsers(): Promise<User[]> {
  const users = await db.query.usersTable.findMany();
  return users;
}

export async function fetchUser(ci: number): Promise<User | undefined> {
  const user = await db.query.usersTable.findFirst({
    where: (user, { eq }) => eq(user.ci, ci),
  });

  return user;
}

export async function fetchAuthUser(): Promise<User | undefined> {
  const userCI = await getUserSession();
  const user = fetchUser(userCI);

  return user;
}

export async function fetchTournaments() {
  const tournaments = await db.query.tournamentTable.findMany({
    with: { categories: true },
  });

  return tournaments;
}

export async function fetchTournament(id: string) {
  const tournament = await db.query.tournamentTable.findFirst({
    where: (tournament, { eq }) => eq(tournament.id, id),
    with: {
      categories: {
        with: { teams: true },
      },
    },
  });

  return tournament;
}

export async function fetchCategories(tournament_id: string) {
  const categories = await db.query.categoryTable.findMany({
    where: (category, { eq }) => eq(category.tournament_id, tournament_id),
  });

  if (!categories) {
    return [];
  }

  return categories;
}

export async function fetchCategory(id: string) {
  const category = (await db.query.categoryTable.findFirst({
    where: (category, { eq }) => eq(category.id, id),
    with: {
      teams: {
        columns: { group: false },
        with: { players: true },
      },
    },
  })) as CategoryTeamsPlayers | undefined;

  return category;
}

export async function fetchTeams(category_id: string) {
  const teams = await db.query.teamTable.findMany({
    where: (team, { eq }) => eq(team.category_id, category_id),
  });

  return teams;
}

export async function fetchTeam(id: string) {
  const team = (await db.query.teamTable.findFirst({
    where: (team, { eq }) => eq(team.id, id),
    with: { players: true },
  })) as TeamPlayers | undefined;

  return team;
}

export async function fetchPlayers(team_id: string) {
  const players = await db.query.playerTable.findMany({
    where: (player, { eq }) => eq(player.team_id, team_id),
  });

  return players;
}

export async function fetchPlayer(ci: number) {
  const player = await db.query.playerTable.findFirst({
    where: (player, { eq }) => eq(player.ci, ci),
  });

  return player;
}

export async function fetchMatches(category_id: string) {
  const matches = await db.query.matchTable.findMany({
    where: (match, { eq }) => eq(match.category_id, category_id),
  });

  return matches;
}

export async function fetchMatch(id: string) {
  const match = await db.query.matchTable.findFirst({
    where: (match, { eq }) => eq(match.id, id),
  });

  return match;
}
