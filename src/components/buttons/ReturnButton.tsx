import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../shadcn-ui/button";

export default function ReturnButton({ href }: { href: string }) {
  return (
    <Button asChild variant={"secondary"} size={"icon"}>
      <Link href={href}>
        <MoveLeft />
      </Link>
    </Button>
  );
}
