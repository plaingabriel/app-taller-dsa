import { NewCategory } from "@/lib/definitions";
import { RemoveButton } from "../atomic-components/remove-button";
import { FixtureBadge } from "../badges";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn-ui/card";

export function CategoriesTable({
  categories,
  setCategories,
}: {
  categories: NewCategory[];
  setCategories: React.Dispatch<React.SetStateAction<NewCategory[]>>;
}) {
  const handleRemove = (category: NewCategory) => {
    setCategories(categories.filter((c) => c.name !== category.name));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorías Agregadas ({categories.length})</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {categories.map((category, index) => (
          <Card className="border-neutral-600" key={index}>
            <CardContent className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="flex gap-x-4 items-center">
                  <h3 className="font-semibold">{category.name}</h3>
                  <FixtureBadge fixtureType={category.fixture_type} />
                </div>

                <div className="flex flex-col text-neutral-700">
                  <span>
                    Edad: {category.min_age} - {category.max_age}
                  </span>
                  <span>Equipos: {category.team_count}</span>
                  {category.fixture_type === "groups+playoffs" && (
                    <span>
                      Grupos: {category.group_count} grupos de{" "}
                      {category.teams_per_group} equipos, avanzan{" "}
                      {category.teams_qualified} por grupo
                    </span>
                  )}
                </div>
              </div>

              <RemoveButton handleRemove={() => handleRemove(category)} />
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
