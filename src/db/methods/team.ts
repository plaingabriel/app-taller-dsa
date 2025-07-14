"use server";

import { Category, NewTeam, Team } from "@/shared/types";
import { eq } from "drizzle-orm";
import { db } from "..";
import { playerTable, teamTable } from "../schemas";
import { categoryHasMatches } from "./category";

export async function getTeamsByCategory(category_id: Category["id"]) {
  try {
    const teams = (await db
      .select()
      .from(teamTable)
      .where(eq(teamTable.category_id, category_id))
      .all()) as Team[];

    return teams;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener equipos");
  }
}

export async function getTeamById(team_id: Team["id"]) {
  try {
    const team = (await db
      .select()
      .from(teamTable)
      .where(eq(teamTable.id, team_id))
      .get()) as Team;

    return team;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener equipo");
  }
}

export async function postTeam(team: NewTeam) {
  try {
    await db.insert(teamTable).values(team);
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear equipo");
  }
}

export async function deleteTeamById(team_id: Team["id"]) {
  try {
    // Delete players
    await db.delete(playerTable).where(eq(playerTable.team_id, team_id));
    // Delete team
    await db.delete(teamTable).where(eq(teamTable.id, team_id));
  } catch (error) {
    console.log(error);
    throw new Error("Error al eliminar equipo");
  }
}

export async function teamHasMatches(team_id: Team["id"]) {
  try {
    // Get team category id
    const { category_id } = (await db
      .select({ category_id: teamTable.category_id })
      .from(teamTable)
      .where(eq(teamTable.id, team_id))
      .get()) as { category_id: number };

    // Get matches by category id
    const hasMatches = await categoryHasMatches(category_id);

    return hasMatches;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener equipos");
  }
}
