"use client";

import { updateDates } from "@/actions/match-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { FixtureType, MatchTeam } from "@/lib/definitions";
import { getInfoConfig } from "@/lib/utils";
import { FileSpreadsheet, Info, Trophy } from "lucide-react";
import { usePathname } from "next/navigation";
import { FormField } from "./atomic-components/form-field";
import { Input } from "./shadcn-ui/input";
import { Label } from "./shadcn-ui/label";

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

export function MatchCard({ match }: { match: MatchTeam }) {
  const pathname = usePathname();
  const isEditor = pathname.includes("editor");
  const { home_team, away_team } = match;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    try {
      const date = new Date(value).toISOString();
      await updateDates(match.id, date);
    } catch (error) {}
  };

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          {/* Equipo Local */}
          <div className="text-right flex-1">
            <p className={`font-semibold`}>
              {!home_team ? "Equipo Local" : home_team.name}
            </p>
          </div>

          {/* Points*/}
          <div className="mx-6 text-center">
            <div className="text-lg text-muted-foreground">vs</div>
          </div>

          {/* Equipo Visitante */}
          <div className="text-left flex-1">
            <p className={`font-semibold`}>
              {!away_team ? "Equipo Visitante" : away_team.name}
            </p>
          </div>
        </div>

        {isEditor && !match.date && (
          <form>
            <FormField>
              <Label>Fecha: </Label>
              <Input
                type="datetime-local"
                name="date"
                onChange={handleChange}
              />
            </FormField>
          </form>
        )}

        {match.date && (
          <div className="text-center">
            <p className="font-semibold">
              {new Date(match.date).toLocaleString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
