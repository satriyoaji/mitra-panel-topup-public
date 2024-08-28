"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ISosmed } from "@/types/utils";
import Socmed from "./socmed-icon";
import { usePathname } from "next/navigation";
import Link from "next/link";

function HelpButton() {
  const [data, setData] = useState<ISosmed[]>([]);
  const path = usePathname();

  useEffect(() => {
    (async () => {
      var res = await fetch("/api/social-media");
      if (res.ok) {
        var data = await res.json();
        setData(data.data);
        return;
      }

      setData([]);
    })();
  }, []);

  if (!path.includes("/games/"))
    return (
      <div className="fixed bottom-0 h-0 z-10 w-full border-t-2 shadow-md bg-background/0 backdrop-blur supports-[backdrop-filter]:bg-background/0">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={`gap-2 md:bottom-8 opacity-100 flex justify-center items-center fixed z-90 bottom-14 right-2 rounded-full drop-shadow-lg text-white transition-all bg-primary hover:drop-shadow-2xl duration-300`}
            >
              <ChatBubbleIcon />
              <p>Bantuan</p>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <h4 className="font-medium text-xs leading-none">Bantuan</h4>
              <p className="text-xs text-muted-foreground">
                Anda bisa meminta bantuan melalui link dibawah.
              </p>
              {data.map((item) => (
                <Link
                  href={`${item.value}`}
                  className={`flex hover:bg-zinc-50 gap-4 px-2 cursor-pointer items-center`}
                  key={item.key}
                >
                  <div
                    className={`w-7  p-0.5 rounded-full flex items-center justify-center`}
                  >
                    <Socmed type={item.key} />
                  </div>
                  <p className={`text-xs text-primary`}>{item.name}</p>
                </Link>
              ))}
              {/* {data.map((item) => (
                <div
                  className="flex hover:bg-slate-50 gap-4 px-2 cursor-pointer items-center"
                  key={item.key}
                >
                  <div className="w-7 p-0.5 rounded-full flex items-center justify-center">
                    <Socmed type={item.key} />
                  </div>
                  <p className="text-xs hover:text-primary">{item.name}</p>
                </div>
              ))} */}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
}

export default HelpButton;
