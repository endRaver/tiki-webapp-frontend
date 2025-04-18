import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";
import { useUserStore } from "./store/useUserStore";
import { Suspense, lazy } from "react";
import { isEmpty } from "lodash";

// Lazy load components
const MainLayout = lazy(() => import("./layout/MainLayout/MainLayout"));
const Homepage = lazy(() => import("./pages/Homepage/HomePage"));
const ProductDetailPage = lazy(
  () => import("./pages/ProductDetailPage/ProductDetailPage"),
);
const CheckoutPage = lazy(() => import("./pages/CheckoutPage/CheckoutPage"));
const SuccessPaymentPage = lazy(
  () => import("./pages/SuccessPaymentPage/SuccessPaymentPage"),
);
const ResetPasswordPage = lazy(
  () => import("./pages/ResetPasswordPage/ResetPasswordPage"),
);
const CartPage = lazy(() => import("./pages/CartPage/CartPage"));
const UserOrderDetailPage = lazy(
  () => import("./pages/UserOrderPage/UserOrderDetailPage"),
);
const AdminLayout = lazy(() => import("./pages/AdminPage/AdminLayout"));
const AddProductForm = lazy(
  () => import("./pages/AdminPage/components/product/ProductAdd"),
);
const EditProductForm = lazy(
  () => import("./pages/AdminPage/components/product/ProductEdit"),
);
const UserPage = lazy(() => import("./pages/AdminPage/UserPage"));
const OrderPage = lazy(() => import("./pages/AdminPage/OrderPage"));
const EditOrderForm = lazy(
  () => import("./pages/AdminPage/components/order/EditOrderForm"),
);
const ReturnOrderPage = lazy(() => import("./pages/AdminPage/ReturnOrderPage"));
const NotFound = lazy(() => import("./pages/NotFoundPage/NotFound"));
const DashboardPage = lazy(() => import("./pages/AdminPage/DashboardPage"));
const ProductPage = lazy(() => import("./pages/AdminPage/ProductPage"));
const ProfileLayout = lazy(
  () => import("./layout/ProfileLayout/ProfileLayout"),
);
const UserOrderListPage = lazy(
  () => import("./pages/UserOrderPage/UserOrderListPage"),
);
const UserInfo = lazy(() => import("./pages/UserInfoPage/UserInfo"));

// Import non-lazy components
import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";

// Loading component
const LoadingSpinner = () => (
  <div className="flex min-h-screen items-center justify-center"></div>
);

function App() {
  const { user } = useUserStore();

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
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
              path="/cart"
              element={!isEmpty(user) ? <CartPage /> : <Navigate to="/" />}
            />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/purchase-success" element={<SuccessPaymentPage />} />
            <Route path="/*" element={<NotFound />} />

            <Route element={<ProfileLayout />}>
              <Route
                path="/profile/orders"
                element={user ? <UserOrderListPage /> : <NotFound />}
              />
              <Route
                path="/profile/user-info"
                element={user ? <UserInfo /> : <NotFound />}
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
              <Route
                path="/admin/products/edit/:id"
                element={<EditProductForm />}
              />
              <Route path="/admin/users" element={<UserPage />} />
              <Route path="/admin/orders" element={<OrderPage />} />
              <Route
                path="/admin/orders/edit/:id"
                element={<EditOrderForm />}
              />
              <Route
                path="/admin/orders/return"
                element={<ReturnOrderPage />}
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>

      <Toaster />
    </>
  );
}

export default App;
