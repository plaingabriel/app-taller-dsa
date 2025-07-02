"use client";
import { login } from "@/actions/auth-actions";
import SubmitButton from "@/components/SubmitButton";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <form action={loginAction}>
      <div className="flex flex-col gap-y-1 mb-6">
        <label htmlFor="ci" className="text-secondary font-medium">
          Número de Cédula
        </label>
        <input type="text" name="ci" />
      </div>
      {state?.errors?.ci && <p className="text-red-500">{state.errors.ci}</p>}

      <div className="flex flex-col gap-y-1 mb-6">
        <label htmlFor="password" className="text-secondary font-medium">
          Contraseña
        </label>
        <input type="password" name="password" />
      </div>

      <SubmitButton text="Iniciar Sesión" />
    </form>
  );
}
