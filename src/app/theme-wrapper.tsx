"use client";

import React, { useContext } from "react";
import { cn } from "@/lib/utils";
import { Poppins as FontSans } from "next/font/google";
import ThemeContext, {
  IThemeContext,
} from "@/infrastructures/context/theme/theme.context";
import { Toaster } from "@/components/ui/toaster";

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: "500",
});

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { data } = useContext(ThemeContext) as IThemeContext;

  return (
    <body className={"min-h-screen bg-repeat antialiased"}>
      <div className={"bg-slate-50"}>{children}</div>
      <Toaster />
    </body>
  );
}

export default ThemeWrapper;
