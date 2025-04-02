import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/shared/Header";
import SliderBar from "./components/shared/SliderBar";
import CategoryList from "./components/category/CategoryList.tsx";
import CategoryFilter from "./components/category/CategoryFilter";
import AddCategoryForm from "./components/category/CategoryAdd.tsx";
import ProductList from "./components/product/ProductList";
import ProductFilter from "./components/product/ProductFilter";
import AddProductForm from "./components/product/ProductAdd";
import UserList from "./components/user/UserList";
import UserFilter from "./components/user/UserFilter";
import AddUserForm from "./components/user/UserAdd";
import OrderList from "./components/order/OrderList.tsx";
import OrderFilter from "./components/order/OrderFilter";
import ReturnOrders from "./components/order/ReturnOrders";
import DashboardPage from "./DashboardPage";

const AdminPage: React.FC = () => {
  const [categories, setCategories] = useState([
    {
      _id: "cat1",
      name: "Sách tiếng Việt",
      is_leaf: false,
      createdAt: "2025-04-01T19:37:12.705Z",
      updatedAt: "2025-04-01T19:37:12.705Z",
    },
    {
      _id: "cat2",
      name: "Sách tiếng Anh",
      is_leaf: true,
      createdAt: "2025-04-01T19:37:12.705Z",
      updatedAt: "2025-04-01T19:37:12.705Z",
    },
  ]);

  const [products, setProducts] = useState([
    {
      _id: "67ec40685051d57679596c7d",
      authors: [
        {
          name: "Robin Sharma",
          slug: "robin-sharma",
          _id: "67ec40685051d57679596c7e",
        },
      ],
      categories: {
        name: "Sách tiếng Việt",
        is_leaf: false,
      },
      current_seller: {
        _id: "67ec40685051d57679596c63",
        name: "Tiki Trading",
        link: "https://tiki.vn/cua-hang/tiki-trading",
        logo: "https://vcdn.tikicdn.com/ts/seller/ee/fa/a0/98f3f134f85cff2c6972c31777629aa0.png",
        store_id: 40395,
        is_best_store: false,
        is_offline_installment_supported: null,
        price: 57491,
        product_id: "9889012",
        sku: "1395155565221",
        createdAt: "2025-04-01T19:37:12.470Z",
        updatedAt: "2025-04-01T19:37:12.470Z",
      },
      images: [
        {
          base_url: "https://salt.tikicdn.com/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
          is_gallery: true,
          label: null,
          position: null,
          large_url: "https://salt.tikicdn.com/cache/w1200/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
          medium_url: "https://salt.tikicdn.com/cache/w300/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
          small_url: "https://salt.tikicdn.com/cache/200x280/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
          thumbnail_url: "https://salt.tikicdn.com/cache/200x280/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
          _id: "67ec40685051d57679596c7f",
        },
      ],
      name: "Đời Ngắn Đừng Ngủ Dài (Tái Bản)",
      original_price: 75000,
      quantity_sold: {
        text: "Đã bán 1000+",
        value: 42844,
      },
      rating_average: 4.8,
      short_description:
        "“Mọi lựa chọn đều giá trị. Mọi bước đi đều quan trọng. Cuộc sống vẫn diễn ra theo cách của nó, không phải theo cách của ta. Hãy kiên nhẫn. Tin tưởng. Hãy giống như người thợ cắt đá, đều đặn từng nhịp,...",
      createdAt: "2025-04-01T19:37:12.705Z",
      updatedAt: "2025-04-01T19:37:12.705Z",
    },
  ]);

  const [users, setUsers] = useState([
    {
      _id: "67ec40685051d57679596c7e",
      name: "Robin Sharma",
      slug: "robin-sharma",
      createdAt: "2025-04-01T19:37:12.705Z",
      updatedAt: "2025-04-01T19:37:12.705Z",
    },
    {
      _id: "user2",
      name: "John Doe",
      slug: "john-doe",
      createdAt: "2025-04-01T19:37:12.705Z",
      updatedAt: "2025-04-01T19:37:12.705Z",
    },
  ]);

  const [orders, setOrders] = useState([
    {
      _id: "order1",
      orderNumber: "ORD001",
      status: "Pending",
      total: 100000,
      createdAt: "2025-04-01T19:37:12.705Z",
    },
  ]);

  const [returnOrders, setReturnOrders] = useState([
    {
      _id: "return1",
      orderNumber: "ORD001",
      reason: "Defective product",
      total: 100000,
      createdAt: "2025-04-01T19:37:12.705Z",
    },
  ]);

  const handleCategoryFilterChange = (filters: { name: string }) => {
    // Logic lọc danh mục
    console.log("Category filters:", filters);
  };

  const handleProductFilterChange = (filters: { name: string; category: string; brand: string }) => {
    // Logic lọc sản phẩm
    console.log("Product filters:", filters);
  };

  const handleUserFilterChange = (filters: { name: string }) => {
    // Logic lọc người dùng
    console.log("User filters:", filters);
  };

  const handleOrderFilterChange = (filters: { orderNumber: string }) => {
    // Logic lọc đơn hàng
    console.log("Order filters:", filters);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <div className="w-64 flex-shrink-0">
          <SliderBar />
        </div>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/categories"
            element={
              <div className="flex-1 p-6">
                <div className="flex space-x-2 mb-4">
                  <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
                    ALL ({categories.length})
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-blue-500 hover:bg-gray-100">
                    Active (0)
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-orange-500 hover:bg-gray-100">
                    Inactive (0)
                  </button>
                </div>
                <CategoryFilter categories={categories} onFilterChange={handleCategoryFilterChange} />
                <CategoryList categories={categories} />
              </div>
            }
          />
          <Route path="/categories/add" element={<AddCategoryForm />} />
          <Route
            path="/products"
            element={
              <div className="flex-1 p-6">
                <div className="flex space-x-2 mb-4">
                  <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
                    ALL ({products.length})
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-blue-500 hover:bg-gray-100">
                    Selling (0)
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-orange-500 hover:bg-gray-100">
                    Sắp giới hạn hiện thị (0)
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-red-500 hover:bg-gray-100">
                    Gợi ý sp Top Deal (0)
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
                    Out of stock (0)
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
                    Draft (1)
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
                    Reviewing (0)
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-orange-500 hover:bg-gray-100">
                    Violated (1)
                  </button>
                </div>
                <ProductFilter products={products} onFilterChange={handleProductFilterChange} />
                <ProductList products={products} />
              </div>
            }
          />
          <Route path="/products/add" element={<AddProductForm />} />
          <Route
            path="/users"
            element={
              <div className="flex-1 p-6">
                <div className="flex space-x-2 mb-4">
                  <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
                    ALL ({users.length})
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-blue-500 hover:bg-gray-100">
                    Active (0)
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-orange-500 hover:bg-gray-100">
                    Inactive (0)
                  </button>
                </div>
                <UserFilter users={users} onFilterChange={handleUserFilterChange} />
                <UserList users={users} />
              </div>
            }
          />
          <Route path="/users/add" element={<AddUserForm />} />
          <Route
            path="/orders"
            element={
              <div className="flex-1 p-6">
                <div className="flex space-x-2 mb-4">
                  <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
                    ALL ({orders.length})
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-blue-500 hover:bg-gray-100">
                    Pending (0)
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-orange-500 hover:bg-gray-100">
                    Shipped (0)
                  </button>
                </div>
                <OrderFilter orders={orders} onFilterChange={handleOrderFilterChange} />
                <OrderList orders={orders} />
              </div>
            }
          />
          <Route
            path="/orders/return"
            element={
              <div className="flex-1 p-6">
                <ReturnOrders returnOrders={returnOrders} />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;