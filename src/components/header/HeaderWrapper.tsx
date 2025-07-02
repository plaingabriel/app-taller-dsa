export default function HeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <header className="bg-neutral-50 shadow-light sticky top-0 z-100 py-2 border-b border-b-primary-900">
      {children}
    </header>
  );
}
