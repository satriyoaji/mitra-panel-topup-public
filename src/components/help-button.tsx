"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ISosmed } from "@/types/utils";
import Socmed from "./socmed-icon";

function HelpButton() {
  const [data, setData] = useState<ISosmed[]>([]);

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

  return (
    <div className="fixed bottom-0 h-0 z-10 w-full border-t-2 shadow-md bg-background/0 backdrop-blur supports-[backdrop-filter]:bg-background/0">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="destructive"
            className={`gap-2 md:bottom-8 opacity-100 flex justify-center items-center fixed z-90 bottom-16 right-4 bg-theme-secondary-500 rounded-full drop-shadow-lg text-theme-primary-foreground transition-all hover:bg-theme-secondary-700 hover:drop-shadow-2xl duration-300`}
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
              <div
                className="flex hover:bg-theme-primary-50 gap-4 px-2 cursor-pointer items-center"
                key={item.key}
              >
                <div className="w-7 p-0.5 bg-theme-secondary-500 rounded-full flex items-center justify-center">
                  <Socmed type={item.key} />
                </div>
                <p className="text-xs text-theme-primary-900">{item.name}</p>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default HelpButton;
