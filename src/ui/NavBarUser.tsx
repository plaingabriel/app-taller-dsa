import { logout } from "@actions/auth-actions";
import { getUserByCI } from "../db/utils/user";
import { getUserCI } from "../lib/session";
import DangerButton from "./DangerButton";

export default async function NavBar() {
  const userCI = await getUserCI();
  const user = await getUserByCI(userCI);

  return (
    <nav className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto">
      <div>
        <span className="text-text-light font-[600] text-[1rem] py-2 px-4 bg-secondary-light rounded-[20px] border-2 border-primary">
          {user?.role === "admin" && "SESIÓN:ADMINISTRADOR"}

          {user?.role === "editor" && "SESIÓN:EDITOR"}

          {user?.role === "operator" && "SESIÓN:OPERADOR"}
        </span>
      </div>

      <form action={logout}>
        <DangerButton text="CERRAR SESIÓN" />
      </form>
    </nav>
  );
}
