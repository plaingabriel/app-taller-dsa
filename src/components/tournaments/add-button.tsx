"use client";

import { Plus } from "lucide-react";
import { use } from "react";
import { ButtonLink } from "../atomic-components/button-link";

export function AddButton<T>({ array }: { array: Promise<T[]> }) {
  const arrayData = use(array);

  if (arrayData.length < 3) {
    return (
      <ButtonLink href="/dashboard/admin/tournaments/new">
        <Plus />
        <span>Nuevo Torneo</span>
      </ButtonLink>
    );
  }
}
