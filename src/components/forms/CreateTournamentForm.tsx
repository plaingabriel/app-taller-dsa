"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormField from "../ui/form-field";

type CreateTournamentFormProps = {
  handleName: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CreateTournamentForm({
  handleName,
}: CreateTournamentFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Información del Torneo</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FormField>
            <Label htmlFor="name">Nombre del Torneo</Label>
            <Input
              id="tournament-name"
              name="tournament-name"
              placeholder="Ej: UDO League"
              onChange={(e) => {
                handleName(e);
              }}
            />
          </FormField>
        </form>
      </CardContent>
    </Card>
  );
}
