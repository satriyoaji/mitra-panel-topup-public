import {
  IFlashSaleInProduct,
  IProductCategory,
  TProduct,
  TProductItem,
} from "./Type";
import { IPayment, IPromo } from "./types/transaction";

const priceMask = (val: number | undefined) => {
  if (!val) return "Rp 0";
  val = Math.round(val);
  return "Rp " + val.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
};

const uniqeProduct = (arr: TProduct[], track = new Set()) => {
  if (!arr) return [];

  return arr.filter(({ uuid }) => (track.has(uuid) ? false : track.add(uuid)));
};

const uniqeCategory = (arr: IProductCategory[], track = new Set()) => {
  if (!arr) return [];

  return arr.filter(({ uuid }) => (track.has(uuid) ? false : track.add(uuid)));
};

function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

const getTotalPrice = (
  product: TProductItem,
  promo?: IPromo,
  bank?: IPayment
) => {
  let num = 0;

  num += product.price;
  if (product.discounted_price) num = product.discounted_price;
  if (promo) {
    if (!promo.is_discount_percent) num -= promo.discount_amount;
    else num -= (promo.discount_percent * product.price) / 100;
  }
  if (bank && bank.fee_amount) num += bank.fee_amount;

  return num;
};

function nFormatter(num: number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "rb" },
    { value: 1e6, symbol: "jt" },
    { value: 1e9, symbol: "M" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(2).replace(regexp, "").concat(item.symbol)
    : "0";
}

function nPlainFormatter(val: number) {
  return val.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
}

export {
  priceMask,
  uniqeProduct,
  uniqeCategory,
  debounce,
  nFormatter,
  nPlainFormatter,
  getTotalPrice,
};
