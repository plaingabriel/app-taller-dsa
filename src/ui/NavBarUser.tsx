import { logout } from "@actions/auth-actions";
import { getUserByCI } from "../db/utils/user";
import { getUserCI } from "../lib/session";
import DangerButton from "./DangerButton";

export default async function NavBar() {
  const userCI = await getUserCI();
  const user = await getUserByCI(userCI);
  const userRole = user?.role ?? "noLogged";
  const roles = {
    noLogged: "NINGUNO",
    admin: "ADMINISTRADOR",
    editor: "EDITOR",
    operator: "OPERADOR",
  };
  // @ts-ignore
  const role = roles[userRole];

  return (
    <nav className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto">
      <div>
        <span className="text-text-light font-[600] text-[1rem] py-2 px-4 bg-secondary-light rounded-[20px] border-2 border-primary">
          SESIÓN:{role}
        </span>
      </div>

      <form action={logout}>
        <DangerButton text="CERRAR SESIÓN" />
      </form>
    </nav>
  );
}
