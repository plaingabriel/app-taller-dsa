import { TeamPlayers } from "@/lib/definitions";

export async function PlayersPageHeading({
  team,
}: {
  team: Promise<TeamPlayers | undefined>;
}) {
  const teamData = await team;

  if (!teamData) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Gestionar Jugadores del {teamData.name}
      </h1>
      <p className="text-neutral-800">
        {teamData.players.length}/{teamData.players_count} jugadores registrados
      </p>
    </div>
  );
}
