import Admin from "@/components/Admin";
import Editor from "@/components/Editor";
import { getUserByCI } from "@/db/methods/user";
import { getUserCI } from "@lib/session";

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
