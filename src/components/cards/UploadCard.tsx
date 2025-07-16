"use client";

import { createEquiposFromExcel } from "@/actions/team-action";
import { getTeamsByCategory } from "@/db/methods/team";
import { normalizeEquiposData, readExcelFile } from "@/lib/excel-reader";
import { validateEquiposData } from "@/lib/tournament-data";
import { CategoryFixture, NewTeamExcel, Team } from "@/shared/types";
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
import FormatInfoCard from "./FormatInfoCard";

export default function UploadCard({
  category,
}: {
  category: CategoryFixture;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    errors: string[];
  } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewData, setPreviewData] = useState<NewTeamExcel[]>([]);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [equiposExistentes, setEquiposExistentes] = useState<Team[]>([]);

  const getTeams = async (category_id: number) => {
    const teams = await getTeamsByCategory(category_id);
    setEquiposExistentes(teams);
  };

  const downloadTemplate = () => {
    const csvContent = `NOMBRE,CANTIDAD_JUGADORES,LOGO
Equipo A,11,https://ejemplo.com/logo1.png
Equipo B,10,https://ejemplo.com/logo2.png
Equipo C,12,
Equipo D,9,https://ejemplo.com/logo4.png`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plantilla_equipos.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleValidateFile = async () => {
    if (!file) return;

    setValidationResult(null);
    setPreviewData([]);
    setProcessingError(null);
    setUploading(true);

    try {
      const rawData = await readExcelFile(file);
      const normalizedData = normalizeEquiposData(rawData);

      if (normalizedData.length === 0) {
        setProcessingError(
          "No se encontraron datos válidos en el archivo. Verifique que tenga las columnas correctas."
        );

        setUploading(false);
        return;
      }

      const validation = validateEquiposData(normalizedData);
      setValidationResult(validation);
      setPreviewData(normalizedData);
    } catch (error) {
      setProcessingError("Error al procesar el archivo");
    } finally {
      setUploading(false);
    }
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

  const handleRemoveFile = () => {
    setFile(null);
    setValidationResult(null);
    setPreviewData([]);
    setProcessingError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadTeams = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button = e.currentTarget;
    button.disabled = true;

    if (!validationResult?.valid || previewData.length === 0) {
      button.disabled = false;
      return;
    }

    if (
      equiposExistentes.length + previewData.length >
      category.fixture.team_count
    ) {
      alert(
        `No se pueden agregar ${previewData.length} equipos. Límite: ${category.fixture.team_count}, Existentes: ${equiposExistentes.length}`
      );
      button.disabled = false;
      return;
    }

    await createEquiposFromExcel(category, previewData);

    setPreviewData([]);
    setFile(null);
    setValidationResult(null);
    fileInputRef.current!.value = "";
    button.disabled = false;
    window.location.reload();
  };

  useEffect(() => {
    getTeams(category.id);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subir Nuevos Equipos</CardTitle>
      </CardHeader>

      <CardContent className="-mt-2 space-y-6">
        <FormatInfoCard />

        {/* UPLOAD FILE SECTION */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={downloadTemplate}>
            <Download className="w-4 h-4 mr-2" />
            Descargar Plantilla CSV
          </Button>
          <span className="text-sm text-neutral-700">
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
                disabled={uploading}
                className="bg-primary-800 text-primary-100 hover:bg-primary-800/90"
              >
                Procesar Archivo
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRemoveFile}
                disabled={uploading}
              >
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
                Vista Previa de Equipos ({previewData.length} encontrados)
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
                        Cantidad Jugadores
                      </th>
                      <th className="text-left py-2 text-neutral-900">Logo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((equipo, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 font-medium text-neutral-900">
                          {equipo.name}
                        </td>
                        <td className="py-2 text-neutral-900">
                          {equipo.number_players}
                        </td>
                        <td className="py-2 text-neutral-900">
                          {equipo.logo || "Sin logo"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-end">
                <Button onClick={(e) => handleUploadTeams(e)}>
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
