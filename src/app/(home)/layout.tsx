import { NavHome } from "@/components/block-components/navbar";
import { HeaderWrapper } from "@/components/header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderWrapper>
        <NavHome />
      </HeaderWrapper>

      <main className="py-12 px-10 flex flex-col grow">{children}</main>
    </>
  );
}
