import { logout } from "@actions/auth-actions";
import { db } from "@db";
import { usersTable } from "@db/schemas";
import { getUserCI } from "@lib/session";
import { eq } from "drizzle-orm";

export default async function DashboardPage() {
  const userCI = await getUserCI();
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.ci, userCI))
    .get();

  return (
    <div>
      <h1>Dashboard para {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
