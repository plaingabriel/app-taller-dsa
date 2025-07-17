"use client";

import { UserClient } from "@/shared/client-types";
import { use } from "react";

export async function UsersTable({ users }: { users: Promise<UserClient[]> }) {
  const allUsers = use(users);

  return <div className="flex flex-col gap-4"></div>;
}
