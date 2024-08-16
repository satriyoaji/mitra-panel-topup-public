import { TProductItem, TProduct } from "@/Type";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
import { Badge } from "@/components/ui/badge";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";

interface IProductList {
  number: number;
  // category: string;
  products: TProductItem[];
  // productSelected?: TProductItem;
  nextRef: RefObject<HTMLDivElement>;
}

interface productType {
  title: React.JSX.Element;
  type: "flash-sale";
}

const typeList: productType[] = [
  {
    title: (
      <>
        <LightningBoltIcon />
        <p>Flash Sale</p>
      </>
    ),
    type: "flash-sale",
  },
];

function ProductList(prop: IProductList) {
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;
  const [search, setSearch] = useState("");
  const [productSearch, setProductSearch] = useState<TProductItem[]>([]);
  const [filter, setFilter] = useState<productType>();
  const [oldScrollY, setOldScrollY] = useState<number>(0);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [direction, setDirection] = useState<"up" | "down">("down");

  const ref = useRef<HTMLDivElement>(null);

  const doSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, 500);

  useEffect(() => {
    const data = prop.products.filter((item) => item.name.includes(search));
    setProductSearch(data);
  }, [search]);

  const onScroll = (e: any) => {
    setIsScroll(true);
    const window = e.target;

    if (oldScrollY > window.scrollTop) {
      setDirection("up");
    } else if (oldScrollY < window.scrollTop) {
      setDirection("down");
    }
    setOldScrollY(window.scrollTop);
  };

  return (
    <Card className="w-full my-2">
      <CardContent>
        <div className="flex gap-2 items-center mt-3">
          <div className="bg-primary p-2 w-7 h-7 flex justify-center items-center rounded-full">
            <h6 className="font-bold rounded-full text-white">{prop.number}</h6>
          </div>
          <h6 className="font-medium ml-1">Produk</h6>
        </div>
        <Separator className="my-3" />
        {/* <div className="flex w-full overflow-x-auto">
          {typeList.map((val, idx) => (
            <Badge
              className="mx-1 cursor-pointer space-x-2"
              key={`${idx}`}
              color="primary"
              variant={val.type == filter?.type ? "default" : "outline"}
              onClick={() => {
                if (filter == val) setFilter(undefined);
                else setFilter(val);
              }}
            >
              {val.title}
            </Badge>
          ))}
        </div> */}
        <Input
          placeholder="Search Product..."
          onChange={doSearch}
          className="mb-4 mt-2"
        />
        <div
          className="relative max-h-[30rem] overflow-y-auto py-4 bg-slate-50 -mx-2 px-2"
          ref={ref}
        >
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-2 -mt-2">
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
      </CardContent>
    </Card>
  );
}

export default ProductList;
