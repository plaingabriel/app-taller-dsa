import { Tournament } from "@/shared/types";
import { Badge } from "../ui/badge";

interface StatusBadgeProps {
  status: Tournament["status"];
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "created":
      return <Badge className="bg-neutral-700">Creado</Badge>;

    case "started":
      return <Badge className="bg-success-400">Iniciado</Badge>;

    default:
      return <Badge className="bg-tomato-500">Finalizado</Badge>;
  }
}
