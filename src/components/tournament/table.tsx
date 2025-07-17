"use client";

import { Category, Tournament } from "@/lib/definitions";
import { use } from "react";
import { DataTable } from "../block-components/data-table";

type TournamentClient = Tournament & {
  categories: Category[];
};

export function TournamentTable({
  tournaments,
}: {
  tournaments: Promise<TournamentClient[]>;
}) {
  const allTournaments = use(tournaments);

  return <div>TournamentTable</div>;
}
