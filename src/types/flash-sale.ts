interface IFlashSaleInProductInfo {
  name: string;
  total: number;
  remaining: number;
  expired_at: string;
}

export interface IFlashSaleInProduct {
  category_name: string;
  category_key: string;
  key: string;
  name: string;
  image_url: string;
  price: number;
  discounted_price: number;
  flash_sale_info: IFlashSaleInProductInfo;
}

export interface IFlashSaleInfo {
  name: string;
  banner_url: string;
  image_url: string;
  expired_at: string;
  products: IFlashSaleInProduct[];
}
