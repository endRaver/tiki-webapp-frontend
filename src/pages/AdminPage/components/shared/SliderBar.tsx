import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBox, FaUsers, FaShoppingCart, FaHeadset, FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Không cần giao diện SliderBarProps nữa
const SliderBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Tự quản lý trạng thái
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
      name: "User",
      icon: FaUsers,
      hasSubmenu: true,
      subItems: [{ name: "List Users", link: "/admin/users" }],
    },
    {
      name: "Order",
      icon: FaShoppingCart,
      hasSubmenu: true,
      subItems: [{ name: "List Orders", link: "/admin/orders" }],
    },
  ];

  const toggleSubmenu = (menuName: string) => {
    if (openMenus.includes(menuName)) {
      setOpenMenus(openMenus.filter((name) => name !== menuName));
    } else {
      setOpenMenus([...openMenus, menuName]);
    }
  };

  const filteredItems = menuItems
    .map((item) => {
      const matchedSubItems = item.subItems?.filter((subItem) =>
        subItem.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        matchedSubItems?.length > 0
      ) {
        return {
          ...item,
          subItems: matchedSubItems,
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  return (
    <div
      className={`bg-white border-r border-gray-200 flex font-inter text-sm flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } h-[calc(100vh-64px)] flex-shrink-0`}
    >
      {!isCollapsed && (
        <div className="px-4 mb-4 mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      )}
      <ul className="flex-1 space-y-1 px-2 overflow-y-auto">
        {searchQuery ? (
          filteredItems.map((item, index) => (
            <li key={index}>
              <div
                className={`flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer ${
                  isCollapsed ? "justify-center" : ""
                }`}
                onClick={() => !isCollapsed && toggleSubmenu(item.name)}
              >
                <item.icon className={isCollapsed ? "text-lg" : "mr-3 text-lg"} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.hasSubmenu && item.subItems.length > 0 && (
                      openMenus.includes(item.name) ? (
                        <FaChevronUp className="text-gray-500 text-sm" />
                      ) : (
                        <FaChevronDown className="text-gray-500 text-sm" />
                      )
                    )}
                  </>
                )}
              </div>

              {!isCollapsed && item.hasSubmenu && openMenus.includes(item.name) && (
                <ul className="pl-8 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={subItem.link}
                        className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
                      >
                        <span className="flex-1">{subItem.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          menuItems.map((item, index) => (
            <li key={index}>
              <div
                className={`flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer ${
                  isCollapsed ? "justify-center mt-2" : ""
                }`}
                onClick={() => !isCollapsed && toggleSubmenu(item.name)}
              >
                <item.icon className={isCollapsed ? "text-lg" : "mr-3 text-lg"} />
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

              {!isCollapsed && item.hasSubmenu && openMenus.includes(item.name) && (
                <ul className="pl-8 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={subItem.link}
                        className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
                      >
                        <span className="flex-1">{subItem.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        )}
      </ul>

      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <button className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 mb-2">
            <FaHeadset className="mr-2" />
            Support
          </button>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-full flex items-center justify-center py-2 rounded text-gray-700 hover:bg-gray-100 transition-all duration-300 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          {isCollapsed ? (
            <FaChevronRight className="text-lg" />
          ) : (
            <>
              <FaChevronLeft className="mr-2" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SliderBar;