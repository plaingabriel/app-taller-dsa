import AddButtonLink from "@/components/buttons/AddButtonLink";
import ReturnButton from "@/components/buttons/ReturnButton";
import UserList from "@/components/lists/UserList";
import { getUsers } from "@/db/methods/user";

export default async function AdminUsersPage() {
  const users = await getUsers();
  return (
    <div className="pb-16 pt-4">
      <div className="mx-auto px-4 md:px-8 max-w-7xl py-2">
        <ReturnButton href="/dashboard/admin" />
        <div className="flex justify-between items-center my-6">
          <h1 className="text-xl md:text-2xl font-bold">Gestión de Usuarios</h1>
          <AddButtonLink href="/dashboard/admin/users/new">
            Nuevo Usuario
          </AddButtonLink>
        </div>

        <UserList users={users} />
      </div>
    </div>
  );
}
