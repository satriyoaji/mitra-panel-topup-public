"use client";

import { priceMask } from "@/Helpers";
import React, { useMemo } from "react";

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
      className={`min-h-[4.2rem] overflow-clip flex items-center p-2 relative h-full bg-white hover:bg-slate-50 rounded-xl cursor-pointer ${
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
        <div className="flex h-full items-start">
          {/* <div className="flex space-x-0.5 pl-3 ">
            <div className="overflow-clip rounded w-fit min-w-[2rem]">
              <Image
                width={30}
                height={30}
                alt={props.name}
                className="rounded hover:scale-125 transition duration-300 hover:rotate-12"
                src={
                  props.imageURL ??
                  "https://s3-alpha-sig.figma.com/img/933a/09a5/c2747dd0ee221420e9c6686f29720965?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K3KMtkf5K~~yfNXa2ea9tssgpbLWFv1iMb8SsvtvV3ge91j3ZZW4AmC0xllLpF4amUV-ynFUhLL-V67bEY1ZVqHfVomDFdxW920v8ewfTclN1ZVIp1u2LgV1AmDbyh~SvyFud9HrNh1H5tP-9Rnm-RKir5IS8mJaSDzNi20CeDaossF7AONxvkwNQnZCunulKYElAo133CzmYW~VeNY4WiGIAdMo-pHrAPdXLKSJ9k56scwyeUVy6gVXPe6ePXg3UnqsojH6T43JeQL2qB0O-vU~Fgmbf60Ybt-lz-DzJe21vr2RXgC8Hmb0M8n53D5~gIndUD7CSa~Cjcakv5Cduw__"
                }
              />
            </div>
          </div> */}
          <div className="w-full pl-1 ">
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
