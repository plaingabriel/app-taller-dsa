export function HeaderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <header className="bg-card shadow-light sticky top-0 z-100 py-2 border-b">
      {children}
    </header>
  );
}
