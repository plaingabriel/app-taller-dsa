"use client";

import { createTournament } from "@/actions/tournament-actions";
import { ButtonLink } from "@/components/atomic-components/button-link";
import { ReturnButton } from "@/components/atomic-components/return-button";
import { CreateCategoriesForm } from "@/components/categories/create-form";
import { CategoriesTable } from "@/components/categories/table";
import { Button } from "@/components/shadcn-ui/button";
import { CreateTournamentNameForm } from "@/components/tournaments/create-name";
import { NewCategory } from "@/lib/definitions";
import { Plus } from "lucide-react";
import { useState } from "react";

const initialCategory: NewCategory = {
  name: "",
  min_age: 6,
  max_age: 99,
  team_count: 4,
  fixture_type: "groups",
  group_count: 1,
  teams_per_group: 4,
  teams_qualified: 0,
};

export default function CreateTournamentPage() {
  const [tournamentName, setTournamentName] = useState("");
  const [categories, setCategories] = useState<NewCategory[]>([]);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTournamentName(e.target.value);
  };

  const handleSubmit = async () => {
    const button = document.getElementById(
      "create-tournament-button"
    ) as HTMLButtonElement;
    button.disabled = true;

    const result = await createTournament({ name: tournamentName, categories });

    if (result.errors) {
      alert("Por favor, ingrese los datos correctamente.");
      button.disabled = false;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto md:px-0 px-6 pt-8 pb-20 space-y-3">
      <ReturnButton href="/dashboard/admin/tournaments" />

      <div className="space-y-6">
        <h1 className="font-bold text-3xl">Crear Nuevo Torneo</h1>

        <div className="space-y-6">
          <CreateTournamentNameForm handleName={handleName} />

          <CreateCategoriesForm
            categories={categories}
            setCategories={setCategories}
            initialCategory={initialCategory}
          />

          {categories.length > 0 && (
            <CategoriesTable
              categories={categories}
              setCategories={setCategories}
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

              <Button
                id="create-tournament-button"
                disabled={
                  tournamentName.length === 0 || categories.length === 0
                }
                onClick={handleSubmit}
              >
                <Plus />
                <span>Crear Torneo</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
