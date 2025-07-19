import { Trophy, User } from "lucide-react";
import Link from "next/link";

interface Props {
  href: string;
  iconType: "tournament" | "users";
  title: string;
  description: string;
}

export function OptionLink({ href, iconType, title, description }: Props) {
  return (
    <Link
      href={href}
      className="bg-card border border-border rounded-lg p-8 flex flex-col items-center justify-center hover:bg-muted transition-colors"
    >
      <IconElement
        iconType={iconType}
        className="w-20 h-20 mx-auto mb-6 text-neutral-600"
      />
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
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
