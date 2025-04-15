import axiosInstance from "@/lib/axios";
import { Product } from "@/types/product";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface ErrorResponse {
  success: boolean;
  message: string;
}

interface Seller {
  _id: string;
  name: string;
  link: string;
  logo: string;
  store_id: number;
  is_best_store: boolean;
  is_offline_installment_supported: boolean | null;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductStore {
  loading: boolean;
  deleting: boolean;
  products: Product[];
  filteredProducts: Product[];
  currentProduct: Product | null;
  categoryNames: string[]; // Đổi từ categories thành categoryNames, kiểu là string[]
  sellers: Seller[];
  showDeleteModal: boolean;
  deleteProduct: Product | null;
  setShowDeleteModal: (show: boolean) => void;
  setDeleteProduct: (product: Product | null) => void;
  confirmDeleteProduct: () => Promise<void>;

  handleFetchAllProduct: () => Promise<void>;
  handleGetProductById: (id: string | undefined) => Promise<void>;
  handleGetProductByCategory: (categoryName: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchSellers: () => Promise<void>;

  handleCreateProduct: (productData: FormData) => Promise<void>;
  handleUpdateProduct: (id: string, productData: FormData) => Promise<void>;
  handleDeleteProduct: (id: string) => Promise<void>;

  filterProducts: (filters: { name: string; category: string; seller: string }) => Promise<void>;
  sortProducts: (sortBy: "price" | "profit" | "quantitySold") => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  currentProduct: null,
  categoryNames: [], // Đổi tên
  sellers: [],
  loading: false,
  deleting: false,
  showDeleteModal: false,
  deleteProduct: null,

  setShowDeleteModal: (show: boolean) => set({ showDeleteModal: show }),

  setDeleteProduct: (product: Product | null) => set({ deleteProduct: product }),

  confirmDeleteProduct: async () => {
    const { deleteProduct, handleDeleteProduct } = get();
    if (deleteProduct) {
      set({ deleting: true });
      try {
        await handleDeleteProduct(deleteProduct._id);
        set({ showDeleteModal: false, deleteProduct: null, deleting: false });
      } catch (error) {
        console.error("Failed to delete product:", error);
        set({ deleting: false });
        toast.error("Failed to delete product");
      }
    }
  },

  handleFetchAllProduct: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products");
      const fetchedProducts = Array.isArray(response.data.products) ? response.data.products : [];
      set({ products: fetchedProducts, filteredProducts: fetchedProducts });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        console.error("❌ Server responded with error:");
        console.error("Status:", axiosError.response.status);
        console.error("Message:", axiosError.response.data?.message || "No message");
        console.error("Details:", axiosError.response.data);
        toast.error(axiosError.response.data?.message || "Failed to fetch products");
      } else if (axiosError.request) {
        console.error("❌ No response received from server:");
        console.error(axiosError.request);
        toast.error("No response from server");
      } else {
        console.error("❌ Error setting up request:");
        console.error("Message:", axiosError.message);
        toast.error("Error: " + axiosError.message);
      }
    } finally {
      set({ loading: false });
    }
  },

  handleGetProductById: async (id: string | undefined) => {
    if (!id) {
      toast.error("Product ID is required");
      return;
    }
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      const product: Product = response.data;
      if (product.current_seller && typeof product.current_seller.seller === "string") {
        product.current_seller.seller = {
          _id: product.current_seller.seller,
          name: '',
          link: '',
          logo: '',
          store_id: 0,
          is_best_store: false,
          is_offline_installment_supported: null,
          __v: 0,
          createdAt: '',
          updatedAt: '',
        };
      }
      console.log("Fetched product:", product);
      set({ currentProduct: product });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to fetch product");
    } finally {
      set({ loading: false });
    }
  },

  handleGetProductByCategory: async (categoryName: string) => {
    set({ loading: true });
    set({ loading: true });
    try {
      const normalizedCategoryName = categoryName.trim().toLowerCase();
      console.log("Fetching products for category (normalized):", normalizedCategoryName);
      const response = await axiosInstance.get(`/products/category/${encodeURIComponent(categoryName)}`);
      console.log("Products by category response:", response.data);
      const fetchedProducts = Array.isArray(response.data) ? response.data : [];
      set({ filteredProducts: fetchedProducts });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error("Error fetching products by category:", axiosError.response?.data);
      toast.error(axiosError.response?.data?.message ?? "Failed to fetch products by category");
      set({ filteredProducts: [] });
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products/categories");
      console.log("Fetched category names (raw):", response.data);
      const normalizedCategoryNames = (response.data || []).map((name: string) => name.trim());
      console.log("Fetched category names (normalized):", normalizedCategoryNames);
      set({ categoryNames: normalizedCategoryNames }); // Đổi tên
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to fetch category names");
    } finally {
      set({ loading: false });
    }
  },

  fetchSellers: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/sellers");
      const fetchedSellers = Array.isArray(response.data.sellers)
        ? response.data.sellers.map((seller: any) => ({
            ...seller,
            id: seller._id,
          }))
        : [];
      console.log("Fetched sellers:", fetchedSellers);
      set({ sellers: fetchedSellers });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to fetch sellers");
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
        products: [...state.products, response.data],
        filteredProducts: [...state.filteredProducts, response.data],
      }));
      toast.success("Product created successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to create product");
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
        filteredProducts: state.filteredProducts.map((p) => (p._id === id ? response.data : p)),
        currentProduct: state.currentProduct?._id === id ? response.data : state.currentProduct,
      }));
      toast.success("Product updated successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to update product");
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  handleDeleteProduct: async (id: string) => {
    set({ deleting: true });
    try {
      await axiosInstance.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        filteredProducts: state.filteredProducts.filter((p) => p._id !== id),
        currentProduct: state.currentProduct?._id === id ? null : state.currentProduct,
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to delete product");
      throw error;
    } finally {
      set({ deleting: false });
    }
  },

  filterProducts: async (filters: { name: string; category: string; seller: string }) => {
    const { products, handleFetchAllProduct, handleGetProductByCategory } = get();

    if (!filters.name && !filters.category && !filters.seller) {
      await handleFetchAllProduct();
      set({ filteredProducts: get().products });
      return;
    }

    let tempProducts = [...products];

    if (filters.category) {
      console.log("Filtering by category:", filters.category);
      await handleGetProductByCategory(filters.category);
      tempProducts = get().filteredProducts;
    } else {
      await handleFetchAllProduct();
      tempProducts = get().products;
    }

    if (filters.name) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.seller) {
      tempProducts = tempProducts.filter(
        (product) =>
          product.current_seller?.seller &&
          typeof product.current_seller.seller !== "string" &&
          product.current_seller.seller._id === filters.seller
      );
    }

    console.log("Filtered products:", tempProducts);
    set({ filteredProducts: tempProducts });
  },

  sortProducts: (sortBy: "price" | "profit" | "quantitySold") => {
    const { filteredProducts } = get();
    let tempProducts = [...filteredProducts];

    if (sortBy === "price") {
      tempProducts.sort((a, b) => (b.current_seller?.price || 0) - (a.current_seller?.price || 0));
    } else if (sortBy === "profit") {
      tempProducts.sort(
        (a, b) =>
          ((b.original_price || 0) - (b.current_seller?.price || 0)) -
          ((a.original_price || 0) - (a.current_seller?.price || 0))
      );
    } else if (sortBy === "quantitySold") {
      tempProducts.sort((a, b) => (b.quantity_sold?.value || 0) - (a.quantity_sold?.value || 0));
    }

    set({ filteredProducts: tempProducts });
  },
}));