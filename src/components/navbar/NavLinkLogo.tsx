import MainLogo from "@/assets/MainLogo";
import React from "react";
import NavLink from "../navbar/NavLink";

export default function NavLinkLogo() {
  return (
    <NavLink href="/">
      <MainLogo className="w-30 h-full fill-primary-800" />
    </NavLink>
  );
}
