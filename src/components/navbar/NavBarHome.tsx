"use client";

import MainLogo from "@/assets/MainLogo";
import NavLink from "@/components/navbar/NavLink";
import { usePathname } from "next/navigation";
import LoginButton from "../buttons/LoginButton";
import NavBarWrapper from "./NavBarWrapper";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <NavBarWrapper>
      <ul className="flex gap-x-[2rem]">
        <li>
          <NavLink href="/">
            <MainLogo className="w-30 h-full fill-primary-800" />
          </NavLink>
        </li>
        <li>
          <NavLink href="/" pathname={pathname === "/"}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink href="#" pathname={pathname === "/history"}>
            Historial
          </NavLink>
        </li>
        <li>
          <NavLink href="/about" pathname={pathname === "/about"}>
            Sobre Nosotros
          </NavLink>
        </li>
        <li>
          <NavLink href="#" pathname={pathname === "/info"}>
            Información
          </NavLink>
        </li>
        <li>
          <NavLink href="https://www.notion.so/Documentacion-Sistema-de-Torneos-20880e65a4c380299c0ce35a1be03681?source=copy_link">
            Documentación
          </NavLink>
        </li>
      </ul>

      <LoginButton>Iniciar sesión</LoginButton>
    </NavBarWrapper>
  );
}
