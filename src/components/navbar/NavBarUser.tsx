import { logout } from "@/actions/auth-actions";
import DangerButton from "@/components/DangerButton";
import NavBarWrapper from "@/components/navbar/NavBarWrapper";
import { getUserByCI } from "@/db/methods/user";
import { getUserCI } from "@/lib/session";

export default async function NavBar() {
  const userCI = await getUserCI();
  const user = await getUserByCI(userCI);

  return (
    <NavBarWrapper>
      <div>
        <span className="text-text-light font-[600] text-[1rem] py-2 px-4 bg-secondary-light rounded-[20px] border-2 border-primary-500">
          {user?.role === "admin" && "SESIÓN:ADMINISTRADOR"}

          {user?.role === "editor" && "SESIÓN:EDITOR"}

          {user?.role === "operator" && "SESIÓN:OPERADOR"}
        </span>
      </div>

      <form action={logout}>
        <DangerButton text="CERRAR SESIÓN" />
      </form>
    </NavBarWrapper>
  );
}
