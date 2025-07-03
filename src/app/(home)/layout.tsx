import HeaderWrapper from "@/components/header/HeaderWrapper";
import NavBar from "@/components/navbar/NavBarHome";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderWrapper>
        <NavBar />
      </HeaderWrapper>
      <main className="py-12 px-10 flex flex-col grow">{children}</main>
    </>
  );
}
