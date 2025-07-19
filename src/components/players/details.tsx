import { TeamPlayers } from "@/lib/definitions";

export async function PlayersDetails({
  team,
  ages,
}: {
  team: Promise<TeamPlayers | undefined>;
  ages: Promise<{ min_age: number; max_age: number } | undefined>;
}) {
  const teamData = await team;
  const agesRange = await ages;

  if (!teamData || !agesRange) return null;

  const { min_age, max_age } = agesRange;

  return (
    <div className="grid grid-cols-3 gap-x-4 -mt-4">
      <div>
        <h4 className="font-medium">Jugadores Requeridos</h4>
        <span>{teamData.players_count}</span>
      </div>

      <div>
        <h4 className="font-medium">Jugadores Registrados</h4>
        <span>{teamData.players.length}</span>
      </div>

      <div>
        <h4 className="font-medium">Edades Permitidas</h4>
        <span>
          {min_age} - {max_age}
        </span>
      </div>
    </div>
  );
}
