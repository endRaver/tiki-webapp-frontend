import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaHome, FaSignOutAlt } from "react-icons/fa";
import { useUserStore } from "@/store/useUserStore";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useUserStore();

  return (
    <div className="flex h-16 w-full items-center justify-between border border-gray-300 bg-white p-2 shadow-md">
      <div className="flex h-full w-[250px] items-center px-4">
        <a href="/" className="flex h-full w-full items-center">
          <img
            src="https://salt.tikicdn.com/ts/SellerCenter/a8/77/22/70afa8081f795da2ed1a7efefc3f0579.png"
            alt="Seller Center Logo"
            className="w-[83px] flex-shrink-0"
          />
          <span className="flex-1 overflow-hidden text-[18.3px] font-bold whitespace-nowrap">
            SELLER CENTER
          </span>
        </a>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="flex items-center text-gray-700 hover:text-blue-500"
        >
          <FaHome className="text-xl" />
          <span className="ml-2 hidden md:inline">Home</span>
        </Link>
        <div className="relative">
          <button
            className="flex cursor-pointer items-center space-x-2 rounded-full border border-gray-300 bg-gray-100 px-3 py-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              className="flex w-6 rounded-full"
              src="https://salt.tikicdn.com/cache/w40/ts/sellercenterFE/93/76/03/2a08fa4ae6a024a752fbba87d145bce8.png"
              alt=""
            />
            <span className="text-gray-700">
              {user?.email ? user.email.slice(0, 12) + "..." : "User"}
            </span>
            <FaChevronDown className="text-gray-500" />
          </button>
          {isOpen && (
            <div className="absolute top-10 right-0 z-50 w-52 rounded-lg bg-white py-2 shadow-md">
              <div className="flex items-center space-x-3 border-b border-gray-200 p-3">
                <img
                  className="flex w-8 rounded-full"
                  src="https://salt.tikicdn.com/cache/w40/ts/sellercenterFE/93/76/03/2a08fa4ae6a024a752fbba87d145bce8.png"
                  alt=""
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {user?.name || "Người dùng"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user?.email || "email@example.com"}
                  </p>
                </div>
              </div>
              <Link
                to="/profile/user-info"
                className="block w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                <span>Tài khoản của tôi</span>
              </Link>
              <Link
                to="/profile/orders"
                className="block w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                <span>Đơn hàng của tôi</span>
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="block w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  <span>Quản lý sản phẩm</span>
                </Link>
              )}
              <button
                className="block w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                onClick={async () => {
                  await handleLogout();
                  setIsOpen(false);
                }}
              >
                <FaSignOutAlt className="mr-2 inline" />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
