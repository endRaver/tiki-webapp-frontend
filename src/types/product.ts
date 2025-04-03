export type Author = {
  name: string;
  slug: string;
  _id: string;
};

export type Category = {
  name: string;
  is_leaf: boolean;
};

export type CurrentSeller = {
  _id: string;
  name: string;
  link: string;
  logo: string;
  store_id: number;
  is_best_store: boolean;
  is_offline_installment_supported: boolean | null;
  price: number;
  product_id: string;
  sku: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductImage = {
  base_url: string;
  is_gallery: boolean;
  label: string | null;
  position: number | null;
  large_url: string;
  medium_url: string;
  small_url: string;
  thumbnail_url: string;
  _id: string;
};

export type QuantitySold = {
  text: string;
  value: number;
};

export type Product = {
  _id: string;
  authors?: Author[];
  categories: Category;
  current_seller: CurrentSeller;
  description: string;
  images: ProductImage[];
  name: string;
  original_price: number;
  quantity_sold?: QuantitySold;
  rating_average: number;
  short_description: string;
  createdAt: string;
  updatedAt: string;
};
