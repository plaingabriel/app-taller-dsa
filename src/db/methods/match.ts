import { NewMatch } from "@/shared/types";
import { db } from "..";
import { matchTable } from "../schemas";

export async function postMatch(match: NewMatch) {
  return await db.insert(matchTable).values(match);
}
