"use client";

import { login } from "@/actions/auth-actions";
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
import { cn } from "@/lib/utils";
import { useActionState } from "react";
import FormField from "../ui/form-field";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, loginAction, pending] = useActionState(login, undefined);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Iniciar sesión en tu cuenta</CardTitle>
          <CardDescription>
            Ingrese su cédula y contraseña para iniciar sesión en su cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction}>
            <div className="flex flex-col gap-6">
              <FormField>
                <Label htmlFor="ci">Número de cédula</Label>
                <Input name="ci" type="text" placeholder="28393939" required />
              </FormField>
              {state?.errors?.ci && (
                <p className="text-danger-500">{state.errors.ci}</p>
              )}
              <FormField>
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input name="password" type="password" required />
              </FormField>
              <FormField>
                <Button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-500 cursor-pointer"
                  disabled={pending}
                >
                  Iniciar sesión
                </Button>
              </FormField>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
