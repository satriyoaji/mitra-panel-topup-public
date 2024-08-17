"use client";

import { priceMask } from "@/Helpers";
import { SketchLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useCallback, useContext, useMemo } from "react";

type prop = {
  selected?: boolean;
  onClick: () => void;
  name: string;
  imageURL: string;
  price: number;
  discountedPrice: number | undefined;
  discount?: string | undefined;
  // category: string;
  // type?: productType;
};

function ProductCard(props: prop) {
  const discountPercent = useMemo(() => {
    if (props.discountedPrice)
      return Math.ceil(
        ((props.price - props.discountedPrice) / props.price) * 100
      );
    return null;
  }, [props.discountedPrice, props.price]);

  return (
    <div
      className={`min-h-[4rem] overflow-clip flex items-center py-1 pr-1 relative h-full bg-white hover:bg-slate-50 rounded-xl cursor-pointer ${
        props.selected ? `border-2 border-primary` : "border"
      }`}
      onClick={props.onClick}
    >
      {props.discountedPrice ? (
        <div className="absolute right-0 top-0 py-0.5 px-1 bg-amber-300 rounded-bl-lg">
          <p className="font-bold text-xs">{discountPercent}%</p>
        </div>
      ) : null}
      <div className="p-0 flex flex-col m-0">
        {/* <div className="flex flex-row-reverse">
                        <div>
                            <div
                                style={{ fontSize: "65%" }}
                                className="text-xs bg-red-500 w-fit flex text-white font-semibold space-x-1 px-2 py-0.5 rounded-bl-lg rounded-tr"
                            >
                                <p>Hemat {priceMask(data?.discount_price)}</p>
                                <LightningBoltIcon />
                            </div>
                        </div>
                    </div> */}
        <div className="flex h-full items-start">
          <div className="flex space-x-0.5 pl-3 ">
            <div className="overflow-clip rounded w-fit min-w-[2rem]">
              {props.imageURL ? (
                <Image
                  width={30}
                  height={30}
                  alt={props.name}
                  className="rounded hover:scale-125 transition duration-300 hover:rotate-12"
                  src={props.imageURL}
                />
              ) : (
                <div className="p-1 aspect-square hover:scale-125 transition duration-300 hover:rotate-12 flex justify-center items-center">
                  <SketchLogoIcon className="m-auto w-5 h-5" />
                </div>
              )}
            </div>
          </div>
          <div className="w-full pl-2.5 ">
            <p
              className={`text-xs font-semibold ${
                props.selected ? `text-primary` : ""
              }`}
            >
              {props.name}
            </p>
            <div className="flex justify-between items-end">
              {props.discountedPrice && props.discountedPrice > 0 ? (
                <div className="md:flex items-center gap-1">
                  <p
                    className="line-through font-normal text-muted-foreground text-xs mt-0.5"
                    style={{ fontSize: "70%" }}
                  >
                    {priceMask(props.price)}
                  </p>
                  <p
                    className="text-green-500 text-xs font-medium"
                    style={{ fontSize: "75%" }}
                  >
                    {priceMask(props.discountedPrice)}
                  </p>
                </div>
              ) : (
                <div>
                  <p
                    className="text-xs font-normal text-muted-foreground"
                    style={{ fontSize: "80%" }}
                  >
                    {priceMask(props.price)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
