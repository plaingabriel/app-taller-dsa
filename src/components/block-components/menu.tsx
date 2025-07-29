"use client";

import { logout } from "@/actions/auth-actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import { User } from "@/lib/definitions";
import { CircleUserRound } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { Button } from "../shadcn-ui/button";

interface Props {
  user: User;
}

export function MenuUser({ user }: Props) {
  const pathname = usePathname();
  const role =
    user.role === "admin"
      ? "administrador"
      : user.role === "editor"
      ? "editor"
      : "operador";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <CircleUserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-[999]" align="start">
        <DropdownMenuLabel>{role.toUpperCase()}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => redirect(`/dashboard/${user.role}`)}>
          Panel principal
        </DropdownMenuItem>
        {user.role === "admin" && (
          <DropdownMenuItem
            onClick={() => redirect(`/dashboard/account?prevPage=${pathname}`)}
          >
            Editar credenciales
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={logout}>Cerrar sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
