import ReturnLink from "@ui/Return";
import Link from "next/link";

export default function UsersPage() {
  return (
    <>
      <ReturnLink href="/dashboard" text="← Volver al Panel Principal" />
      <h1>Modificar Usuarios del Sistema</h1>

      <div className="tournaments-grid">
        <Link href="/dashboard/users/admin" className="tournament-card">
          <div className="tournament-icon">👑</div>
          <h3>Editar Administrador</h3>
          <p>Modificar datos del administrador</p>
        </Link>

        <Link
          href="/dashboard/users/users-management"
          className="tournament-card"
        >
          <div className="tournament-icon">✏️</div>
          <h3>Gestionar Usuarios</h3>
          <p>Crear, editar y eliminar usuarios</p>
        </Link>
      </div>
    </>
  );
}
