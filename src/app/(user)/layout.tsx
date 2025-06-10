import NavBar from "@/src/ui/NavBarUser";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-secondary shadow-light sticky top-0 z-100">
        <NavBar />
      </header>
      <main className="flex py-[3rem]">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </>
  );
}
