import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { User } from "@/types/user";
import DeleteUserModal from "./DeleteUserModal";

const UserList = ({
  users,
  setFilterUsers,
}: {
  users: User[];
  setFilterUsers: (users: User[]) => void;
}) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpenDeleteModal = (id: string) => {
    setIsOpenDeleteModal(true);
    setSelectedUser(users.find((user) => user._id === id) || null);
  };

  return (
    <>
      <div className="rounded border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Users: {users.length}
          </h2>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-2 text-left">
                User Name
              </th>
              <th className="border border-gray-200 p-2 text-left">Email</th>
              <th className="border border-gray-200 p-2 text-left">Role</th>
              <th className="border border-gray-200 p-2 text-left">Verified</th>
              <th className="border border-gray-200 p-2 text-left">
                Created At
              </th>
              <th className="border border-gray-200 p-2 text-left">
                Updated At
              </th>
              <th className="border border-gray-200 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center">
                  <div className="text-gray-500">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7h18M3 11h18M3 15h18M3 19h18"
                      />
                    </svg>
                    <p>No Data</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b border-gray-200">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2">{user.isVerified ? "Yes" : "No"}</td>
                  <td className="p-2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="flex items-center justify-center p-2">
                    <button
                      onClick={() => handleOpenDeleteModal(user._id)}
                      className="btn text-red-500 hover:text-red-700"
                    >
                      <MdDeleteOutline size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <DeleteUserModal
          show={isOpenDeleteModal}
          user={selectedUser}
          onClose={() => setIsOpenDeleteModal(false)}
          setFilterUsers={setFilterUsers}
        />
      )}
    </>
  );
};

export default UserList;
