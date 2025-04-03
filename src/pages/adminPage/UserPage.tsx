import React, { useState } from "react";
import UserList from "../adminPage/components/user/UserList";
import UserFilter from "../adminPage/components/user/UserFilter";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState([
    {
      _id: "67ec40685051d57679596c7e",
      name: "Robin Sharma",
      slug: "robin-sharma",
      createdAt: "2025-04-01T19:37:12.705Z",
      updatedAt: "2025-04-01T19:37:12.705Z",
    },
    {
      _id: "user2",
      name: "John Doe",
      slug: "john-doe",
      createdAt: "2025-04-01T19:37:12.705Z",
      updatedAt: "2025-04-01T19:37:12.705Z",
    },
  ]);

  const handleUserFilterChange = (filters: { name: string }) => {
    console.log("User filters:", filters);
  };

  return (
    <div className="p-6">
      <div className="flex space-x-2 mb-4">
        <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
          ALL ({users.length})
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded text-blue-500 hover:bg-gray-100">
          Active (0)
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded text-orange-500 hover:bg-gray-100">
          Inactive (0)
        </button>
      </div>
      <UserFilter users={users} onFilterChange={handleUserFilterChange} />
      <UserList users={users} />
    </div>
  );
};

export default UserPage;