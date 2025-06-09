"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto">
      <ul className="flex gap-x-[2rem]">
        <li>
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "active" : ""}`}
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className={`nav-link ${pathname === "/history" ? "active" : ""}`}
          >
            Historial
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`nav-link ${pathname === "/about" ? "active" : ""}`}
          >
            Sobre Nosotros
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className={`nav-link ${pathname === "/info" ? "active" : ""}`}
          >
            Información
          </Link>
        </li>
        <li>
          <Link
            href="https://www.notion.so/Documentacion-Sistema-de-Torneos-20880e65a4c380299c0ce35a1be03681?source=copy_link"
            className="nav-link"
          >
            Documentación
          </Link>
        </li>
      </ul>

      <Link href="/login" className="login-btn">
        Iniciar sesión
      </Link>
    </nav>
  );
}
