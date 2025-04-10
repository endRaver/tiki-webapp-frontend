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
  handleGetProductById: (id: string | undefined) => Promise<void>;
  handleGetProductByCategory: (categoryName: string) => Promise<void>;
}
export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  currentProduct: null,

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
    try {
      const response = await axiosInstance.get(
        `/products/category/${categoryName}`,
      );
      set({ products: response.data.products });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },
}));
