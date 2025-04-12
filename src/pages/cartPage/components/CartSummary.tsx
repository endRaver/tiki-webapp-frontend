import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import UserInformation from "./UserInformation";
import CouponSection from "./CouponSection";

interface CartItemType {
  id: string;
  seller: {
    name: string;
    link: string;
  };
  image: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  shippingDate: string;
  isSelected: boolean;
}

interface CartSummaryProps {
  cartItems: CartItemType[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  // Lọc các sản phẩm được chọn
  const selectedItems = cartItems.filter((item) => item.isSelected);

  // Tính toán tổng tiền, giảm giá, phí vận chuyển
  const totalItemPrice = selectedItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const shippingFee = selectedItems.length > 0 ? 25000 : 0; // Phí vận chuyển (giả sử 25k nếu có sản phẩm)
  const directDiscount = totalItemPrice >= 139000 ? 5000 : 0; // Giảm giá trực tiếp
  const shippingDiscount = selectedItems.length > 0 ? 25000 : 0; // Giảm giá vận chuyển
  const totalPayment = totalItemPrice + shippingFee - directDiscount - shippingDiscount;
  const totalSavings = directDiscount + shippingDiscount;

  // Xử lý khi bấm "Thanh toán"
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }

    // Điều hướng đến CheckoutPage và truyền danh sách sản phẩm được chọn
    navigate("/checkout", { state: { selectedItems } });
  };

  return (
    <div className="space-y-3">
      {/* User Information */}
      <UserInformation />

      {/* Coupon Section */}
      <CouponSection />

      {/* Price Summary */}
      <div className="rounded bg-white shadow">
        {/* Order Summary Header */}
        <div className="space-y-1 border-b border-[#EBEBF0] p-4">
          <h4 className="font-medium text-neutral-400">Đơn hàng</h4>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">
              {selectedItems.length} sản phẩm.
            </span>
            <button
              className="text-primary-300 flex cursor-pointer items-center gap-1 text-sm"
              onClick={toggleOpen}
            >
              <span>Xem thông tin</span>
              <svg
                className={`h-4 w-4 text-blue-500 transition-transform duration-300 ease-in-out ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Product List (Collapsible) */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="space-y-1 border-b border-[#EBEBF0] px-4 py-3">
            {selectedItems.map((product) => (
              <div
                key={product.id}
                className="flex items-start justify-between text-xs font-medium"
              >
                <div className="flex items-start gap-4">
                  <span className="text-nowrap">{product.quantity} x</span>
                  <span className="line-clamp-3 w-full max-w-[156px]">
                    {product.name}
                  </span>
                </div>
                <span className="text-neutral-200">
                  {(product.discountedPrice * product.quantity).toLocaleString()}{" "}
                  <span className="underline underline-offset-2">đ</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 border-b border-[#EBEBF0] p-4">
          <div className="flex justify-between">
            <span className="text-sm text-neutral-600">Tổng tiền hàng</span>
            <span className="text-sm text-neutral-200">
              {totalItemPrice.toLocaleString()}đ
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-neutral-600">Phí vận chuyển</span>
            <span className="text-sm text-neutral-200">
              {shippingFee.toLocaleString()}đ
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-neutral-600">Giảm giá trực tiếp</span>
            <span className="text-success-100 text-sm">
              -{directDiscount.toLocaleString()}đ
            </span>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm text-neutral-600">
                Giảm giá vận chuyển
              </span>
              <svg
                className="h-4 w-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-success-100 text-sm">
              -{shippingDiscount.toLocaleString()}đ
            </span>
          </div>

          <div className="mb-4.5 border-t border-[#EBEBF0] pt-2.5">
            <div className="mb-2.5 flex justify-between">
              <h4 className="text-sm font-medium text-neutral-200">
                Tổng tiền thanh toán
              </h4>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-danger-100 text-xl font-semibold">
                  {totalPayment.toLocaleString()}{" "}
                  <span className="underline underline-offset-2">đ</span>
                </span>
                <span className="text-success-100 text-sm">
                  Tiết kiệm{" "}
                  <span>
                    {totalSavings.toLocaleString()}{" "}
                    <span className="underline underline-offset-2">đ</span>
                  </span>
                </span>
              </div>
            </div>

            <p className="text-end text-xs text-neutral-600">
              (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các
              chi phí phát sinh khác)
            </p>
          </div>

          <button
            className="bg-danger-100 hover:bg-danger-100/80 w-full cursor-pointer rounded py-2.5 text-sm font-medium text-white duration-300"
            onClick={handleCheckout} // Thêm sự kiện onClick để điều hướng
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;