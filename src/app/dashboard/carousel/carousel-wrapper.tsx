"use client";

import { IBanner } from "@/types/utils";
import { useEffect, useState } from "react";
import CarouselV1 from "./v1/carousel";

const CarouselWrapper = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);

  const getData = async () => {
    var res = await fetch("/api/banners");

    var data = await res.json();
    setBanners(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (banners && banners.length > 0) {
    return <CarouselV1 data={banners} />;
  }
};

export default CarouselWrapper;
