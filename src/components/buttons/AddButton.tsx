import { Plus } from "lucide-react";
import ButtonLink from "../ui/button-link";

export default function AddButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <ButtonLink href={href}>
      <Plus />
      {children}
    </ButtonLink>
  );
}
