import axiosInstance from "@/lib/axios";
import { Product, Seller } from "@/types/product";
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
  categoryNames: string[];
  filteredProducts: Product[];
  sellers: Seller[];
  showDeleteModal: boolean;
  deleteProduct: Product | null;

  setDeleteProduct: (product: Product | null) => void;
  setShowDeleteModal: (show: boolean) => void;
  confirmDeleteProduct: () => Promise<void>;

  handleFetchAllProduct: () => Promise<void>;
  handleGetAllProductForAdmin: () => Promise<void>;
  handleFetchTopDealsProducts: () => Promise<Product[]>;
  handleFetchRelatedProducts: (categoryName: string) => Promise<Product[]>;
  handleGetProductById: (id: string | undefined) => Promise<void>;
  handleGetProductByCategory: (categoryName: string) => Promise<void>;
  handleSearchProductByKeyWord: (categoryName: string) => Promise<void>;
  handleFilterProduct: (categoryName: string) => Promise<void>;
  handleSetNullCurrentProduct: () => void;

  fetchCategories: () => Promise<void>;
  fetchSellers: () => Promise<void>;

  handleCreateProduct: (productData: FormData) => Promise<void>;
  handleUpdateProduct: (id: string, productData: FormData) => Promise<void>;
  handleDeleteProduct: (id: string) => Promise<void>;
  handleAdminFilterProducts: (filters: {
    name: string;
    category: string;
    seller: string;
  }) => Promise<void>;

  sortProducts: (sortBy: "price" | "profit" | "quantitySold") => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  currentProduct: null,
  sellers: [],
  filteredProducts: [],
  categoryNames: [],
  deleteProduct: null,
  showDeleteModal: false,

  setShowDeleteModal: (show: boolean) => set({ showDeleteModal: show }),

  setDeleteProduct: (product: Product | null) =>
    set({ deleteProduct: product }),

  handleSetNullCurrentProduct: async () => {
    set({ currentProduct: null });
  },

  fetchCategories: async () => {
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

  fetchSellers: async () => {
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
    set({ loading: true });
    try {
      await axiosInstance.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        filteredProducts: state.filteredProducts.filter((p) => p._id !== id),
        currentProduct:
          state.currentProduct?._id === id ? null : state.currentProduct,
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to delete product",
      );
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  confirmDeleteProduct: async () => {
    const { deleteProduct, handleDeleteProduct } = get();
    if (deleteProduct) {
      set({ loading: true });
      try {
        await handleDeleteProduct(deleteProduct._id);
        set({ showDeleteModal: false, deleteProduct: null, loading: false });
      } catch (error) {
        console.error("Failed to delete product:", error);
        set({ loading: false });
        toast.error("Failed to delete product");
      }
    }
  },

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
      return [];
    } finally {
      set({ loading: false });
    }
  },

  handleFetchTopDealsProducts: async (): Promise<Product[]> => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/products?sort=best_seller`);
      console.log("response.data");
      console.log(response.data);
      const topdeals = response.data.products.slice(0, 12);
      return topdeals;
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

  handleGetAllProductForAdmin: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products");
      set({
        products: response.data.products,
        filteredProducts: response.data.products,
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

      const fetchedProducts = Array.isArray(response.data) ? response.data : [];
      set({ filteredProducts: fetchedProducts });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error(
        "Error fetching products by category:",
        axiosError.response?.data,
      );
      set({ filteredProducts: [] });
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
        filteredProducts: [...state.filteredProducts, response.data.product],
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
        filteredProducts: state.filteredProducts.map((p) =>
          p._id === id ? response.data : p,
        ),
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

  handleAdminFilterProducts: async (filters: {
    name: string;
    category: string;
    seller: string;
  }) => {
    const { products, handleGetProductByCategory } = get();

    if (!filters.name && !filters.category && !filters.seller) {
      set({ filteredProducts: products });
      return;
    }

    let tempProducts = [...products];

    if (filters.category) {
      await handleGetProductByCategory(filters.category);
      tempProducts = get().filteredProducts;
    } else {
      tempProducts = get().products;
    }

    if (filters.name) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(filters.name.toLowerCase()),
      );
    }

    if (filters.seller) {
      tempProducts = tempProducts.filter(
        (product) =>
          product.current_seller?.seller &&
          typeof product.current_seller.seller !== "string" &&
          product.current_seller.seller.name === filters.seller,
      );
    }

    set({ filteredProducts: tempProducts });
  },

  sortProducts: (sortBy: "price" | "profit" | "quantitySold") => {
    const { filteredProducts } = get();
    const tempProducts = [...filteredProducts];
    if (sortBy === "price") {
      tempProducts.sort(
        (a, b) =>
          (b.current_seller?.price || 0) - (a.current_seller?.price || 0),
      );
    } else if (sortBy === "profit") {
      tempProducts.sort((a, b) => {
        const profitA =
          ((a.current_seller?.price || 0) - (a.original_price || 0)) *
          (a.quantity_sold?.value || 0);
        const profitB =
          ((b.current_seller?.price || 0) - (b.original_price || 0)) *
          (b.quantity_sold?.value || 0);
        return profitA - profitB;
      });
    } else if (sortBy === "quantitySold") {
      tempProducts.sort(
        (a, b) => (b.quantity_sold?.value || 0) - (a.quantity_sold?.value || 0),
      );
    }
    set({ filteredProducts: tempProducts });
  },
}));
