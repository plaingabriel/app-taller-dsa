"use client";

import { deletePlayerAction } from "@/actions/player-actions";
import { Player } from "@/shared/types";
import RemoveButton from "../buttons/RemoveButton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function PlayerList({ players }: { players: Player[] }) {
  const handleRemove = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    playerId: number
  ) => {
    const button = e.target as HTMLButtonElement;
    button.disabled = true;

    await deletePlayerAction(playerId);
    window.location.reload();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jugadores Registrados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="border-b">
                <th>Nombre</th>
                <th>Posición</th>
                <th>Número</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => {
                return (
                  <tr
                    className="text-center border-b [&>td]:py-2"
                    key={player.id}
                  >
                    <td>{player.name}</td>
                    <td>{player.position}</td>
                    <td>{player.number}</td>
                    <td>
                      <RemoveButton
                        handleRemove={(e) => {
                          handleRemove(e, player.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
