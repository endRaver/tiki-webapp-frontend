import { createPortal } from "react-dom";
import { User } from "@/types/user";

import { useUserStore } from "@/store/useUserStore";

interface DeleteModalProps {
  show: boolean;
  user: User;
  onClose: () => void;
  setFilterUsers: (users: User[]) => void;
}

const DeleteUserModal: React.FC<DeleteModalProps> = ({
  show,
  user,
  onClose,
  setFilterUsers,
}) => {
  const { loading, handleDeleteUser, users } = useUserStore();

  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center">
          <span className="mr-2 text-orange-500">⚠️</span>
          <h2 className="text-lg font-semibold">Delete User</h2>
        </div>
        <p className="mb-2 text-sm text-gray-600">
          Are you sure you want to delete this user?
        </p>
        <p className="text-sm font-medium text-gray-800">{user.name}</p>
        <p className="mt-2 font-semibold text-gray-600">{user.email}</p>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => {
              handleDeleteUser(user._id);
              setFilterUsers(users.filter((u) => u._id !== user._id));
              onClose();
            }}
            className="flex items-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="mr-2 h-5 w-5 animate-spin text-white"
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
            onClick={onClose}
            className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default DeleteUserModal;
