"use client";

import { Trash } from "lucide-react";
import { useActionState } from "react";
import { Button } from "../shadcn-ui/button";

export function RemoveSubmit({
  deleteAction,
}: {
  deleteAction: () => Promise<void>;
}) {
  const [_, deleteActionState, pending] = useActionState(
    deleteAction,
    undefined
  );

  return (
    <form action={deleteActionState}>
      <Button
        type="submit"
        variant={"destructive"}
        size={"icon"}
        disabled={pending}
        className="cursor-pointer"
      >
        <Trash />
      </Button>
    </form>
  );
}
