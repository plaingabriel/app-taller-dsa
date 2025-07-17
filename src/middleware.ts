// import { fetchUser } from "@/lib/data";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { User } from "./lib/definitions";

const protectedPrefix = "/dashboard";
const publicRoutes = ["/login"];
const commonRoute = "/dashboard/account"; // Ruta común para todos los roles

export default async function pene(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = path.startsWith(protectedPrefix);
  const isPublicRoute = publicRoutes.includes(path);
  const isCommonRoute = path.startsWith(commonRoute); // Verifica rutas bajo /dashboard/account

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // 1. Redirigir si no hay sesión en ruta protegida
  if (isProtectedRoute && !session?.userCI) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 2. Redirigir si hay sesión en ruta pública
  if (isPublicRoute && session) {
    return redirectByRole(session.role, req.nextUrl);
  }

  // 3. Verificar permisos de rol en rutas protegidas (excepto ruta común)
  if (isProtectedRoute && session && !isCommonRoute) {
    const rolePath = `/dashboard/${session.role}`;
    const isCorrectRolePath = path.startsWith(rolePath);
    const isBaseDashboard = path === "/dashboard";

    // Redirigir si:
    // - Está en /dashboard sin rol específico
    // - Intenta acceder a ruta de otro rol
    if (isBaseDashboard || !isCorrectRolePath) {
      return NextResponse.redirect(new URL(rolePath, req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Función auxiliar para redireccionar según rol
async function redirectByRole(role: User["role"], baseUrl: URL) {
  switch (role) {
    case "admin":
      return NextResponse.redirect(new URL("/dashboard/admin", baseUrl));
    case "editor":
      return NextResponse.redirect(new URL("/dashboard/editor", baseUrl));
    case "operator":
      return NextResponse.redirect(new URL("/dashboard/operator", baseUrl));
    default:
      return NextResponse.redirect(new URL("/login", baseUrl));
  }
}
