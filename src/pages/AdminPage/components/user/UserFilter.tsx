import SearchBar from "../common/SearchBar";
import { Filters } from "@/pages/AdminPage/UserPage";

const UserFilter = ({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}) => {
  const handleFilterChange = (name: string, value: string) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="mb-4 flex space-x-2">
      <SearchBar
        placeholder="Search by user name"
        value={filters.name}
        onChange={(e) => handleFilterChange("name", e.target.value)}
      />
      <select
        value={filters.role}
        onChange={(e) => handleFilterChange("role", e.target.value)}
        className="rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <select
        value={filters.isVerified}
        onChange={(e) => handleFilterChange("isVerified", e.target.value)}
        className="rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Verification Status</option>
        <option value="true">Verified</option>
        <option value="false">Not Verified</option>
      </select>
    </div>
  );
};

export default UserFilter;
