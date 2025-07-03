"use client";

import { usePathname } from "next/navigation";
import LoginButton from "../buttons/LoginButton";
import NavBarWrapper from "./NavBarWrapper";
import NavLinkLogo from "./NavLinkLogo";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <NavBarWrapper>
      <NavLinkLogo />
      {/* <li>
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
        </li> */}

      {pathname === "/" && <LoginButton>Iniciar sesión</LoginButton>}
    </NavBarWrapper>
  );
}
