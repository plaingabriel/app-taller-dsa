"use client";

import { deleteTeam } from "@/actions/team-action";
import { Button } from "@/components/shadcn-ui/button";
import { Team } from "@/shared/types";
import { Trash } from "lucide-react";
import { useActionState } from "react";

export default function DeleteTeamForm({ teamId }: { teamId: Team["id"] }) {
  const deleteTeamWithId = deleteTeam.bind(null, teamId);
  const [_, deleteTeamAction, pending] = useActionState(
    deleteTeamWithId,
    undefined
  );

  return (
    <form action={deleteTeamAction}>
      <Button
        variant={"destructive"}
        size={"icon"}
        type="submit"
        disabled={pending}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </form>
  );
}
