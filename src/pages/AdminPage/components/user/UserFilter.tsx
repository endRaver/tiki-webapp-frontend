import React, { useState } from "react";
import SearchBar from "../common/SearchBar";

interface UserFilterProps {
  users: { name: string }[];
  onFilterChange: (filters: { name: string }) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ users, onFilterChange }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ name: searchValue });
  };

  return (
    <div className="flex space-x-2 mb-4">
      <select
        value={selectedUser}
        onChange={(e) => {
          setSelectedUser(e.target.value);
          handleFilterChange();
        }}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option>User name</option>
        {users.map((user) => (
          <option key={user.name} value={user.name}>
            {user.name}
          </option>
        ))}
      </select>
      <SearchBar
        placeholder="Search by user name"
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

export default UserFilter;