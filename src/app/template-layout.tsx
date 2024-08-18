"use client";

import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import HelpButton from "@/components/help-button";
import BottomNav from "@/components/bottom-nav";
import PWAAlert from "@/components/header/pwa-header";
import { useEffect, useState } from "react";
import { ISiteProfile } from "@/types/utils";
import Header from "@/components/header/page-header-v1";

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<ISiteProfile>();

  const get = async () => {
    const res = await fetch("/api/site-profile");
    if (res.ok) {
      var body = await res.json();
      setProfile(body.data);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <PWAAlert profile={profile} />
      <Header profile={profile} />
      <div className={`w-full flex justify-center`}>
        <div
          className={`min-h-screen md:max-w-6xl bg-background pt-2 px-2 pb-4 w-full`}
        >
          {children}
        </div>
        <BottomNav />
      </div>
      <Footer profile={profile} />
      <HelpButton />
      <Toaster />
    </>
  );
}
