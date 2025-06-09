import Link from "next/link";

export default function UsersPage() {
  return (
    <>
      <Link
        href="/dashboard"
        className="text-primary font-medium py-2 px-4 rounded-[8px] mb-8 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white hover:-translate-x-1.5"
      >
        ← Volver al Panel Principal
      </Link>
      <h1>Modificar Usuarios del Sistema</h1>

      <div className="tournaments-grid">
        <button className="tournament-card">
          <div className="tournament-icon">👑</div>
          <h3>Editar Administrador</h3>
          <p>Modificar datos del administrador</p>
        </button>

        <button className="tournament-card">
          <div className="tournament-icon">✏️</div>
          <h3>Gestionar Editores</h3>
          <p>Crear, editar y eliminar editores</p>
        </button>

        <button className="tournament-card">
          <div className="tournament-icon">⚙️</div>
          <h3>Gestionar Operadores</h3>
          <p>Crear, editar y eliminar operadores</p>
        </button>
      </div>
    </>
  );
}
