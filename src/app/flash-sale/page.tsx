"use client";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useEffect, useState } from "react";
import FlashSaleCard from "./flash-sale-card";
import { debounce } from "@/Helpers";
import Image from "next/image";
import Loading from "../loading";
import { IFlashSaleInfo } from "@/types/flash-sale";
import CountdownCard from "../dashboard/countdown-card";
import { parseISO } from "date-fns";

function Page() {
  const [data, setData] = useState<IFlashSaleInfo | undefined>();
  const [loading, setLoading] = useState(true);

  const getFlashSale = async () => {
    let searchParams = new URLSearchParams({});

    setLoading(true);
    var res = await fetch(`/api/flash-sales?` + searchParams);
    setLoading(false);
    if (res.ok) {
      const dataJson = await res.json();
      if (dataJson.data) {
        setData(dataJson.data);
        // setTotal(dataJson.pagination.total_data);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setData(undefined);
    }
  };

  useEffect(() => {
    (async () => {
      await getFlashSale();
    })();
  }, []);

  if (data && data.products.length > 0)
    return (
      <div className={`container max-w-6xl`}>
        <div className="flex px-2 sticky top-10 py-4 bg-background backdrop-blur-lg rounded-b-xl flex-col space-y-1.5 mb-3 z-10">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-lg flex">
              <span className="mr-3">
                <Image
                  src={"/assets/illustration/lightning.gif"}
                  alt="flash"
                  title="flash"
                  width={20}
                  height={20}
                />
              </span>
              {data.name}
            </p>
            <CountdownCard date={parseISO(data.expired_at)} />
          </div>
        </div>
        <div className="min-h-[68vh]">
          {loading ? (
            <Loading />
          ) : (
            <>
              {data && data.products?.length > 0 ? (
                <div className="grid sm:grid-cols-4 xl:grid-cols-6 grid-cols-2 gap-2 mx-2">
                  {data.products.map((item, idx) => (
                    <div className="w-full h-full" key={`${idx}`}>
                      <FlashSaleCard data={item} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  {/* <Image
                    src={
                      "/assets/illustration/DrawKit Larry Character Illustration (10).svg"
                    }
                    className="opacity-50"
                    alt="dw"
                    title="dw"
                    height={400}
                    width={400}
                  /> */}
                  <h5 className="text-xl font-bold">Tidak ada Flash Sale</h5>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );

  return (
    <div
      className={`container min-h-full flex items-center justify-center md:mx-2 px-4`}
    >
      <h4 className="text-2xl text-muted-foreground font-semibold my-10">
        Tidak ada Flash Sale
      </h4>
    </div>
  );
}

export default Page;
