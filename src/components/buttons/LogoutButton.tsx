import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function LogoutButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button>
      <LogOut />
      {children}
    </Button>
  );
}
