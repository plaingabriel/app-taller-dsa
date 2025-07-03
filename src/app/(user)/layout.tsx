import HeaderWrapper from "@/components/header/HeaderWrapper";
import NavBar from "@/components/navbar/NavBarUser";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderWrapper>
        <NavBar />
      </HeaderWrapper>
      <main>{children}</main>
    </>
  );
}
