import { Plus } from "lucide-react";
import ButtonLink from "../atomic-components/button-link";

export default function AddButtonLink({
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
