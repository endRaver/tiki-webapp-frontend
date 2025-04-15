import React, { useState } from "react";
import SearchBar from "../common/SearchBar";

interface User {
  name: string;
  role: string;
  isVerified: boolean;
}

interface UserFilterProps {
  users: User[];
  onFilterChange: (filters: { name: string; role: string; isVerified: string }) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ users, onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: "",
    role: "",
    isVerified: "",
  });

  const handleFilterChange = (name: string, value: string) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Lấy danh sách role duy nhất từ users
  const uniqueRoles = Array.from(new Set(users.map((user) => user.role)));

  return (
    <div className="flex space-x-2 mb-4">
      <SearchBar
        placeholder="Search by user name"
        value={filters.name}
        onChange={(e) => handleFilterChange("name", e.target.value)}
      />
      <select
        value={filters.role}
        onChange={(e) => handleFilterChange("role", e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Roles</option>
        {uniqueRoles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <select
        value={filters.isVerified}
        onChange={(e) => handleFilterChange("isVerified", e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Verification Status</option>
        <option value="true">Verified</option>
        <option value="false">Not Verified</option>
      </select>
    </div>
  );
};

export default UserFilter;