import { User } from "@/shared/types";
import { eq } from "drizzle-orm";
import { db } from "..";
import { usersTable } from "../schemas";

export async function getUsers(): Promise<User[]> {
  try {
    const users = (await db.select().from(usersTable).all()) as User[];

    // Sort users by role
    users.sort((a, b) => {
      const roles = ["admin", "operator", "editor"];
      const roleA = roles.indexOf(a.role);
      const roleB = roles.indexOf(b.role);
      return roleA - roleB;
    });

    return users;
  } catch (error) {
    throw new Error("Error al obtener usuarios");
  }
}

export async function getUserByCI(ci: number): Promise<User> {
  try {
    const user = (await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.ci, ci))
      .get()) as User | undefined;

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  } catch (error) {
    throw new Error("Error al obtener usuario");
  }
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
