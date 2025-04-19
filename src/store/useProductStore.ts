import { create } from "zustand";
import { Product, Seller } from "@/types/product";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { CacheManager } from "@/utils/cache";

interface ErrorResponse {
  success: boolean;
  message: string;
}

interface ProductStore {
  loading: boolean;
  products: Product[];
  currentProduct: Product | null;
  categoryNames: string[];
  totalPages: number;
  sellers: Seller[];

  // Cache managers
  allProductsCache: CacheManager<Product[]>;
  productsCache: CacheManager<Product[]>;
  currentProductCache: CacheManager<Product>;
  categoryCache: CacheManager<string[]>;
  sellerCache: CacheManager<Seller[]>;

  handleGetAllProduct: () => Promise<Product[]>;
  handleGetAllProductPagination: (currentPage?: number) => Promise<void>;

  handleGetProductById: (id: string | undefined) => Promise<void>;
  handleGetProductByCategory: (categoryName: string) => Promise<void>;
  handleSearchProductByKeyWord: (categoryName: string) => Promise<void>;
  handleFilterProduct: (categoryName: string) => Promise<void>;
  handleFetchTopDealsProducts: () => Promise<Product[]>;

  handleCreateProduct: (productData: FormData) => Promise<void>;
  handleUpdateProduct: (id: string, productData: FormData) => Promise<void>;
  handleDeleteProduct: (id: string) => Promise<void>;

  handleFetchCategories: () => Promise<void>;
  handleFetchSellers: () => Promise<void>;

  resetProducts: () => void;
  resetCurrentProduct: () => void;
  clearAllCache: () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  currentProduct: null,
  sellers: [],
  categoryNames: [],
  totalPages: 0,

  // Initialize cache managers
  currentProductCache: new CacheManager<Product>(),
  allProductsCache: new CacheManager<Product[]>(),
  productsCache: new CacheManager<Product[]>(),
  categoryCache: new CacheManager<string[]>(),
  sellerCache: new CacheManager<Seller[]>(),

  handleGetAllProduct: async () => {
    const cacheKey = "fetch_all_products";
    const cachedData = get().allProductsCache.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await axiosInstance.get(`/products?all=true`);
      get().allProductsCache.set(cacheKey, response.data.products);
      return response.data.products;
    } catch (error) {
      console.error("Error fetching all products:", error);
      return [];
    }
  },

  handleGetAllProductPagination: async (currentPage?: number) => {
    const cacheKey = `fetch_products_page_${currentPage}`;
    const cachedData = get().productsCache.get(cacheKey);

    if (cachedData) {
      set({
        products: cachedData,
        totalPages: cachedData.length / 10,
      });
      return;
    }

    if (currentPage === 1) {
      set({ loading: true });
    }

    const previousProducts = get().products;

    try {
      const response = await axiosInstance.get(`/products?page=${currentPage}`);
      if (currentPage === 1) {
        set({ products: response.data.products });
        get().productsCache.set(cacheKey, response.data.products);
      } else {
        const newProducts = [...previousProducts, ...response.data.products];

        // Update cache
        get().productsCache.set(cacheKey, newProducts);

        set({
          products: newProducts,
          totalPages: response.data.pagination.pages,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  handleGetProductById: async (id: string | undefined) => {
    if (!id) return;

    const cachedProduct = get().currentProductCache.get(id);
    if (cachedProduct) {
      set({ currentProduct: cachedProduct });
      return;
    }

    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      const product: Product = await response.data;

      // Update cache
      get().currentProductCache.set(id, product);
      set({ currentProduct: product });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  handleGetProductByCategory: async (categoryName: string) => {
    const cacheKey = `category_products_${categoryName}`;
    const cachedProducts = get().productsCache.get(cacheKey);
    if (cachedProducts) {
      set({ products: cachedProducts });
      return;
    }

    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/products/category/${categoryName}`,
      );

      const fetchedProducts = Array.isArray(response.data) ? response.data : [];

      // Update cache
      get().productsCache.set(cacheKey, fetchedProducts);
      set({ products: fetchedProducts });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error(
        "Error fetching products by category:",
        axiosError.response?.data,
      );
      set({ products: [] });
    } finally {
      set({ loading: false });
    }
  },

  handleSearchProductByKeyWord: async (keyWord: string) => {
    const cacheKey = `search_products_${keyWord}`;
    const cachedProducts = get().productsCache.get(cacheKey);
    if (cachedProducts) {
      set({ products: cachedProducts });
      return;
    }

    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/products/search/${keyWord}`);

      get().productsCache.set(cacheKey, response.data);
      set({ products: response.data });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  handleFilterProduct: async (typeSearch: string) => {
    const cacheKey = `filter_products_${typeSearch}`;
    const cachedProducts = get().productsCache.get(cacheKey);
    if (cachedProducts) {
      set({ products: cachedProducts });
      return;
    }

    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/products?sort=${typeSearch}`);

      get().productsCache.set(cacheKey, response.data.products);
      set({ products: response.data.products });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  handleFetchTopDealsProducts: async (): Promise<Product[]> => {
    const cacheKey = "fetch_top_deals_products";
    const cachedProducts = get().productsCache.get(cacheKey);
    if (cachedProducts) {
      return cachedProducts;
    }

    try {
      const response = await axiosInstance.get(`/products/recommended`);

      get().productsCache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
      return [];
    }
  },

  handleDeleteProduct: async (id: string) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }));

      get().clearAllCache();
      toast.success("Product deleted successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to delete product",
      );
      throw error;
    }
  },

  handleCreateProduct: async (productData: FormData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/products", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        products: [...state.products, response.data.product],
      }));

      get().clearAllCache();
      toast.success("Product created successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to create product",
      );
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  handleUpdateProduct: async (id: string, productData: FormData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/products/${id}`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? response.data : p)),

        currentProduct:
          state.currentProduct?._id === id
            ? response.data
            : state.currentProduct,
      }));

      get().clearAllCache();
      toast.success("Product updated successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to update product",
      );
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  handleFetchCategories: async () => {
    const cacheKey = "fetch_categories";
    const cachedCategories = get().categoryCache.get(cacheKey);
    if (cachedCategories) {
      set({ categoryNames: cachedCategories });
      return;
    }

    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products/categories");
      const normalizedCategoryNames = (response.data || []).map(
        (name: string) => name.trim(),
      );

      get().categoryCache.set(cacheKey, normalizedCategoryNames);
      set({ categoryNames: normalizedCategoryNames });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to fetch category names",
      );
    } finally {
      set({ loading: false });
    }
  },

  handleFetchSellers: async () => {
    const cacheKey = "fetch_sellers";
    const cachedSellers = get().sellerCache.get(cacheKey);
    if (cachedSellers) {
      set({ sellers: cachedSellers });
      return;
    }

    set({ loading: true });
    try {
      const response = await axiosInstance.get("/sellers");

      const fetchedSellers = Array.isArray(response.data.sellers)
        ? response.data.sellers.map((seller: Seller) => ({
            ...seller,
            id: seller._id,
          }))
        : [];

      get().sellerCache.set(cacheKey, fetchedSellers);
      set({ sellers: fetchedSellers });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to fetch sellers",
      );
    } finally {
      set({ loading: false });
    }
  },

  resetProducts: () => {
    set({ products: [], totalPages: 0 });
  },

  resetCurrentProduct: () => set({ currentProduct: null }),

  clearAllCache: () => {
    const { currentProductCache, productsCache, categoryCache, sellerCache } =
      get();
    currentProductCache.clear();
    productsCache.clear();
    categoryCache.clear();
    sellerCache.clear();
  },
}));
