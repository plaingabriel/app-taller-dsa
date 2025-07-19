"use client";

import { deletePlayer } from "@/actions/player-actions";
import { updateTeamValidation } from "@/actions/team-action";
import { Player, TeamPlayers } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import { Shield } from "lucide-react";
import { use } from "react";
import { RemoveSubmitAndReload } from "../atomic-components/remove-submit";
import { DataTable } from "../block-components/data-table";
import { Button } from "../shadcn-ui/button";

const columnsWithDelete: ColumnDef<Player>[] = [
  {
    accessorKey: "name",
    header: "Jugador",
  },
  {
    accessorKey: "ci",
    header: "Cédula",
  },
  {
    accessorKey: "position",
    header: "Posición",
  },
  {
    accessorKey: "jersey_number",
    header: "Número de Camisa",
  },
  {
    accessorKey: "age",
    header: "Edad",
  },
  {
    accessorKey: "goals_scored",
    header: "Goles",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const player = row.original;

      const deleteUserWithCI = deletePlayer.bind(null, player.ci);

      return <RemoveSubmitAndReload deleteAction={deleteUserWithCI} />;
    },
  },
];

const columnsValidatedTeam: ColumnDef<Player>[] = [
  {
    accessorKey: "name",
    header: "Jugador",
  },
  {
    accessorKey: "ci",
    header: "Cédula",
  },
  {
    accessorKey: "position",
    header: "Posición",
  },
  {
    accessorKey: "jersey_number",
    header: "Número de Camisa",
  },
  {
    accessorKey: "age",
    header: "Edad",
  },
  {
    accessorKey: "goals_scored",
    header: "Goles",
  },
];

export function PlayersTable({
  team,
}: {
  team: Promise<TeamPlayers | undefined>;
}) {
  const teamData = use(team);

  if (!teamData) return null;

  const { players } = teamData;

  if (players.length === 0) return null;

  const validateTeam = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    players: Player[]
  ) => {
    const button = e.currentTarget;
    button.disabled = true;
    const jerseyNumbers = new Set<number>();

    let hasGoalkeeper = false;
    let fieldPlayersCount = 0;
    let goalkeepersCount = 0;

    for (const player of players) {
      // Validate unique jersey number
      if (jerseyNumbers.has(player.jersey_number))
        return {
          valid: false,
          errors: ["Número de camiseta duplicado"],
        };
      jerseyNumbers.add(player.jersey_number);

      // Normalize position
      const normalizedPosition = player.position.trim().toUpperCase();

      // Validate positions
      if (normalizedPosition === "PORTERO") {
        hasGoalkeeper = true;
        goalkeepersCount++;
      } else if (
        normalizedPosition === "DEFENSA" ||
        normalizedPosition === "MEDIOCAMPISTA" ||
        normalizedPosition === "DELANTERO"
      ) {
        fieldPlayersCount++;
      }
    }

    // Error messages
    const errorMessages = [];

    if (!hasGoalkeeper) {
      errorMessages.push("El equipo debe tener un portero.");
    }

    if (goalkeepersCount > 1) {
      errorMessages.push("El equipo debe tener un solo portero.");
    }

    if (fieldPlayersCount < 4) {
      errorMessages.push(
        "El equipo debe tener al menos 4 jugadores en el campo."
      );
    }

    if (errorMessages.length > 0) {
      alert(errorMessages.join("\n"));
      button.disabled = false;
      return;
    }

    await updateTeamValidation(teamData.id);
    alert("Equipo validado con éxito. Ya no se puede editar");
    window.location.reload();
  };

  return (
    <div className="space-y-5 mt-8">
      <h3 className="text-xl font-semibold">Jugadores Registrados</h3>
      {teamData.has_validated_players ? (
        <DataTable columns={columnsValidatedTeam} data={players} />
      ) : (
        <DataTable columns={columnsWithDelete} data={players} />
      )}

      {!teamData.has_validated_players &&
        teamData.players_count === players.length && (
          <div className="flex justify-end">
            <Button
              className="bg-success-600 hover:bg-success-600/80"
              onClick={(e) => validateTeam(e, players)}
            >
              <Shield />
              <span>Validar Equipo</span>
            </Button>
          </div>
        )}
    </div>
  );
}
