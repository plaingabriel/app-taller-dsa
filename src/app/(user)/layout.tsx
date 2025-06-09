import NavBar from "@/src/ui/NavBarUser";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-secondary shadow-light sticky top-0 z-100">
        <NavBar />
      </header>
      <main className="flex-1 py-12">
        <div className="mx-auto px-8">{children}</div>
      </main>
    </>
  );
}
