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
import Autoplay from "embla-carousel-autoplay";

function FlashSale({ data }: { data: IFlashSaleInfo }) {
  if (data)
    return (
      <div className="relative md:rounded-xl bg-cover mb-2 sm:mt-4">
        <div className="w-full md:rounded-xl bg-gradient-to-tl from-zinc-300 to-zinc-100 overflow-clip pb-1">
          <div className="flex justify-between items-center mx-2 pt-2 sm:pt-0">
            <div className="flex items-center justify-between sm:justify-start bg-red-500 backdrop-blur-sm py-1 pr-1 w-full sm:w-fit rounded-2xl">
              <div className="flex">
                <Image
                  src={"/assets/illustration/lightning.gif"}
                  alt="flash"
                  title="flash"
                  width={20}
                  height={20}
                  className="ml-3"
                />
                <p className="px-2 text-sm font-semibold flex text-white">
                  {data.name}
                </p>
              </div>
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
              <Carousel
                opts={{
                  align: "center",
                  dragFree: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 7500,
                  }),
                ]}
                className="py-3 w-full rounded-xl"
              >
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
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FlashSale;
