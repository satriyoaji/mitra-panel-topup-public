"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ExitIcon, Pencil1Icon, ReaderIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import DetailProfile from "./detail-profile";
import SaldoPointHistory from "./saldopoint-history";
import Profile from "./(tabs)/profile";
import Tier from "@/components/tier";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SaldoCard from "./saldo-card";

function Page() {
  const { data: session } = useSession();

  return (
    <div className="md:flex gap-4 h-full md:mt-4">
      <div className="md:border md:shadow min-w-[22rem] h-full rounded-xl p-2 md:p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Avatar className="my-1">
              <AvatarImage
                src={session?.profile?.name as string}
                alt={session?.profile?.name as string}
              />
              <AvatarFallback>
                {session?.profile?.name?.at(0) ?? ""}
              </AvatarFallback>
            </Avatar>
            <div>
              <h5 className="font-bold">{session?.profile?.name}</h5>
            </div>
          </div>
          <Tier type={session?.profile?.tier_name ?? "Public"} />
        </div>
        <Separator className="w-full my-2" />
        <div className="mt-6 w-full">
          <SaldoCard />
        </div>
        <div className="space-y-3 px-3 mt-6 mb-4">
          <Link
            href="/transaksi"
            className="flex space-x-3 items-center text-sm hover:text-theme-primary-500"
          >
            <ReaderIcon className="mr-3" /> Daftar Transaksi
          </Link>
          <p
            onClick={() => signOut()}
            className="flex space-x-3 items-center text-sm cursor-pointer hover:text-theme-primary-500"
          >
            <ExitIcon className="mr-3" /> Logout
          </p>
        </div>
      </div>
      <Separator
        orientation="vertical"
        className="ml-4 hidden md:block h-[88vh]"
      />
      <div className="w-full h-full hidden md:block">
        <div className="py-5 px-4">
          <Tabs defaultValue="profile">
            <div className="flex w-full mb-5">
              <div className="w-full">
                <TabsContent value="profile">
                  <h5 className="font-semibold">Detail Profile</h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pastikan profil anda adalah data terbaru
                  </p>
                </TabsContent>
                <TabsContent value="saldo">
                  <h5 className="font-semibold">History Saldo Point</h5>
                </TabsContent>
              </div>
              <TabsList className="flex w-fit">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="saldo">Saldo Points</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="profile">
              <Profile />
            </TabsContent>
            <TabsContent value="saldo">
              <SaldoPointHistory />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Page;
