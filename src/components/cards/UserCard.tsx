import { Card, CardContent } from "@/components/shadcn-ui/card";
import { UserClient } from "@/shared/types";
import { Trash, User } from "lucide-react";
import React from "react";
import { Badge } from "../shadcn-ui/badge";
import { Button } from "../shadcn-ui/button";

type UserCardProps = {
  user: UserClient;
  onDelete: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ci: number
  ) => void;
};

export default function UserCard({ user, onDelete }: UserCardProps) {
  const variant =
    user.role === "admin"
      ? "default"
      : user.role === "editor"
      ? "secondary"
      : "outline";

  const role =
    user.role === "admin"
      ? "administrador"
      : user.role === "editor"
      ? "editor"
      : "operador";
  return (
    <Card key={user.ci}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <User className="w-8 h-8 text-gray-400" />
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-600">CI: {user.ci}</p>
            </div>
            <Badge variant={variant}>{role}</Badge>
          </div>

          {user.role !== "admin" && (
            <Button
              variant={"destructive"}
              onClick={(e) => onDelete(e, user.ci)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
