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
import UserOrderDetailPage from "./pages/UserOrderPage/UserOrderDetailPage";

import AdminLayout from "./pages/AdminPage/AdminLayout";
import AddProductForm from "./pages/AdminPage/components/product/ProductAdd";
import EditProductForm from "./pages/AdminPage/components/product/ProductEdit";
import UserPage from "./pages/AdminPage/UserPage";
import EditUserForm from "./pages/AdminPage/components/user/UserEditForm";
import OrderPage from "./pages/AdminPage/OrderPage";
import EditOrderForm from "./pages/AdminPage/components/order/EditOrderForm";
import ReturnOrderPage from "./pages/AdminPage/ReturnOrderPage";
import NotFound from "./pages/NotFoundPage/NotFound";
import DashboardPage from "./pages/AdminPage/DashboardPage";
import ProductPage from "./pages/AdminPage/ProductPage";
import ProfileLayout from "./layout/ProfileLayout/ProfileLayout";
import UserOrderListPage from "./pages/UserOrderPage/UserOrderListPage";

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
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/purchase-success" element={<SuccessPaymentPage />} />
          <Route path="/*" element={<NotFound />} />

          <Route element={<ProfileLayout />}>
            <Route
              path="/profile/orders"
              element={user ? <UserOrderListPage /> : <NotFound />}
            />
            <Route
              path="/profile/orders/:id"
              element={user ? <UserOrderDetailPage /> : <NotFound />}
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
            <Route path="/admin/products" element={<ProductPage />} />
            <Route path="/admin/products/add" element={<AddProductForm />} />
            <Route path="/admin/products/edit/:id" element={<EditProductForm />} />
            <Route path="/admin/users" element={<UserPage />} />
            <Route path="/admin/users/edit/:id" element={<EditUserForm />} />
            <Route path="/admin/orders" element={<OrderPage />} />
            <Route path="/admin/orders/edit/:id" element={<EditOrderForm />} />
            <Route path="/admin/orders/return" element={<ReturnOrderPage />} />
          </Route>
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
