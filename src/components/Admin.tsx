import Link from "next/link";

export default function Admin() {
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
