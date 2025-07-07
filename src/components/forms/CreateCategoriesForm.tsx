"use client";

import { TournamentData } from "@/shared/types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type CreateCategoriesFormProps = {
  tournamentData: TournamentData;
  handleStep: (step: number) => void;
};

export default function CreateCategoriesForm({
  handleStep,
  tournamentData,
}: CreateCategoriesFormProps) {
  return (
    <div>
      <Card className="-space-y-5 px-6">
        <h2 className="text-2xl font-semibold">Configuración de Categorías</h2>

        <p className="text-neutral-700">
          Configure cada categoría del torneo individualmente
        </p>
      </Card>

      {Array.from({ length: tournamentData.numberOfCategories }).map(
        (_, index) => (
          <Card key={index} className="mt-4">
            <CardHeader>
              <CardTitle>Categoría {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Categoría</Label>
                <Input id="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input id="description" />
              </div>
            </CardContent>
          </Card>
        )
      )}

      <Button
        variant={"outline"}
        onClick={() => {
          handleStep(1);
        }}
        className="mt-6"
      >
        Anterior
      </Button>
    </div>
  );
}
