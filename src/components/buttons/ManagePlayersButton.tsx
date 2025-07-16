"use client";

import { Team } from "@/shared/types";
import { usePathname } from "next/navigation";
import ButtonLink from "../shadcn-ui/button-link";

export default function ManagePlayerButton({
  team_id,
  hasMatches,
}: {
  team_id: Team["id"];
  hasMatches: boolean;
}) {
  const pathname = usePathname();

  return (
    <ButtonLink href={`${pathname}/${team_id}`}>
      {hasMatches ? "Ver jugadores" : "Gestionar jugadores"}
    </ButtonLink>
  );
}
