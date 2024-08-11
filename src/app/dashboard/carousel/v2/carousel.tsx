import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel,
} from "@/components/ui/carousel";
import { IBanner } from "@/types/utils";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

function CarouselV2({ data }: { data: IBanner[] }) {
  return (
    <div
      style={{ backgroundImage: 'url("/assets/illustration/v1/carousel.svg")' }}
      className="bg-no-repeat bg-cover"
    >
      <div className="bg-slate-100 flex justify-center items-center md:py-4">
        <Carousel
          className="w-fit"
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
            className="max-h-72 "
          >
            {data.map((item, index) => (
              <CarouselItem
                key={index.toString()}
                className="flex justify-center "
              >
                <img
                  key={index}
                  src={item.image_url}
                  alt={item.name}
                  sizes="100%"
                  style={{ aspectRatio: 27 / 9 }}
                  className={`object-cover md:rounded-lg h-full w-auto duration-500 bg-slate-200`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16 bg-background" />
          <CarouselNext className="mr-16 bg-background" />
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselV2;
