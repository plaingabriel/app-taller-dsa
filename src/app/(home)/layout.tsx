import HeaderWrapper from "@/components/header/HeaderWrapper";
import NavBar from "@/components/navbar/NavBarHome";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderWrapper>
        <NavBar />
      </HeaderWrapper>
      <main className="flex py-[3rem] px-0 bg-secondary-100 flex-1">
        <div className="max-w-7xl mx-auto px-[2rem]">{children}</div>
      </main>
    </>
  );
}
