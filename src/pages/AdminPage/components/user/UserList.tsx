import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useUserAdminStore } from "@/store/useUserAdminStore";
import { createPortal } from "react-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserListProps {
  users: User[];
}

const DeleteModal = ({ show, user, onConfirm, onCancel, deleting }) => {
  if (!show || !user) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center">
          <span className="mr-2 text-orange-500">⚠️</span>
          <h2 className="text-lg font-semibold">Delete User</h2>
        </div>
        <p className="mb-2 text-sm text-gray-600">Are you sure you want to delete this user?</p>
        <p className="text-sm font-medium text-gray-800">{user.name}</p>
        <p className="mt-2 font-semibold text-gray-600">{user.email}</p>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onConfirm}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 flex items-center"
            disabled={deleting}
          >
            {deleting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Deleting...
              </>
            ) : (
              "Confirm"
            )}
          </button>
          <button
            onClick={onCancel}
            className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            disabled={deleting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  const {
    showDeleteModal,
    deleteUserId,
    setShowDeleteModal,
    setDeleteUserId,
    confirmDeleteUser,
    deleting,
  } = useUserAdminStore();

  const handleDelete = (id: string) => {
    setDeleteUserId(id);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteUserId(null);
  };

  const selectedUser = users.find((user) => user._id === deleteUserId);

  return (
    <div className="bg-white border border-gray-200 rounded p-6">
      <DeleteModal
        show={showDeleteModal}
        user={selectedUser}
        onConfirm={confirmDeleteUser}
        onCancel={cancelDelete}
        deleting={deleting}
      />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Users: {users.length}
        </h2>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">User Name</th>
            <th className="border border-gray-200 p-2 text-left">Email</th>
            <th className="border border-gray-200 p-2 text-left">Role</th>
            <th className="border border-gray-200 p-2 text-left">Verified</th>
            <th className="border border-gray-200 p-2 text-left">Created At</th>
            <th className="border border-gray-200 p-2 text-left">Updated At</th>
            <th className="border border-gray-200 p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-10">
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
                <td className="p-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="p-2">{new Date(user.updatedAt).toLocaleDateString()}</td>
                <td className="p-2 flex space-x-2">
                  <Link
                    to={{
                      pathname: `/admin/users/edit/${user._id}`,
                      state: { user }, // Truyền dữ liệu người dùng qua state
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;