"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import TransactionProvider from "@/infrastructures/context/transaction/transaction.provider";
import { useEffect, useState } from "react";
import { ISiteProfile } from "@/types/utils";
import { HexToHSL } from "@/Helpers";
import Loading from "./loading";
import Header from "@/components/header/page-header-v1";
import PWAAlert from "@/components/header/pwa-header";
import BottomNav from "@/components/bottom-nav";
import Footer from "@/components/footer";
import HelpButton from "@/components/help-button";
import { Toaster } from "@/components/ui/toaster";

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
        <TransactionProvider>
          <div className="bg-background">
            <PWAAlert profile={profile} />
            <Header profile={profile} />
            <div className={`w-full flex justify-center`}>
              <div
                className={`min-h-screen md:max-w-6xl bg-background pb-4 w-full`}
              >
                {children}
              </div>
              <BottomNav />
            </div>
            <Footer profile={profile} />
            <HelpButton />
            <Toaster />
          </div>
        </TransactionProvider>
      </SessionProvider>
    </>
  );
}
