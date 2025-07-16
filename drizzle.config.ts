import { defineConfig } from "drizzle-kit";

const dialect = process.env.DB_FILE_NAME !== undefined ? "sqlite" : "turso";
const dbCredentials =
  dialect === "sqlite"
    ? { url: process.env.DB_FILE_NAME! }
    : {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
      };

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schemas/index.ts",
  dialect: dialect,
  dbCredentials: dbCredentials,
});
