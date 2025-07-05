import ReturnButton from "@/components/buttons/ReturnButton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div className="mx-auto px-4 md:px-8 max-w-7xl py-2">
      <ReturnButton href="/dashboard/admin">Volver</ReturnButton>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <Button>
          {" "}
          <Plus />
          Crear Usuario
        </Button>
      </div>
    </div>
  );
}
