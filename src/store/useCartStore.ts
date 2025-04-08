import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { AxiosError } from "axios";

import { Product } from "@/types/product";
import { CartItem } from "@/types/user";

interface CartStore {
  cart: CartItem[];
  coupon: string | null;
  total: number;
  subtotal: number;
  appliedCoupon: string | null;
  getCartItems: () => Promise<CartItem[]>;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  appliedCoupon: null,

  getCartItems: async () => {
    try {
      const response = await axiosInstance.get("/carts");
      set({ cart: response.data });
      return response.data;
    } catch (error) {
      set({ cart: [] });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message ?? "Failed to fetch cart");
      }
      return [];
    }
  },

  addToCart: async (product) => {
    try {
      const response = await axiosInstance.post("/carts", {
        productId: product._id,
      });

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id,
        );

        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...prevState.cart, response.data];
        return { cart: newCart };
      });

      toast.success("Product added to cart");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "Failed to add product to cart",
        );
      }
    }
  },

  removeFromCart: async (productId) => {
    try {
      await axiosInstance.delete(`/carts`, { data: { productId } });

      set((prevState) => {
        const newCart = prevState.cart.filter(
          (item) => item._id !== productId,
        );
        return { cart: newCart };
      });

      toast.success("Product removed from cart");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "Failed to remove product from cart",
        );
      }
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      await axiosInstance.put(`/carts/${productId}`, { quantity });

      set((prevState) => {
        const newCart = prevState.cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item,
        );
        return { cart: newCart };
      });

      toast.success("Quantity updated");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "Failed to update quantity",
        );
      }
    }
  },
}));
