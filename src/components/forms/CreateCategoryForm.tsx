"use client";

import { validateCategory } from "@/actions/category-actions";
import {
  calculateGruposInfo,
  getAvailableConfigurations,
  getValidEquiposCounts,
} from "@/lib/utils";
import { CategoryClient, Fixture, FixtureType } from "@/shared/types";
import { useState } from "react";
import FormField from "../atomic-components/form-field";
import SelectFixture from "../atomic-components/select-fixture";
import AddButton from "../buttons/AddButton";
import InfoCardCategoryForm from "../cards/InfoCardCategoryForm";
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

type CreateCategoryFormProps = {
  categoriesClient: CategoryClient[];
  setCategoriesClient: React.Dispatch<React.SetStateAction<CategoryClient[]>>;
  initialCategory: CategoryClient;
};

export default function CreateCategoryForm({
  categoriesClient,
  setCategoriesClient,
  initialCategory,
}: CreateCategoryFormProps) {
  const [currentCategory, setCurrentCategory] = useState(initialCategory);

  const [configurationGroups, setConfigurationGroups] =
    useState<string>("option-1");

  const handleFormatoChange = (format: FixtureType) => {
    const validCounts = getValidEquiposCounts(format);
    const newCantidad = validCounts.includes(currentCategory.team_count)
      ? currentCategory.team_count
      : validCounts[0];

    const fixtureData: Pick<Fixture, "fixture_type" | "team_count"> = {
      fixture_type: format,
      team_count: newCantidad,
    };

    setCurrentCategory({
      ...currentCategory,
      ...fixtureData,
    });
  };

  const addCategory = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const validation = await validateCategory(
      currentCategory,
      categoriesClient
    );

    if (!validation.success) {
      alert(validation.error);
      return;
    }

    if (currentCategory.fixture_type === "groups+playoffs") {
      const fixtureConfig = calculateGruposInfo(
        currentCategory.team_count,
        configurationGroups
      );

      setCategoriesClient([
        ...categoriesClient,
        {
          ...currentCategory,
          ...fixtureConfig,
        },
      ]);
    } else {
      setCategoriesClient([
        ...categoriesClient,
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
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
                    name: e.target.value,
                  })
                }
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
                    teams_per_group: parseInt(value),
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

          <AddButton
            type="submit"
            onClick={(e) => addCategory(e)}
            className="w-full"
            variant={"secondary"}
          >
            Agregar Categoría
          </AddButton>
        </form>
      </CardContent>
    </Card>
  );
}
