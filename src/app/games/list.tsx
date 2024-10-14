"use client";
import React, { useEffect, useState } from "react";
import { TProductItem } from "@/Type";
import ProductCard from "./[slug]/(product)/product-card";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import Filter from "./filter";
import { TValue } from "@/components/ui/combobox";

function ListCategory() {
  const [data, setData] = useState<TProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<TValue | undefined>();
  const route = useRouter();

  const getList = async () => {
    let searchParams = new URLSearchParams({});

    setLoading(true);
    if (category) {
      var res = await fetch(
        `/api/products/items/${category.value}?` + searchParams
      );

      if (res.ok) {
        const dataJson = await res.json();

        if (dataJson.data) {
          setData(dataJson.data);
          window.scrollTo({ top: 0, behavior: "smooth" });
          setLoading(false);
          return;
        }
        setData([]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await getList();
    })();
  }, [category]);

  return (
    <div className="bg-background w-full min-h-[64vh]">
      <div className="flex px-2 sticky top-10 py-4 bg-background rounded-b-xl flex-col space-y-1.5 z-10">
        <p className="font-semibold text-primary p-0 text-xl">Produk 🕹️</p>
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
                      price={item.price}
                      onClick={() =>
                        route.push(`/games/${category?.value}?item=${item.key}`)
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full w-full"></div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ListCategory;
