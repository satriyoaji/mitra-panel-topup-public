import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel,
  CarouselApi,
} from "@/components/ui/carousel";
import { IBanner } from "@/types/utils";
import React, { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

function CarouselV2({ data }: { data: IBanner[] }) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div>
      <div className="bg-background flex justify-center items-center md:py-4">
        <Carousel
          setApi={setApi}
          className="h-auto w-full max-w-6xl shadow md:rounded-lg"
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 7500,
            }),
          ]}
        >
          <CarouselContent
            style={{ aspectRatio: 27 / 9 }}
            className="md:rounded-lg"
          >
            {data.map((item, index) => (
              <CarouselItem
                key={index.toString()}
                className="flex justify-center md:rounded-lg overflow-clip"
              >
                <Image
                  key={index}
                  src={item.image_url}
                  alt={item.name}
                  width={3000}
                  height={1000}
                  style={{ aspectRatio: 27 / 9 }}
                  className={`object-cover h-full w-auto md:rounded-lg duration-500 bg-zinc-200`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {data.length > 1 ? (
            <div className="flex justify-end mr-2">
              <div className="flex bg-background/95 ml-1 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-1 rounded-xl mt-[-1.5rem] absolute cursor-pointer">
                <ChevronLeftIcon
                  width={12}
                  height={12}
                  className="mx-1 bg-wh"
                  onClick={() => api?.canScrollPrev() && api?.scrollPrev()}
                />
                <ChevronRightIcon
                  width={12}
                  height={12}
                  className="mx-1"
                  onClick={() => api?.canScrollNext() && api?.scrollNext()}
                />
              </div>
            </div>
          ) : null}
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselV2;
