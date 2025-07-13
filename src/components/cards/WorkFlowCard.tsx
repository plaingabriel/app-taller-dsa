import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function WorkflowCard() {
  const workflowSteps = [
    {
      number: 1,
      title: "Gestionar Equipos:",
      description: "Suba los equipos para cada categoría",
    },
    {
      number: 2,
      title: "Gestionar Jugadores:",
      description: "Complete la información de jugadores de cada equipo",
    },
    {
      number: 3,
      title: "Validar Equipos:",
      description: "Valide que cada equipo esté completo",
    },
    {
      number: 4,
      title: "Generar Fixture:",
      description: "Una vez todos los equipos estén listos, genere el fixture",
    },
    {
      number: 5,
      title: "Asignar Calendario:",
      description: "El editor asignará fechas a los partidos",
    },
  ];

  return (
    <Card className="w-full bg-secondary-100 border-secondary-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-secondary-600" />
          <h2 className="text-lg font-semibold text-secondary-600">
            Flujo de Trabajo
          </h2>
        </div>
      </CardHeader>

      <CardContent>
        <ol className="space-y-1">
          {workflowSteps.map((step) => (
            <li key={step.number} className="flex gap-3">
              <span className="text-secondary-600 font-medium min-w-[1.5rem]">
                {step.number}.
              </span>
              <div>
                <span className="font-semibold text-secondary-600">
                  {step.title}
                </span>
                <span className="text-secondary-700 ml-1">
                  {step.description}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
