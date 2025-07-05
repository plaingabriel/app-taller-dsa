import { AdminOptionLink } from "@/components/links/AdminOptionLink.";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center my-8 flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-neutral-800">Seleccione una opción para continuar</p>
      </div>

      <div className="mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <AdminOptionLink
            href="/dashboard/admin/users"
            iconType="users"
            title="Gestionar Usuarios"
            description="Gestiona los usuarios del sistema"
          />

          <AdminOptionLink
            href="/admin/tournaments"
            iconType="tournament"
            title="Gestionar Torneos"
            description="Gestiona los torneos del sistema"
          />
        </div>
      </div>
    </div>
  );
}
