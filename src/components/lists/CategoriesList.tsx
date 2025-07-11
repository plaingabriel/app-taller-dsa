import { CategoryClient } from "@/shared/types";
import CategoryClientCard from "../cards/CategoryClientCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function CategoriesList({
  categoriesClient,
  setCategoriesClient,
}: {
  categoriesClient: CategoryClient[];
  setCategoriesClient: React.Dispatch<React.SetStateAction<CategoryClient[]>>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorías Agregadas ({categoriesClient.length})</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {categoriesClient.map((category) => (
          <CategoryClientCard
            key={category.name}
            category={category}
            setCategoriesClient={setCategoriesClient}
          />
        ))}
      </CardContent>
    </Card>
  );
}
