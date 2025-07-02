"use client";
import SubmitButton from "@/components/SubmitButton";
import { useActionState } from "react";
import { updateAdmin } from "../actions/user-actions";

export default function AdminForm() {
  const [state, adminAction] = useActionState(updateAdmin, undefined);
  return (
    <form action={adminAction}>
      <div className="flex flex-col gap-y-1 mb-6">
        <label htmlFor="name" className="text-secondary font-medium">
          Nombre y Apellido
        </label>
        <input type="text" name="name" />
      </div>
      {state?.errors?.name && (
        <p className="text-red-500">{state.errors.name}</p>
      )}

      <div className="flex flex-col gap-y-1 mb-6">
        <label htmlFor="password" className="text-secondary font-medium">
          Contraseña
        </label>
        <input type="password" name="password" />
      </div>
      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}

      <SubmitButton text="Editar Administrador" />
    </form>
  );
}
