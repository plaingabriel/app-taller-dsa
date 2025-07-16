import { NavUser } from "@/components/block-components/navbar";
import { HeaderWrapper } from "@/components/header";
import { fetchAuthUser } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchAuthUser();

  if (user) {
    return (
      <>
        <HeaderWrapper>
          <NavUser user={user} />
        </HeaderWrapper>
        <main className="flex flex-col grow">{children}</main>
      </>
    );
  }

  redirect("/login");
}
