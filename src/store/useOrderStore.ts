import axiosInstance from "@/lib/axios";
import { Order } from "@/types/order";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { useCartStore } from "./useCartStore";
import { AxiosError } from "axios";

type ErrorResponse = {
  success: boolean;
  message: string;
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface OrderStore {
  orders: Order[] | null;
  isLoading: boolean;
  currentOrder: Order | null;
  useCartStore: typeof useCartStore;

  handleGetOrdersByUserId: (userId: string) => Promise<void>;
  handleGetOrderById: (orderId: string) => Promise<void>;
  handlePaymentCard: () => Promise<void>;
  handlePaymentCash: () => Promise<void>;
  handleCheckoutSuccess: (sessionId: string) => Promise<void>;

  handleGetAllOrders: () => Promise<void>;
  handleUpdateOrder: (id: string, updatedOrder: Order) => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: null,
  currentOrder: null,
  isLoading: false,
  useCartStore: useCartStore,

  handleGetAllOrders: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/orders");

      set({ orders: response.data });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to fetch orders",
      );
    } finally {
      set({ isLoading: false });
    }
  },

  handleUpdateOrder: async (id, updatedOrder) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.put(`/orders/${id}`, updatedOrder);

      set((state) => ({
        orders: state.orders?.map((order) =>
          order._id === id ? response.data : order,
        ),
      }));
      toast.success("Order updated successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to update order",
      );
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  handleGetOrdersByUserId: async (userId) => {
    try {
      const response = await axiosInstance.get(`/orders/user/${userId}`);
      set({ orders: response.data });
    } catch (error) {
      console.error(error);
    }
  },

  handleGetOrderById: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`);

      set({ currentOrder: response.data });
    } catch (error) {
      console.error(error);
    }
  },

  handlePaymentCard: async () => {
    const {
      paymentMethod,
      selectedCart,
      discountCoupon,
      shippingCoupon,
      totalShippingPrice,
    } = useCartStore.getState();

    if (paymentMethod === "cash") {
      toast.error("Thanh toán tiền mặt không hỗ trợ");
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        toast.error("Stripe failed to initialize");
        return;
      }

      const res = await axiosInstance.post(
        "/payments/create-checkout-session",
        {
          products: selectedCart,
          couponCodes: [discountCoupon?.code, shippingCoupon?.code],
          shippingPrice: totalShippingPrice,
        },
      );

      set({ currentOrder: res.data });

      const session = res.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        toast.error(result.error.message ?? "Payment failed");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Payment failed");
    }
  },

  handlePaymentCash: async () => {
    const { selectedCart, shippingCoupon, totalShippingPrice, total } =
      useCartStore.getState();

    try {
      const res = await axiosInstance.post("/payments/create-cash-order", {
        products: selectedCart,
        shippingDate: selectedCart[0].shippingDate,
        shippingPrice: totalShippingPrice,
        shippingDiscount: shippingCoupon?.discount ?? 0,
        totalAmount: total,
      });

      const order: Order = res.data.order;
      set({ currentOrder: order });

      order.products.forEach((product) => {
        useCartStore.getState().handleRemoveFromCart(product.product._id);
      });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Payment failed");
    }
  },

  handleCheckoutSuccess: async (sessionId: string) => {
    try {
      if (!sessionId) {
        toast.error("No session ID found in the URL");
        return;
      }

      const res = await axiosInstance.post("/payments/checkout-success", {
        sessionId,
      });

      const order: Order = res.data.order;
      set({ currentOrder: order });

      order.products.forEach((product) => {
        useCartStore.getState().handleRemoveFromCart(product.product._id);
      });
    } catch (error) {
      console.log(error);
    }
  },
}));
