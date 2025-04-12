import React, { useState } from "react";
import SearchBar from "../common/SearchBar";

interface OrderFilterProps {
  orders: { orderNumber: string }[];
  onFilterChange: (filters: { orderNumber: string }) => void;
}

const OrderFilter: React.FC<OrderFilterProps> = ({ orders, onFilterChange }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ orderNumber: searchValue });
  };

  return (
    <div className="flex space-x-2 mb-4">
      <select
        value={selectedOrder}
        onChange={(e) => {
          setSelectedOrder(e.target.value);
          handleFilterChange();
        }}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option>Order number</option>
        {orders.map((order) => (
          <option key={order.orderNumber} value={order.orderNumber}>
            {order.orderNumber}
          </option>
        ))}
      </select>
      <SearchBar
        placeholder="Search by order number"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleFilterChange();
        }}
      />
      <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
        Other filters +
      </button>
    </div>
  );
};

export default OrderFilter;