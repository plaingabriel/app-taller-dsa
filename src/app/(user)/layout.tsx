import HeaderWrapper from "@/components/header/HeaderWrapper";
import NavBar from "@/components/navbar/NavBarUser";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderWrapper>
        <NavBar />
      </HeaderWrapper>
      <main className="flex py-[3rem]">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </>
  );
}
