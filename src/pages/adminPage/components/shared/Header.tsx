import { useState } from "react";
import { FaBell, FaStore, FaChevronDown, FaUser, FaLock, FaIdCard, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white h-16 w-full flex justify-between items-center shadow-md border border-gray-300 p-2">
            <div className="w-[250px] h-full flex items-center px-4">
                <a href="/new/" className="flex h-full w-full items-center">
                    <img
                        src="https://salt.tikicdn.com/ts/SellerCenter/a8/77/22/70afa8081f795da2ed1a7efefc3f0579.png"
                        alt="Seller Center Logo"
                        className="flex-shrink-0 w-[83px]"
                    />
                    <span className="flex-1 font-bold text-[18.3px] whitespace-nowrap overflow-hidden">
                        SELLER CENTER
                    </span>
                </a>
            </div>

            <div className="flex items-center space-x-4">
                {/* Phần thông báo với chuông */}
                <div className="relative">
                    <FaBell className="text-xl" />
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        1
                    </span>
                </div>

                {/* Phần username với border tròn, icon cửa hàng, và dropdown */}
                <div className="relative">
                    <div
                        className="flex items-center space-x-2 border border-gray-300 rounded-full px-3 py-1 bg-gray-100 cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {/* Icon cửa hàng */}
                        <FaStore className="text-xl" />
                        {/* Username */}
                        <span className="text-gray-700">quainhannmlc...</span>
                        {/* Mũi tên dropdown */}
                        <FaChevronDown className="text-gray-500" />
                    </div>

                    {/* Dropdown menu */}
                    {isOpen && (
                        <div className="absolute top-10 right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            {/* Header của dropdown */}
                            <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                                <FaStore className="text-xl" />
                                <div>
                                    <p className="font-semibold text-gray-800">Đức Đạo Dĩnh</p>
                                    <p className="text-sm text-gray-500">quainhannmlc@gmail.com</p>
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
                                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 border-t border-gray-200 w-full text-left"
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