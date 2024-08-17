"use client";

import { IBanner } from "@/types/utils";
import { useEffect, useState } from "react";
import Carousel from "./carousel";
import Loading from "./loading";

const CarouselWrapper = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    var res = await fetch("/api/banners");

    var data = await res.json();
    setBanners(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading)
    return (
      <div className="bg-background flex justify-center items-center md:py-4">
        <Loading />
      </div>
    );

  if (banners && banners.length > 0) {
    return <Carousel data={banners} />;
  }
};

export default CarouselWrapper;
