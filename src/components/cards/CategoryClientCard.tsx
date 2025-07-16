import { CategoryClient } from "@/shared/types";
import FixtureBadge from "../badges/FixtureBadge";
import RemoveButton from "../buttons/RemoveButton";
import { Card, CardContent } from "../shadcn-ui/card";

type CategoryClientCardProps = {
  category: CategoryClient;
  setCategoriesClient: React.Dispatch<React.SetStateAction<CategoryClient[]>>;
};

export default function CategoryClientCard({
  category,
  setCategoriesClient,
}: CategoryClientCardProps) {
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.target as HTMLButtonElement;
    button.disabled = true;

    setCategoriesClient((prevCategories) =>
      prevCategories.filter((c) => c.name !== category.name)
    );
  };

  return (
    <Card className="border-neutral-600">
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

        <RemoveButton handleRemove={handleRemove} />
      </CardContent>
    </Card>
  );
}
