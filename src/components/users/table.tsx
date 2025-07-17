"use client";

import { UserClient } from "@/shared/client-types";
import { ColumnDef } from "@tanstack/react-table";
import { use } from "react";
import { DataTable } from "../block-components/data-table";

const columns: ColumnDef<UserClient>[] = [
  {
    accessorKey: "ci",
    header: "Cédula",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
];

export async function UsersTable({ users }: { users: Promise<UserClient[]> }) {
  const allUsers = use(users);

  return (
    <div>
      <DataTable columns={columns} data={allUsers} />
    </div>
  );
}

("use client");

import { deleteUser } from "@/actions/user-actions";
import { User } from "@/shared/types";
import { useState } from "react";
import UserCard from "../cards/UserCard";

export default function UserList({ users }: { users: User[] }) {
  const [usersList, setUsersList] = useState(users);

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ci: number
  ) => {
    const button = e.currentTarget;
    button.disabled = true;

    // Confirm the deletion
    const confirmed = confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (!confirmed) {
      return;
    }
    try {
      await deleteUser(ci);
    } catch {
      alert("Error al eliminar usuario");
      button.disabled = false;
    }

    const updatedUsers = usersList.filter((user) => user.ci !== ci);
    setUsersList(updatedUsers);
  };

  return (
    <div className="flex flex-col gap-4">
      {usersList.map((user) => (
        <UserCard key={user.ci} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
}
