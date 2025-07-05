import { Card, CardContent } from "@/components/ui/card";
import { UserClient } from "@/shared/types";
import { User } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export default function UserCard({ user }: { user: UserClient }) {
  return (
    <Card key={user.ci}>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <User className="w-8 h-8 text-gray-400" />
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-600">CI: {user.ci}</p>
            </div>
            {user.role}
          </div>
          <Button size="sm" variant="destructive"></Button>
        </div>
      </CardContent>
    </Card>
  );
}
