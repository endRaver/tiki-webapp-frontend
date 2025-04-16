import React, { useState } from "react";
import SearchBar from "../common/SearchBar";
interface Order {
  orderNumber: string;
  status: string;
  paymentMethod: string;
}
interface OrderFilterProps {
  orders: Order[];
  onFilterChange: (filters: { orderNumber: string; status: string; paymentMethod: string }) => void;
}
const OrderFilter: React.FC<OrderFilterProps> = ({ orders, onFilterChange }) => {
  const [filters, setFilters] = useState({
    orderNumber: "",
    status: "",
    paymentMethod: "",
  });
  const handleFilterChange = (name: string, value: string) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  const uniqueStatuses = Array.from(new Set(orders.map((order) => order.status)));
  const uniquePaymentMethods = Array.from(new Set(orders.map((order) => order.paymentMethod)));
  return (
    <div className="flex space-x-2 mb-4">
      <SearchBar
        placeholder="Search by order number"
        value={filters.orderNumber}
        onChange={(e) => handleFilterChange("orderNumber", e.target.value)}
      />
      <select
        value={filters.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Statuses</option>
        {uniqueStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <select
        value={filters.paymentMethod}
        onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Payment Methods</option>
        {uniquePaymentMethods.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
    </div>
  );
};
export default OrderFilter;