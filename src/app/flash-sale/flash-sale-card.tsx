import React from "react";
import Link from "next/link";
import { priceMask } from "@/Helpers";
import { IFlashSaleInProduct } from "@/types/flash-sale";

function FlashSaleCard({
  data,
  selected,
}: {
  data: IFlashSaleInProduct;
  selected?: boolean;
}) {
  const disc = Math.ceil(
    ((data.price - data.discounted_price) / data.price) * 100
  );
  return (
    <Link
      href={`/games/${data.category_key}?item=${data.key}`}
      className="w-full h-full"
    >
      <div
        className={`min-h-[6rem] h-full bg-white hover:bg-zinc-50 rounded-xl overflow-clip border-t-0 border-r-0 ${
          selected ? "border-4" : "border"
        }`}
      >
        <div className="p-0 flex flex-col m-0 h-full">
          <div className="pt-3 flex flex-col justify-between h-full items-start">
            <div className="flex space-x-0.5 px-3 ">
              <p className="text-xs font-semibold">{data.name}</p>
            </div>
            <div className="w-full px-3 ">
              <div className="flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-1">
                    <p className="px-1 pt-1 pb-0.5 font-semibold text-xs my-0.5 rounded-md bg-amber-300">
                      {disc}%
                    </p>
                    <p
                      className="line-through text-xs mt-0.5"
                      style={{ fontSize: "70%" }}
                    >
                      {priceMask(data.price)}
                    </p>
                  </div>
                  <p
                    className="text-red-500 text-xs font-medium"
                    style={{ fontSize: "80%" }}
                  >
                    {priceMask(data.discounted_price)}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-full w-full flex items-end mt-2.5">
              <div className="bg-zinc-100 text-zinc-400 w-full">
                <p className="text-xs text-center p-1">{data.category_key}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FlashSaleCard;
