"use client";
import React, { useContext, useEffect, useState } from "react";
import { TProductItem } from "@/Type";
import { priceMask } from "@/Helpers";
import ProductCard from "./[slug]/(product)/product-card";
import Image from "next/image";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import Filter from "./filter";
import Pagination from "@/components/pagination";
import { TValue } from "@/components/ui/combobox";
import ThemeContext, {
  IThemeContext,
} from "@/infrastructures/context/theme/theme.context";

function Page() {
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [data, setData] = useState<TProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<TValue | undefined>();
  const { data: theme } = useContext(ThemeContext) as IThemeContext;
  const route = useRouter();

  const getList = async () => {
    let searchParams = new URLSearchParams({
      page_num: `${pageIndex}`,
      page_size: "30",
    });

    setLoading(true);
    if (category) {
      var res = await fetch(
        `/api/products/items/${category.value}?` + searchParams
      );

      if (res.ok) {
        const dataJson = await res.json();

        if (dataJson.data) {
          setData(dataJson.data);
          setTotal(dataJson.data.length);
          window.scrollTo({ top: 0, behavior: "smooth" });
          setLoading(false);
          return;
        }
        setData([]);
        setTotal(0);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await getList();
    })();
  }, [pageIndex, category]);

  return (
    <div
      className={`container ${
        theme.version !== "1" ? "max-w-6xl" : "md:mx-2 px-4"
      }`}
    >
      <div className="flex px-2 sticky top-10 py-4 bg-transparent backdrop-blur-lg rounded-b-xl flex-col space-y-1.5 mb-3 z-10">
        <p className="font-semibold text-lg">Produk</p>
        <Filter onChange={setCategory} />
      </div>
      <div className="min-h-[68vh]">
        {loading ? (
          <Loading />
        ) : (
          <>
            {data.length > 0 ? (
              <div className="grid sm:grid-cols-4 xl:grid-cols-6 grid-cols-2 gap-2 mx-2">
                {data.map((item, idx) => (
                  <div className="w-full h-full" key={`${idx}`}>
                    <ProductCard
                      // category={item.category_alias}
                      discountedPrice={item.discounted_price}
                      name={item.name}
                      imageURL={item.image_url}
                      price={`${priceMask(item.price)}`}
                      onClick={() =>
                        route.push(`/games/${category?.value}?item=${item.key}`)
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <Image
                  src={
                    "/assets/illustration/DrawKit Larry Character Illustration (10).svg"
                  }
                  className="opacity-50"
                  alt="dw"
                  width={500}
                  height={500}
                />
                <h5 className="text-xl font-bold -mt-10">Item Kosong</h5>
              </div>
            )}
          </>
        )}
      </div>
      <Pagination
        onChange={setPageIndex}
        meta={{
          limit: 12,
          page: pageIndex,
          total,
        }}
      />
    </div>
  );
}

export default Page;
