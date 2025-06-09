"use server";
import { getUserByCI } from "@db/utils/user";
import { createSession, deleteSession } from "@lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  ci: z.number().min(1, "Cédula inválida"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export async function login(prevState: any, formData: FormData) {
  const entryCI = parseInt(formData.get("ci") as string);
  const entryPassword = formData.get("password");

  const result = loginSchema.safeParse({
    ci: entryCI,
    password: entryPassword,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { ci, password } = result.data;
  const user = await getUserByCI(ci);

  if (!user) {
    return {
      errors: {
        ci: ["Cédula o contraseña inválida"],
      },
    };
  }

  if (ci !== user.ci || password !== user.password) {
    return {
      errors: {
        ci: ["Cédula o contraseña inválida"],
      },
    };
  }

  await createSession(user.ci);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
