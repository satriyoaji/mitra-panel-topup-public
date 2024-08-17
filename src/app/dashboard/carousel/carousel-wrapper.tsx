"use client";

import { IBanner } from "@/types/utils";
import { useEffect, useState } from "react";
import CarouselV1 from "./v1/carousel";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="mb-4">
        <div className="h-full md:pt-2 flex w-full justify-center items-center">
          <Skeleton className="h-full w-full" style={{ aspectRatio: 3 / 1 }} />
        </div>
      </div>
    );
  if (banners && banners.length > 0) {
    return <CarouselV1 data={banners} />;
  }
};

export default CarouselWrapper;
