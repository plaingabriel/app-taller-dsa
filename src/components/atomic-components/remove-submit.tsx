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

export function RemoveSubmitAndReload({
  deleteAction,
}: {
  deleteAction: () => Promise<void>;
}) {
  const handleDelete = async () => {
    await deleteAction();
    window.location.reload();
  };

  return (
    <Button
      onClick={(e) => {
        const button = e.target as HTMLButtonElement;
        button.disabled = true;
        handleDelete();
      }}
      variant={"destructive"}
      size={"icon"}
      className="cursor-pointer"
    >
      <Trash />
    </Button>
  );
}
