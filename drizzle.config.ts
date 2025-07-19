import { defineConfig, type Config } from "drizzle-kit";

const config: {
  dialect: Config["dialect"];
  dbCredentials: {
    url: string;
    authToken?: string;
  };
} =
  process.env.NODE_ENV === "production"
    ? {
        dialect: "turso" as Config["dialect"],
        dbCredentials: {
          url: process.env.TURSO_DATABASE_URL!,
          authToken: process.env.TURSO_AUTH_TOKEN!,
        },
      }
    : {
        dialect: "sqlite",
        dbCredentials: {
          url: "file:db/local.db",
        },
      };

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schemas/index.ts",
  dialect: config.dialect,
  dbCredentials: config.dbCredentials,
});
