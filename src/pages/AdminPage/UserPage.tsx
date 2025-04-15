import React, { useEffect } from "react";
import UserList from "../AdminPage/components/user/UserList";
import UserFilter from "../AdminPage/components/user/UserFilter";
import { useUserAdminStore } from "@/store/useUserAdminStore";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

const UserPage: React.FC = () => {
  const { filteredUsers, fetchUsers, filterUsers, loading } = useUserAdminStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserFilterChange = (filters: { name: string; role: string; isVerified: string }) => {
    filterUsers(filters);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
      <div className="flex items-center mb-4">
        <Link to="/admin/products" className="text-gray-500 hover:text-gray-700 mr-2">
          <FaChevronLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">List User</h1>
      </div>
        <Link
          to="/admin/users/add"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New User
        </Link>
      </div>
      <UserFilter users={filteredUsers} onFilterChange={handleUserFilterChange} />
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <UserList users={filteredUsers} />
      )}
    </div>
  );
};

export default UserPage;