"use client";

import { getAvailableConfigurations, getValidEquiposCounts } from "@/lib/utils";
import { Category, FixtureType } from "@/shared/types";
import { useState } from "react";
import AddButton from "../buttons/AddButton";
import InfoCardCategoryForm from "../cards/InfoCardCategoryForm";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import FormField from "../ui/form-field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SelectFixture from "../ui/select-fixture";

export default function CreateCategoryForm() {
  const [categories, setCategories] = useState<
    Omit<Category, "id" | "torneo_id">[]
  >([]);

  const [currentCategory, setCurrentCategory] = useState({
    name: "",
    min_age: 6,
    max_age: 99,
    team_count: 4,
    fixture_type: "groups" as FixtureType,
  });

  const [configurationGroups, setConfigurationGroups] =
    useState<string>("option-1");

  const handleFormatoChange = (format: FixtureType) => {
    const validCounts = getValidEquiposCounts(format);
    const newCantidad = validCounts.includes(currentCategory.team_count)
      ? currentCategory.team_count
      : validCounts[0];

    setCurrentCategory({
      ...currentCategory,
      fixture_type: format,
      team_count: newCantidad,
    });
  };

  const validEquiposCounts = getValidEquiposCounts(
    currentCategory.fixture_type
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Categoría</CardTitle>
      </CardHeader>

      <CardContent>
        {/* TODO: Agregar validaciones con un server action */}
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField>
              <Label htmlFor="category-name">Nombre de la Categoría</Label>
              <Input
                id="category-name"
                placeholder="Ej: Sub-15, Juvenil, Senior"
              />
            </FormField>

            <FormField>
              <Label htmlFor="formato">Formato de Competición</Label>
              <Select
                value={currentCategory.fixture_type}
                onValueChange={handleFormatoChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectFixture value="groups">
                    Solo Grupos (Liga)
                  </SelectFixture>
                  <SelectFixture value="playoffs">
                    Solo Eliminatoria
                  </SelectFixture>
                  <SelectFixture value="groups+playoffs">
                    Grupos + Eliminatoria
                  </SelectFixture>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField>
              <Label htmlFor="cantidad-equipos">Cantidad de Equipos</Label>
              <Select
                value={currentCategory.team_count.toString()}
                onValueChange={(value) =>
                  setCurrentCategory({
                    ...currentCategory,
                    team_count: parseInt(value),
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  {validEquiposCounts.map((count) => (
                    <SelectItem key={count} value={count.toString()}>
                      {count} equipos
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField>
              <Label>Rango de Edad</Label>

              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  min="6"
                  max="99"
                  value={currentCategory.min_age}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      min_age: Number.parseInt(e.target.value) || 6,
                    })
                  }
                  placeholder="Min"
                />
                <Input
                  type="number"
                  min="6"
                  max="99"
                  value={currentCategory.max_age}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      max_age: Number.parseInt(e.target.value) || 99,
                    })
                  }
                  placeholder="Max"
                />
              </div>
            </FormField>
          </div>

          {currentCategory.fixture_type === "groups+playoffs" &&
            getAvailableConfigurations(currentCategory.team_count).length >
              0 && (
              <FormField>
                <Label htmlFor="configuration-groups">
                  Configuración de Grupos
                </Label>
                <Select
                  value={configurationGroups}
                  onValueChange={(value) => setConfigurationGroups(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-48">
                    {getAvailableConfigurations(currentCategory.team_count).map(
                      (config) => (
                        <SelectItem key={config.id} value={config.id}>
                          {config.label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </FormField>
            )}

          <InfoCardCategoryForm
            fixtureType={currentCategory.fixture_type}
            team_count={currentCategory.team_count}
            groups_config={configurationGroups}
          />

          <AddButton type="submit" className="w-full" variant={"secondary"}>
            Agregar Categoría
          </AddButton>
        </form>
      </CardContent>
    </Card>
  );
}
