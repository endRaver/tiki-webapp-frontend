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
  shippingDiscount: number;

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
    type: "product" | "shipping"
  ) => Promise<void>;

  removeDiscountCoupon: () => void;
  removeShippingCoupon: () => void;

  // Thêm các hàm để quản lý isSelected
  toggleSelectItem: (productId: string) => void;
  toggleSelectAll: (selectAll: boolean) => void;
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
      console.log("Cart API Response:", response.data);
      const cartWithSelection = response.data.map((item: CartItem) => ({
        ...item,
        isSelected: false, // Khởi tạo isSelected cho từng sản phẩm
      }));
      const groupCart = map(
        groupBy(cartWithSelection, (item) => item.current_seller.seller.store_id),
        (items) => ({
          items,
          totalShippingPrice: Math.max(
            ...items.map((item) => item.shippingPrice || 0)
          ),
          shippingDate: new Date(
            Math.max(
              ...items.map((item) => new Date(item.shippingDate).getTime())
            )
          ),
        })
      );
      set({ cart: cartWithSelection, groupCart });
      get().calculateTotal();
      return cartWithSelection;
    } catch (error) {
      console.error("Fetch Cart Error:", error);
      set({ cart: [], groupCart: [] });
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
          (item) => item._id === product._id
        );

        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...response.data, isSelected: false }];
        return { cart: newCart };
      });

      toast.success("Product added to cart");
      get().calculateTotal();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "Failed to add product to cart"
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
      get().calculateTotal();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "Failed to remove product from cart"
        );
      }
    }
  },

  handleUpdateQuantity: async (productId, quantity) => {
    try {
      await axiosInstance.put(`/carts/${productId}`, { quantity });

      set((prevState) => {
        const newCart = prevState.cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        );
        return { cart: newCart };
      });

      toast.success("Quantity updated");
      get().calculateTotal();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "Failed to update quantity"
        );
      }
    }
  },

  calculateTotal: () => {
    const { cart, shippingCoupon, shippingType, groupCart, discountCoupon } =
      get();

    // Chỉ tính các sản phẩm được chọn
    const selectedItems = cart.filter((item) => item.isSelected);

    const subtotal = selectedItems.reduce(
      (sum, item) => sum + item.original_price * item.quantity,
      0
    );

    const subtotalDiscount = selectedItems.reduce(
      (sum, item) => sum + item.current_seller.price * item.quantity,
      0
    );

    const totalShippingPrice =
      shippingType === "fast"
        ? groupCart.reduce((acc, group) => {
            const selectedGroupItems = group.items.filter((item) => item.isSelected);
            return selectedGroupItems.length > 0
              ? acc + group.totalShippingPrice
              : acc;
          }, 0)
        : selectedItems.length > 0
        ? Math.max(...selectedItems.map((item) => item.shippingPrice || 0))
        : 0;

    let productDiscount = 0;
    let shippingDiscount = 0;

    if (discountCoupon && selectedItems.length > 0) {
      if (discountCoupon.discountType === "percentage") {
        const discount = (discountCoupon.discount / 100) * subtotalDiscount;
        productDiscount = Math.min(discount, discountCoupon.maxDiscount);
      } else {
        productDiscount = discountCoupon.discount;
      }
    }

    if (shippingCoupon && selectedItems.length > 0) {
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
      console.error(error);
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

  // Hàm để toggle trạng thái chọn của một sản phẩm
  toggleSelectItem: (productId: string) => {
    set((prevState) => {
      const newCart = prevState.cart.map((item) =>
        item._id === productId ? { ...item, isSelected: !item.isSelected } : item
      );
      return { cart: newCart };
    });
    get().calculateTotal();
  },

  // Hàm để chọn hoặc bỏ chọn tất cả sản phẩm
  toggleSelectAll: (selectAll: boolean) => {
    set((prevState) => {
      const newCart = prevState.cart.map((item) => ({
        ...item,
        isSelected: selectAll,
      }));
      return { cart: newCart };
    });
    get().calculateTotal();
  },
}));