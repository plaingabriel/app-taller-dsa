import { GoalScorers, TeamsPositions } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";

export const goalScorersColumns: ColumnDef<GoalScorers>[] = [
  {
    accessorKey: "position",
    header: "Pos.",
  },
  {
    accessorKey: "player",
    header: "Jugador",
  },
  {
    accessorKey: "team",
    header: "Equipo",
  },
  {
    accessorKey: "goals",
    header: "Goles",
  },
];

export const teamsPositionsColumns: ColumnDef<TeamsPositions>[] = [
  {
    accessorKey: "position",
    header: "Pos.",
  },
  {
    accessorKey: "team",
    header: "Equipo",
  },
  {
    accessorKey: "wins",
    header: "PG",
  },
  {
    accessorKey: "losses",
    header: "PP",
  },
  {
    accessorKey: "draws",
    header: "PE",
  },
  {
    accessorKey: "points",
    header: "Pts.",
  },
  {
    accessorKey: "goals_for",
    header: "GF",
  },
  {
    accessorKey: "goals_against",
    header: "GC",
  },
  {
    accessorKey: "goal_difference",
    header: "DG",
  },
];
