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
    isSelected: boolean;
  }[];

  coupons: Coupon[];
  shippingCoupon: Coupon | null;
  discountCoupon: Coupon | null;
  productDiscount: number;

  total: number;
  subtotal: number;
  totalShippingPrice: number;
  shippingDiscount: number;

  calculateTotal: () => void;
  handleGetCartItems: () => Promise<CartItem[]>;
  handleAddToCart: (product: Product, quantity?: number) => Promise<void>;
  handleRemoveFromCart: (productId: string) => Promise<void>;
  handleUpdateQuantity: (productId: string, quantity: number) => Promise<void>;
  setShippingType: (type: "fast" | "saving") => void;
  setPaymentMethod: (method: "cash" | "card") => void;

  handleGetMyCoupons: () => Promise<void>;
  handleApplyCoupon: (
    couponCode: string,
    type: "product" | "shipping",
  ) => Promise<void>;
  handleClearCart: () => Promise<void>;

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
  shippingDiscount: 0,

  total: 0,
  subtotal: 0,
  totalShippingPrice: 0,

  handleGetCartItems: async () => {
    try {
      const response = await axiosInstance.get("/carts");
      let cartWithSelection = response.data;

      // Gọi API /products/{id} để lấy thông tin chi tiết (bao gồm categories)
      cartWithSelection = await Promise.all(
        cartWithSelection.map(async (item: any) => {
          try {
            const productResponse = await axiosInstance.get(`/products/${item._id}`);
            return {
              ...item,
              isSelected: false,
              categories: productResponse.data.categories || [], // Lấy categories từ API
            };
          } catch (error) {
            console.error(`Failed to fetch product details for ${item._id}:`, error);
            return {
              ...item,
              isSelected: false,
              categories: [], // Fallback nếu không lấy được categories
            };
          }
        }),
      );

      const groupCart = map(
        groupBy(cartWithSelection, (item) => item.current_seller.seller.store_id),
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
          isSelected: false,
        }),
      );
      set({ cart: cartWithSelection, groupCart });
      get().calculateTotal();
      return cartWithSelection;
    } catch (error) {
      set({ cart: [], groupCart: [] });
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.message);
      }
      return [];
    }
  },

  handleAddToCart: async (product, quantity = 1) => {
    try {
      await axiosInstance.post("/carts", {
        productId: product._id,
        quantity,
      });
      await get().handleGetCartItems();
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
      await get().handleGetCartItems();
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
      await get().handleGetCartItems();
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
      (sum, item) =>
        item.isSelected ? sum + item.original_price * item.quantity : sum,
      0,
    );

    const subtotalDiscount = cart.reduce(
      (sum, item) =>
        item.isSelected ? sum + item.current_seller.price * item.quantity : sum,
      0,
    );

    const totalShippingPrice =
      shippingType === "fast"
        ? groupCart.reduce(
            (acc, group) =>
              group.items.some((item) => item.isSelected)
                ? acc + group.totalShippingPrice
                : acc,
            0,
          )
        : Math.max(
            ...cart
              .filter((item) => item.isSelected)
              .map((item) => item.shippingPrice),
            0,
          );

    let productDiscount = 0;
    let shippingDiscount = 0;

    if (discountCoupon) {
      if (discountCoupon.discountType === "percentage") {
        const discount = (discountCoupon.discount / 100) * subtotalDiscount;
        productDiscount = Math.min(discount, discountCoupon.maxDiscount);
      } else {
        productDiscount = discountCoupon.discount;
      }
    }

    if (shippingCoupon) {
      if (shippingCoupon.discount > totalShippingPrice) {
        shippingDiscount = totalShippingPrice;
      } else {
        shippingDiscount = shippingCoupon.discount;
      }
    }

    const total =
      subtotalDiscount +
      totalShippingPrice -
      productDiscount -
      shippingDiscount;

    set({
      subtotal,
      total,
      productDiscount,
      totalShippingPrice,
      shippingDiscount,
    });
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
        toast.success(`Mã giảm giá ${couponCode} đã được áp dụng thành công`);
      } else {
        set({ shippingCoupon: response.data });
        toast.success(`Mã giảm giá ${couponCode} đã được áp dụng thành công`);
      }

      get().calculateTotal();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "Không thể áp dụng mã giảm giá",
        );
      }
    }
  },

  removeDiscountCoupon: () => {
    set({ discountCoupon: null });
    get().calculateTotal();
  },

  removeShippingCoupon: () => {
    set({ shippingCoupon: null });
    get().calculateTotal();
  },

  setShippingType: (type: "fast" | "saving") => {
    set({ shippingType: type });
    get().calculateTotal();
  },

  setPaymentMethod: (method: "cash" | "card") => {
    set({ paymentMethod: method });
  },

  handleClearCart: async () => {
    try {
      await axiosInstance.delete("/carts/delete-all");
      set({ cart: [], groupCart: [] });
      get().calculateTotal();
      toast.success("Cart cleared successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message ?? "Failed to clear cart");
      }
    }
  },
}));