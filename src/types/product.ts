export interface Author {
  name: string;
  slug: string;
}

export interface Category {
  name: string;
  is_leaf: boolean;
}

export interface CurrentSeller {
  sku: string;
  name: string;
  link: string;
  logo: string;
  price: number;
  product_id: string;
  store_id: number;
  is_best_store: boolean;
  is_offline_installment_supported: boolean | null;
}

export interface Image {
  base_url: string;
  is_gallery: boolean;
  label: string | null;
  large_url: string;
  medium_url: string;
  position: string | null;
  small_url: string;
  thumbnail_url: string;
}

export interface QuantitySold {
  text: string;
  value: number;
}

export interface SpecificationAttribute {
  code?: string;
  name: string;
  value: string;
}

export interface Specification {
  name: string;
  attributes: SpecificationAttribute[];
}

export interface Product {
  authors?: Author[];
  categories: Category;
  current_seller: CurrentSeller;
  description: string;
  images: Image[];
  list_price: number;
  name: string;
  original_price: number;
  quantity_sold: QuantitySold;
  rating_average: number;
  short_description: string;
  specifications: Specification[];
}
