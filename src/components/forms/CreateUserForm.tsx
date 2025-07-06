"use client";

import { createUser } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState } from "react";
import ButtonLink from "../ui/button-link";
import FormField from "../ui/form-field";

export default function CreateUserForm() {
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
          <div>
            <FormField>
              <Label htmlFor="ci">Cédula</Label>
              <Input
                id="ci"
                name="ci"
                type="text"
                placeholder="Ingrese la cédula"
              />
            </FormField>

            {state?.errors?.ci && (
              <p className="text-danger-500">{state.errors.ci}</p>
            )}
          </div>

          <div>
            <FormField>
              <Label htmlFor="username">Nombre de Usuario</Label>
              <Input
                id="username"
                type="text"
                name="name"
                placeholder="Ingrese el nombre de usuario"
              />
            </FormField>

            {state?.errors?.name && (
              <p className="text-danger-500">{state.errors.name}</p>
            )}
          </div>

          <div>
            <FormField>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Ingrese la contraseña"
              />
            </FormField>

            {state?.errors?.password && (
              <p className="text-danger-500">{state.errors.password}</p>
            )}
          </div>

          <div>
            <FormField>
              <Label htmlFor="role">Rol</Label>
              <Select defaultValue="editor" name="role">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="operator">Operador</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            {state?.errors?.role && (
              <p className="text-danger-500">{state.errors.role}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button disabled={pending} type="submit">
              Crear Usuario
            </Button>
            <ButtonLink href="/dashboard/admin/users" variant={"outline"}>
              Cancelar
            </ButtonLink>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
