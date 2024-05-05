"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { IFlashSaleProduct, TProduct } from "@/Type";
import { debounce, nFormatter, priceMask } from "@/Helpers";
import ProductCard from "./[slug]/(product)/product-card";

function Page() {
    const [total, setTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [data, setData] = useState<TProduct[]>([]);
    const [search, setSearch] = useState("");

    const totalPage = useMemo(() => Math.ceil(total / 12), [total]);

    const getList = async () => {
        let searchParams = new URLSearchParams({
            page_num: `${pageIndex}`,
            page_size: "30",
            search,
        });

        var res = await fetch(`/api/products/items?` + searchParams);

        if (res.ok) {
            const dataJson = await res.json();
            if (dataJson.data) {
                setData(dataJson.data);
                setTotal(dataJson.pagination.total_data);
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            setData([]);
            setTotal(0);
        }
    };

    useEffect(() => {
        (async () => {
            await getList();
        })();
    }, [search, pageIndex]);

    const doSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, 500);

    return (
        <div className="md:mx-2">
            <div className="flex px-2 sticky top-12 py-4 bg-white flex-col space-y-1.5 mb-3">
                <p className="font-semibold text-lg">Produk</p>
                <div className="flex space-x-1">
                    <Input
                        id="invoice"
                        placeholder="Search..."
                        className="bg-white"
                        onChange={doSearch}
                    />
                </div>
            </div>
            <div className="min-h-[72vh]">
                <div className="grid sm:grid-cols-4 md:grid-cols-6 grid-cols-2 gap-2 mx-2">
                    {data?.map((item, idx) => (
                        <div className="w-full h-full" key={`${idx}`}>
                            <ProductCard
                                category={item.category_alias}
                                name={item.product_name}
                                price={`${priceMask(item.sale_price)}`}
                                onClick={() => {}}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4 mt-2">
                <p className="text-xs text-muted-foreground mx-2">
                    Total {total} data
                </p>
                <div className="flex items-center justify-end space-x-2">
                    <p className="font-semibold text-xs mr-2">
                        Page {pageIndex} of {totalPage}
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPageIndex((prev) => prev - 1)}
                        disabled={pageIndex == 1}
                        className="flex items-center justify-center"
                    >
                        <span>Prev</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPageIndex((prev) => prev + 1)}
                        disabled={pageIndex >= totalPage}
                        className="flex justify-center items-center"
                    >
                        <span>Next</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Page;