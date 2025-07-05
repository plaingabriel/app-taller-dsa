"use server";
import { getUserByCI, putUser } from "@/db/methods/user";
import { getUserCI } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

// const userSchema = z.object({
//   ci: z.number().int().min(1, "Cédula inválida"),
//   name: z.string().min(1, "El nombre es requerido"),
//   password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
//   role: z.enum(["admin", "operator", "editor"]),
// });

// const updateSchema = userSchema.partial().omit({ ci: true });

const nameSchema = z.string().min(1, "El nombre es requerido");
const passwordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres");

const updatePasswordSchema = z.object({
  name: nameSchema,
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmPassword: passwordSchema,
});

export async function updatePassword(prevState: any, formData: FormData) {
  const ci = await getUserCI();
  const user = await getUserByCI(ci);

  if (!user) redirect("/login");

  // Get credentials from form
  const name = formData.get("name");
  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  // Validate passwords
  const result = updatePasswordSchema.safeParse({
    name,
    currentPassword,
    newPassword,
    confirmPassword,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  if (formData.get("currentPassword") !== user.password) {
    return {
      errors: {
        currentPassword: ["Contraseña inválida"],
      },
    };
  }

  if (formData.get("newPassword") !== formData.get("confirmPassword")) {
    return {
      errors: {
        confirmPassword: ["Las contraseñas no coinciden"],
      },
    };
  }

  await putUser(ci, {
    name: result.data.name,
    password: result.data.newPassword,
  });

  redirect(`/dashboard/${user.role}`);
}
