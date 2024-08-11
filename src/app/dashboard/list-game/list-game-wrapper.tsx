import { GetCookie } from "@/infrastructures/cookieStore";
import React from "react";

function ListGameWrapper({ children }: { children: React.ReactNode }) {
  let version = GetCookie("version");
  if (version == "1") return children;
  return (
    <div className="bg-background pb-4 flex justify-center rounded-t-xl">
      <div className="w-full max-w-6xl px-2">{children}</div>
    </div>
  );
}

export default ListGameWrapper;
