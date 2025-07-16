"use client";

import { createTournament } from "@/actions/tournament-actions";
import ButtonLink from "@/components/atomic-components/button-link";
import AddButton from "@/components/buttons/AddButton";
import ReturnButton from "@/components/buttons/ReturnButton";
import CreateCategoryForm from "@/components/forms/CreateCategoryForm";
import CreateTournamentForm from "@/components/forms/CreateTournamentForm";
import CategoriesList from "@/components/lists/CategoriesList";
import { CategoryClient, TournamentClient } from "@/shared/types";
import { useState } from "react";

const initialCategory: CategoryClient = {
  name: "",
  min_age: 6,
  max_age: 99,
  team_count: 4,
  fixture_type: "groups",
  group_count: 1,
  teams_per_group: 4,
  teams_qualified: 0,
};

export default function NewTournamentPage() {
  const [tournamentName, setTournamentName] = useState("");
  const [categoriesClient, setCategoriesClient] = useState<CategoryClient[]>(
    []
  );

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTournamentName(e.target.value);
  };

  const handleAddTournament = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const tournament: TournamentClient = {
      name: tournamentName,
      categories: categoriesClient,
    };

    const resultError = await createTournament(tournament);

    if (resultError) {
      alert("Por favor rellene todos los campos correctamente");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto md:px-0 px-6 pt-8 pb-20 space-y-3">
      <ReturnButton href="/dashboard/admin/tournaments" />

      <div className="space-y-6">
        <h1 className="font-bold text-3xl">Crear Nuevo Torneo</h1>

        <div className="space-y-6">
          <CreateTournamentForm handleName={handleName} />

          <CreateCategoryForm
            categoriesClient={categoriesClient}
            setCategoriesClient={setCategoriesClient}
            initialCategory={initialCategory}
          />

          {categoriesClient.length > 0 && (
            <CategoriesList
              categoriesClient={categoriesClient}
              setCategoriesClient={setCategoriesClient}
            />
          )}

          <div className="flex justify-end mt-6">
            <div className="flex gap-x-6">
              <ButtonLink
                variant={"outline"}
                href="/dashboard/admin/tournaments/"
              >
                Cancelar
              </ButtonLink>

              <AddButton onClick={(e) => handleAddTournament(e)}>
                Agregar Torneo
              </AddButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
