import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schemas";

const dialect = process.env.DB_FILE_NAME !== undefined ? "sqlite" : "turso";
const connection =
  dialect === "sqlite"
    ? {
        url: process.env.DB_FILE_NAME!,
      }
    : {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
      };

export const db = drizzle({
  connection: connection,
  schema: {
    ...schema,
  },
});
