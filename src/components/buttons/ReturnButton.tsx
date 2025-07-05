import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function ReturnButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Button asChild>
      <Link
        href={href}
        className="flex items-center gap-x-2 bg-secondary-400 hover:bg-secondary-400/80"
      >
        <MoveLeft />
        {children}
      </Link>
    </Button>
  );
}
