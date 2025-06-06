import React, { useState } from "react";
import ReturnOrders from "../AdminPage/components/order/ReturnOrders";

const ReturnOrderPage: React.FC = () => {
  const [returnOrders] = useState([
    {
      _id: "return1",
      orderNumber: "ORD001",
      reason: "Defective product",
      total: 100000,
      createdAt: "2025-04-01T19:37:12.705Z",
    },
  ]);

  return (
    <div className="h-[calc(100vh-64px)] overflow-auto p-6">
      <ReturnOrders returnOrders={returnOrders} />
    </div>
  );
};

export default ReturnOrderPage;
