// This component always is loaded in client components
import { Trash } from "lucide-react";
import { Button } from "../shadcn-ui/button";

export function RemoveButton({ handleRemove }: { handleRemove: () => void }) {
  return (
    <Button variant={"destructive"} size={"icon"} onClick={handleRemove}>
      <Trash />
    </Button>
  );
}
