"use client";

import { debounce } from "@/Helpers";
import { IProductCategory, TProduct } from "@/Type";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

function Searchbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<IProductCategory[]>([]);
  const [search, setSearch] = useState("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const getList = async () => {
    let searchParams = new URLSearchParams({
      page: `1`,
      limit: "10",
      key: search,
    });

    var res = await fetch(`/api/products/categories?` + searchParams);

    if (res.ok) {
      const dataJson = await res.json();
      if (dataJson.data) {
        setData(dataJson.data);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setData([]);
    }
  };

  React.useEffect(() => {
    (async () => {
      if (isOpen) await getList();
    })();
  }, [search, isOpen]);

  const doSearch = debounce((e: string) => {
    setSearch(e);
  }, 500);

  React.useEffect(() => {
    setData([]);
  }, [isOpen]);

  return (
    <>
      <div className="mr-2 hidden md:block">
        <button
          className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 w-40 lg:w-64"
          onClick={() => setIsOpen(true)}
        >
          <span className="hidden lg:inline-flex">Cari Produk...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>
      <div className="md:hidden text-white p-2 mr-2">
        <MagnifyingGlassIcon
          className="cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Cari Produk..." onValueChange={doSearch} />
        <CommandList className="min-h-[15rem]">
          {data.length > 0 ? (
            data.map((i, idx) => (
              <div
                key={idx}
                className="px-5 py-2 hover:bg-slate-50 cursor-pointer"
                onClick={() => {
                  router.push(`/games/${i.key}`);
                  setIsOpen(false);
                }}
              >
                <div className="text-sm">{i.name}</div>
              </div>
            ))
          ) : (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default Searchbar;
