"use client";

import CardProduct from "../../flash-sale/flash-sale-card";
import { Button } from "@/components/ui/button";
import { IFlashSaleInfo } from "@/types/flash-sale";
import Link from "next/link";
import CountdownCard from "../countdown-card";
import { parseISO } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function FlashSale({ data }: { data: IFlashSaleInfo }) {
  if (data)
    return (
      <div className="relative md:rounded-xl bg-cover mb-6">
        <div className="w-full md:rounded-xl bg-gradient-to-tl from-zinc-300 to-zinc-100 overflow-clip pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center bg-red-500 backdrop-blur-sm py-1 pr-1 rounded-2xl">
              <p className="px-2 text-sm font-semibold flex text-white">
                <span className="mr-3">
                  <Image
                    src={"/assets/illustration/lightning.gif"}
                    alt="flash"
                    width={20}
                    height={20}
                  />
                </span>
                {data.name}
              </p>
              <CountdownCard
                theme="light"
                date={parseISO(data.expired_at)}
                onExpired={() => {}}
              />
            </div>
            {data.products.length > 8 && (
              <Link href="/flash-sale">
                <Button size="sm" variant="link">
                  See More
                </Button>
              </Link>
            )}
          </div>
          <div className="">
            <div className="bg-cover rounded-xl">
              <Carousel className="py-3 w-full rounded-xl">
                <CarouselContent className="mx-1.5 w-full">
                  {data?.products?.slice(0, 8).map((item, idx) => (
                    <CarouselItem
                      className="h-full w-full min-w-[9.5rem] max-w-[11.5rem]"
                      key={`${idx}`}
                    >
                      <CardProduct data={item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="ml-14 bg-background" />
                <CarouselNext className="mr-14 bg-background" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FlashSale;
