"use client";

import AddButton from "@/components/buttons/AddButton";
import CreateCategoryForm from "@/components/forms/CreateCategoryForm";
import CreateTournamentForm from "@/components/forms/CreateTournamentForm";
import ButtonLink from "@/components/ui/button-link";
import { useState } from "react";

export default function NewTournamentPage() {
  const [tournamentName, setTournamentName] = useState("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTournamentName(e.target.value);
  };

  return (
    <div className="w-full max-w-3xl mx-auto md:px-0 px-6 pt-8 pb-20 space-y-6">
      <h1 className="font-bold text-3xl">Crear Nuevo Torneo</h1>

      <div className="space-y-6">
        <CreateTournamentForm handleName={handleName} />

        <CreateCategoryForm />

        <div className="flex justify-end mt-6">
          <div className="flex gap-x-6">
            <ButtonLink
              variant={"outline"}
              href="/dashboard/admin/tournaments/"
            >
              Cancelar
            </ButtonLink>

            <AddButton>Agregar Torneo</AddButton>
          </div>
        </div>
      </div>
    </div>
  );
}
