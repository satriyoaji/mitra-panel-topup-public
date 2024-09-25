import { TProductItem } from "@/Type";
import React, { RefObject, useContext, useRef } from "react";
import ProductCard from "./product-card";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";

interface IProductList {
  products: TProductItem[];
  nextRef: RefObject<HTMLDivElement>;
}

function ProductList(prop: IProductList) {
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;

  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className="relative md:max-h-[30rem] overflow-y-auto pt-4 px-2"
        ref={ref}
      >
        <div className="grid md:grid-cols-3 grid-cols-2 gap-2 -mt-2">
          {prop.products.map((val) => (
            <div className="h-full" key={val.key}>
              <ProductCard
                selected={val.key === data.product?.key}
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
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
