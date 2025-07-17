import { ButtonLink } from "@/components/atomic-components/button-link";
import { ReturnButton } from "@/components/atomic-components/return-button";
import { TableSkeleton } from "@/components/skeletons";
import { UsersTable } from "@/components/users/table";
import { fetchUsers } from "@/lib/data";
import { Plus } from "lucide-react";
import { Suspense } from "react";

export default async function AdminUsersPage() {
  const users = fetchUsers();

  return (
    <div className="pb-16 pt-4">
      <div className="mx-auto px-4 md:px-8 max-w-7xl py-2">
        <ReturnButton href="/dashboard/admin" />

        <div className="flex justify-between items-center my-6">
          <h1 className="text-xl md:text-2xl font-bold">Gestión de Usuarios</h1>
          <ButtonLink href="/dashboard/admin/users/new">
            <Plus />
            <span>Agregar Usuario</span>
          </ButtonLink>
        </div>

        <Suspense fallback={<TableSkeleton />}>
          <UsersTable users={users} />
        </Suspense>
      </div>
    </div>
  );
}
