import { Player } from "@/shared/types";

export default function PlayerItem({ player }: { player: Player }) {
  return <div>{player.name}</div>;
}
