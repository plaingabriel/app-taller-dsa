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

export async function postUser(user: typeof usersTable.$inferInsert) {
  try {
    await db.insert(usersTable).values(user);
  } catch {
    throw new Error("Error al crear usuario");
  }
}

export async function putUser(
  ci: number,
  user: {
    name: string;
    password: string;
    role: string;
  }
) {
  try {
    await db.update(usersTable).set(user).where(eq(usersTable.ci, ci));
  } catch {
    throw new Error("Error al actualizar usuario");
  }
}

export async function removeUser(ci: number) {
  try {
    await db.delete(usersTable).where(eq(usersTable.ci, ci));
  } catch {
    throw new Error("Error al eliminar usuario");
  }
}
