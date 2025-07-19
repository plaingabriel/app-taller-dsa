"use server";
import { db } from "@/db";
import { usersTable } from "@/db/schemas";
import { fetchAuthUser } from "@/lib/data";
import { User } from "@/shared/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const nameSchema = z
  .string()
  .min(1, "El nombre es requerido")
  .max(30, "Máximo 30 caracteres por nombre");

const passwordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres");

const userSchema = z.object({
  ci: z.string().regex(new RegExp("^[0-9]+$"), "Cédula inválida"),
  name: nameSchema,
  password: passwordSchema,
  role: z.enum(["admin", "operator", "editor"]),
});

const formSchema = z.object({
  name: nameSchema,
  newPassword: passwordSchema,
  confirmPassword: passwordSchema,
});

const updateUserSchema = formSchema.partial();
const updatePasswordSchema = formSchema.refine(
  (data) => {
    // If passwords are not provided, skip validation
    if (!data.newPassword || !data.confirmPassword) return true;

    return data.newPassword === data.confirmPassword;
  },
  {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  }
);

export async function createUser(prevState: any, formData: FormData) {
  const ci = formData.get("ci");
  const name = formData.get("name");
  const password = formData.get("password");
  const role = formData.get("role");

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

  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.ci, parseInt(result.data.ci)),
  });

  if (existingUser) {
    return {
      errors: {
        ci: ["Cédula ya registrada"],
      },
    };
  }

  await db.insert(usersTable).values(newUser);

  redirect("/dashboard/admin/users");
}

export async function updatePassword(prevState: any, formData: FormData) {
  const user = await fetchAuthUser();

  if (!user) redirect("/login");

  // Get credentials from form
  const name = formData.get("name");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  // If there no new password, only update name
  if (!newPassword) {
    const result = updateUserSchema.safeParse({
      name,
    });

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    await db
      .update(usersTable)
      .set({ name: result.data.name })
      .where(eq(usersTable.ci, user.ci));

    redirect(`/dashboard/${user.role}`);
  }

  // Validate passwords
  const result = updatePasswordSchema.safeParse({
    name,
    newPassword,
    confirmPassword,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name: updatedName, newPassword: updatedPassword } = result.data;
  await db
    .update(usersTable)
    .set({
      name: updatedName,
      password: updatedPassword,
    })
    .where(eq(usersTable.ci, user.ci));

  redirect(`/dashboard/${user.role}`);
}

export async function deleteUser(ci: number) {
  await db.delete(usersTable).where(eq(usersTable.ci, ci));
  revalidatePath("/dashboard/admin/users");
}
