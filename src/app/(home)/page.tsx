import ComingTournamentCard from "@/components/cards/ComingTournamentCard";
import React from "react";

export default async function page() {
  return (
    <div className="grow">
      <div className="flex flex-col gap-y-12 max-w-6xl mx-auto">
        <div className="flex justify-center">
          <h1 className="text-5xl text-foreground font-bold max-w-2xl text-center">
            Planifica tu próximo{" "}
            <span className="text-tomato-500">torneo de fútbol</span> con
            GoalFlow
          </h1>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <ComingTournamentCard number={1} />
          <ComingTournamentCard number={2} />
          <ComingTournamentCard number={3} />
        </div>

        <div className="text-center">
          <h3 className="text-neutral-700 text-xl">
            No hay torneos activos en este momento
          </h3>
          <p className="text-neutral-500">
            Los torneos aparecerán aquí una vez hayan sido creados
          </p>
        </div>
      </div>
    </div>
  );
}
