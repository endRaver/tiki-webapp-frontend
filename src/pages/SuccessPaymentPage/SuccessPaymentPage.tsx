import { confirm_icon, header_img } from "@/assets/icons/confirm_page_icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Confetti from "react-confetti";
import { useOrderStore } from "@/store/useOrderStore";
import { formatCurrency } from "@/utils/utils";
import { map } from "lodash";

import { format } from "date-fns";

const Confirm = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const { currentOrder, handleCheckoutSuccess, isLoading } = useOrderStore();

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id",
    );
    setIsProcessing(true);

    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    }

    setIsProcessing(false);
  }, [handleCheckoutSuccess]);

  if (isProcessing || isLoading)
    return (
      <div className="flex h-[500px] items-center justify-center">
        <Loader2 className="h-20 w-20 animate-spin" color="#0b74e5" />
      </div>
    );

  return (
    <div>
      <div className="bg-background relative mx-auto hidden h-[740px] justify-center gap-x-4 p-5 sm:flex">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.1}
          style={{ zIndex: 99 }}
          numberOfPieces={700}
          recycle={false}
        />

        <div className="relative flex h-130 w-[742px] flex-col rounded-lg bg-white">
          <div className="h-[112px] w-full rounded-t-xl bg-gradient-to-r from-[#0bbee5] to-[#3856f3]"></div>
          <img className="absolute top-0" src={header_img} alt="header img" />
          <img
            className="absolute top-auto bottom-10 left-10 lg:top-10"
            src={confirm_icon}
            alt="confirm icon"
          />
          <div className="absolute top-10 right-60 flex flex-col">
            <p className="text-2xl font-medium text-white">
              Yay, đặt hàng thành công!
            </p>
            <p className="text-lg font-medium text-white">
              Chuẩn bị tiền mặt {formatCurrency(currentOrder?.totalAmount ?? 0)}{" "}
              <span className="underline underline-offset-1">đ</span>
            </p>
          </div>
          <div className="absolute top-[132px] right-10 w-full max-w-120">
            <div className="border-border-line flex justify-between border-b py-2">
              <p className="text-sm text-[#808089]">Phương thức thanh toán</p>
              <p className="text-sm">Thanh toán tiền mặt</p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-[#808089]">Tổng cộng</p>
              <div className="flex flex-col items-end">
                <p className="text-lg font-medium">
                  {formatCurrency(currentOrder?.totalAmount ?? 0)}{" "}
                  <span className="underline underline-offset-1">đ</span>
                </p>
                <span className="text-xs text-[#808089]">
                  (Đã bao gồm VAT nếu có)
                </span>
              </div>
            </div>
            <Link to="/">
              <button className="h-11 w-full cursor-pointer rounded-sm border border-[#0b74e5] font-medium text-[#0b74e5]">
                Quay về trang chủ
              </button>
            </Link>
          </div>
        </div>
        <div className="h-fit w-80 rounded-sm bg-white">
          <div className="border-border-line flex justify-between border-b p-4">
            <p className="text-sm font-bold">
              Mã đơn hàng: {currentOrder?.orderNumber}
            </p>

            {/* TODO: Add order detail page */}
            <Link to={`/profile/orders/${currentOrder?._id}`}>
              <p className="cursor-pointer text-sm font-medium text-[#0B74E5]">
                Xem đơn hàng
              </p>
            </Link>
          </div>
          <div className="flex flex-col p-4">
            <p className="text-sm text-neutral-400">
              {currentOrder?.shippingDate
                ? `Giao thứ 6, trước 13h, ${format(
                    new Date(currentOrder?.shippingDate),
                    "dd/MM",
                  )}`
                : ""}
            </p>
            <div className="flex flex-col items-start gap-y-2 px-1 py-2">
              {map(currentOrder?.products, (product) => (
                <div
                  key={product.product._id}
                  className="flex items-center gap-2"
                >
                  <div
                    className="h-12 w-12 flex-1 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${product.product.images[0].medium_url})`,
                    }}
                  />
                  <p className="line-clamp-3 flex-5 text-sm text-[#808089]">
                    {product.product.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background flex h-[95vh] flex-col gap-4 sm:hidden">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.1}
          style={{ zIndex: 99 }}
          numberOfPieces={700}
          recycle={false}
        />

        <div className="relative flex h-100 w-full flex-col bg-white">
          <div className="h-[112px] w-full bg-gradient-to-r from-[#0bbee5] to-[#3856f3]"></div>
          <img className="absolute top-0" src={header_img} alt="header img" />
          <img
            className="absolute top-15"
            src={confirm_icon}
            alt="confirm icon"
          />
          <div className="absolute top-10 left-[60px] flex flex-col">
            <p className="text-2xl font-medium text-white">
              Yay, đặt hàng thành công!
            </p>
            <p className="text-lg font-medium text-white">
              Chuẩn bị tiền mặt {formatCurrency(currentOrder?.totalAmount ?? 0)}{" "}
              <span className="underline underline-offset-1">đ</span>
            </p>
          </div>
          <div className="absolute top-[200px] w-full p-1">
            <div className="border-border-line flex justify-between border-b py-2">
              <p className="text-sm text-[#808089]">Phương thức thanh toán</p>
              <p className="text-sm">Thanh toán tiền mặt</p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-[#808089]">Tổng cộng</p>
              <div className="flex flex-col items-end">
                <p className="text-lg font-medium">
                  {formatCurrency(currentOrder?.totalAmount ?? 0)}{" "}
                  <span className="underline underline-offset-1">đ</span>
                </p>
                <span className="text-xs text-[#808089]">
                  (Đã bao gồm VAT nếu có)
                </span>
              </div>
            </div>
            <Link to="/">
              <button className="h-11 w-full cursor-pointer rounded-sm border border-[#0b74e5] font-medium text-[#0b74e5]">
                Quay về trang chủ
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full bg-white">
          <div className="border-border-line flex justify-between border-b p-4">
            <p className="text-sm font-bold">
              Mã đơn hàng: {currentOrder?.orderNumber}
            </p>

            {/* TODO: Add order detail page */}
            <Link to={`/profile/orders/${currentOrder?._id}`}>
              <p className="cursor-pointer text-sm font-medium text-[#0B74E5]">
                Xem đơn hàng
              </p>
            </Link>
          </div>
          <div className="flex flex-col p-4">
            <p className="text-sm text-neutral-400">
              {currentOrder?.shippingDate
                ? `Giao thứ 6, trước 13h, ${format(
                    new Date(currentOrder?.shippingDate),
                    "dd/MM",
                  )}`
                : ""}
            </p>
            <div className="flex flex-col items-start gap-y-2 px-1 py-2">
              {map(currentOrder?.products, (product) => (
                <div
                  key={product.product._id}
                  className="flex items-center gap-2"
                >
                  <div
                    className="h-12 w-12 flex-1 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${product.product.images[0].medium_url})`,
                    }}
                  />
                  <p className="line-clamp-3 flex-5 text-sm text-[#808089]">
                    {product.product.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Confirm;
