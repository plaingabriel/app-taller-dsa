import React from "react";

export default async function page() {
  return (
    <>
      <h1>Torneos Disponibles</h1>

      <div className="tournaments-grid">
        <button className="tournament-card">
          <div className="tournament-icon">🏆</div>
          <h3>Torneo 1</h3>
          <p>Próximamente</p>
        </button>

        <button className="tournament-card">
          <div className="tournament-icon">🥇</div>
          <h3>Torneo 2</h3>
          <p>Próximamente</p>
        </button>

        <button className="tournament-card">
          <div className="tournament-icon">🎯</div>
          <h3>Torneo 3</h3>
          <p>Próximamente</p>
        </button>
      </div>
    </>
  );
}
