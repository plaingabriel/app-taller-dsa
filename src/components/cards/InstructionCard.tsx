import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, FileText } from "lucide-react";

export default function InstructionCard() {
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
