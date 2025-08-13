"use client";

import { createEquiposFromExcel } from "@/actions/team-action";
import { CategoryTeamsPlayers, NewTeamExcel } from "@/lib/definitions";
import {
  normalizeEquiposData,
  readExcelFile,
  validateEquiposData,
} from "@/lib/excel-reader";
import {
  AlertCircle,
  CheckCircle,
  FileSpreadsheet,
  Upload,
} from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { FormField } from "../atomic-components/form-field";
import { DownloadCSV } from "../block-components/download-csv";
import { FileUploadInput } from "../block-components/file-upload-input";
import { FormatInfoCard } from "../cards";
import { Button } from "../shadcn-ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn-ui/card";
import { Label } from "../shadcn-ui/label";
import { PreviewTable } from "./preview-table";

export function CreateTeamsForm({
  category,
}: {
  category: Promise<CategoryTeamsPlayers | undefined>;
}) {
  const categoryData = use(category);

  const [file, setFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    errors: string[];
  } | null>(null);
  const [previewData, setPreviewData] = useState<NewTeamExcel[]>([]);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProcessingError(null);
    setPreviewData([]);
    setValidationResult(null);
  }, [setFile]);

  if (!categoryData) {
    return null;
  }

  if (
    categoryData.teams.length >= categoryData.team_count ||
    categoryData.has_fixture
  ) {
    return null;
  }

  const csvContent = `NOMBRE,CANTIDAD_JUGADORES,LOGO
Equipo A,11,
Equipo B,10,
Equipo C,12,
Equipo D,9,`;

  const handleValidateFile = async () => {
    if (!file) return;

    setValidationResult(null);
    setPreviewData([]);
    setProcessingError(null);

    try {
      const rawData = await readExcelFile(file);
      const normalizedData = normalizeEquiposData(rawData);

      if (normalizedData.length === 0) {
        setProcessingError(
          "No se encontraron datos válidos en el archivo. Verifique que tenga las columnas correctas."
        );
        return;
      }

      const validation = validateEquiposData(normalizedData);
      setValidationResult(validation);
      setPreviewData(normalizedData);
    } catch (error) {
      console.error(error);
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
      categoryData.teams.length + previewData.length >
      categoryData.team_count
    ) {
      alert(
        `No se pueden agregar ${previewData.length} equipos. Límite: ${categoryData.team_count}, Existentes: ${categoryData.teams.length}`
      );
      button.disabled = false;
      return;
    }

    await createEquiposFromExcel(categoryData, previewData);
    window.location.reload();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subir Nuevos Equipos</CardTitle>
      </CardHeader>

      <CardContent className="-mt-2 space-y-6">
        <FormatInfoCard
          columnsRequired={["NOMBRE", "CANTIDAD_JUGADORES"]}
          optionalColumn=" LOGO (URL del logo del equipo)"
        />

        <DownloadCSV csvContent={csvContent} fileName="plantilla_equipos.csv" />

        <FormField>
          <Label htmlFor="file">Seleccionar Archivo CSV</Label>
          <FileUploadInput
            id="file"
            file={file}
            setFile={setFile}
            ref={fileInputRef}
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
                Vista Previa de Equipos ({previewData.length} encontrados)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PreviewTable teams={previewData} />
              <div className="mt-4 flex justify-end">
                <Button onClick={(e) => handleUploadTeams(e)}>
                  <Upload />
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
