export default function NavBarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <nav className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto">
      {children}
    </nav>
  );
}
