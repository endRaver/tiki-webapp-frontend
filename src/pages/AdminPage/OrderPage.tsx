import React, { useEffect } from "react";
import OrderList from "../AdminPage/components/order/OrderList.tsx";
import OrderFilter from "../AdminPage/components/order/OrderFilter";
import { useOrderAdminStore } from "@/store/useOrderAdminStore";

const OrderPage: React.FC = () => {
  const { orders, filteredOrders, fetchOrders, filterOrders, loading } = useOrderAdminStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleOrderFilterChange = (filters: { orderNumber: string; status: string; paymentMethod: string }) => {
    filterOrders(filters);
  };

  const pendingCount = orders.filter((order) => order.status === "pending").length;
  const confirmedCount = orders.filter((order) => order.status === "confirmed").length;
  const shippedCount = orders.filter((order) => order.status === "shipped").length;
  const deliveredCount = orders.filter((order) => order.status === "delivered").length;
  const cancelledCount = orders.filter((order) => order.status === "cancelled").length;

  return (
    <div className="p-6">
      <div className="mb-4 flex space-x-2">
        <button className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100">
          ALL ({orders.length})
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
      <OrderFilter orders={orders} filteredOrders={filteredOrders} onFilterChange={handleOrderFilterChange} />
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <OrderList orders={filteredOrders} />
      )}
    </div>
  );
};

export default OrderPage;