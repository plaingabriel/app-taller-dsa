"use client";

import { updatePassword } from "@/actions/user-actions";
import { UserClient } from "@/shared/client-types";
import { Save, User } from "lucide-react";
import { useActionState } from "react";
import { ErrorField } from "../atomic-components/error-field";
import { FormField } from "../atomic-components/form-field";
import { PasswordInput } from "../atomic-components/password-input";
import { Button } from "../shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../shadcn-ui/card";
import { Input } from "../shadcn-ui/input";
import { Label } from "../shadcn-ui/label";

export function EditUserForm({ user }: { user: UserClient }) {
  const [state, updatePasswordAction, pending] = useActionState(
    updatePassword,
    undefined
  );

  return (
    <Card>
      <CardHeader className="flex items-center border-b">
        <div className="bg-primary-200 p-2 rounded-lg">
          <User className="h-6 w-6 text-primary-700" />
        </div>
        <div>
          <CardTitle className="text-xl">Editar Credenciales</CardTitle>
          <CardDescription>Edita tus credenciales de acceso</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form action={updatePasswordAction}>
          <div className="border-b pb-6">
            <div className="space-y-8">
              {/* BASIC INFO */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-neutral-850">
                  Información del Usuario
                </h3>

                <div className="space-y-4">
                  <FormField>
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={user.name}
                      aria-describedby="name-error"
                      required
                    />
                  </FormField>

                  <div id="name-error" aria-atomic="true" aria-live="polite">
                    {state?.errors?.name &&
                      state.errors.name.map((error) => (
                        <ErrorField key={error} message={error} />
                      ))}
                  </div>
                </div>
              </div>

              {/* CHANGE PASSWORD */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-neutral-850">
                    Cambiar Contraseña
                  </h3>

                  <p className="text-sm text-neutral-800">
                    Dejar en blanco para mantener la contraseña actual
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <FormField>
                      <Label htmlFor="newPassword">Nueva Contraseña</Label>
                      <PasswordInput
                        id="newPassword"
                        name="newPassword"
                        aria-describedby="newPassword-error"
                      />
                    </FormField>

                    <div id="newPassword" aria-atomic="true" aria-live="polite">
                      {state?.errors?.newPassword &&
                        state.errors.newPassword.map((error) => (
                          <ErrorField key={error} message={error} />
                        ))}
                    </div>
                  </div>

                  <div>
                    <FormField>
                      <Label htmlFor="confirmPassword">
                        Confirmar Nueva Contraseña
                      </Label>
                      <PasswordInput
                        id="confirmPassword"
                        name="confirmPassword"
                        aria-describedby="confirmPassword-error"
                      />
                    </FormField>

                    <div
                      id="confirmPassword"
                      aria-atomic="true"
                      aria-live="polite"
                    >
                      {state?.errors?.confirmPassword &&
                        state.errors.confirmPassword.map((error) => (
                          <ErrorField key={error} message={error} />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={pending} className="py-6">
              <Save />
              <span>Guardar Cambios</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
