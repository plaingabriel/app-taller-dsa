import { Info } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function FormatPlayerCard() {
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
              <strong>Columnas requeridas:</strong> NOMBRE, POSICION,
              NUMERO_CAMISETA
            </p>
            <p className="mt-1">
              <strong>Posiciones válidas:</strong> PORTERO, DEFENSA,
              MEDIOCAMPISTA, DELANTERO
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
