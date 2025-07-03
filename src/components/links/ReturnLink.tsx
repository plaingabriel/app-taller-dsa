import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function ReturnLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return <Link href={href}>{children}</Link>;
}
