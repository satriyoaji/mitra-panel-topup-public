import { NextFont } from "next/dist/compiled/@next/font";
import { StaticImageData } from "next/image";

export interface LooseObject {
  [key: string]: any;
}

export interface TTier {
  id: string;
  name: string;
  order?: number;
  markup_base?: number;
}

export interface IProfile {
  // id: string;
  name: string;
  email: string;
  phone: string;
  saldo: number;
  tier_name: string;
  registered_at: string;
  qty_success: number;
  amount_success: number;
}

export interface TProductGroup {
  id: string;
  name: string;
}

export interface IProductFormBase {
  alias: string;
  key: string;
}

export interface IProductFormOption extends IProductFormBase {
  type: "option";
  options: string[];
}
export interface IProductFormText extends IProductFormBase {
  type: "text";
}
export interface IProductFormNumeric extends IProductFormBase {
  type: "numeric";
}

export type TProductForm =
  | IProductFormNumeric
  | IProductFormText
  | IProductFormOption;

export interface IProductCategory {
  uuid: string;
  // code: string;
  // alias: string;
  // status: number;
  // logo_image: string;
  banner_url: string;
  description: string;
  forms?: TProductForm[];

  key: string;
  name: string;
  image_url: string;
}

export type TTiersPrice = {
  name: string;
  order: number;
  markup_base: number;
};

export interface IFlashSaleInProduct {
  id: number;
  discount_price: number;
  active: boolean;
  start_at: string;
  finish_at: string;
}
export interface IFlashSaleInfo {
  id: number;
  name: string;
  exapired_at: string;
}

export type TProduct = {
  uuid: string;
  product_sku: string;
  product_name: string;
  sale_price: number;
  category_alias: string;
  category_code: string;
  active: boolean;
  group_name: string;
  flash_sales?: IFlashSaleInProduct[];

  key: string;
  name: string;
  price: number;
};
export type TProductItem = {
  flash_sale_info?: IFlashSaleInfo;

  key: string;
  name: string;
  price: number;
  discounted_price: number;
  image_url: string;
};

export type TMarkup = "percentage" | "fix";

export interface IFlashSaleProductDetail {
  uuid: string;
  product_sku: string;
  product_name: string;
  sale_price: number;
  category_uuid: string;
  category_alias: string;
  category_code: string;
  active: boolean;
  group_name: string;
}

export interface ITransactionHistoryList {
  date: string;
  transaction_code: string;
  category_name: string;
  product_name: string;
  status: number;
  status_name: string;
  price: number;
  payment_channel: string;
}
