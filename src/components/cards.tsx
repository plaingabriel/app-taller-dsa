import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { FixtureType } from "@/lib/definitions";
import { getInfoConfig } from "@/lib/utils";
import { FileSpreadsheet, Info, Trophy } from "lucide-react";

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

export function InstructionTeamCard() {
  return (
    <Card className="bg-yellow-50 border-yellow-200 -py-8">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <FileSpreadsheet className="w-6 h-6 text-yellow-600 mt-1" />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">
              Instrucciones para Carga de Equipos
            </h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <ul className="list-disc ml-4">
                <li>Prepare un archivo CSV con las siguientes columnas:</li>
                <ul>
                  <li>
                    <strong>NOMBRE</strong> - Nombre del equipo
                  </li>
                  <li>
                    <strong>CANTIDAD_JUGADORES</strong> - Número entre 5 y 12
                  </li>
                  <li>
                    <strong>LOGO</strong> - URL del logo del equipo (opcional)
                  </li>
                </ul>
                <li>Cada fila representa un equipo</li>
                <li>
                  Después de subir equipos, gestione los jugadores de cada uno
                </li>
                <li>
                  Una vez que todos los equipos estén completos y validados,
                  podrá generar el fixture
                </li>
                <li>Para Excel: guarde como CSV antes de subir</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface InfoCardProps {
  columnsRequired: string[];
  optionalColumn?: string;
  validPositions?: string[];
}

export function FormatInfoCard({
  columnsRequired,
  optionalColumn,
  validPositions,
}: InfoCardProps) {
  return (
    <Card className="bg-secondary-100 border-secondary-200 -py-1">
      <CardContent className="p-4">
        <div className="flex items-start space-x-2">
          <Info className="w-5 h-5 text-secondary-600 mt-0.5" />
          <div className="text-sm text-secondary-800">
            <p className="font-bold mb-2">Formatos de archivo:</p>
            <p className="mt-2">
              <strong>Tipo de archivo: </strong> CSV
            </p>
            <p className="mt-2">
              <strong>Columnas requeridas:</strong>{" "}
              {columnsRequired.join(", ").toUpperCase()}
            </p>
            {optionalColumn && (
              <p className="mt-1">
                <strong>Columna opcional:</strong> {optionalColumn}
              </p>
            )}
            {validPositions && (
              <p className="mt-1">
                <strong>Posiciones válidas:</strong>{" "}
                {validPositions.join(", ").toUpperCase()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
