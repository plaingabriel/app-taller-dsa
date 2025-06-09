import { getUserByCI } from "@db/utils/user";
import { getUserCI } from "@lib/session";
import Admin from "@ui/Admin";
import Editor from "@ui/Editor";

export default async function DashboardPage() {
  const userCI = await getUserCI();
  const user = await getUserByCI(userCI);

  return (
    <>
      {user?.role === "admin" && <Admin />}

      {user?.role === "editor" && <Editor />}

      {user?.role === "operator" && (
        <h1>Panel de Operador - Gestión de Operaciones</h1>
      )}
    </>
  );
}
