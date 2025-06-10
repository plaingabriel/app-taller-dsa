import Link from "next/link";

export default function ReturnLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="text-primary font-medium py-2 px-4 rounded-[8px] mb-8 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white hover:-translate-x-1.5"
    >
      {text}
    </Link>
  );
}
