import Link from "next/link";

export default function NavLink({
  href,
  children,
  pathname = false,
}: {
  href: string;
  children: React.ReactNode;
  pathname?: boolean;
}) {
  return (
    <Link
      className={`text-neutral-900 font-medium ${
        pathname
          ? "underline underline-offset-8 decoration-2 font-bold text-primary-800"
          : ""
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
