"use client";

import { Team } from "@/shared/types";
import { usePathname } from "next/navigation";
import ButtonLink from "../ui/button-link";

export default function ManagePlayerButton({
  team_id,
}: {
  team_id: Team["id"];
}) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <ButtonLink href={`${pathname}/${team_id}`}>Gestionar Jugadores</ButtonLink>
  );
}
