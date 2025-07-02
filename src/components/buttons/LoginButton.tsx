import { LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function LoginButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button className="bg-primary-600 hover:bg-primary-500" asChild>
      <Link href="/login">
        <LogIn />
        {children}
      </Link>
    </Button>
  );
}
