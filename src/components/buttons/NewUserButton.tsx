import { Plus } from "lucide-react";
import ButtonLink from "../ui/button-link";

export default function NewUserButton() {
  return (
    <ButtonLink href="/dashboard/admin/users/new">
      <Plus />
      Nuevo Usuario
    </ButtonLink>
  );
}
