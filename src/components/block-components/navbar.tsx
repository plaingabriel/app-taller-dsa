"use client";

import { User } from "@/lib/definitions";
import { LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
import { ButtonLink } from "../atomic-components/button-link";
import { NavbarWrapper, NavLogo } from "../navbar";
import { MenuUser } from "./menu";

export function NavHome() {
  const pathname = usePathname();

  return (
    <NavbarWrapper>
      <NavLogo />

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

      {pathname === "/" && (
        <ButtonLink href="/login">
          <LogIn />
          Iniciar Sesión
        </ButtonLink>
      )}
    </NavbarWrapper>
  );
}

export function NavUser({ user }: { user: User }) {
  return (
    <NavbarWrapper>
      <NavLogo />

      <MenuUser user={user} />
    </NavbarWrapper>
  );
}
