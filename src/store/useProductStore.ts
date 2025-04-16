import axiosInstance from "@/lib/axios";
import { Product } from "@/types/product";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
interface ErrorResponse {
  success: boolean;
  message: string;
}
interface ProductStore {
  loading: boolean;
  products: Product[];
  currentProduct: Product | null;

  handleFetchAllProduct: () => Promise<void>;
  handleFetchTopDealsProducts: () => Promise<Product[]>;
  handleFetchRelatedProducts: (categoryName: string) => Promise<Product[]>;
  handleGetProductById: (id: string | undefined) => Promise<void>;
  handleGetProductByCategory: (categoryName: string) => Promise<void>;
  handleSearchProductByKeyWord: (categoryName: string) => Promise<void>;
  handleFilterProduct: (categoryName: string) => Promise<void>;
  handleSetNullCurrentProduct: () => void;

}
export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  currentProduct: null,

  handleFetchRelatedProducts: async (categoryName: string) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/products/category/${categoryName}`,
      );
      const related = response.data;
      return related;

    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
      return []
    } finally {
      set({ loading: false });
    }
  },
  handleSetNullCurrentProduct: () => {
    set({ currentProduct: null });
  },
  handleFetchTopDealsProducts: async (): Promise<Product[]> => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/products?sort=best_seller`,
      );
      console.log("response.data");
      console.log(response.data);
      const topdeals = response.data.products.slice(0, 12);
      return (topdeals);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
      return [];
    } finally {
      set({ loading: false });
    }
  },

  handleFetchAllProduct: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products");
      set({ products: response.data.products });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  handleGetProductById: async (id: string | undefined) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      const product: Product = await response.data;
      set({ currentProduct: product });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  handleGetProductByCategory: async (categoryName: string) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/products/category/${categoryName}`,
      );
      set({ products: response.data });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },
  handleSearchProductByKeyWord: async (keyWord: string) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/products/search/${keyWord}`,
      );
      set({ products: response.data });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },
  handleFilterProduct: async (typeSearch: string) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/products?sort=${typeSearch}`,
      );
      console.log("response.data");
      console.log(response.data);
      set({ products: response.data.products });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },
}));
