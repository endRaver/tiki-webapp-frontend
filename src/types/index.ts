type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  cart?: CartItem[];
  createdAt: string;
  updatedAt: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type Product = {
  _id: string;
  authors?: null;
  categories: Category;
  current_seller: CurrentSeller;
  description: string;
  images: {
    base_url: string;
    large_url: string;
    medium_url: string;
    small_url: string;
    thumbnail_url: string;
    is_gallery: boolean;
    label: string | null;
  }[];
  list_price: number;
  name: string;
  original_price: number;
  quantity_sold?: {
    text: string;
    value: number;
  };
  rating_average: number;
  short_description: string;
  specifications: Specification[];
};

type Specification = {
  name: string;
  attributes: {
    code: string;
    name: string;
    value: string;
  }[];
};

type Category = {
  _id: string;
  name: string;
  is_leaf: boolean;
};

type CurrentSeller = {
  sku: string;
  name: string;
  price: number;
  link: string;
  logo: string;
  product_id: string;
  store_id: number;
  is_best_store: boolean;
  is_official_installment_supported: boolean | null;
};

export type { User, CartItem, Product, Specification, Category, CurrentSeller };
