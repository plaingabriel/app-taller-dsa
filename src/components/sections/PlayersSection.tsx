"use client";

import { validateTeam } from "@/lib/tournament-data";
import { Player, Team } from "@/shared/types";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import UploadPlayers from "../cards/UploadPlayers";
import PlayerList from "../lists/PlayerList";
import { Button } from "../ui/button";

export default function PlayersSection({
  team,
  players,
  hasMatches,
}: {
  team: Team;
  players: Player[];
  hasMatches: boolean;
}) {
  const [isTeamValid, setIsTeamValid] = useState(false);

  const handleValidateTeam = () => {
    const validation = validateTeam(players);

    if (validation.valid) {
      setIsTeamValid(true);
      alert("Equipo validado con éxito.");
    } else {
      setIsTeamValid(false);
      alert(validation.errors?.join("\n"));
    }
  };
  return (
    <>
      {/* Validate Players */}
      {players.length === team.players_count && !hasMatches && (
        <div className="flex justify-end">
          <Button
            onClick={handleValidateTeam}
            className="bg-success-600 hover:bg-success-700"
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            {isTeamValid ? "Equipo validado" : "Validar Equipo"}
          </Button>
        </div>
      )}

      {/* Upload Players */}
      {players.length < team.players_count && <UploadPlayers team={team} />}

      {/* Players List */}
      {players.length > 0 && (
        <PlayerList players={players} hasMatches={hasMatches} />
      )}
    </>
  );
}
