"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  DiscIcon,
  ExitIcon,
  LockClosedIcon,
  Pencil1Icon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import DetailProfile from "./detail-profile";
import SaldoPointHistory from "./saldopoint-history";
import Profile from "./(tabs)/profile";
import Tier from "@/components/tier";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SaldoCard from "./saldo-card";
import { IProfile } from "@/Type";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { DocumentTextIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import Password from "./password";

function Page() {
  const { data: session } = useSession();
  const { dispatch } = useContext(TransactionContext) as ITransactionContext;
  const [loading, setLoading] = useState(false);
  const [dataProfile, setDataProfile] = useState<IProfile | null>(null);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const toggleModalProfile = () => {
    setProfileOpen(false);
    getData();
  };

  const getData = async () => {
    setLoading(true);
    var res = await fetch(`/api/profile`);
    if (res.ok) {
      var result = await res.json();
      if (result.data) {
        dispatch({
          action: "SET_PROFILE",
          payload: result.data,
        });
        setDataProfile(result.data);
      }
    } else
      dispatch({
        action: "SET_PROFILE",
        payload: null,
      });

    setLoading(false);
  };

  return (
    <div className="md:flex gap-4 md:pt-4">
      <div className="md:border md:shadow min-w-[22rem] h-max rounded-xl p-2 md:p-4 md:top-16 md:sticky">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex">
              <Avatar className="my-1">
                <AvatarImage
                  src={
                    dataProfile?.name
                      ? dataProfile?.name
                      : (session?.profile?.name as string)
                  }
                  alt={
                    dataProfile?.name
                      ? dataProfile?.name
                      : (session?.profile?.name as string)
                  }
                />
                <AvatarFallback>
                  {dataProfile?.name
                    ? dataProfile?.name.at(0)
                    : session?.profile?.name?.at(0) ?? ""}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex">
              <p className="font-bold text-lg">
                {dataProfile?.name ? dataProfile?.name : session?.profile?.name}
              </p>
              <Pencil1Icon
                onClick={() => setProfileOpen(true)}
                className="cursor-pointer ml-1 mt-1 md:hidden"
              />
            </div>
          </div>
          <Tier
            type={
              dataProfile?.tier_name
                ? dataProfile?.tier_name
                : session?.profile?.tier_name ?? "Public"
            }
          />
        </div>
        <Separator className="w-full my-2" />
        <div className="mt-6 w-full">
          <SaldoCard balance={dataProfile?.saldo ?? 0} />
        </div>
        <div className="mt-6 mb-4">
          <Dialog>
            <DialogTrigger className="w-full">
              <p className="flex px-3 space-x-3 py-2 items-center text-sm w-full cursor-pointer hover:bg-slate-50">
                <LockClosedIcon className="mr-3" /> Reset Password
              </p>
            </DialogTrigger>
            <DialogContent>
              <div>
                <h4 className="font-semibold p-0">Keamanan Akun</h4>
                <p className="text-xs text-muted-foreground">
                  Ubah Keamanan Akun
                </p>
              </div>
              <Password />
            </DialogContent>
          </Dialog>
          <Link
            href="/saldo"
            className="flex px-3 py-2 space-x-3 items-center text-sm hover:bg-slate-50"
          >
            <DiscIcon className="mr-3" /> Saldo Point History
          </Link>
          <Link
            href="/transaksi"
            className="flex px-3 py-2 space-x-3 items-center text-sm hover:bg-slate-50"
          >
            <ReaderIcon className="mr-3" /> Daftar Transaksi
          </Link>
          <Separator className="my-1 w-full" />
          <Link
            href="/kebijakan"
            className="flex px-3 py-2 space-x-3 items-center text-sm hover:bg-slate-50"
          >
            <ShieldCheckIcon className="mr-3 h-4 w-4" /> Kebijakan Privasi
          </Link>
          <Link
            href="/syarat-ketentuan"
            className="flex px-3 py-2 space-x-3 items-center text-sm hover:bg-slate-50"
          >
            <DocumentTextIcon className="mr-3 h-4 w-4" /> Syarat dan Ketentuan
          </Link>
          <p
            onClick={() => signOut()}
            className="flex px-3 space-x-3 py-2 items-center text-sm cursor-pointer hover:bg-slate-50"
          >
            <ExitIcon className="mr-3" /> Logout
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className="ml-4 hidden md:block" />
      <div className="w-full hidden md:block">
        <div className="px-4">
          <Tabs defaultValue="profile">
            <div className="flex w-full mb-5">
              <TabsList className="flex md:w-fit w-full">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="saldo">Saldo Points</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="profile">
              <div className="flex justify-start gap-4 items-center">
                <p className="font-semibold p-0 text-lg">Detail Profil</p>
                <Pencil1Icon
                  onClick={() => setProfileOpen(true)}
                  className="cursor-pointer"
                />
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Pastikan profil anda adalah data terbaru
              </p>
              <Profile data={dataProfile} />
            </TabsContent>
            <TabsContent value="saldo">
              <div className="flex justify-start gap-4 items-center">
                <p className="font-semibold p-0 text-lg">History Saldo Point</p>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Merupakan Saldo Refund dari Transaksi Anda
              </p>
              <SaldoPointHistory />
            </TabsContent>
          </Tabs>

          <Dialog onOpenChange={setProfileOpen} open={profileOpen}>
            <DialogContent className="sm:max-w-md">
              <DetailProfile
                data={dataProfile}
                onSuccess={() => toggleModalProfile}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Page;
