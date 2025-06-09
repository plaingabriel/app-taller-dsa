import { eq } from "drizzle-orm";
import { db } from "..";
import { usersTable } from "../schemas";

export async function getUserByCI(ci: number) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.ci, ci))
    .get();

  return user;
}
