import axiosInstance from "@/lib/axios";
import { Product } from "@/types/product";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface ErrorResponse {
  success: boolean;
  message: string;
}

interface Category {
  _id: string;
  name: string;
}

interface Seller {
  _id: string;
  name: string;
}

interface ProductStore {
  loading: boolean;
  deleting: boolean;
  products: Product[];
  filteredProducts: Product[];
  currentProduct: Product | null;
  categories: Category[];
  sellers: Seller[];
  showDeleteModal: boolean; // Thêm state để quản lý modal
  deleteProduct: Product | null; // Thêm state để lưu sản phẩm cần xóa
  setShowDeleteModal: (show: boolean) => void; // Hàm để cập nhật trạng thái modal
  setDeleteProduct: (product: Product | null) => void; // Hàm để cập nhật sản phẩm cần xóa
  confirmDeleteProduct: () => Promise<void>; // Hàm xác nhận xóa

  // Fetching methods
  handleFetchAllProduct: () => Promise<void>;
  handleGetProductById: (id: string | undefined) => Promise<void>;
  handleGetProductByCategory: (categoryName: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchSellers: () => Promise<void>;

  // CRUD methods
  handleCreateProduct: (productData: FormData) => Promise<void>;
  handleUpdateProduct: (id: string, productData: FormData) => Promise<void>;
  handleDeleteProduct: (id: string) => Promise<void>;

  // Filter and Sort methods
  filterProducts: (filters: { name: string; category: string; seller: string }) => void;
  sortProducts: (sortBy: "price" | "profit" | "quantitySold") => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  currentProduct: null,
  categories: [],
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
      set({ deleting: true }); // Bật trạng thái deleting
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

  // Fetch all products
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
      // Nếu current_seller.seller là chuỗi, chuyển thành object với thuộc tính id
      if (product.current_seller && typeof product.current_seller.seller === "string") {
        product.current_seller.seller = {
          id: product.current_seller.seller, // Gán chuỗi ObjectId vào id
        };
      }
      console.log("Fetched product:", product); // Debug dữ liệu product
      set({ currentProduct: product });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to fetch product");
    } finally {
      set({ loading: false });
    }
  },

  // Fetch products by category
  handleGetProductByCategory: async (categoryName: string) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/products/category/${categoryName}`);
      set({ products: response.data.products || [], filteredProducts: response.data.products || [] });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to fetch products by category");
    } finally {
      set({ loading: false });
    }
  },

  // Fetch categories
  fetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products/categories");
      set({ categories: response.data || [] });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to fetch categories");
    } finally {
      set({ loading: false });
    }
  },

  // Fetch sellers
  fetchSellers: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/sellers");
      const fetchedSellers = Array.isArray(response.data.sellers)
        ? response.data.sellers.map((seller: any) => ({
          ...seller,
          id: seller._id, // Ánh xạ _id thành id
        }))
        : [];
      console.log("Fetched sellers:", fetchedSellers); // Debug dữ liệu sellers
      set({ sellers: fetchedSellers });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to fetch sellers");
    } finally {
      set({ loading: false });
    }
  },

  // Create a new product
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

  // Update an existing product
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

  // Delete a product
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

  // Filter products
  filterProducts: (filters: { name: string; category: string; seller: string }) => {
    const { products } = get();
    let tempProducts = [...products];
  
    if (filters.name) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
  
    if (filters.category) {
      tempProducts = tempProducts.filter(
        (product) => product.categories?.name === filters.category
      );
    }
  
    if (filters.seller) {
      tempProducts = tempProducts.filter(
        (product) => product.current_seller?.seller?._id === filters.seller
      );
    }
  
    set({ filteredProducts: tempProducts });
  },

  // Sort products
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