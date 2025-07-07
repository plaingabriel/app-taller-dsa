"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import FormField from "../ui/form-field";

export default function CreateTournamentForm() {
  const [tournamentData, setTournamentData] = useState({
    name: "",
    numberOfCategories: 0,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Básica del Torneo</CardTitle>
        <CardDescription>
          Configure los datos principales del torneo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField>
          <Label htmlFor="name">Nombre del Torneo</Label>
          <Input
            id="tournament-name"
            name="tournament-name"
            placeholder="Ej: Copa Primavera"
            onChange={(e) => {
              setTournamentData({
                ...tournamentData,
                name: e.target.value,
              });
            }}
          />
        </FormField>

        <FormField>
          <Label htmlFor="category">Cantidad de categorías</Label>
          <Select
            name="category-number"
            onValueChange={(value) => {
              setTournamentData({
                ...tournamentData,
                numberOfCategories: parseInt(value),
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Categoría</SelectItem>
              <SelectItem value="2">2 Categorías</SelectItem>
              <SelectItem value="3">3 Categorías</SelectItem>
              <SelectItem value="4">4 Categorías</SelectItem>
              <SelectItem value="5">5 Categorías</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <div className="flex justify-end">
          <Button
            disabled={
              tournamentData.name === "" ||
              tournamentData.numberOfCategories === 0
            }
          >
            Siguiente: Configurar Categorías
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
