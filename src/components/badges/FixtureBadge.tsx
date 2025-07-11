import { FixtureType } from "@/shared/types";
import { Badge } from "../ui/badge";

export default function FixtureBadge({
  fixtureType,
}: {
  fixtureType: FixtureType;
}) {
  if (fixtureType === "groups") {
    return <Badge className="bg-primary-600">Grupos</Badge>;
  }

  if (fixtureType === "playoffs") {
    return <Badge className="bg-tomato-600">Eliminatorias</Badge>;
  }

  return <Badge className="bg-secondary-500">Grupos + Eliminatorias</Badge>;
}
