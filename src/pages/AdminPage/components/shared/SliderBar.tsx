import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaHeadset,
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaChartColumn } from "react-icons/fa6";

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
        subItem.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
      className={`font-inter flex flex-col border-r border-gray-200 bg-white text-sm transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } h-[calc(100vh-64px)] flex-shrink-0`}
    >
      {!isCollapsed && (
        <div className="mt-4 mb-4 px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-full border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-500" />
          </div>
        </div>
      )}

      <ul className="flex-1 space-y-1 overflow-y-auto px-2">
        <li>
          <Link
            to={"/admin/dashboard"}
            className="flex cursor-pointer items-center gap-3 rounded p-2 text-gray-700 hover:bg-gray-100"
          >
            <FaChartColumn className="text-lg" />
            <span className="flex-1">Dashboard</span>
          </Link>
        </li>

        {searchQuery
          ? filteredItems.map((item, index) => (
              <li key={index}>
                <div
                  className={`flex cursor-pointer items-center rounded p-2 text-gray-700 hover:bg-gray-100 ${
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
                      {item.hasSubmenu &&
                        item.subItems.length > 0 &&
                        (openMenus.includes(item.name) ? (
                          <FaChevronUp className="text-sm text-gray-500" />
                        ) : (
                          <FaChevronDown className="text-sm text-gray-500" />
                        ))}
                    </>
                  )}
                </div>

                {!isCollapsed &&
                  item.hasSubmenu &&
                  openMenus.includes(item.name) && (
                    <ul className="space-y-1 pl-8">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.link}
                            className="flex items-center rounded p-2 text-gray-600 hover:bg-gray-100"
                          >
                            <span className="flex-1">{subItem.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))
          : menuItems.map((item, index) => (
              <li key={index}>
                <div
                  className={`flex cursor-pointer items-center rounded p-2 text-gray-700 hover:bg-gray-100 ${
                    isCollapsed ? "mt-2 justify-center" : ""
                  }`}
                  onClick={() => !isCollapsed && toggleSubmenu(item.name)}
                >
                  <item.icon
                    className={isCollapsed ? "text-lg" : "mr-3 text-lg"}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.hasSubmenu &&
                        (openMenus.includes(item.name) ? (
                          <FaChevronUp className="text-sm text-gray-500" />
                        ) : (
                          <FaChevronDown className="text-sm text-gray-500" />
                        ))}
                    </>
                  )}
                </div>

                {!isCollapsed &&
                  item.hasSubmenu &&
                  openMenus.includes(item.name) && (
                    <ul className="space-y-1 pl-8">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.link}
                            className="flex items-center rounded p-2 text-gray-600 hover:bg-gray-100"
                          >
                            <span className="flex-1">{subItem.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
      </ul>

      <div className="border-t border-gray-200 p-4">
        {!isCollapsed && (
          <button className="mb-2 flex w-full items-center justify-center rounded-full border border-gray-300 py-2 text-gray-700 hover:bg-gray-100">
            <FaHeadset className="mr-2" />
            Support
          </button>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex w-full items-center justify-center rounded py-2 text-gray-700 transition-all duration-300 hover:bg-gray-100 ${
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
