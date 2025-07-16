import { getInfoConfig } from "@/lib/utils";
import { FixtureType } from "@/shared/types";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn-ui/card";

interface InfoCardCategoryFormProps {
  fixtureType: FixtureType;
  team_count: number;
  groups_config: string;
}

export default function InfoCardCategoryForm({
  fixtureType,
  team_count,
  groups_config,
}: InfoCardCategoryFormProps) {
  const text = getInfoConfig(fixtureType, team_count, groups_config);

  return (
    <Card className="bg-secondary-100 border-secondary-400">
      <CardHeader>
        <CardTitle className="text-secondary-800">
          Información de Configuración
        </CardTitle>
      </CardHeader>

      <CardContent className="text-secondary-700">
        <p className="-mt-6">{text}</p>
      </CardContent>
    </Card>
  );
}
