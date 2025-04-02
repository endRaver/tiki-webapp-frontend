import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBox, FaList, FaUsers, FaShoppingCart, FaHeadset, FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SliderBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]); // Trạng thái mở/đóng submenu

  const menuItems = [
    {
      name: "Product",
      icon: FaBox,
      hasSubmenu: true,
      subItems: [
        { name: "Add Product", link: "/admin/products/add" },
        { name: "List Products", link: "/admin/products" },
      ],
    },
    {
      name: "Category",
      icon: FaList,
      hasSubmenu: true,
      subItems: [
        { name: "Add Category", link: "/admin/categories/add" },
        { name: "List Categories", link: "/admin/categories" },
      ],
    },
    {
      name: "User",
      icon: FaUsers,
      hasSubmenu: true,
      subItems: [
        { name: "Add User", link: "/admin/users/add" },
        { name: "List Users", link: "/admin/users" },
      ],
    },
    {
      name: "Order",
      icon: FaShoppingCart,
      hasSubmenu: true,
      subItems: [
        { name: "List Orders", link: "/admin/orders" },
        { name: "Return Orders", link: "/admin/orders/return" },
      ],
    },
  ];

  // Hàm toggle submenu
  const toggleSubmenu = (menuName: string) => {
    if (openMenus.includes(menuName)) {
      setOpenMenus(openMenus.filter((name) => name !== menuName));
    } else {
      setOpenMenus([...openMenus, menuName]);
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 flex font-inter text-sm flex-col h-screen transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } overflow-auto`} // Chiều rộng cố định: 64px khi thu gọn, 256px khi mở rộng
    >
      {/* Thanh tìm kiếm */}
      {!isCollapsed && (
        <div className="px-4 mb-4 mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled // Tạm thời vô hiệu hóa vì chưa có API
            />
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
      )}

      {/* Menu */}
      <ul className="flex-1 space-y-1 px-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            {/* Mục chính */}
            <div
              className={`flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer ${
                isCollapsed ? "justify-center" : ""
              }`}
              onClick={() => !isCollapsed && toggleSubmenu(item.name)}
            >
              <item.icon
                className={isCollapsed ? "text-lg" : "mr-3 text-lg"}
              />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.hasSubmenu && (
                    openMenus.includes(item.name) ? (
                      <FaChevronUp className="text-gray-500 text-sm" />
                    ) : (
                      <FaChevronDown className="text-gray-500 text-sm" />
                    )
                  )}
                </>
              )}
            </div>

            {/* Submenu */}
            {!isCollapsed && item.hasSubmenu && openMenus.includes(item.name) && (
              <ul className="pl-8 space-y-1">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      to={subItem.link}
                      className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <span className="flex-1">{subItem.name}</span>
                      {subItem.name === "Return Orders" && (
                        <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                          NEW
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Nút Support */}
      {!isCollapsed && (
        <div className="p-4">
          <button className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100">
            <FaHeadset className="mr-2" />
            Support
          </button>
        </div>
      )}

      {/* Nút Collapse */}
      <div className="p-2 flex justify-center border-t border-gray-200">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isCollapsed ? (
            <FaChevronRight />
          ) : (
            <>
              <FaChevronLeft />
              <span className="ml-2">Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SliderBar;