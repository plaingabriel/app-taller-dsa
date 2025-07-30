"use client";

import { AllTournament, Category } from "@/lib/definitions";
import { MapPin, Trophy } from "lucide-react";
import { useState } from "react";
import { Button } from "../shadcn-ui/button";
import { Card, CardContent, CardHeader } from "../shadcn-ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn-ui/select";
import { GoalsScorers } from "./goals-scorers";
import { TeamsPositions } from "./teams-positions";

interface Option {
  id: "players" | "teams";
  label: string;
  icon: React.ReactNode;
}

const options: Option[] = [
  {
    id: "players",
    label: "Goleadores",
    icon: <Trophy />,
  },
  {
    id: "teams",
    label: "Posiciones",
    icon: <MapPin />,
  },
];

export function CardTable({ tournament }: { tournament: AllTournament }) {
  const [selected, setSelected] = useState<Option["id"]>("players");

  const { categories } = tournament;
  const [categorySelected, setCategorySelected] = useState(categories[0]);

  const handleCategoryChange = (category_id: string) => {
    const category = categories.find((c) => c.id === category_id);
    if (category) setCategorySelected(category);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          {/* Option Buttons */}
          <div className="flex gap-2">
            {options.map((option) => (
              <Button
                key={option.label}
                variant={option.id === selected ? "default" : "outline"}
                size="sm"
                className="cursor-pointer"
                onClick={() => setSelected(option.id)}
              >
                {option.icon} {option.label}
              </Button>
            ))}
          </div>

          <div>
            <Select
              defaultValue={categorySelected.id}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {selected === "players" && (
          <GoalsScorers teams={categorySelected.teams} />
        )}

        {selected === "teams" && <TeamsPositions category={categorySelected} />}
      </CardContent>
    </Card>
  );
}
