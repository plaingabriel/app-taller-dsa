import { Fixture } from "@/shared/types";
import { db } from "..";
import { fixture as FixtureTable } from "../schemas";

export async function postFixture(fixture: Omit<Fixture, "id">) {
  try {
    await db.insert(FixtureTable).values(fixture);
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear fixture");
  }
}
