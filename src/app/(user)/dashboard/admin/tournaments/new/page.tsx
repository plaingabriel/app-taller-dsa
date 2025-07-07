import CreateTournamentForm from "@/components/forms/CreateTournamentForm";
import { Badge } from "@/components/ui/badge";
import ButtonLink from "@/components/ui/button-link";

export default function NewTournamentPage() {
  return (
    <div className="w-full max-w-3xl mx-auto pt-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Crear Nuevo Torneo</h1>
        <div className="flex items-center gap-4">
          <Badge variant={"secondary"}>Paso 1 de 2</Badge>
          <ButtonLink variant={"outline"} href="/dashboard/admin/tournaments/">
            Cancelar
          </ButtonLink>
        </div>
      </div>
      <div className="mt-10">
        <CreateTournamentForm />
      </div>
    </div>
  );
}
