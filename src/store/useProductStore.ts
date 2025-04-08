import axiosInstance from '@/lib/axios';
import { Product } from '@/types/product';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';
interface ErrorResponse {
    success: boolean;
    message: string;
  }
interface ProductStore {
    products:Product[];
    loading: boolean;
    handleFetchAllProduct: () => Promise<void>;
}
export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    loading: false,
    handleFetchAllProduct: async () => {
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
}));
