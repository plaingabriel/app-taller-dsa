"use client";

import { updatePassword } from "@/actions/user-actions";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import FormField from "../ui/form-field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import PasswordInput from "../ui/password-input";

export default function CredentialsForm() {
  const [state, updatePasswordAction, pending] = useActionState(
    updatePassword,
    undefined
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar credenciales</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={updatePasswordAction}>
          <div className="flex flex-col gap-6">
            <div>
              <FormField>
                <Label
                  htmlFor="currentPassword"
                  className="text-neutral-900 font-medium"
                >
                  Contraseña Actual
                </Label>
                <PasswordInput id="currentPassword" name="currentPassword" />
              </FormField>

              {state?.errors?.currentPassword && (
                <p className="text-danger-500">
                  {state.errors.currentPassword}
                </p>
              )}
            </div>

            <div>
              <FormField>
                <Label
                  htmlFor="newPassword"
                  className="text-neutral-900 font-medium"
                >
                  Nueva Contraseña
                </Label>
                <PasswordInput id="newPassword" name="newPassword" />
              </FormField>

              {state?.errors?.newPassword && (
                <p className="text-danger-500">{state.errors.newPassword}</p>
              )}
            </div>

            <div>
              <FormField>
                <Label
                  htmlFor="confirmPassword"
                  className="text-neutral-900 font-medium"
                >
                  Confirmar Nueva Contraseña
                </Label>
                <PasswordInput id="confirmPassword" name="confirmPassword" />
              </FormField>

              {state?.errors?.confirmPassword && (
                <p className="text-danger-500">
                  {state.errors.confirmPassword}
                </p>
              )}
            </div>

            <FormField>
              <Button type="submit" disabled={pending}>
                Actualizar Credenciales
              </Button>
            </FormField>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
