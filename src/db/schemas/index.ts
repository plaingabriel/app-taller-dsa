import {
  FixtureType,
  Phase,
  Player,
  Tournament,
  User,
} from "@/lib/definitions";
import { relations } from "drizzle-orm";
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

export const tournamentRelations = relations(tournamentTable, ({ many }) => ({
  categories: many(categoryTable),
}));

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

export const categoryRelations = relations(categoryTable, ({ one, many }) => ({
  tournament: one(tournamentTable, {
    fields: [categoryTable.tournament_id],
    references: [tournamentTable.id],
  }),
  teams: many(teamTable),
  matches: many(matchTable),
  groups: many(groupTable),
}));

export const groupTable = sqliteTable("Group", {
  id: text().primaryKey(),
  name: text().notNull(),
  category_id: text().references(() => categoryTable.id),
});

export const groupRelations = relations(groupTable, ({ one, many }) => ({
  category: one(categoryTable, {
    fields: [groupTable.category_id],
    references: [categoryTable.id],
  }),
  teams: many(teamTable),
  matches: many(matchTable),
}));

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

export const teamRelations = relations(teamTable, ({ one, many }) => ({
  category: one(categoryTable, {
    fields: [teamTable.category_id],
    references: [categoryTable.id],
  }),
  players: many(playerTable),
  group: one(groupTable, {
    fields: [teamTable.group],
    references: [groupTable.id],
  }),
  home_team: many(matchTable, {
    relationName: "home_team",
  }),
  away_team: many(matchTable, {
    relationName: "away_team",
  }),
}));

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

export const playerRelations = relations(playerTable, ({ one }) => ({
  team: one(teamTable, {
    fields: [playerTable.team_id],
    references: [teamTable.id],
  }),
}));

export const matchTable = sqliteTable("Match", {
  id: text().primaryKey(),
  category_id: text()
    .notNull()
    .references(() => categoryTable.id),
  group: text()
    .notNull()
    .references(() => groupTable.id),
  home_team: text().references(() => teamTable.id),
  away_team: text().references(() => teamTable.id),
  home_score: int().notNull().default(0),
  away_score: int().notNull().default(0),
  date: text().notNull(),
  phase: text().$type<Phase>().notNull(),
  penalties_home_team: int().notNull().default(0),
  penalties_away_team: int().notNull().default(0),
  next_match: text().default(""),
  day: int().notNull(),
  status: text().$type<"pending" | "finished">().default("pending"),
  penalty_win: text().$type<"home" | "away" | "none">().default("none"),
});

export const matchRelations = relations(matchTable, ({ one, many }) => ({
  category: one(categoryTable, {
    fields: [matchTable.category_id],
    references: [categoryTable.id],
  }),
  group: one(groupTable, {
    fields: [matchTable.group],
    references: [groupTable.id],
  }),
  home_team: one(teamTable, {
    fields: [matchTable.home_team],
    references: [teamTable.id],
    relationName: "home_team",
  }),
  away_team: one(teamTable, {
    fields: [matchTable.away_team],
    references: [teamTable.id],
    relationName: "away_team",
  }),
}));

export const historicalChampionsTable = sqliteTable("Historical_Champions", {
  id: text().primaryKey(),
  tournament_name: text().notNull(),
  category_name: text().notNull(),
  champion_team_name: text().notNull(),
});
