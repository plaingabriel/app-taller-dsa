import { Trash } from "lucide-react";
import { Button } from "../ui/button";

export default function RemoveButton({
  handleRemove,
}: {
  handleRemove: () => void;
}) {
  return (
    <Button variant={"destructive"} size={"icon"} onClick={handleRemove}>
      <Trash />
    </Button>
  );
}
