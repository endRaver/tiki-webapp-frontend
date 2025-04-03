import React, { useState } from "react";
import OrderList from "../adminPage/components/order/OrderList.tsx";
import OrderFilter from "../adminPage/components/order/OrderFilter";

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState([
    {
      _id: "order1",
      orderNumber: "ORD001",
      status: "Pending",
      total: 100000,
      createdAt: "2025-04-01T19:37:12.705Z",
    },
  ]);

  const handleOrderFilterChange = (filters: { orderNumber: string }) => {
    console.log("Order filters:", filters);
  };

  return (
    <div className="p-6">
      <div className="flex space-x-2 mb-4">
        <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
          ALL ({orders.length})
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded text-blue-500 hover:bg-gray-100">
          Pending (0)
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded text-orange-500 hover:bg-gray-100">
          Shipped (0)
        </button>
      </div>
      <OrderFilter orders={orders} onFilterChange={handleOrderFilterChange} />
      <OrderList orders={orders} />
    </div>
  );
};

export default OrderPage;