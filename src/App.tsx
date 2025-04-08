import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layout/Mainlayout/MainLayout.tsx";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ProfilePage from "./pages/Profilepage/ProfilePage";
import Homepage from "./pages/Homepage/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import AdminLayout from "./pages/adminPage/AdminLayout.tsx";
import DashboardPage from "./pages/adminPage/DashboardPage";
import CategoryPage from "./pages/adminPage/CategoryPage";
import AddCategoryForm from "./pages/adminPage/components/category/CategoryAdd.tsx";
import ProductPage from "./pages/adminPage/ProductPage";
import AddProductForm from "./pages/adminPage/components/product/ProductAdd";
import UserPage from "./pages/adminPage/UserPage";
import AddUserForm from "./pages/adminPage/components/user/UserAdd";
import OrderPage from "./pages/adminPage/OrderPage";
import ReturnOrderPage from "./pages/adminPage/ReturnOrderPage";
import CartPage from "./pages/cartPage/CartPage.tsx";
import NotFound from "./pages/NotFoundPage/NotFound.tsx";


function App() {
  return (
    <>
      <Routes>
        {/* Routes cho người dùng thông thường */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/test" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/detail" element={<ProductDetailPage />} />
          <Route path="/404" element={<NotFound />} />
        </Route>

        {/* Routes cho admin */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/categories" element={<CategoryPage />} />
          <Route path="/admin/categories/add" element={<AddCategoryForm />} />
          <Route path="/admin/products" element={<ProductPage />} />
          <Route path="/admin/products/add" element={<AddProductForm />} />
          <Route path="/admin/users" element={<UserPage />} />
          <Route path="/admin/users/add" element={<AddUserForm />} />
          <Route path="/admin/orders" element={<OrderPage />} />
          <Route path="/admin/orders/return" element={<ReturnOrderPage />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
