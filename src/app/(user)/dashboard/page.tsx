import { getUserByCI } from "@db/utils/user";
import { getUserCI } from "@lib/session";
import Link from "next/link";

export default async function DashboardPage() {
  const userCI = await getUserCI();
  const user = await getUserByCI(userCI);

  return (
    <>
      {user?.role === "admin" && <AdminPage />}

      {user?.role === "editor" && <EditorPage />}

      {user?.role === "operator" && (
        <h1>Panel de Operador - Gestión de Operaciones</h1>
      )}
    </>
  );
}

export function EditorPage() {
  return (
    <>
      <h1>Panel de Editor - Gestión de Contenido</h1>
      <div className="tournaments-grid">
        <button className="tournament-card">
          <div className="tournament-icon">📝</div>
          <h3>Crear Torneo</h3>
          <p>Diseñar nuevos torneos</p>
        </button>

        <button className="tournament-card">
          <div className="tournament-icon">✏️</div>
          <h3>Editar Torneo</h3>
          <p>Modificar torneos existentes</p>
        </button>

        <button className="tournament-card">
          <div className="tournament-icon">📊</div>
          <h3>Estadísticas</h3>
          <p>Generar reportes</p>
        </button>
      </div>
    </>
  );
}

export function AdminPage() {
  return (
    <>
      <h1>Panel de Administrador - Control Total</h1>
      <div className="tournaments-grid">
        <Link href="/dashboard/users" className="tournament-card">
          <div className="tournament-icon">👥</div>
          <h3>Modificar Usuarios</h3>
          <p>Gestionar operadores y editores</p>
        </Link>

        <button className="tournament-card">
          <div className="tournament-icon">🏆</div>
          <h3>Gestionar Torneos</h3>
          <p>Crear, editar y administrar torneos</p>
        </button>

        <button className="tournament-card">
          <div className="tournament-icon">📊</div>
          <h3>Visualizar Métricas</h3>
          <p>Estadísticas y reportes del sistema</p>
        </button>
      </div>
    </>
  );
}
