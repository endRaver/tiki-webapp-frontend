import { useUserStore } from "@/store/useUserStore";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserProfileMobile = ({ onClose }: { onClose: () => void }) => {
  const { user, handleLogout } = useUserStore();

  const handleOpenAuthModal = () => {
    const modal = document.getElementById("auth_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
      onClose();
    }
  };

  const handleLogoutClick = async () => {
    await handleLogout();
    onClose();
  };

  // Base button classes
  const baseButtonClasses =
    "px-3 py-1.5 border rounded w-full text-center no-underline text-sm";
  const defaultButtonClasses = `${baseButtonClasses} border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200`;
  const primaryButtonClasses = `${baseButtonClasses} border-blue-500 bg-blue-500 text-white hover:bg-blue-600`;
  const dangerButtonClasses = `${baseButtonClasses} border-red-500 bg-red-500 text-white hover:bg-red-600`;

  return (
    // Main container
    <div className="mb-3 flex w-full flex-col items-center gap-3 border-b border-gray-200 p-4 pb-6">
      {user ? (
        <>
          <Link
            to="/profile/user-info"
            onClick={onClose}
            className="mb-2 flex flex-col items-center gap-2 text-inherit no-underline"
          >
            <FaUserCircle size={40} className="text-gray-400" />
            <div className="text-base font-bold">{user.name}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
          </Link>

          <div className="flex w-full flex-col gap-2.5 px-4">
            <Link
              to="/profile/user-info"
              className={defaultButtonClasses}
              onClick={onClose}
            >
              Tài khoản của tôi
            </Link>
            <Link
              to="/profile/orders"
              className={`${defaultButtonClasses} flex items-center justify-center gap-1`}
              onClick={onClose}
            >
              Đơn hàng của tôi
            </Link>
            <button className={dangerButtonClasses} onClick={handleLogoutClick}>
              Đăng xuất
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-center text-gray-600">
            Đăng nhập hoặc đăng ký để xem thông tin tài khoản.
          </div>
          <div className="mt-2.5 flex w-full gap-2.5 px-4">
            <button
              className={primaryButtonClasses}
              onClick={handleOpenAuthModal}
            >
              Đăng nhập
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfileMobile;
