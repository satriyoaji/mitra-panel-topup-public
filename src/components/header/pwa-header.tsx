"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Cross1Icon, DownloadIcon } from "@radix-ui/react-icons";
import { ISiteProfile } from "@/types/utils";

function PWAAlert({ profile }: { profile?: ISiteProfile }) {
  const [open, setOpen] = useState(true);
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt: any) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) return null;

  if (open)
    return (
      <div className="bg-zinc-50">
        <div className="flex flex-row items-start justify-center w-full">
          <div className="w-full flex justify-between container items-center p-1 space-x-2">
            <div className="flex items-center p-1 space-x-4">
              <Button className="flex space-x-1" size="sm" onClick={onClick}>
                <DownloadIcon className="w-3 h-3" />
                <p className="text-xs">Install {profile?.name}</p>
              </Button>
              <p className="text-xs">Akses cepat dari home screen</p>
            </div>
            <div>
              <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
                <Cross1Icon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default PWAAlert;
