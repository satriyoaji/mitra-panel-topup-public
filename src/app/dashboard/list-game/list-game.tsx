"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { IProductCategory, TProductGroup } from "@/Type";
import { CubeIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ListGame({ name }: { name: string }) {
  const [group, setGroup] = useState<TProductGroup>({
    id: "",
    name: "All",
  });
  const [data, setData] = useState<IProductCategory[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<TProductGroup[]>([]);

  const totalPage = useMemo(() => Math.ceil(total / 12), [total]);

  const getData = async (more: boolean) => {
    setLoading(true);
    var res = await fetch(
      `/api/products/categories?` +
        new URLSearchParams({
          page: `${pageIndex}`,
          label_id: `${group?.id ?? ""}`,
          limit: "12",
        }),
      {
        next: {
          revalidate: 30,
        },
      }
    );

    setLoading(false);
    if (res.ok) {
      var result = await res.json();

      if (result.data) {
        if (more) setData((prev) => [...prev, ...result.data]);
        else setData(result.data);
      } else {
        if (!more) setData([]);
      }

      setTotal(result.manifest.total);
    }
  };

  const getGroup = async () => {
    var res = await fetch(`/api/products/groups?`);

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
    if (pageIndex > 1) getData(true);
  }, [pageIndex]);

  const showMore = () => {
    setPageIndex((last) => last + 1);
  };

  return (
    <div className="pb-4 flex justify-center rounded-t-xl">
      <div className="w-full px-2 md:px-0">
        {" "}
        <div className="md:flex md:items-end md:justify-between sticky z-10 top-10 py-2 rounded-t-lg bg-background backdrop-blur-md">
          <div className="flex items-center w-full justify-between mt-2">
            <p className="mr-8 font-semibold px-2 text-lg">Kategori</p>
            <div
              className="no-scrollbar z-10 md:mb-0"
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
                  variant={val.id == group.id ? "default" : "outline"}
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
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 md:gap-4 gap-2 mt-2 place-items-center justify-center px-2">
          {loading ? (
            [...Array(3)].map((x, i) => (
              <Skeleton key={i} className="w-full aspect-square" />
            ))
          ) : data && data.length > 0 ? (
            data.map((val: IProductCategory, idx) =>
              val.name ? (
                <Link
                  href={`/games/${val.key}`}
                  key={idx}
                  className="w-full h-full"
                >
                  <Card className="w-full h-full min-w-fit rounded-xl hover:shadow-md hover:text-primary transition duration-300">
                    <div className="p-4 md:p-5 flex flex-col items-center">
                      <div className="overflow-clip h-20 md:h-28 w-auto rounded-xl bg-background aspect-square flex justify-center items-center">
                        {val.image_url !== "" ? (
                          <Image
                            height={1000}
                            width={1000}
                            alt={`${val.name} ${name}`}
                            title={`${val.name} ${name}`}
                            className="rounded-xl w-full hover:scale-125 transition duration-300"
                            src={val.image_url}
                          />
                        ) : (
                          <div className="w-full aspect-square hover:scale-125 flex justify-center items-center transition z-0 duration-300 hover:rotate-12">
                            <CubeIcon className="text-white m-auto h-20 w-20" />
                          </div>
                        )}
                      </div>
                      <p className="md:text-xs text-[70%] text-center mt-2 p-0">
                        {val.name}
                      </p>
                    </div>
                  </Card>
                </Link>
              ) : null
            )
          ) : (
            <div className="col-span-full h-60 flex items-center justify-center">
              <h4 className="text-slate-300 font-semibold">
                Data Tidak Ditemukan
              </h4>
            </div>
          )}
        </div>
        {pageIndex < totalPage ? (
          <div className="flex items-center justify-center my-2 mt-6">
            <Button size="sm" onClick={showMore}>
              Show More
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
