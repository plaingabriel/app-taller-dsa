export default function Editor() {
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
