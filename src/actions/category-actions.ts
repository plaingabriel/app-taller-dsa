"use server";

import { getValidEquiposCounts } from "@/lib/utils";
import { CategoryClient } from "@/shared/types";
import { z } from "zod";

const categoryClientSchema = z.object({
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

export async function validateCategory(
  currentCategory: CategoryClient,
  categories: CategoryClient[]
) {
  const parsedCategory = categoryClientSchema.safeParse(currentCategory);

  // Handle validation errors
  if (!parsedCategory.success) {
    const error = parsedCategory.error.flatten().fieldErrors;

    if (error.name) {
      return {
        success: false,
        error: error.name[0],
      };
    }

    return {
      success: false,
      error: "Por favor, rellene los campos correctamente",
    };
  }

  // Handle valid team quantity errors
  const validCounts = getValidEquiposCounts(currentCategory.fixture_type);

  if (!validCounts.includes(currentCategory.team_count)) {
    return {
      success: false,
      error: "La cantidad de equipos no es válida para este formato",
    };
  }

  // Handle no repeating category name
  try {
    const existingName = categories.find(
      (category) =>
        category.name.toLowerCase() === currentCategory.name.toLowerCase()
    );

    if (existingName) {
      return {
        success: false,
        error: "Ya existe una categoría con ese nombre",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Ocurrió un error al validar la categoría",
    };
  }

  return {
    success: true,
  };
}
