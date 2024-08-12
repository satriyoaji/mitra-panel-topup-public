"use client";

import React, { useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Poppins as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ISiteProfile } from "@/types/utils";
import Loading from "./loading";
import { HexToHSL } from "@/Helpers";

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: "500",
});

function ThemeWrapper({ children }: { children: React.ReactNode }) {
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
      <body className={"min-h-screen bg-repeat antialiased"}>
        <div className={"bg-slate-50"}>{children}</div>
        <Toaster />
      </body>
    </>
  );
}

export default ThemeWrapper;
