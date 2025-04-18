import { create } from "zustand";
import { Product, Seller } from "@/types/product";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

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

  handleFetchAllProduct: (currentPage?: number,isFetchAll?:boolean) => Promise<void>;
  handleFetchTopDealsProducts: () => Promise<Product[]>;
  handleFetchRelatedProducts: (categoryName: string) => Promise<Product[]>;
  handleGetProductById: (id: string | undefined) => Promise<void>;
  handleGetProductByCategory: (categoryName: string) => Promise<void>;
  handleSearchProductByKeyWord: (categoryName: string) => Promise<void>;
  handleFilterProduct: (categoryName: string) => Promise<void>;

  handleCreateProduct: (productData: FormData) => Promise<void>;
  handleUpdateProduct: (id: string, productData: FormData) => Promise<void>;
  handleDeleteProduct: (id: string) => Promise<void>;

  handleFetchCategories: () => Promise<void>;
  handleFetchSellers: () => Promise<void>;

  resetProducts: () => void;
  resetCurrentProduct: () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  currentProduct: null,
  sellers: [],
  categoryNames: [],
  totalPages: 0,

  handleFetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products/categories");
      const normalizedCategoryNames = (response.data || []).map(
        (name: string) => name.trim(),
      );

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
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/sellers");
      const fetchedSellers = Array.isArray(response.data.sellers)
        ? response.data.sellers.map((seller: Seller) => ({
            ...seller,
            id: seller._id,
          }))
        : [];
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

  handleDeleteProduct: async (id: string) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to delete product",
      );
      throw error;
    }
  },

  handleFetchRelatedProducts: async (categoryName: string) => {
    try {
      const response = await axiosInstance.get(
        `/products/category/${categoryName}`,
      );
      const related = response.data;
      return related;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
      return [];
    }
  },

  handleFetchTopDealsProducts: async (): Promise<Product[]> => {
    try {
      const response = await axiosInstance.get(`/products/recommended`);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
      return [];
    }
  },

  handleFetchAllProduct: async (currentPage?: number,isFetchAll? :boolean) => {
    if (currentPage === 1) {
      set({ loading: true });
    }

    const previousProducts = get().products;

    try {
      const response =isFetchAll?
       await axiosInstance.get(`/products?all=true`):await axiosInstance.get(`/products?page=${currentPage}`);

      set({
        products: [...previousProducts, ...response.data.products],
        totalPages: response.data.pagination.pages,
      });
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

      console.log(response.data);

      const fetchedProducts = Array.isArray(response.data) ? response.data : [];
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
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/products/search/${keyWord}`);
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
      const response = await axiosInstance.get(`/products?sort=${typeSearch}`);

      set({ products: response.data.products });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
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

  resetProducts: () => {
    set({ products: [], totalPages: 0 });
  },

  resetCurrentProduct: () => set({ currentProduct: null }),
}));
