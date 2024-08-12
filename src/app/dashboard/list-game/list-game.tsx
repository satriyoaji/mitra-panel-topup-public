"use client";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { IProductCategory, TProductGroup } from "@/Type";
import { CubeIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ListGameWrapper from "./list-game-wrapper";
// import Image from "next/image";

export default function ListGame() {
  const [group, setGroup] = useState<TProductGroup>({
    id: "",
    name: "All",
  });
  const [data, setData] = useState<Array<IProductCategory>>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<TProductGroup[]>([]);

  const totalPage = useMemo(() => Math.ceil(total / 8), [total]);

  const getData = async (more: boolean) => {
    setLoading(true);
    var res = await fetch(
      `/api/products/categories/?` +
        new URLSearchParams({
          page: `${pageIndex}`,
          limit: "10",
          label_id: `${group?.id ?? ""}`,
        })
    );

    setLoading(false);
    if (res.ok) {
      var result = await res.json();

      if (result.data) {
        if (more) setData((prev) => [...prev, result.data]);
        else setData(result.data);
      } else {
        if (!more) setData([]);
      }

      setTotal(result.manifest.total);
    }
  };

  const getGroup = async () => {
    var res = await fetch(`/api/products/groups/?`);

    if (res.ok) {
      let data: TProductGroup[] = [
        {
          id: "",
          name: "All",
        },
      ];
      var result = await res.json();
      data = data.concat(result.data);
      setGroups(data);
    }
  };

  useEffect(() => {
    getGroup();
  }, []);

  useEffect(() => {
    setPageIndex(1);
    getData(false);
  }, [group]);

  useEffect(() => {
    if (pageIndex > 0) getData(true);
  }, [pageIndex]);

  const showMore = () => {
    setPageIndex((last) => last + 1);
  };

  return (
    <ListGameWrapper>
      <div className="md:flex md:items-end md:justify-between sticky z-10 top-6 py-2 rounded-t-lg bg-background backdrop-blur-md">
        <div className="flex md:block items-end justify-between mt-4">
          <h5 className="mr-8 font-semibold px-2 mb-2">Kategori</h5>
          <div
            className="no-scrollbar z-10 mb-2 md:mb-0"
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {groups.map((val, idx) => (
              <Badge
                className={`mx-1 cursor-pointer inline-block whitespace-nowrap`}
                variant={val.id == group.id ? "default" : "secondary"}
                key={`${idx}`}
                onClick={() => {
                  setData([]);
                  setGroup(val);
                }}
              >
                {val.name}
              </Badge>
            ))}
          </div>
        </div>
        {/* <Input
          onChange={doSearch}
          placeholder="Search..."
          className="bg-background md:max-w-xs"
        /> */}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 md:gap-4 gap-2 mt-4 place-items-center justify-center px-2">
        {data.map((val: IProductCategory, idx) => (
          <Link href={`/games/${val.key}`} key={idx} className="w-full h-full">
            <Card className="w-full h-full min-w-fit rounded-xl hover:bg-slate-50">
              <CardContent className="p-1 md:p-2 flex flex-col items-center">
                <div className="overflow-clip rounded-xl w-full bg-background aspect-square flex justify-center items-center">
                  {val.image_url !== "" ? (
                    <img
                      alt={val.name}
                      className="rounded-xl w-full hover:scale-125 transition duration-300 hover:rotate-12"
                      src={val.image_url}
                    />
                  ) : (
                    <div className="w-full aspect-square hover:scale-125 flex justify-center items-center transition z-0 duration-300 hover:rotate-12">
                      <CubeIcon className="text-white m-auto h-20 w-20" />
                    </div>
                  )}
                </div>
                <p className="md:text-xs text-[70%] text-center my-2">
                  {val.name}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {loading ? (
        <div className="h-[20vh] flex items-center justify-center">
          <svg
            className="text-gray-300 animate-spin"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path
              d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-900"
            ></path>
          </svg>{" "}
        </div>
      ) : null}
      {pageIndex < totalPage ? (
        <div className="flex items-center justify-center my-2 mt-6">
          <Button size="sm" onClick={showMore}>
            Show More
          </Button>
        </div>
      ) : null}
    </ListGameWrapper>
  );
}
