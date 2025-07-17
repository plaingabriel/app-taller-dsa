import { FixtureType, NewCategory } from "@/lib/definitions";
import {
  calculateGruposInfo,
  getAvailableConfigurations,
  getValidEquiposCounts,
} from "@/lib/utils";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { FormField } from "../atomic-components/form-field";
import { SelectFixture } from "../atomic-components/select-fixture";
import { InfoCardCategoryForm } from "../cards";
import { Button } from "../shadcn-ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn-ui/card";
import { Input } from "../shadcn-ui/input";
import { Label } from "../shadcn-ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn-ui/select";

interface ObjectWithState<T> {
  categories: T[];
  setCategories: React.Dispatch<React.SetStateAction<T[]>>;
  initialCategory: T;
}

type CategoryProps = ObjectWithState<NewCategory>;

type Props = {
  [property in keyof CategoryProps]: CategoryProps[property];
};

export function CreateCategoriesForm({
  categories,
  setCategories,
  initialCategory,
}: Props) {
  const [currentCategory, setCurrentCategory] =
    useState<NewCategory>(initialCategory);

  const [configurationGroups, setConfigurationGroups] =
    useState<string>("option-1");

  const handleFormatoChange = (format: FixtureType) => {
    const validCounts = getValidEquiposCounts(format);
    const newCantidad = validCounts.includes(currentCategory.team_count)
      ? currentCategory.team_count
      : validCounts[0];

    const fixtureData: Pick<NewCategory, "fixture_type" | "team_count"> = {
      fixture_type: format,
      team_count: newCantidad,
    };

    setCurrentCategory({
      ...currentCategory,
      ...fixtureData,
    });
  };

  const addCategory = () => {
    if (currentCategory.fixture_type === "groups+playoffs") {
      const fixtureConfig = calculateGruposInfo(
        currentCategory.team_count,
        configurationGroups
      );

      setCategories([
        ...categories,
        {
          ...currentCategory,
          ...fixtureConfig,
        },
      ]);
    } else {
      setCategories([
        ...categories,
        {
          ...currentCategory,
          group_count: 1,
          teams_per_group: currentCategory.team_count,
          teams_qualified: 0,
        },
      ]);
    }

    setCurrentCategory(initialCategory);
    setConfigurationGroups("option-1");
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
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField>
              <Label htmlFor="category-name">Nombre de la Categoría</Label>
              <Input
                id="category-name"
                placeholder="Ej: Sub-15, Juvenil, Senior"
                value={currentCategory.name}
                onChange={(e) => {
                  setCurrentCategory({
                    ...currentCategory,
                    name: e.target.value,
                  });
                }}
                required
              />
            </FormField>

            <FormField>
              <Label htmlFor="formato">Formato de Competición</Label>
              <Select
                value={currentCategory.fixture_type}
                onValueChange={handleFormatoChange}
                required
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
                    teams_per_group: parseInt(value),
                  })
                }
                required
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
                  required
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
                  required
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
                  required
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

          <Button
            type="submit"
            onClick={addCategory}
            className="w-full"
            variant={"secondary"}
            disabled={!currentCategory.name}
          >
            <Plus />
            <span>Agregar Categoría</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
