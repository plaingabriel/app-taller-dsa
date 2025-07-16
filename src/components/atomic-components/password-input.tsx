"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
import { type ComponentProps, useState } from "react";
import { Input } from "../shadcn-ui/input";

type PasswordInputProps = Omit<ComponentProps<"input">, "type">;

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [visibility, setVisibility] = useState(false);

  const type = visibility ? "text" : "password";
  const Icon = visibility ? Eye : EyeClosed;

  const toggleVisibility = () => setVisibility((prev) => !prev);

  return (
    <div className="relative">
      <Input type={type} {...props} className={cn("pe-9", className)} />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
      >
        <Icon className="text-accent-foreground" />
      </button>
    </div>
  );
}
