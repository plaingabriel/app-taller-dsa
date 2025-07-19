"use client";

import { createUser } from "@/actions/user-actions";
import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";
import { useActionState } from "react";
import { ButtonLink } from "../atomic-components/button-link";
import { ErrorField } from "../atomic-components/error-field";
import { FormField } from "../atomic-components/form-field";
import { PasswordInput } from "../atomic-components/password-input";

export function CreateUserForm() {
  const [state, createUserAction, pending] = useActionState(
    createUser,
    undefined
  );
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>Crear Nuevo Usuario</CardTitle>
        <CardDescription className="text-neutral-600">
          Configure los datos del usuario
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createUserAction} className="space-y-6">
          {/* CI */}
          <div>
            <FormField>
              <Label htmlFor="ci">Cédula</Label>
              <Input
                id="ci"
                name="ci"
                type="text"
                placeholder="Ingrese la cédula"
                aria-describedby="ci-error"
                required
              />
            </FormField>

            <div id="ci-error" aria-atomic="true" aria-live="polite">
              {state?.errors?.ci &&
                state.errors.ci.map((error) => (
                  <ErrorField key={error} message={error} />
                ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <FormField>
              <Label htmlFor="username">Nombre de Usuario</Label>
              <Input
                id="username"
                type="text"
                name="name"
                placeholder="Ingrese el nombre de usuario"
                aria-describedby="username-error"
                required
              />
            </FormField>

            <div id="username-error" aria-atomic="true" aria-live="polite">
              {state?.errors?.name &&
                state.errors.name.map((error) => (
                  <ErrorField key={error} message={error} />
                ))}
            </div>
          </div>

          {/* Password */}
          <div>
            <FormField>
              <Label htmlFor="password">Contraseña</Label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="Ingrese la contraseña"
                aria-describedby="password-error"
                required
              />
            </FormField>

            <div id="password-error" aria-atomic="true" aria-live="polite">
              {state?.errors?.password &&
                state.errors.password.map((error) => (
                  <ErrorField key={error} message={error} />
                ))}
            </div>
          </div>

          <div>
            <FormField>
              <Label htmlFor="role">Rol</Label>
              <Select defaultValue="editor" name="role">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un rol" />
                </SelectTrigger>
                <SelectContent aria-describedby="role-error">
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="operator">Operador</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <div id="role-error" aria-atomic="true" aria-live="polite">
              {state?.errors?.role &&
                state.errors.role.map((error) => (
                  <ErrorField key={error} message={error} />
                ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex pt-4 justify-end">
            <div className="space-x-4">
              <ButtonLink href="/dashboard/admin/users" variant={"outline"}>
                Cancelar
              </ButtonLink>

              <Button disabled={pending} type="submit">
                Crear Usuario
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
