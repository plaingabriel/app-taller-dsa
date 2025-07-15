import { Category, Fixture } from "@/shared/types";
import { eq } from "drizzle-orm";
import { db } from "..";
import {
  fixture as FixtureTable,
  groupTable,
  matchTable,
  playoffMatchTable,
  teamGroupTable,
} from "../schemas";

export async function getFixtureByCategory(
  category_id: Fixture["category_id"]
): Promise<Omit<Fixture, "category_id">> {
  try {
    const fixture = (await db
      .select()
      .from(FixtureTable)
      .where(eq(FixtureTable.category_id, category_id))
      .get()) as Fixture;

    return {
      id: fixture.id,
      fixture_type: fixture.fixture_type,
      team_count: fixture.team_count,
      group_count: fixture.group_count,
      teams_per_group: fixture.teams_per_group,
      teams_qualified: fixture.teams_qualified,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener fixtures");
  }
}

export async function postFixture(fixture: Omit<Fixture, "id">) {
  try {
    await db.insert(FixtureTable).values(fixture);
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear fixture");
  }
}

export async function deleteFixtureByCategory(id: Category["id"]) {
  try {
    // Delete matches by fixture
    await db.delete(matchTable).where(eq(matchTable.fixture_id, id));
    await db
      .delete(playoffMatchTable)
      .where(eq(playoffMatchTable.fixture_id, id));

    // Delete groups by fixture
    // Get groups by fixture
    const groups = await db
      .select()
      .from(groupTable)
      .where(eq(groupTable.fixture_id, id));

    await Promise.all(
      groups.map(async (group) => {
        // Delete teams by group
        await db
          .delete(teamGroupTable)
          .where(eq(teamGroupTable.group_id, group.id));

        // Delete group
        await db.delete(groupTable).where(eq(groupTable.id, group.id));
      })
    );

    await db.delete(FixtureTable).where(eq(FixtureTable.category_id, id));
  } catch (error) {
    console.log(error);
    throw new Error("Error al eliminar fixture");
  }
}
