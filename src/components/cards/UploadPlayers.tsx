"use client";

import {
  createPlayerAction,
  getPlayersByTeamAction,
} from "@/actions/player-actions";
import { normalizeJugadoresData, readExcelFile } from "@/lib/excel-reader";
import { validateJugadoresData } from "@/lib/tournament-data";
import { NewPlayerExcel, Player, Team } from "@/shared/types";
import {
  AlertCircle,
  CheckCircle,
  Download,
  FileSpreadsheet,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../shadcn-ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn-ui/card";
import FormField from "../shadcn-ui/form-field";
import { Input } from "../shadcn-ui/input";
import { Label } from "../shadcn-ui/label";
import FormatPlayerCard from "./FormatPlayersCard";

export default function UploadPlayers({ team }: { team: Team }) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    errors: string[];
  } | null>(null);
  const [previewData, setPreviewData] = useState<NewPlayerExcel[]>([]);
  const [players, setPlayers] = useState<Omit<Player, "team_id">[]>([]);

  const getPlayers = async () => {
    const players = (await getPlayersByTeamAction(team.id)) as Omit<
      Player,
      "team_id"
    >[];

    setPlayers(players);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setValidationResult(null);
      setPreviewData([]);
      setProcessingError(null);
    }
  };

  const handleValidateFile = async () => {
    if (!file) return;

    setValidationResult(null);
    setPreviewData([]);
    setProcessingError(null);

    try {
      const rawData = await readExcelFile(file);
      const normalizedData = normalizeJugadoresData(rawData);

      if (normalizedData.length === 0) {
        setProcessingError(
          "No se encontraron datos válidos en el archivo. Verifique que tenga las columnas correctas."
        );
        return;
      }

      const validation = validateJugadoresData(normalizedData);
      setValidationResult(validation);
      setPreviewData(normalizedData);
    } catch (error) {
      setProcessingError("Error al procesar el archivo");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setValidationResult(null);
    setPreviewData([]);
    setProcessingError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadPlayers = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button = e.currentTarget;
    button.disabled = true;

    if (!validationResult?.valid || previewData.length === 0) {
      button.disabled = false;
      return;
    }

    if (players.length + previewData.length > team.players_count) {
      alert(
        `"No se pueden agregar ${previewData.length} jugadores. Límite: ${team.players_count}, Existentes: ${players.length}`
      );
      button.disabled = false;
      return;
    }

    await createPlayerAction(team.id, previewData);

    setPreviewData([]);
    setFile(null);
    setValidationResult(null);
    fileInputRef.current!.value = "";
    button.disabled = false;
    window.location.reload();
  };

  const downloadTemplate = () => {
    const csvContent = `NOMBRE, POSICION, NUMERO_CAMISETA
Juan Pérez,PORTERO,1
Carlos López,DEFENSA,2
Miguel Torres,MEDIOCAMPISTA,10
Ana García,DELANTERO,9`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plantilla_jugadores.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subir Jugadores</CardTitle>
      </CardHeader>

      <CardContent className="-mt-2 space-y-6">
        <FormatPlayerCard />

        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={downloadTemplate}>
            <Download className="w-4 h-4 mr-2" />
            Descargar Plantilla CSV
          </Button>
          <span className="text-sm text-gray-700">
            Descarga una plantilla de ejemplo
          </span>
        </div>

        <FormField>
          <Label htmlFor="file">Seleccionar Archivo CSV</Label>
          <Input
            id="file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="mt-1"
            disabled={!!file}
          />
        </FormField>

        {/* SHOW FILE */}
        {file && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-secondary-600" />
              <span className="text-sm text-neutral-900">{file.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                onClick={handleValidateFile}
                className="bg-primary-800 text-primary-100 hover:bg-primary-800/90"
              >
                Procesar Archivo
              </Button>
              <Button size="sm" variant="outline" onClick={handleRemoveFile}>
                Eliminar
              </Button>
            </div>
          </div>
        )}

        {/* VALIDATION RESULT */}
        {processingError && (
          <Card className="border-danger-300 bg-red-100">
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-danger-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-danger-800">
                    Error al procesar archivo
                  </h4>
                  <p className="mt-1 text-sm text-danger-700">
                    {processingError}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {validationResult && (
          <Card
            className={
              validationResult.valid
                ? "border-success-300 bg-success-100"
                : "border-danger-300 bg-danger-100"
            }
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                {validationResult.valid ? (
                  <CheckCircle className="w-5 h-5 text-success-600 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-danger-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <h4
                    className={`font-medium ${
                      validationResult.valid
                        ? "text-success-800"
                        : "text-danger-800"
                    }`}
                  >
                    {validationResult.valid
                      ? "Archivo válido"
                      : "Errores encontrados"}
                  </h4>
                  {!validationResult.valid && (
                    <ul className="mt-2 text-sm text-danger-700 space-y-1">
                      {validationResult.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* PREVIEW DATA */}
        {previewData.length > 0 && validationResult?.valid && (
          <Card>
            <CardHeader>
              <CardTitle className="text-neutral-900">
                Vista Previa de Jugadores ({previewData.length} encontrados)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-neutral-900">
                        Nombre
                      </th>
                      <th className="text-left py-2 text-neutral-900">
                        Posición
                      </th>
                      <th className="text-left py-2 text-neutral-900">
                        Número
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((player, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 font-medium text-neutral-900">
                          {player.name}
                        </td>
                        <td className="py-2 text-neutral-900">
                          {player.position}
                        </td>
                        <td className="py-2 text-neutral-900">
                          {player.number}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-end">
                <Button onClick={(e) => handleUploadPlayers(e)}>
                  <Upload className="w-4 h-4 mr-2" />
                  Confirmar y Subir {previewData.length} Equipos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
