import SearchBar from "../common/SearchBar";
import { Filter } from "../../OrderPage";

const OrderFilter = ({
  filters,
  setFilters,
}: {
  filters: Filter;
  setFilters: (filters: Filter) => void;
}) => {
  const handleFilterChange = (name: string, value: string) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="mb-4 flex space-x-2">
      <SearchBar
        placeholder="Search by order number"
        value={filters.orderNumber}
        onChange={(e) => handleFilterChange("orderNumber", e.target.value)}
      />
      <select
        value={filters.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
        className="rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <select
        value={filters.paymentMethod}
        onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
        className="rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Payment Methods</option>
        <option value="cash">Cash</option>
        <option value="card">Card</option>
      </select>
    </div>
  );
};

export default OrderFilter;
