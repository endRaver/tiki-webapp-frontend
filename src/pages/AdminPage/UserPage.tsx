import React, { useEffect, useState } from "react";
import UserList from "../AdminPage/components/user/UserList";
import UserFilter from "../AdminPage/components/user/UserFilter";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { User } from "@/types/user";
import { useUserStore } from "@/store/useUserStore";

export type Filters = {
  name: string;
  role: string;
  isVerified: string;
};

const UserPage: React.FC = () => {
  const { loading, users, handleGetUsers } = useUserStore();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<Filters>({
    name: "",
    role: "",
    isVerified: "",
  });

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  useEffect(() => {
    const filtered = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        user.role.toLowerCase().includes(filters.role.toLowerCase()) &&
        user.isVerified.toString().includes(filters.isVerified)
      );
    });
    setFilteredUsers(filtered);
  }, [users, filters]);

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="mb-4 flex items-center">
          <Link
            to="/admin/products"
            className="mr-2 text-gray-500 hover:text-gray-700"
          >
            <FaChevronLeft />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">List User</h1>
        </div>
      </div>

      <UserFilter filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="py-10 text-center">Loading...</div>
      ) : (
        <UserList users={filteredUsers} setFilterUsers={setFilteredUsers} />
      )}
    </div>
  );
};

export default UserPage;
