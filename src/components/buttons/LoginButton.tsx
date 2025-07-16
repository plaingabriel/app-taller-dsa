import { LogIn } from "lucide-react";
import ButtonLink from "../shadcn-ui/button-link";

export default function LoginButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ButtonLink href="/login">
      <LogIn />
      {children}
    </ButtonLink>
  );
}
