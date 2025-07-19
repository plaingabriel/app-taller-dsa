import MainLogo from "@/assets/main-logo";
import Link from "next/link";

export function NavbarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <nav className="flex justify-between items-center py-4 px-4 md:px-8 max-w-7xl mx-auto">
      {children}
    </nav>
  );
}

export function NavLink({
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

export function NavLogo() {
  return (
    <NavLink href="/">
      <MainLogo className="w-30 h-full fill-primary-800" />
    </NavLink>
  );
}
