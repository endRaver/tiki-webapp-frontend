import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";
import { useUserStore } from "./store/useUserStore";
import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";

import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import Homepage from "./pages/Homepage/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";

import AddProductForm from "./pages/adminPage111/components/product/ProductAdd";
import UserPage from "./pages/adminPage111/UserPage";
import AddUserForm from "./pages/adminPage111/components/user/UserAdd";
import OrderPage from "./pages/adminPage111/OrderPage";
import ReturnOrderPage from "./pages/adminPage111/ReturnOrderPage";
import NotFound from "./pages/NotFoundPage/NotFound";
import ProductCreate from "./pages/adminPage111/components/product/ProductCreate";
import ProductSpecificationUpdate from "./pages/adminPage111/components/product/ProductSpecificationUpdate";
import Confirm from "./pages/ConfirmPage/Confirm";

import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import MainLayout from "./layout/Mainlayout111/Mainlayout111";
import CartPage from "./pages/cartPage111/cartPage111";
import ProfilePage from "./pages/Profilepage111/ProfilePage";
import AdminLayout from "./pages/adminPage111/AdminLayout";
import DashboardPage from "./pages/adminPage111/DashboardPage";
import CategoryPage from "./pages/adminPage111/CategoryPage";
import AddCategoryForm from "./pages/adminPage111/components/category/CategoryAdd";
import ProductPage from "./pages/adminPage111/ProductPage";

function App() {
  const { user } = useUserStore();

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Routes cho người dùng thông thường */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/checkout"
            element={user ? <CheckoutPage /> : <NotFound />}
          />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <NotFound />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/purchase-success" element={<Confirm />} />
        </Route>

        {/* Routes cho admin */}
        <Route element={<ProtectedRoute />}>
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
            <Route path="/admin/products/create" element={<ProductCreate />} />
            <Route
              path="/admin/products/update/:id"
              element={<ProductSpecificationUpdate />}
            />
          </Route>
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
