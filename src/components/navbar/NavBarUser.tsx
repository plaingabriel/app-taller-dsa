import NavBarWrapper from "@/components/navbar/NavBarWrapper";
import { getUserByCI } from "@/db/methods/user";
import { getUserCI } from "@/lib/session";
import UserMenu from "../menus/UserMenu";
import NavLinkLogo from "./NavLinkLogo";

export default async function NavBar() {
  const userCI = await getUserCI();
  const user = await getUserByCI(userCI);

  return (
    <NavBarWrapper>
      <NavLinkLogo />

      <UserMenu user={user} />
    </NavBarWrapper>
  );
}
