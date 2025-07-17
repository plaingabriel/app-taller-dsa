import { FixtureType, Tournament } from "@/lib/definitions";
import { Badge } from "./shadcn-ui/badge";

export function FixtureBadge({
  fixtureType,
}: {
  fixtureType: FixtureType | "mix";
}) {
  if (fixtureType === "groups") {
    return <Badge className="bg-primary-600">Grupos</Badge>;
  }

  if (fixtureType === "playoffs") {
    return <Badge className="bg-tomato-600">Eliminatorias</Badge>;
  }

  if (fixtureType === "groups+playoffs") {
    return <Badge className="bg-secondary-500">Grupos + Eliminatorias</Badge>;
  }

  return <Badge className="bg-success-600">Mixto</Badge>;
}

export function InfoBadge({ children }: { children: React.ReactNode }) {
  return <Badge className="bg-neutral-800">{children}</Badge>;
}

export function StatusBadge({ status }: { status: Tournament["status"] }) {
  switch (status) {
    case "created":
      return <Badge className="bg-neutral-700">Creado</Badge>;

    case "started":
      return <Badge className="bg-success-400">Iniciado</Badge>;

    default:
      return <Badge className="bg-tomato-500">Finalizado</Badge>;
  }
}
