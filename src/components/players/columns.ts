import { NewPlayerExcel } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";

export const playerColumns: ColumnDef<NewPlayerExcel>[] = [
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
];
