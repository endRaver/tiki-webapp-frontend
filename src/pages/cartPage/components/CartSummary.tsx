import { useState } from "react";
import UserInformation from "./UserInformation";
import CouponSection from "./CouponSection";

const CartSummary: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Sample product data (replace with actual data from your cart)
  const products = [
    {
      name: "Sữa Rửa Mặt 3-Nuby 1 Bình sữa chống sặc có hẹp Nuby",
      original_price: 50000,
    },
    {
      name: "Dầu gội xả cho trẻ từ 6 tuổi trở lên Kodomo SILK",
      original_price: 58000,
    },
    {
      name: "Dụng Cụ Chà Gót Chân CERAMIC PEDICURE",
      original_price: 65000,
    },
  ];

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  // Calculate totals (replace with actual logic based on your cart data)
  const totalItemPrice = products.reduce(
    (sum, product) => sum + product.original_price,
    0,
  );
  const shippingFee = 25000;
  const directDiscount = 59000;
  const shippingDiscount = 25000;
  const totalPayment =
    totalItemPrice + shippingFee - directDiscount - shippingDiscount;
  const totalSavings = directDiscount + shippingDiscount;

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
              {products.length} sản phẩm.
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
            {products.map((product) => (
              <div
                key={product.name}
                className="flex items-start justify-between text-xs font-medium"
              >
                <div className="flex items-start gap-4">
                  <span className="text-nowrap">1 x</span>
                  <span className="line-clamp-3 w-full max-w-[156px]">
                    {product.name}
                  </span>
                </div>
                <span className="text-neutral-200">
                  {product.original_price.toLocaleString()}{" "}
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

          <button className="bg-danger-100 hover:bg-danger-100/80 w-full cursor-pointer rounded py-2.5 text-sm font-medium text-white duration-300">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
