"use server";
import { putUser } from "@db/utils/user";
import { getUserCI } from "@lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const userSchema = z.object({
  ci: z.number().int().min(1, "Cédula inválida"),
  name: z.string().min(1, "El nombre es requerido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  role: z.enum(["admin", "operator", "editor"]),
});

const updateSchema = userSchema.partial().omit({ ci: true });
const updateAdminSchema = updateSchema.omit({ role: true });

export async function updateAdmin(prevSate: any, formData: FormData) {
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const ci = await getUserCI();

  const result = updateAdminSchema.safeParse({ name, password });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await putUser(ci, { name, password, role: "admin" });
  } catch {
    return {
      errors: {
        name: ["Error al actualizar el administrador"],
      },
    };
  }

  redirect("/dashboard/users");
}
