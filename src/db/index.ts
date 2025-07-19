import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schemas";

export const db = drizzle({
  connection: {
    url:
      process.env.NODE_ENV === "development"
        ? "file:db/local.db"
        : process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  schema: {
    ...schema,
  },
});
