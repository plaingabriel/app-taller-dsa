import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy } from "lucide-react";

export default function ComingTournamentCard({ number }: { number: number }) {
  return (
    <Card>
      <div className="text-center py-10">
        <CardHeader>
          <Trophy className="h-16 w-16 text-neutral-100 mx-auto" />
          <CardTitle className="text-xl text-neutral-400">
            Torneo {number}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-xl text-neutral-400">
            PRÓXIMAMENTE
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  );
}
