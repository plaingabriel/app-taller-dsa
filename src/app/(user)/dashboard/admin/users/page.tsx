import ReturnButton from "@/components/buttons/ReturnButton";
import UserCard from "@/components/cards/UserCard";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/db/methods/user";
import { Plus } from "lucide-react";

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div>
      <div className="mx-auto px-4 md:px-8 max-w-7xl py-2">
        <ReturnButton href="/dashboard/admin" />
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
          <Button>
            {" "}
            <Plus />
            Crear Usuario
          </Button>
        </div>

        <div>
          {users.map((user) => (
            <UserCard key={user.ci} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
