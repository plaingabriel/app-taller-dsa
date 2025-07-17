"use client";

import { deleteUser } from "@/actions/user-actions";
import { User } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import { LockKeyhole } from "lucide-react";
import { use } from "react";
import { RemoveSubmit } from "../atomic-components/remove-submit";
import { DataTable } from "../block-components/data-table";

const columns: ColumnDef<User>[] = [
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
    cell: ({ row }) => {
      const role = row.getValue("role") as User["role"];
      const roles = {
        admin: "Administrador",
        editor: "Editor",
        operator: "Operador",
      };

      return <span className="capitalize">{roles[role]}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      if (user.role === "admin")
        return (
          <div className="size-9 flex items-center justify-center bg-primary-600 text-white rounded-sm">
            <LockKeyhole />
          </div>
        );

      const deleteUserWithCI = deleteUser.bind(null, user.ci);

      return <RemoveSubmit deleteAction={deleteUserWithCI} />;
    },
  },
];

export function UsersTable({ users }: { users: Promise<User[]> }) {
  const allUsers = use(users);

  return <DataTable columns={columns} data={allUsers} />;
}
