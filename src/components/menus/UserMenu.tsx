"use client";

import { logout } from "@/actions/auth-actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserClient } from "@/shared/types";
import { CircleUserRound } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  user: UserClient;
}

export default function UserMenu({ user }: Props) {
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
        <DropdownMenuItem onClick={logout}>Cerrar sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
