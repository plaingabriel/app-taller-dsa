"use client";

import CreateCategoriesForm from "@/components/forms/CreateCategoriesForm";
import CreateTournamentForm from "@/components/forms/CreateTournamentForm";
import { Badge } from "@/components/ui/badge";
import ButtonLink from "@/components/ui/button-link";
import { useState } from "react";

export default function NewTournamentPage() {
  const [step, setStep] = useState(1);
  const [tournamentData, setTournamentData] = useState({
    name: "",
    numberOfCategories: 0,
  });

  const handleStep = (step: number) => {
    setStep(step);
  };

  return (
    <div className="w-full max-w-3xl mx-auto pt-8 pb-20">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Crear Nuevo Torneo</h1>
        <div className="flex items-center gap-4">
          <Badge variant={"secondary"}>Paso {step} de 2</Badge>
          <ButtonLink variant={"outline"} href="/dashboard/admin/tournaments/">
            Cancelar
          </ButtonLink>
        </div>
      </div>
      <div className="mt-10">
        {step === 1 && (
          <CreateTournamentForm
            {...{ handleStep, setTournamentData, tournamentData }}
          />
        )}

        {step === 2 && (
          <CreateCategoriesForm {...{ handleStep, tournamentData }} />
        )}
      </div>
    </div>
  );
}
