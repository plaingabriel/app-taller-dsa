import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("Users", {
  ci: int().primaryKey(),
  name: text().notNull(),
  password: text().notNull(),
  role: text().notNull(),
});

export const tournamentTable = sqliteTable("Tournament", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  status: text().notNull().default("created"),
  creationDate: text().notNull(),
});

export const categoryTable = sqliteTable("Category", {
  id: int().primaryKey({ autoIncrement: true }),
  tournament_id: int()
    .notNull()
    .references(() => tournamentTable.id),
  name: text().notNull(),
  min_age: int().notNull(),
  max_age: int().notNull(),
});

export const phaseTable = sqliteTable("Phase", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

export const fixture = sqliteTable("Fixture", {
  id: int().primaryKey({ autoIncrement: true }),
  category_id: int()
    .notNull()
    .references(() => categoryTable.id),
  fixture_type: text().notNull(),
  team_count: int().notNull(),
  group_count: int().notNull(),
  teams_per_group: int().notNull(),
  teams_qualified: int().notNull(),
});

export const teamTable = sqliteTable("Team", {
  id: int().primaryKey({ autoIncrement: true }),
  category_id: int()
    .notNull()
    .references(() => categoryTable.id),
  name: text().notNull(),
  logo: text(),
  wins: int().notNull().default(0),
  draws: int().notNull().default(0),
  losses: int().notNull().default(0),
  matches_played: int().notNull().default(0),
  phase_id: int()
    .notNull()
    .references(() => phaseTable.id),
  players_count: int().notNull(),
});

export const teamGroupTable = sqliteTable("Team_Group", {
  id: int().primaryKey({ autoIncrement: true }),
  team_id: int()
    .notNull()
    .references(() => teamTable.id),
  group_id: int().references(() => groupTable.id),
  is_qualified: int().notNull().default(0),
});

export const groupTable = sqliteTable("Group", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  fixture_id: int().references(() => fixture.id),
});

export const groupStandingTable = sqliteTable("Group_Standing", {
  id: int().primaryKey({ autoIncrement: true }),
  team_group_id: int()
    .notNull()
    .references(() => teamGroupTable.id),
  points: int().notNull().default(0),
  goals_for: int().notNull().default(0),
  goals_against: int().notNull().default(0),
  goal_difference: int().notNull().default(0),
});

export const playerTable = sqliteTable("Player", {
  id: int().primaryKey({ autoIncrement: true }),
  team_id: int()
    .notNull()
    .references(() => teamTable.id),
  name: text().notNull(),
  position: text().notNull(),
  number: int().notNull(),
  goalScored: int().notNull().default(0),
});

export const matchTable = sqliteTable("Match", {
  id: int().primaryKey({ autoIncrement: true }),
  phase_id: int()
    .notNull()
    .references(() => phaseTable.id),
  fixture_id: int()
    .notNull()
    .references(() => fixture.id),
  home_team: int()
    .notNull()
    .references(() => teamTable.id),
  away_team: int()
    .notNull()
    .references(() => teamTable.id),
  home_score: int().notNull().default(0),
  away_score: int().notNull().default(0),
  date: text().notNull(),
  location: text().notNull(),
  day: text().notNull(),
  match_type: text().notNull(),
});

export const knockoutMatchTable = sqliteTable("Knockout_Match", {
  id: int().primaryKey({ autoIncrement: true }),
  match_id: int()
    .notNull()
    .references(() => matchTable.id),
  home_penalty_score: int().notNull().default(0),
  away_penalty_score: int().notNull().default(0),
});

export const historicalChampionsTable = sqliteTable("Historical_Champions", {
  id: int().primaryKey({ autoIncrement: true }),
  team_id: int()
    .notNull()
    .references(() => teamTable.id),
  tournament_id: int()
    .notNull()
    .references(() => tournamentTable.id),
  category_id: int()
    .notNull()
    .references(() => categoryTable.id),
  date: text().notNull(),
});
