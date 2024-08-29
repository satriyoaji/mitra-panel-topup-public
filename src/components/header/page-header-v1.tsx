"use client";
import React from "react";
import { ISiteProfile } from "@/types/utils";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";

function Header({ profile }: { profile?: ISiteProfile }) {
  return (
    <>
      <DesktopHeader profile={profile} />
      <MobileHeader profile={profile} />
    </>
  );
}

export default Header;
