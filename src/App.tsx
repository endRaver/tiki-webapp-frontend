import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";
import { useUserStore } from "./store/useUserStore";

import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";

import MainLayout from "./layout/MainLayout/MainLayout";
import Homepage from "./pages/Homepage/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import SuccessPaymentPage from "./pages/SuccessPaymentPage/SuccessPaymentPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import CartPage from "./pages/CartPage/CartPage";
import UserOrderPage from "./pages/UserOrderPage/UserOrderPage";

import AdminLayout from "./pages/AdminPage/AdminLayout";
import AddProductForm from "./pages/AdminPage/components/product/ProductAdd";
import UserPage from "./pages/AdminPage/UserPage";
import AddUserForm from "./pages/AdminPage/components/user/UserAdd";
import OrderPage from "./pages/AdminPage/OrderPage";
import ReturnOrderPage from "./pages/AdminPage/ReturnOrderPage";
import NotFound from "./pages/NotFoundPage/NotFound";
import ProductCreate from "./pages/AdminPage/components/product/ProductCreate";
import ProductSpecificationUpdate from "./pages/AdminPage/components/product/ProductSpecificationUpdate";
import DashboardPage from "./pages/AdminPage/DashboardPage";
import CategoryPage from "./pages/AdminPage/CategoryPage";
import AddCategoryForm from "./pages/AdminPage/components/category/CategoryAdd";
import ProductPage from "./pages/AdminPage/ProductPage";
import ProfileLayout from "./layout/ProfileLayout/ProfileLayout";

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
          {/* <Route
            path="/profile"
            element={user ? <ProfilePage /> : <NotFound />}
          /> */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/purchase-success" element={<SuccessPaymentPage />} />
          <Route path="/*" element={<NotFound />} />

          <Route element={<ProfileLayout />}>
            <Route
              path="/profile/order"
              element={user ? <UserOrderPage /> : <NotFound />}
            />
          </Route>
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
