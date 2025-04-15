import React, { useEffect } from "react";
import OrderList from "../AdminPage/components/order/OrderList.tsx";
import OrderFilter from "../AdminPage/components/order/OrderFilter";
import { useOrderAdminStore } from "@/store/useOrderAdminStore";
import { Link } from "react-router-dom";

const OrderPage: React.FC = () => {
  const { filteredOrders, fetchOrders, filterOrders, loading } = useOrderAdminStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleOrderFilterChange = (filters: { orderNumber: string; status: string; paymentMethod: string }) => {
    filterOrders(filters);
  };

  // Đếm số lượng đơn hàng theo trạng thái
  const pendingCount = filteredOrders.filter((order) => order.status === "pending").length;
  const shippedCount = filteredOrders.filter((order) => order.status === "shipped").length;

  return (
    <div className="p-6">
      <div className="mb-4 flex space-x-2">
        <button className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100">
          ALL ({filteredOrders.length})
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 text-blue-500 hover:bg-gray-100">
          Pending ({pendingCount})
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 text-orange-500 hover:bg-gray-100">
          Shipped ({shippedCount})
        </button>
      </div>
      <OrderFilter orders={filteredOrders} onFilterChange={handleOrderFilterChange} />
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <OrderList orders={filteredOrders} />
      )}
    </div>
  );
};

export default OrderPage;