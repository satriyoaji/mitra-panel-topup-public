import { TProductItem, TProduct } from "@/Type";
import { Input } from "@/components/ui/input";
import React, {
  ChangeEvent,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ProductCard from "./product-card";
import { debounce, priceMask } from "@/Helpers";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";

interface IProductList {
  // category: string;
  products: TProductItem[];
  // productSelected?: TProductItem;
  nextRef: RefObject<HTMLDivElement>;
}

interface productType {
  title: React.JSX.Element;
  type: "flash-sale";
}

function ProductList(prop: IProductList) {
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;
  const [search, setSearch] = useState("");
  const [productSearch, setProductSearch] = useState<TProductItem[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  const doSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, 500);

  useEffect(() => {
    const data = prop.products.filter((item) => item.name.includes(search));
    setProductSearch(data);
  }, [search]);

  return (
    <>
      <Input
        placeholder="Cari Produk..."
        onChange={doSearch}
        className="mb-4 w-full"
      />
      <div
        className="relative max-h-[30rem] overflow-y-auto pt-4 -mx-2 px-2"
        ref={ref}
      >
        <div className="grid md:grid-cols-3 grid-cols-2 gap-2 -mt-2">
          {(search ? productSearch : prop.products).map((val) => {
            const item = (
              <div className="h-full">
                <ProductCard
                  key={val.key}
                  selected={val.key === data.product?.key}
                  // discount={
                  //   val.flash_sales
                  //     ? priceMask(val.flash_sales[0].discount_price)
                  //     : undefined
                  // }
                  // discount={`${
                  //   ((val.price - val.discounted_price) / val.price) * 100
                  // }%`}
                  onClick={() => {
                    dispatch({
                      action: "SET_PRODUCT",
                      payload: val,
                    });
                    prop.nextRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  discountedPrice={val.discounted_price}
                  name={val.name}
                  imageURL={val.image_url}
                  price={val.price}
                />
              </div>
            );

            // if (filter) {
            //   if (filter.type === "flash-sale" && val.flash_sales)
            //     return item;
            //   return;
            // }

            return item;
          })}
        </div>
      </div>
    </>
  );
}

export default ProductList;
