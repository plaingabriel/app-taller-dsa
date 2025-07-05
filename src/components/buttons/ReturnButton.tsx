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
        className="flex items-center gap-x-2 bg-transparent hover:bg-secondary-200/80 text-secondary-600 border-2 border-secondary-600"
      >
        <MoveLeft />
        {children}
      </Link>
    </Button>
  );
}
