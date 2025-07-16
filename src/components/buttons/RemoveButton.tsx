import { Trash } from "lucide-react";
import { Button } from "../shadcn-ui/button";

export default function RemoveButton({
  handleRemove,
}: {
  handleRemove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <Button
      variant={"destructive"}
      size={"icon"}
      onClick={(e) => handleRemove(e)}
    >
      <Trash />
    </Button>
  );
}
