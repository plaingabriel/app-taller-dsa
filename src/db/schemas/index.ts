import {
  FixtureType,
  Phase,
  Player,
  Tournament,
  User,
} from "@/lib/definitions";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("Users", {
  ci: int().primaryKey(),
  name: text().notNull(),
  password: text().notNull(),
  role: text().notNull().$type<User["role"]>(),
});

export const tournamentTable = sqliteTable("Tournament", {
  id: text().primaryKey(),
  name: text().notNull(),
  status: text().notNull().$type<Tournament["status"]>().default("created"),
  creation_date: text().notNull(),
});

export const categoryTable = sqliteTable("Category", {
  id: text().primaryKey(),
  tournament_id: text()
    .notNull()
    .references(() => tournamentTable.id),
  name: text().notNull(),
  min_age: int().notNull(),
  max_age: int().notNull(),
  fixture_type: text().$type<FixtureType>().notNull(),
  team_count: int().notNull(),
  group_count: int().notNull(),
  teams_per_group: int().notNull(),
  teams_qualified: int().notNull(),
  has_fixture: int({
    mode: "boolean",
  })
    .notNull()
    .default(false),
});

export const groupTable = sqliteTable("Group", {
  id: text().primaryKey(),
  name: text().notNull(),
  category_id: text().references(() => categoryTable.id),
});

export const teamTable = sqliteTable("Team", {
  id: text().primaryKey(),
  category_id: text()
    .notNull()
    .references(() => categoryTable.id),
  name: text().notNull(),
  players_count: int().notNull(),
  wins: int().notNull().default(0),
  draws: int().notNull().default(0),
  losses: int().notNull().default(0),
  logo: text(),
  has_validated_players: int({
    mode: "boolean",
  })
    .notNull()
    .default(false),
  goals_count: int().notNull().default(0),
  goals_against: int().notNull().default(0),
  points: int().notNull().default(0),
  group: text().references(() => groupTable.id),
  phase: text().$type<Phase>().default("groups"),
});

export const playerTable = sqliteTable("Player", {
  ci: int().primaryKey(),
  team_id: text()
    .notNull()
    .references(() => teamTable.id),
  name: text().notNull(),
  jersey_number: int().notNull(),
  position: text().$type<Player["position"]>().notNull(),
  goals_scored: int().notNull().default(0),
  age: int().notNull(),
});

export const matchTable = sqliteTable("Match", {
  id: text().primaryKey(),
  category_id: text()
    .notNull()
    .references(() => categoryTable.id),
  home_team: text().default(""),
  away_team: text().default(""),
  home_score: int().notNull().default(0),
  away_score: int().notNull().default(0),
  date: text().notNull().default(new Date().toISOString()),
});

export const groupMatchTable = sqliteTable("Group_Match", {
  id: text()
    .primaryKey()
    .references(() => matchTable.id),
  group_id: text()
    .notNull()
    .references(() => groupTable.id),
});

export const playoffMatch = sqliteTable("Playoff_Match", {
  id: text()
    .primaryKey()
    .references(() => matchTable.id),
  phase: text().$type<Phase>().notNull(),
  home_penalty_score: int().notNull().default(0),
  away_penalty_score: int().notNull().default(0),
  next_match: text().references(() => matchTable.id),
});

export const historicalChampionsTable = sqliteTable("Historical_Champions", {
  id: text().primaryKey(),
  team_id: text()
    .notNull()
    .references(() => teamTable.id),
  tournament_id: text()
    .notNull()
    .references(() => tournamentTable.id),
  category_id: text()
    .notNull()
    .references(() => categoryTable.id),
  date: text().notNull(),
});
