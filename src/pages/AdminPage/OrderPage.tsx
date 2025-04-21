import React, { useEffect, useState } from "react";
import OrderList from "../AdminPage/components/order/OrderList.tsx";
import OrderFilter from "./components/order/OrderFilter.tsx";
import { Order } from "@/types/order.ts";
import { useOrderStore } from "@/store/useOrderStore.ts";

export type Filter = {
  orderNumber: string;
  status: string;
  paymentMethod: string;
};

const OrderPage: React.FC = () => {
  const [filters, setFilters] = useState<Filter>({
    orderNumber: "",
    status: "",
    paymentMethod: "",
  });
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const { orders, handleGetAllOrders, isLoading } = useOrderStore();

  useEffect(() => {
    handleGetAllOrders();
  }, [handleGetAllOrders]);

  useEffect(() => {
    if (orders) {
      setFilteredOrders(
        orders.filter((order) => {
          return (
            order.orderNumber.includes(filters.orderNumber) &&
            order.status.includes(filters.status) &&
            order.paymentMethod.includes(filters.paymentMethod)
          );
        }),
      );
    }
  }, [filters, orders]);

  const pendingCount = orders?.filter(
    (order) => order.status === "pending",
  ).length;
  const confirmedCount = orders?.filter(
    (order) => order.status === "confirmed",
  ).length;
  const shippedCount = orders?.filter(
    (order) => order.status === "shipped",
  ).length;
  const deliveredCount = orders?.filter(
    (order) => order.status === "delivered",
  ).length;
  const cancelledCount = orders?.filter(
    (order) => order.status === "cancelled",
  ).length;

  return (
    <div className="h-[calc(100vh-64px)] overflow-auto p-6">
      <div className="mb-4 flex space-x-2">
        <button className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100">
          ALL ({orders?.length})
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 text-blue-500 hover:bg-gray-100">
          Pending ({pendingCount})
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 text-green-500 hover:bg-gray-100">
          Confirmed ({confirmedCount})
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 text-orange-500 hover:bg-gray-100">
          Shipped ({shippedCount})
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 text-purple-500 hover:bg-gray-100">
          Delivered ({deliveredCount})
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 text-red-500 hover:bg-gray-100">
          Cancelled ({cancelledCount})
        </button>
      </div>

      <OrderFilter filters={filters} setFilters={setFilters} />
      {isLoading ? (
        <div className="py-10 text-center">Loading...</div>
      ) : (
        <OrderList orders={filteredOrders} />
      )}
    </div>
  );
};

export default OrderPage;
