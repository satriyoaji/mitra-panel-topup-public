"use client";
import Link from "next/link";
import React, { useMemo } from "react";
import Image from "next/image";
import { ISiteProfile } from "@/types/utils";
import Searchbar from "@/app/dashboard/searchbar";
import { usePathname } from "next/navigation";

const ignorePath = [
  "/games/",
  "/transaksi/",
  "/kebijakan",
  "/syarat-ketentuan",
];

function MobileHeader({ profile }: { profile?: ISiteProfile }) {
  const path = usePathname();

  const isInlist = useMemo(() => {
    return ignorePath.some((i) => path.includes(i));
  }, [path]);

  if (!isInlist)
    return (
      <header className="w-full block md:hidden z-50 shadow bg-primary md:rounded-b-2xl items-center top-0 sticky">
        <div className="w-full flex max-w-6xl mx-auto px-2 lg:px-0 items-center justify-between">
          <div className="md:hidden w-full"></div>
          <div className="flex w-full justify-center md:justify-start">
            <Link href="/" className="m-1.5">
              {profile?.logo_url && (
                <Image
                  src={profile?.logo_url}
                  alt="logo"
                  title="logo"
                  width={30}
                  height={30}
                />
              )}
            </Link>
          </div>
          <div className="flex w-full justify-end items-center gap-2">
            <Searchbar />
          </div>
        </div>
      </header>
    );
}

export default MobileHeader;
