import { priceMask } from "@/Helpers";
import { Card, CardContent } from "@/components/ui/card";
import {
  IdCardIcon,
  LightningBoltIcon,
  SketchLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";

type productType = undefined | "flash-sale" | "promo";

type prop = {
  selected?: boolean;
  onClick: () => void;
  name: string;
  imageURL: string;
  price: string;
  discountedPrice: number | undefined;
  discount?: string | undefined;
  // category: string;
  // type?: productType;
};

function ProductCard(props: prop) {
  return (
    <Card
      className={`h-full min-h-[6rem] hover:bg-slate-50 rounded-xl cursor-pointer ${
        props.selected && "border-2 border-primary"
      }`}
      onClick={props.onClick}
    >
      {/* {props.discount && (
                <div className="flex flex-row-reverse">
                    <div>
                        <div
                            style={{ fontSize: "65%" }}
                            className="text-xs bg-red-500 w-fit flex text-white font-semibold space-x-1 px-2 py-0.5 rounded-bl-lg rounded-tr-md"
                        >
                            <p>Hemat {props?.discount}</p>
                            <LightningBoltIcon />
                        </div>
                    </div>
                </div>
            )} */}
      <div className="p-3 space-y-2 flex flex-col justify-between h-full">
        <div className="flex space-x-2">
          <div className="overflow-clip rounded w-fit min-w-[2rem]">
            {props.imageURL !== "" ? (
              <Image
                width={30}
                height={30}
                alt="Remy Sharp"
                className="rounded hover:scale-125 transition duration-300 hover:rotate-12"
                src={props.imageURL}
              />
            ) : (
              <div className="p-1 aspect-square hover:scale-125 transition duration-300 hover:rotate-12 flex justify-center items-center">
                <SketchLogoIcon className="m-auto w-5 h-5" />
              </div>
            )}
          </div>
          <p className="text-xs">{props.name}</p>
        </div>
        <div className="mx-2">
          {props.discountedPrice && props.discountedPrice > 0 ? (
            <div className="flex justify-between items-end">
              <div>
                <p
                  className="line-through text-xs mt-0.5"
                  style={{ fontSize: "60%" }}
                >
                  {props.price}
                </p>
                <p
                  className="text-red-500 text-xs font-medium"
                  style={{ fontSize: "80%" }}
                >
                  {priceMask(props.discountedPrice)}
                </p>
              </div>
              <div className="bg-red-500 text-white -mr-4 -mb-2 rounded-br-lg rounded-tl-md p-1">
                <LightningBoltIcon />
              </div>
            </div>
          ) : (
            <p
              className="text-xs font-medium mt-0.5"
              style={{ fontSize: "80%" }}
            >
              {props.price}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
