"use server";

import { Category } from "@/lib/definitions";
import { getValidEquiposCounts } from "@/lib/utils";
import { z } from "zod";

const newCategorySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  min_age: z
    .number({
      invalid_type_error: "La edad mínima debe ser un número",
    })
    .min(6, "La edad mínima debe ser mayor o igual a 6"),
  max_age: z
    .number({
      invalid_type_error: "La edad máxima debe ser un número",
    })
    .max(99, "La edad máxima debe ser menor o igual a 99"),
  team_count: z
    .number({
      invalid_type_error: "La cantidad de equipos debe ser un número",
    })
    .min(4, "La cantidad de equipos debe ser mayor o igual a 4"),
  fixture_type: z.enum(["groups", "playoffs", "groups+playoffs"]),
});
