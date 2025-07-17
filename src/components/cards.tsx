import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { FixtureType } from "@/lib/definitions";
import { getInfoConfig } from "@/lib/utils";
import { Trophy } from "lucide-react";

export function ComingTournamentCard({ number }: { number: number }) {
  return (
    <Card>
      <div className="text-center py-10">
        <CardHeader>
          <Trophy className="h-16 w-16 text-neutral-100 mx-auto" />
          <CardTitle className="text-xl text-neutral-400">
            Torneo {number}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-xl text-neutral-400">
            PRÓXIMAMENTE
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  );
}

interface InfoCardCategoryFormProps {
  fixtureType: FixtureType;
  team_count: number;
  groups_config: string;
}

export function InfoCardCategoryForm({
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
