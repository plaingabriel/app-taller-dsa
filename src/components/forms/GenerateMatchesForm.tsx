"use client";

import { createMatchesAction } from "@/actions/match-actions";
import { CategoryFixture, Team } from "@/shared/types";
import { Shuffle } from "lucide-react";
import { useActionState } from "react";
import { Button } from "../shadcn-ui/button";

export default function GenerateMatchesForm({
  teamsCompleted,
  teams,
  category,
}: {
  teamsCompleted: boolean;
  teams: Team[];
  category: CategoryFixture;
}) {
  const createMatchesWithCategoryTeams = createMatchesAction.bind(
    null,
    category,
    teams
  );
  const [_, createMatchesActionState, pending] = useActionState(
    createMatchesWithCategoryTeams,
    undefined
  );

  return (
    <form action={createMatchesActionState}>
      <Button
        type="submit"
        variant="outline"
        className="w-full"
        disabled={!teamsCompleted || pending}
      >
        <Shuffle className="mr-2 h-4 w-4" />
        <span>Generar Partidos</span>
      </Button>
    </form>
  );
}
