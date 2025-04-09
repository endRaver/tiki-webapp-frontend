import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { AxiosError } from "axios";

import { Product } from "@/types/product";
import { CartItem, Coupon } from "@/types/user";
import { map, groupBy } from "lodash";

interface CartStore {
  cart: CartItem[];
  shippingType: "fast" | "saving";
  paymentMethod: "cash" | "card";
  groupCart: {
    items: CartItem[];
    totalShippingPrice: number;
    shippingDate: Date;
  }[];

  coupons: Coupon[];
  shippingCoupon: Coupon | null;
  discountCoupon: Coupon | null;
  productDiscount: number;

  total: number;
  subtotal: number;
  totalShippingPrice: number;

  calculateTotal: () => void;
  handleGetCartItems: () => Promise<CartItem[]>;
  handleAddToCart: (product: Product) => Promise<void>;
  handleRemoveFromCart: (productId: string) => Promise<void>;
  handleUpdateQuantity: (productId: string, quantity: number) => Promise<void>;
  setShippingType: (type: "fast" | "saving") => void;
  setPaymentMethod: (method: "cash" | "card") => void;

  handleGetMyCoupons: () => Promise<void>;
  handleApplyCoupon: (
    couponCode: string,
    type: "product" | "shipping",
  ) => Promise<void>;

  removeDiscountCoupon: () => void;
  removeShippingCoupon: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  groupCart: [],
  coupons: [],
  shippingType: "fast",
  paymentMethod: "cash",

  shippingCoupon: null,
  discountCoupon: null,
  productDiscount: 0,

  total: 0,
  subtotal: 0,
  totalShippingPrice: 0,

  handleGetCartItems: async () => {
    try {
      const response = await axiosInstance.get("/carts");

      const groupCart = map(
        groupBy(response.data, (item) => item.current_seller.seller.store_id),
        (items) => ({
          items,
          totalShippingPrice: Math.max(
            ...items.map((item) => item.shippingPrice),
          ),
          shippingDate: new Date(
            Math.max(
              ...items.map((item) => new Date(item.shippingDate).getTime()),
            ),
          ),
        }),
      );

      set({ cart: response.data, groupCart });
      get().calculateTotal();
      return response.data;
    } catch (error) {
      set({ cart: [] });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message ?? "Failed to fetch cart");
      }
      return [];
    }
  },

  handleAddToCart: async (product) => {
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

  handleRemoveFromCart: async (productId) => {
    try {
      await axiosInstance.delete(`/carts`, { data: { productId } });

      set((prevState) => {
        const newCart = prevState.cart.filter((item) => item._id !== productId);
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

  handleUpdateQuantity: async (productId, quantity) => {
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

  calculateTotal: () => {
    const { cart, shippingCoupon, shippingType, groupCart, discountCoupon } =
      get();

    const subtotal = cart.reduce(
      (sum, item) => sum + item.original_price * item.quantity,
      0,
    );

    const subtotalDiscount = cart.reduce(
      (sum, item) => sum + item.current_seller.price * item.quantity,
      0,
    );

    let productDiscount = 0;
    if (discountCoupon) {
      if (discountCoupon.discountType === "percentage") {
        const discount = (discountCoupon.discount / 100) * subtotalDiscount;
        productDiscount = Math.min(discount, discountCoupon.maxDiscount);
      } else {
        productDiscount = discountCoupon.discount;
      }
    }

    let totalShippingPrice =
      shippingType === "fast"
        ? groupCart.reduce((acc, group) => acc + group.totalShippingPrice, 0)
        : Math.max(...cart.map((item) => item.shippingPrice));

    if (shippingCoupon) {
      if (shippingCoupon.discount > totalShippingPrice) {
        totalShippingPrice = 0;
      } else {
        totalShippingPrice = totalShippingPrice - shippingCoupon.discount;
      }
    }

    const total = subtotalDiscount + totalShippingPrice - productDiscount;

    set({ subtotal, total, productDiscount, totalShippingPrice });
  },

  handleGetMyCoupons: async () => {
    try {
      const response = await axiosInstance.get("/coupons");
      set({ coupons: response.data });
    } catch (error) {
      console.error(error);
    }
  },

  handleApplyCoupon: async (couponCode, type) => {
    try {
      const response = await axiosInstance.post("/coupons/validate", {
        couponCode,
      });

      if (type === "product") {
        set({ discountCoupon: response.data });
        toast.success("Discount coupon applied");
      } else {
        set({ shippingCoupon: response.data });
        toast.success("Shipping coupon applied");
      }

      get().calculateTotal();
    } catch (error) {
      console.error(error);
    }
  },

  removeDiscountCoupon: () => {
    set({ discountCoupon: null });
    get().calculateTotal();
    toast.success("Discount coupon removed");
  },

  removeShippingCoupon: () => {
    set({ shippingCoupon: null });
    get().calculateTotal();
    toast.success("Shipping coupon removed");
  },

  setShippingType: (type: "fast" | "saving") => {
    set({ shippingType: type });
    get().calculateTotal();
  },

  setPaymentMethod: (method: "cash" | "card") => {
    set({ paymentMethod: method });
  },
}));
