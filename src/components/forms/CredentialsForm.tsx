"use client";

import { updatePassword } from "@/actions/user-actions";
import { useActionState } from "react";
import { Button } from "../shadcn-ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn-ui/card";
import FormField from "../shadcn-ui/form-field";
import { Input } from "../shadcn-ui/input";
import { Label } from "../shadcn-ui/label";
import PasswordInput from "../shadcn-ui/password-input";

export default function CredentialsForm({ name }: { name: string }) {
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
                <Label htmlFor="name">Nombre</Label>
                <Input type="text" id="name" name="name" defaultValue={name} />
              </FormField>

              {state?.errors?.name && (
                <p className="text-danger-500">{state.errors.name}</p>
              )}
            </div>
            <div>
              <FormField>
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
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
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <PasswordInput id="newPassword" name="newPassword" />
              </FormField>

              {state?.errors?.newPassword && (
                <p className="text-danger-500">{state.errors.newPassword}</p>
              )}
            </div>

            <div>
              <FormField>
                <Label htmlFor="confirmPassword">
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
