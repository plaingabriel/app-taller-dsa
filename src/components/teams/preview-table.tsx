import { NewTeamExcel } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../block-components/data-table";

const columns: ColumnDef<NewTeamExcel>[] = [
  {
    accessorKey: "name",
    header: "Equipos",
  },
  {
    accessorKey: "players_count",
    header: "Jugadores",
  },
  {
    accessorKey: "logo",
    header: "Logo",
  },
];

export function PreviewTable({ teams }: { teams: NewTeamExcel[] }) {
  return <DataTable columns={columns} data={teams} />;
}
