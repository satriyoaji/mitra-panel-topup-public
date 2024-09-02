"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Image from "next/image";
import { ISiteProfile } from "@/types/utils";
import Searchbar from "@/app/dashboard/searchbar";

export type path = {
  name: string;
  path: string;
};

const paths: path[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Price List",
    path: "/games",
  },
  {
    name: "Transaksi",
    path: "/transaksi",
  },
];

function DesktopHeader({ profile }: { profile?: ISiteProfile }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="w-full hidden md:flex z-50 shadow bg-primary md:rounded-b-2xl items-center top-0 sticky">
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
          <div className="hidden md:flex pl-8 text-white">
            <NavigationMenu>
              <NavigationMenuList className="w-fit">
                {paths.map((i) => (
                  <NavigationMenuItem className="bg-transparent" key={i.path}>
                    <Link href={i.path} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()}`}
                      >
                        {i.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex w-full justify-end items-center gap-2">
          <Searchbar />
          {session ? (
            <div className="my-1 mx-3 hidden md:block">
              <Avatar
                className="cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                <AvatarImage
                  src={session?.profile?.name as string}
                  alt={session?.profile?.name as string}
                />
                <AvatarFallback>
                  {session?.profile?.name?.at(0) ?? ""}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Link href="/auth/login" className="m-2 hidden md:block">
              <Button size="sm" variant="white">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default DesktopHeader;
