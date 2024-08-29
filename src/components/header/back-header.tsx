"use client";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";

function BackHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <header className="w-full flex items-center md:hidden z-50 shadow bg-primary md:rounded-b-2xl h-[50px] top-0 sticky">
      <div className="w-full flex max-w-6xl mx-auto px-2 lg:px-0 items-center justify-between">
        <div className="flex md:w-fit w-full justify-start items-center space-x-2 px-2">
          <ChevronLeftIcon
            className="text-white cursor-pointer"
            onClick={() => router.back()}
          />
          <p className="text-white font-medium text-lg">{title}</p>
        </div>
      </div>
    </header>
  );
}

export default BackHeader;
