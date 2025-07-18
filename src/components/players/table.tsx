"use client";

import { deletePlayer } from "@/actions/player-actions";
import { Player, TeamPlayers } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import { use } from "react";
import { RemoveSubmitAndReload } from "../atomic-components/remove-submit";
import { DataTable } from "../block-components/data-table";

const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "name",
    header: "Jugador",
  },
  {
    accessorKey: "ci",
    header: "Cédula",
  },
  {
    accessorKey: "position",
    header: "Posición",
  },
  {
    accessorKey: "jersey_number",
    header: "Número de Camisa",
  },
  {
    accessorKey: "age",
    header: "Edad",
  },
  {
    accessorKey: "goals_scored",
    header: "Goles",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const player = row.original;

      const deleteUserWithCI = deletePlayer.bind(null, player.ci);

      return <RemoveSubmitAndReload deleteAction={deleteUserWithCI} />;
    },
  },
];

export function PlayersTable({
  team,
}: {
  team: Promise<TeamPlayers | undefined>;
}) {
  const teamData = use(team);

  if (!teamData) return null;

  const { players } = teamData;

  if (players.length === 0) return null;

  return (
    <div className="space-y-5 mt-8">
      <h3 className="text-xl font-semibold">Jugadores Registrados</h3>
      <DataTable columns={columns} data={players} />
    </div>
  );
}
