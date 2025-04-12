import { useState } from "react";
import {
  FaBell,
  FaChevronDown,
  FaUser,
  FaLock,
  FaIdCard,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        {/* Phần thông báo với chuông */}
        <div className="relative">
          <FaBell className="text-xl" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs text-white">
            1
          </span>
        </div>

        {/* Phần username với border tròn, icon cửa hàng, và dropdown */}
        <div className="relative">
          <div
            className="flex cursor-pointer items-center space-x-2 rounded-full border border-gray-300 bg-gray-100 px-3 py-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Icon cửa hàng */}
            <img
              className="flex w-6 rounded-full"
              src="https://salt.tikicdn.com/cache/w40/ts/sellercenterFE/93/76/03/2a08fa4ae6a024a752fbba87d145bce8.png"
              alt=""
            />
            {/* Username */}
            <span className="text-gray-700">quainhannmlc...</span>
            {/* Mũi tên dropdown */}
            <FaChevronDown className="text-gray-500" />
          </div>

          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute top-15 right-0 z-10 w-64 rounded-lg border border-gray-200 bg-white shadow-lg">
              {/* Header của dropdown */}
              <div className="flex items-center space-x-3 border-b border-gray-200 p-3">
                <img
                  className="flex rounded-full"
                  src="https://salt.tikicdn.com/cache/w40/ts/sellercenterFE/93/76/03/2a08fa4ae6a024a752fbba87d145bce8.png"
                  alt=""
                />
                <div>
                  <p className="font-semibold text-gray-800">Đức Đạo Dĩnh</p>
                  <p className="text-sm text-gray-500">
                    quainhannmlc@gmail.com
                  </p>
                </div>
              </div>

              {/* Các tùy chọn trong dropdown */}
              <div className="py-2">
                <a
                  href="/profile"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUser className="text-lg" />
                  <span>Profile</span>
                </a>
                <a
                  href="/change-password"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <FaLock className="text-lg" />
                  <span>Change password</span>
                </a>
                <a
                  href="/update-citizen-id"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <FaIdCard className="text-lg" />
                  <span>Update citizen identity card</span>
                </a>
                <a
                  href="/add-account"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserPlus className="text-lg" />
                  <span>Add another account</span>
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center space-x-3 border-t border-gray-200 px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
