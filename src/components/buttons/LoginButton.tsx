import { LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function LoginButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button asChild>
      <Link href="/login">
        <LogIn />
        {children}
      </Link>
    </Button>
  );
}
