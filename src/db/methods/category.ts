import {
  Category,
  CategoryClient,
  CategoryFixture,
  Fixture,
} from "@/shared/types";
import { eq } from "drizzle-orm";
import { db } from "..";
import { categoryTable } from "../schemas";
import { getFixtureByCategory, postFixture } from "./fixture";

export async function getCategoriesByTournament(
  tournament_id: number
): Promise<CategoryFixture[]> {
  try {
    const categories = (await db
      .select()
      .from(categoryTable)
      .where(eq(categoryTable.tournament_id, tournament_id))
      .all()) as Category[];

    const categoriesFixtures = await Promise.all(
      categories.map(async (category) => {
        const fixture = await getFixtureByCategory(category.id);

        // Return the category with the fixture and removing the id_tournament property
        const categoryFixture: CategoryFixture = {
          id: category.id,
          name: category.name,
          min_age: category.min_age,
          max_age: category.max_age,
          fixture,
        };

        return categoryFixture;
      })
    );

    return categoriesFixtures;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener categorías");
  }
}

export async function getCategoryById(
  category_id: number
): Promise<CategoryFixture> {
  try {
    const category = (await db
      .select()
      .from(categoryTable)
      .where(eq(categoryTable.id, category_id))
      .get()) as Category;

    const fixture = await getFixtureByCategory(category.id);

    const categoryFixture: CategoryFixture = {
      id: category.id,
      name: category.name,
      min_age: category.min_age,
      max_age: category.max_age,
      fixture,
    };

    return categoryFixture;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener categoría");
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

export async function deleteCategory(id: Category["id"]) {
  try {
    await db.delete(categoryTable).where(eq(categoryTable.id, id));
  } catch (error) {
    console.log(error);
    throw new Error("Error al eliminar categorías");
  }
}
