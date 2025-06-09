import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("Users", {
  ci: int().primaryKey(),
  name: text().notNull(),
  password: text().notNull(),
  role: text().notNull(),
});
