import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface ErrorResponse {
  success: boolean;
  message: string;
}

interface Product {
  product: string;
  quantity: number;
  price: number;
  _id: string;
}

interface Order {
  _id: string;
  user: string;
  products: Product[];
  status: string;
  shippingPrice: number;
  shippingDate: string;
  shippingDiscount: number;
  paymentMethod: string;
  totalAmount: number;
  stripeSessionId: string | null;
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface OrderAdminStore {
  orders: Order[];
  filteredOrders: Order[];
  loading: boolean;
  deleting: boolean;
  showDeleteModal: boolean;
  deleteOrderId: string | null;
  setShowDeleteModal: (show: boolean) => void;
  setDeleteOrderId: (id: string | null) => void;
  fetchOrders: () => Promise<void>;
  updateOrder: (id: string, updatedOrder: Order) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  confirmDeleteOrder: () => Promise<void>;
  filterOrders: (filters: { orderNumber: string; status: string; paymentMethod: string }) => void;
}

export const useOrderAdminStore = create<OrderAdminStore>((set, get) => ({
  orders: [],
  filteredOrders: [],
  loading: false,
  deleting: false,
  showDeleteModal: false,
  deleteOrderId: null,

  setShowDeleteModal: (show: boolean) => set({ showDeleteModal: show }),

  setDeleteOrderId: (id: string | null) => set({ deleteOrderId: id }),

  fetchOrders: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/orders");
      const fetchedOrders = Array.isArray(response.data) ? response.data : [];
      set({ orders: fetchedOrders, filteredOrders: fetchedOrders });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to fetch orders");
    } finally {
      set({ loading: false });
    }
  },

  updateOrder: async (id: string, updatedOrder: Order) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/orders/${id}`, updatedOrder);
      set((state) => ({
        orders: state.orders.map((order) => (order._id === id ? response.data : order)),
        filteredOrders: state.filteredOrders.map((order) => (order._id === id ? response.data : order)),
      }));
      toast.success("Order updated successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to update order");
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteOrder: async (id: string) => {
    set({ deleting: true });
    try {
      await axiosInstance.delete(`/orders/${id}`);
      set((state) => ({
        orders: state.orders.filter((order) => order._id !== id),
        filteredOrders: state.filteredOrders.filter((order) => order._id !== id),
      }));
      toast.success("Order deleted successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to delete order");
      throw error;
    } finally {
      set({ deleting: false });
    }
  },

  confirmDeleteOrder: async () => {
    const { deleteOrderId, deleteOrder } = get();
    if (deleteOrderId) {
      await deleteOrder(deleteOrderId);
      set({ showDeleteModal: false, deleteOrderId: null });
    }
  },

  filterOrders: (filters: { orderNumber: string; status: string; paymentMethod: string }) => {
    const { orders } = get();
    let tempOrders = [...orders];

    if (filters.orderNumber) {
      tempOrders = tempOrders.filter((order) =>
        order.orderNumber.toLowerCase().includes(filters.orderNumber.toLowerCase())
      );
    }

    if (filters.status) {
      tempOrders = tempOrders.filter((order) => order.status === filters.status);
    } else {
      tempOrders = tempOrders.filter((order) =>
        ["pending", "confirmed", "shipped", "delivered", "cancelled"].includes(order.status)
      );
    }

    if (filters.paymentMethod) {
      tempOrders = tempOrders.filter((order) => order.paymentMethod === filters.paymentMethod);
    }

    set({ filteredOrders: tempOrders });
  },
}));