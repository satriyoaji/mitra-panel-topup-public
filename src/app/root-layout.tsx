"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import TransactionProvider from "@/infrastructures/context/transaction/transaction.provider";
import { useEffect, useState } from "react";
import { ISiteProfile } from "@/types/utils";
import { HexToHSL } from "@/Helpers";
import Loading from "./loading";

export default function RootTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<ISiteProfile>();
  const [loading, setLoading] = useState(true);

  const get = async () => {
    setLoading(true);
    const res = await fetch("/api/site-profile");
    if (res.ok) {
      var body = await res.json();
      setProfile(body.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: ` :root {
                             --primary: ${HexToHSL(
                               profile?.theme_color ?? "#000"
                             )};
                           }`,
        }}
      />
      <SessionProvider>
        <TransactionProvider>{children}</TransactionProvider>
      </SessionProvider>
    </>
  );
}
