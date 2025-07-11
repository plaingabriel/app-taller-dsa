import { Category, CategoryClient, Fixture } from "@/shared/types";
import { db } from "..";
import { categoryTable } from "../schemas";
import { postFixture } from "./fixture";

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = (await db
      .select()
      .from(categoryTable)
      .all()) as Category[];

    return categories;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener categorías");
  }
}

export async function postCategory(
  category: CategoryClient,
  tournament_id: number
) {
  try {
    const newCategory: Omit<Category, "id"> = {
      name: category.name,
      min_age: category.min_age,
      max_age: category.max_age,
      tournament_id,
    };

    const result = await db
      .insert(categoryTable)
      .values(newCategory)
      .returning({ insertedId: categoryTable.id });

    const categoryId = result[0].insertedId;
    const newFixture: Omit<Fixture, "id"> = {
      category_id: categoryId,
      fixture_type: category.fixture_type,
      team_count: category.team_count,
      group_count: category.group_count,
      teams_per_group: category.teams_per_group,
      teams_qualified: category.teams_qualified,
    };

    await postFixture(newFixture);
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear categoría");
  }
}
