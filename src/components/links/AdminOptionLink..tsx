"use client";

import { Card, CardContent } from "@/components/shadcn-ui/card";
import { Trophy, User } from "lucide-react";
import { redirect } from "next/navigation";

interface Props {
  href: string;
  iconType: "tournament" | "users";
  title: string;
  description: string;
}

export function AdminOptionLink({ href, iconType, title, description }: Props) {
  const handleClick = () => {
    redirect(href);
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 py-0"
      onClick={handleClick}
      role="link"
    >
      <CardContent className="p-12 text-center">
        <IconElement
          iconType={iconType}
          className="w-20 h-20 mx-auto mb-6 text-secondary-300"
        />
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

function IconElement({
  iconType,
  className,
}: {
  iconType: "tournament" | "users";
  className?: string;
}) {
  if (iconType === "tournament") {
    return <Trophy className={className} />;
  } else {
    return <User className={className} />;
  }
}
