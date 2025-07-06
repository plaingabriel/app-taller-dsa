"use server";
import { getUserByCI, postUser, putUser, removeUser } from "@/db/methods/user";
import { getUserCI } from "@/lib/session";
import { User } from "@/shared/types";
import { redirect } from "next/navigation";
import { z } from "zod";

const nameSchema = z.string().min(1, "El nombre es requerido");
const passwordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres");

const userSchema = z.object({
  ci: z.string().regex(new RegExp("^[0-9]+$"), "Cédula inválida"),
  name: nameSchema,
  password: passwordSchema,
  role: z.enum(["admin", "operator", "editor"]),
});

const updatePasswordSchema = z.object({
  name: nameSchema,
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmPassword: passwordSchema,
});

export async function createUser(prevState: any, formData: FormData) {
  const ci = formData.get("ci");
  const name = formData.get("name");
  const password = formData.get("password");
  const role = formData.get("role");

  console.log(ci, name, password, role);

  const result = userSchema.safeParse({
    ci,
    name,
    password,
    role,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const newUser: User = {
    ci: parseInt(result.data.ci),
    name: result.data.name,
    password: result.data.password,
    role: result.data.role,
  };

  if (newUser.role === "admin") {
    return {
      errors: {
        role: ["No se puede crear un usuario con rol de administrador"],
      },
    };
  }

  const existingUser = await getUserByCI(newUser.ci);

  if (existingUser !== null) {
    return {
      errors: {
        ci: ["Cédula ya registrada"],
      },
    };
  }

  await postUser(newUser);

  redirect("/dashboard/admin/users");
}

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

export async function deleteUser(ci: number) {
  try {
    await removeUser(ci);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
