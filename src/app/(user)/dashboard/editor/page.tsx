import { ButtonLink } from "@/components/atomic-components/button-link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { db } from "@/db";
import { Calendar, Clock } from "lucide-react";

export default async function EditorPage() {
  const tournaments = await db.query.tournamentTable.findMany({
    with: { categories: true },
  });

  return (
    <div>
      <div className="mx-auto max-w-4xl">
        <div className="text-center my-8 space-y-2">
          <h1 className="text-3xl font-bold">Gestión de Calendarios</h1>
          <p className="text-neutral-700">
            Selecciona un torneo para gestionar su calendario
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {tournaments.map((tournament) => (
            <Card key={tournament.id} className="mb-4">
              <CardHeader>
                <CardTitle className="flex gap-x-2 ">
                  {tournament.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground text-sm flex items-center">
                  <Calendar className="mr-2 h-4 w-4" /> Creado:{" "}
                  {new Date(tournament.creation_date).toLocaleDateString(
                    "es-ES"
                  )}
                </p>
                <p className="text-muted-foreground text-sm flex items-center">
                  <Clock className="mr-2 h-4 w-4" /> Categorías:{" "}
                  {tournament.categories.length}
                </p>

                <ButtonLink
                  href={`/dashboard/editor/${tournament.id}`}
                  className="w-full"
                >
                  Editar Calendario
                </ButtonLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
