"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./carousel.css";
import { IBanner } from "@/types/utils";

const Carousel = ({ data }: { data: IBanner[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      next();
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [activeIndex]);

  const prev = () => {
    if (data.length > 1)
      setActiveIndex((activeIndex + data.length - 1) % data.length);
  };

  const next = () => {
    if (data.length > 1) setActiveIndex((activeIndex + 1) % data.length);
  };

  const onSwipedLeft = () => next();
  const onSwipedRight = () => prev();

  const swipeHandlers = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  return (
    <div className="block bg-slate-50 md:pt-4 pb-6 md:-mx-8 md:-mt-4">
      <div className="h-full md:pt-3 flex w-full justify-center items-center">
        <div
          {...swipeHandlers}
          className="overflow-hidden relative w-full sm:mx-8 md:rounded-xl h-full"
          style={{ aspectRatio: 3 / 1 }}
        >
          {/* <Image
                            key={index}
                            src={item.image_url}
                            alt={item.name}
                            sizes="100%"
                            height={100}
                            width={100}
                            style={{ aspectRatio: 3/1 }}
                            className={`absolute object-cover w-auto transition-opacity duration-500 ease-in-out ${
                                index === activeIndex
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        /> */}
          {data.map((item, index) => (
            <Image
              src={item.image_url}
              alt={item.name}
              key={index}
              width={900}
              height={300}
              style={{
                aspectRatio: 3 / 1,
              }}
              className={`object-cover w-full transition-all duration-500 ease-in-out ${
                index === activeIndex ? "h-full" : "h-0"
              }`}
            />
          ))}
          {/* <div>
            <Image
              // src={
              //   "https://cdn-h2h.s3.ap-southeast-1.amazonaws.com/h2h/20240621120831_66756d3f12ad47dea12a8794.webp"
              // }
              src={
                "https://cdn-h2h.s3.ap-southeast-1.amazonaws.com/h2h/20240708131834_668be72ad8c88b87876848a9.webp"
              }
              alt={"dwa"}
              height={100}
              width={100}
              style={{
                aspectRatio: 3/1,
              }}
              className={`object-cover transition-opacity duration-500 ease-in-out ${
                true ? "opacity-100" : "opacity-0"
              }`}
            />
          </div> */}
        </div>
      </div>
      {data.length > 1 ? (
        <div className="flex justify-center mr-2">
          <div className="flex bg-background/95 ml-1 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-1 rounded-xl mt-[-1.5rem] absolute cursor-pointer">
            <ChevronLeftIcon
              width={12}
              height={12}
              className="mx-1 bg-wh"
              onClick={prev}
            />
            <ChevronRightIcon
              width={12}
              height={12}
              className="mx-1"
              onClick={next}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Carousel;
